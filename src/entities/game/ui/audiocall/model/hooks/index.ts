import React from 'react';
import { useGame, useSound } from "entities/game/model";
import { getRandomInt, shuffle } from 'shared/lib/utils';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { MAX_ANSWERS } from '../config';
import { setGameProgress } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';

type AnswerOptions = {
  translation: string;
  wordId: string;
  isRightAnswer: boolean; 
}

const createAnswer = (word: AggregatedWord, isRight: boolean) => {
  const { wordTranslate, id } = word;
  return {
    translation: wordTranslate,
    isRightAnswer: isRight,
    wordId: id,
  };
}

type PlayingWord = {
  word: AggregatedWord;
  answers: AnswerOptions[];
}

const generateAnswers = (currentWord: AggregatedWord, words: AggregatedWord[] ) => {
  const restWords = words.filter(({ id }) => id !== currentWord.id);
  const usedIndexies: number[] = [];
  const answersNumber = words.length < MAX_ANSWERS ? words.length : MAX_ANSWERS;
  const answers: AnswerOptions[] = Array.from({ length: answersNumber - 1 }, (_, i) => {
    let randomIndex = -1;
    do {
      randomIndex = getRandomInt(0, restWords.length - 1);
    } while (usedIndexies.includes(randomIndex))
    usedIndexies.push(randomIndex);
    return createAnswer(restWords[randomIndex], false);
  });
  answers.push(createAnswer(currentWord, true));
  return shuffle(answers);
}

const useProgress = (currentIndex: number) => {
  const dispatch: AppDispatch = useDispatch();
  const { gameId, words } = useGame();
  const progressStep = React.useRef(0);

  React.useEffect(() => {
    dispatch(setGameProgress(currentIndex * progressStep.current));
    return () => {
      dispatch(setGameProgress(100));
    }
  }, [currentIndex, dispatch]);

  React.useEffect(() => {
    progressStep.current = (100 / words.length);
  }, [gameId, words]);
}

export const usePlayingWord = (): [PlayingWord | null, () => void, boolean, typeof playSound] => {
  const { words, gameId } = useGame();
  const { playSound, stopSound } = useSound();
  const [ isEndGame, setIsEndGame ] = React.useState(false);
  const [ currentIndex, setCurrentIndex ] = React.useState(0);
  const [ playingWord, setPlayingWord ] = React.useState<PlayingWord | null>(null);
  useProgress(currentIndex);
  const shuffledWords = React.useRef<AggregatedWord[]>([]);

  const next = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  React.useEffect(() => {
    shuffledWords.current = shuffle(words);
    setCurrentIndex(0);
  }, [words]);

  React.useEffect(() => {
    if (currentIndex === words.length) {
      return setIsEndGame(true);
    }
    const word = shuffledWords.current[currentIndex] !== undefined
      ? shuffledWords.current[currentIndex]
      : null;

    if (word === null) {
      return setPlayingWord(null);
    }

    setPlayingWord({
      word,
      answers: generateAnswers(word, shuffledWords.current),
    });

  }, [currentIndex, gameId, words]);


  React.useEffect(() => {
    if (playingWord !== null) {
      playSound(playingWord.word.audio);
    }
    // return () => {
    //   playingWord !== null && stopSound();
    // }
  }, [playingWord, playSound, stopSound]);

  return [playingWord, next, isEndGame, playSound];
}


const handleKeyDown = (buttons: Record<string, HTMLButtonElement | null>) => (event: KeyboardEvent) => {
  if (Object.keys(buttons).includes(event.code)) {
    event.preventDefault();
  }
  buttons[event.code]?.click();
}

export const useKeyboard = (
  answerButtons: React.MutableRefObject<(HTMLButtonElement | null)[]>, 
  nextBtn: React.MutableRefObject<HTMLButtonElement | null>,
  playingWord: PlayingWord | null) => {
  
  React.useEffect(() => {
    const buttons = {
      ...answerButtons.current.reduce((acc: Record<string, HTMLButtonElement | null>, btn, i) => {
        return {...acc, [`Digit${i + 1}`]: btn };
      }, {}),
      'Space': nextBtn.current,
    };

    const handler = handleKeyDown(buttons);
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    }
  }, [playingWord]);
}