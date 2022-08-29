import React from 'react';
import { GAME_PHASE, setGamePhase, finishGame, addGameResult } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePlayingWord } from './model';
import { defaultAnswersState } from './model/config';
import { MyColor } from 'shared/constants';
import { useLongestChain } from 'entities/game';
import styles from './styles';

export const AudiocallGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ playingWord, setNextPlayingWord, isEndGame, playSound ] = usePlayingWord();
  const [ answerButtonsState, setAnswerButtonsState ] = React.useState<MyColor[]>(defaultAnswersState);
  const [ nextButtonState, setNextButtonState ] = React.useState<'skip' | 'next'>('skip');
  const [ setChainCounter ] = useLongestChain();

  React.useEffect(() => {
    if (isEndGame) {
      dispatch(setGamePhase(GAME_PHASE.LOADING));
      dispatch(finishGame());
    }
  }, [isEndGame, dispatch]);

  const handleNextWord = () => {
    setNextButtonState('skip');
    setAnswerButtonsState(defaultAnswersState);
    setNextPlayingWord();
  }
  
  const getRightWordIndex = () => playingWord
    ? playingWord.answers.findIndex(({ wordId }) => wordId === playingWord.word.id)
    : 0;

  const handleSkipWord = () => {
    if (playingWord !== null) {
      const { id } = playingWord.word;
      const newButtonsState = [ ...answerButtonsState ];
      newButtonsState[getRightWordIndex()] = 'success';
      setAnswerButtonsState(newButtonsState);
      setChainCounter(0);
      dispatch(addGameResult({ id, result: false }));
    }
    handleNextWord();
  }

  const handleGuessWord = (guessWordId: string, btnRefIndex: number) => {
    if (nextButtonState === 'next') return;
    setNextButtonState('next');
    if (playingWord !== null) {
      const { id } = playingWord.word;
      const result = guessWordId === id;
      dispatch(addGameResult({ id, result }));
      const newButtonsState = [ ...answerButtonsState ];
      if (result) {
        setChainCounter((prev) => prev + 1);
        newButtonsState[btnRefIndex] = 'success';
      } else {
        setChainCounter(0);
        newButtonsState[btnRefIndex] = 'error';
        newButtonsState[getRightWordIndex()] = 'success';
      }
      setAnswerButtonsState(newButtonsState);
    }
  }

  return (
    <Grid sx={styles.gameContainer}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          color="info"
          onClick={() => playingWord && playSound(playingWord.word.audio)}>
          <VolumeUpIcon sx={{ width: 100, height: 100 }} />
        </IconButton>
      </Box>
      <Box sx={styles.answersContainer}>
        {playingWord?.answers.map(({ translation, wordId }, i) => (
          <Button
            color={answerButtonsState[i]}
            onClick={() => handleGuessWord(wordId, i)}
            key={i} 
            sx={[
              styles.answerButton,
              { pointerEvent: nextButtonState === 'next' ? "none" : "all", }
            ]}>{i + 1}.&nbsp;{translation}</Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        {nextButtonState === 'skip'
          ? <Button onClick={handleSkipWord} variant="outlined" color="secondary" endIcon={<SkipNextIcon />}>
              Не знаю!
            </Button>
          : <Button onClick={handleNextWord} variant="outlined" color="secondary" endIcon={<ArrowForwardIcon />}>
              Дальше
            </Button>
        }
      </Box>
    </Grid>
  )
}
