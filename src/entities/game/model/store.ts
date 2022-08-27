import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, GAME_PHASE, GameSource } from './interface';
import { GAME, LEARN_CHAIN, MAX_PAGE, MAX_WORDS_IN_GAME, STATUS } from 'shared/constants';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { AsyncThunkConfig } from 'app/store';
import * as agWordsApi from 'shared/api/users-aggregated-words';
import * as wordsApi from 'shared/api/words';
import * as userWordsApi from 'shared/api/users-words';
import * as userStatsApi from 'shared/api/users-statistics';
import { dateToJson, getRandomInt } from 'shared/lib';
import { defaultUserWord, UserWord } from 'shared/api/users-words';
import { UserState } from 'entities/user';

export const startGame = createAsyncThunk<AggregatedWord[] | void, void, AsyncThunkConfig>(
  'game/start', 
  async (
    _, { dispatch, getState }
  ) => {
  const {
    textbook: { page },
    game: { source, group },
    user,
  } = getState();

  const isFromTextbook = source === 'textbook';

  const words: AggregatedWord[] = await (
    isFromTextbook
      ? getWordsFromTextbook(group, page, user)
      : getWordsFromRandomPage(group, user)
  )

  if (words.length === 0) throw new Error('There are no words to use in game');
  console.log('Game words:', words.length, words.map(({ word }) => word).join(','))
  dispatch(setWords(words));
});

const getWordsFromTextbook = async (group: number, page: number, user: UserState) => {
  let words: AggregatedWord[] = [];
  for (let pageNumber = page; pageNumber >= 0; pageNumber -= 1) {
    const options = { group, page: pageNumber };
    const currentPageWords: AggregatedWord[] = await (
      user.isAuthorized
        ? agWordsApi.getAggregatedWords(options)
        : wordsApi.getWords(options)
    );
    words = words.concat(
      user.isAuthorized
        ? currentPageWords.filter((word) => !word.userWord?.optional.isLearned)
        : currentPageWords
    )
    if (words.length >= MAX_WORDS_IN_GAME) {
      return words.slice(0, MAX_WORDS_IN_GAME);
    }
  }
  return words;
}

const getWordsFromRandomPage = async (group: number, user: UserState) => {
  const page = getRandomInt(0, MAX_PAGE);
  console.log(`Get words from group ${group}, page: ${page}`);
  const options = { group, page };
  return user.isAuthorized
    ? agWordsApi.getAggregatedWords(options)
    : wordsApi.getWords(options)
}

export const finishGame = createAsyncThunk<void, void, AsyncThunkConfig>(
  'game/finish', 
  async (
    _, { dispatch, getState }
  ) => {
  const {
    game: { words, results }, user,
  } = getState();

  if (!user.isAuthorized) {
    dispatch(setGamePhase(GAME_PHASE.RESULTS));
    return;
  }

  const { stats, promises } = processWords(words, results);
  const { newWordsCounter, correctAnswers, percent, learndWords } = stats;
  console.log(`New: ${newWordsCounter}\nCorrect: ${correctAnswers}\nPercent: ${percent}\nLearned: ${learndWords}`);
  try {
    await Promise.all(promises);
    // update user statistics here
    // we need for mini-game stats:
    //   1. new words
    //   2. correctAnswers / allWards - percent of correct answers
    //   3. the longest chain
    // we need for words stats:
    //   1. new words
    //   2. learned words
    //   3. percent of correct answers - average of games
    const date = dateToJson(new Date());
    try {
      // update stats
      const userStats = await userStatsApi.getUserStatistics();
      console.log(userStats.optional)
      await userStatsApi.updateUserStatistics({
        optional: {
          ...userStats.optional,
          [date]: {
            s: [1, 1, 1],
            a: [1, 1, 1],
            w: 1
          }
        }
      });
    } catch (error) {
      // add new stats
      await userStatsApi.updateUserStatistics({
        optional: {
          [date]: {
            s: [1, 1, 1],
            a: [1, 1, 1],
            w: 1
          }
        }
      });
    }
  } finally {
    dispatch(setGamePhase(GAME_PHASE.RESULTS));
  }
});

