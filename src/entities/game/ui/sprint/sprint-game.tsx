import { Box, Button, ButtonBaseActions, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AppDispatch } from 'app/store';
import { addGameResult, finishGame, GameResultsData, GAME_PHASE, setGamePhase, setGameProgress, setLongestChain, SOUND_EFFECT, useGame, useSoundEffect, useTimer } from 'entities/game/model';
import { Word } from 'entities/word'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getRandomInt } from 'shared/lib';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLongestChain } from '../../model/hooks/longest-chain';
import { makeAbsUrl } from 'shared/constants';

const GAME_TIME = 10;

export const GameSprintTest = () => {
  
  const dispatch: AppDispatch = useDispatch();
  const { words } = useGame();

  const [word, setWord] = useState('');
  const [wordId, setWordId] = useState('');
  const [imgLink, setImgLink] = useState('');
  // const [results, setResults] = useState<GameResultsData>({});
  const [translate, setTranslate] = useState('');
  const [rightAnswer, setRightAnswer] = useState<null | boolean>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winsCounter, setWinsCounter] = useState(0);  //TODO обсудить и решить какую именно статистику по словам будем собирать, пока затычка в виде счетчика отгаданных слов
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [ playSoundEffect ] = useSoundEffect();
  const [ setLongestChain ] = useLongestChain();
  const [ startTimer, stopTimer, counter ] = useTimer(GAME_TIME, -1);
  let userAnswer: boolean | null = null;

  const getWrongAnswer = () => {
    const wrong = words.filter((item) => item !== words[currentWordIndex]);
    const index = Math.floor(Math.random() * wrong.length);
    return wrong[index];
  }

  const createCard = () => {
    console.log(currentWordIndex);
    
    if (!words[currentWordIndex]) {
      setIsGameOver(true);
      return
    }

    const roll = Math.random();
    setWord(words[currentWordIndex].word);
    setWordId(words[currentWordIndex].id);
    setImgLink(makeAbsUrl(words[currentWordIndex].image));
    
    if (roll < 0.5 || words.length <= 1) {
      setRightAnswer(true);
      setTranslate(words[currentWordIndex].wordTranslate);
    } else {
      setRightAnswer(false);
      setTranslate(getWrongAnswer().wordTranslate);
    }
  }

  const checkAnswer = () => {
    if (userAnswer === rightAnswer) {
      setWinsCounter((s) => s + 1);
      dispatch(addGameResult({ id: wordId, result: true }))
      setLongestChain((prev) => prev + 1);
      playSoundEffect(SOUND_EFFECT.RIGHT);
    } else {
      dispatch(addGameResult({ id: wordId, result: false }))
      setLongestChain(0)
      playSoundEffect(SOUND_EFFECT.WRONG);
    }
  }

  React.useEffect(() => {
    if (isGameOver) {
      stopTimer();
      dispatch(setGamePhase(GAME_PHASE.LOADING));
      dispatch(finishGame());
    }
  }, [isGameOver, dispatch]);

  React.useEffect(() => {
      if (!isGameOver) {
        return createCard;
      }
  }, [currentWordIndex]);

  useEffect(() => {
    //createCard();
    setCurrentWordIndex(1);
    startTimer(() => setIsGameOver(true));
  }, [words, startTimer])

  useEffect(() => {
    dispatch(setGameProgress((counter / GAME_TIME) * 100));
    return () => {
      dispatch(setGameProgress(0));
    }
  }, [counter, dispatch]);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (!e.repeat && e.code === 'ArrowRight') {
        handleAnswer(false);
      }
      if (!e.repeat && e.code === 'ArrowLeft') {
        handleAnswer(true)
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    }
  }, [rightAnswer])

  const handleAnswer = (answer: boolean) => {
    userAnswer = answer;
    checkAnswer();
    if (currentWordIndex === words.length - 1) {
      setIsGameOver(true);
      return;
    }
    setCurrentWordIndex((s) => s + 1);
  }

  return (
    <Paper elevation={3} sx={{ 
      flexBasis: {xs: 300, md: 400}, 
      pl: {xs: 1, md: 3},
      pr: {xs: 1, md: 3},
      display: "flex", 
      flexDirection: "column", 
      rowGap: 2, p: 4,
      height: "fit-content",
    }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
            <Box sx={{ mt: 5, display: "flex", columnGap: 6, justifyContent: "space-between" }}>
              <Typography sx={{pt: 1}} variant='body1'>Time left:</Typography>
              <Typography variant='h4' color="error">{counter}</Typography>
            </Box>
            <Box
              component="img"
              sx={{
                width: 350,
                maxWidth: { xs: 250, md: 350 },
                objectFit: "cover",
                height: 150,
              }}
              alt="Word illustration"
              src={imgLink || ''}
            />
            <Box sx={{ mt: 5, display: "flex", flexDirection: "column", columnGap: 2, justifyContent: "center", alignItems: 'center' }}>
              <Typography align='center' color='secondary' variant='h4'>{word}</Typography>
              <Typography sx={{pt: 1}} variant='body2'>is mean</Typography>
              <Typography align='center' color='secondary' variant='h4'>{translate}</Typography>
            </Box>
            <Box sx={{ mt: 5, display: "flex", columnGap: 6, justifyContent: "center" }}>
              <Button variant="contained" color="success" sx={{ pl: 5, pr: 5, textTransform: "none" }} startIcon={<ArrowBackIcon />} onClick={() => {handleAnswer(true)}}>True!</Button>
              <Button variant="contained" color="error" sx={{ pl: 5, pr: 5, textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => {handleAnswer(false)}}>False!</Button>
            </Box>
          </Box>
    </Paper>
  )
}

