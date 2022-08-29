import React from 'react';
import { GAME_PHASE, setGamePhase, finishGame, addGameResult } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button, IconButton, Typography, Card, CardMedia, Zoom, CardContent, Fab } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useKeyboard, usePlayingWord } from './model';
import { BTN_STATE, defaultAnswersState, disabledAnswersState } from './model/config';
import { makeAbsUrl } from 'shared/constants';
import { useLongestChain } from 'entities/game';
import styles from './styles';

export const AudiocallGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ playingWord, setNextPlayingWord, isEndGame, playSound ] = usePlayingWord();
  const [ answerButtonsState, setAnswerButtonsState ] = React.useState<BTN_STATE[]>(defaultAnswersState);
  const [ nextButtonState, setNextButtonState ] = React.useState<'skip' | 'next'>('skip');
  const [ setChainCounter ] = useLongestChain();
  const answerButtons = React.useRef<(HTMLButtonElement | null)[]>([]);
  const nextBtn = React.useRef<HTMLButtonElement | null>(null);
  useKeyboard(answerButtons, nextBtn, playingWord);

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
      newButtonsState[getRightWordIndex()] = BTN_STATE.ERROR;
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
      const newButtonsState = [ ...disabledAnswersState ];
      if (result) {
        setChainCounter((prev) => prev + 1);
        newButtonsState[btnRefIndex] = BTN_STATE.SUCCESS;
      } else {
        setChainCounter(0);
        newButtonsState[btnRefIndex] = BTN_STATE.ERROR;
        newButtonsState[getRightWordIndex()] = BTN_STATE.SUCCESS;
      }
      setAnswerButtonsState(newButtonsState);
    }
  }

  return (
    <Grid sx={styles.gameContainer}>
      <Box sx={{ display: "flex", justifyContent: "center", position: "relative", height: 250 }}>
        <Zoom in={nextButtonState === 'next'}>
          <Card sx={{ position: "absolute", top: 0, width: 250 }}>
            <Fab
              size="small"
              sx={{ position: "absolute", right: 16, top: 16 }}
              color="secondary"
              onClick={() => playingWord && playSound(playingWord.word.audio)}>
              <VolumeUpIcon />
            </Fab>
            <CardContent>
              <Typography variant="h4" component="div">
                {playingWord ? playingWord.word.word : ''}
              </Typography>
              <Typography color="text.secondary">
                {playingWord ? playingWord.word.transcription : ''}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ height: 150, width: 250 }}
              image={playingWord ? makeAbsUrl(playingWord.word.image) : ''}
              alt={playingWord ? playingWord.word.word : ''}
            />
          </Card>
        </Zoom>
        <Zoom in={nextButtonState === 'skip'}>
          <Box sx={{ position: "absolute", top: 0, height: "100%", display: "flex", alignItems: "center" }}>
            <IconButton
              color="info"
              onClick={() => playingWord && playSound(playingWord.word.audio)}>
              <VolumeUpIcon sx={{ width: 100, height: 100 }} />
            </IconButton>
          </Box>
        </Zoom>
      </Box>
      <Box sx={styles.answersContainer}>
        {playingWord?.answers.map(({ translation, wordId }, i) => (
          <Button
            onClick={() => handleGuessWord(wordId, i)}
            ref={(el) => answerButtons.current[i] = el}
            key={i}
            sx={[
              styles.answerButton,
              {
                color: answerButtonsState[i],
                pointerEvent: nextButtonState === 'next' ? 'none' : 'all',
              }
            ]}>
              <Typography component="span" sx={{ 
                pr: 1, pl: 1, mr: 0.5, borderRadius: "3px",
                borderWidth: 1, 
                borderStyle: "solid", 
                borderColor: answerButtonsState[i] }}>
                {i + 1}
              </Typography>
              &nbsp;{translation}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        {nextButtonState === 'skip'
          ? <Button ref={nextBtn} onClick={handleSkipWord} variant="outlined" color="secondary" endIcon={<SkipNextIcon />}>
              Не знаю!
            </Button>
          : <Button ref={nextBtn} onClick={handleNextWord} variant="outlined" color="secondary" endIcon={<ArrowForwardIcon />}>
              Дальше
            </Button>
        }
      </Box>
    </Grid>
  )
}