const processWords = (words: AggregatedWord[], results: Record<string, boolean>) => {
  let newWordsCounter = 0;
  let correctAnswers = 0;
  let longestChain = 0;
  let learndWords = 0;
  const promises = words
    .filter(({ id }) => results[id] !== undefined)
    .map((word) => {
      const { userWord, id } = word;
      const wordResult = +results[id];
      correctAnswers += wordResult;
      if (userWord === undefined) {
        newWordsCounter += 1;
        return processNewWord(id, wordResult);
      } else {
        const { chain, learned, updatePromise } = processExistingWord(id, wordResult, userWord);
        if (longestChain < chain) longestChain = chain;
        learndWords += +learned;
        return updatePromise;
      }
    });
  const percent = Math.round(correctAnswers / Object.keys(results).length * 100);
  return {
    stats: {
      newWordsCounter,
      correctAnswers,
      longestChain,
      learndWords,
      percent,
    },
    promises,
  }
}

const processNewWord = (id: string, wordResult: number) => {
  return userWordsApi.addUserWord(id, {
    optional: {
      ...defaultUserWord.optional,
      totalUsed: 1,
      guessed: wordResult,
      chain: wordResult,
    }
  })
}

const processExistingWord = (id: string, wordResult: number, userWord: UserWord) => {
  const { optional: { totalUsed, guessed, chain, learnDate, isHard } } = userWord;
  const newChain = wordResult ? chain + wordResult : 0;
  const newIsLearned = newChain >= LEARN_CHAIN;
  return {
    chain: newChain,
    learned: newIsLearned,
    updatePromise: userWordsApi.updateUserWord(id, {
      optional: {
        ...userWord.optional,
        totalUsed: totalUsed + 1,
        guessed: guessed + wordResult,
        chain: newChain,
        isLearned: newIsLearned,
        isHard: newIsLearned ? false : isHard,
        learnDate: newIsLearned ? dateToJson(new Date()) : learnDate,
      }
    })
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameId(state, action: PayloadAction<GAME>) {
      state.gameId = action.payload;
    },
    setGamePhase(state, action: PayloadAction<GAME_PHASE>) {
      state.gamePhase = action.payload;
    },
    setGameSource(state, action: PayloadAction<GameSource>) {
      state.source = action.payload;
    },
    toggleGameSound(state) {
      state.isSound = !state.isSound;
    },
    toggleGameFullscreen(state) {
      state.isFullscreen = !state.isFullscreen;
    },
    setWords(state, action: PayloadAction<AggregatedWord[]>) {
      state.words = action.payload;
    },
    setGameGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    addWordResult(state, action: PayloadAction<{ id: string, result: boolean }>) {
      const { id, result } = action.payload;
      state.results = { ...state.results, [id]: result };
    },
    resetGame(state) {
      state.loadingProcess.status = STATUS.IDLE;
      state.gamePhase = GAME_PHASE.START;
      state.results = {};
      state.words = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(startGame.pending, (state) => {
        state.loadingProcess.status = STATUS.LOADING;
      })
      .addCase(startGame.fulfilled, (state) => {
        state.loadingProcess.status = STATUS.SUCCESS;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.loadingProcess.status = STATUS.FAIL;
        state.loadingProcess.error = action.error.message || '';
      })
      .addCase(finishGame.pending, (state) => {
        state.loadingProcess.status = STATUS.LOADING;
      })
      .addCase(finishGame.fulfilled, (state) => {
        state.loadingProcess.status = STATUS.SUCCESS;
      })
      .addCase(finishGame.rejected, (state, action) => {
        state.loadingProcess.status = STATUS.FAIL;
        state.loadingProcess.error = action.error.message || '';
      })
    }
})

export const {
  setGameId,
  setWords,
  setGameGroup,
  setGamePhase,
  setGameSource,
  addWordResult,
  resetGame,
  toggleGameSound,
  toggleGameFullscreen,
} = gameSlice.actions;
