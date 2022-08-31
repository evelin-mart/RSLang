import { Box, Button, ButtonBaseActions, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AppDispatch } from 'app/store';
import { finishGame, GameResultsData, GAME_PHASE, setGamePhase, useGame } from 'entities/game/model';
import { Word } from 'entities/word'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getRandomInt } from 'shared/lib';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const GameSprintTest = () => {
  
  const dispatch: AppDispatch = useDispatch();
  const { words, progress, isSound } = useGame();

  const [word, setWord] = useState('');
  const [wordId, setWordId] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [results, setResults] = useState<GameResultsData>({});
  const [translate, setTranslate] = useState('');
  const [rightAnswer, setRightAnswer] = useState<null | boolean>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winsCounter, setWinsCounter] = useState(0);  //TODO обсудить и решить какую именно статистику по словам будем собирать, пока затычка в виде счетчика отгаданных слов
  let userAnswer: boolean | null = null;

  const [secunds, setSecunds] = useState(30);

  const getWrongAnswer = () => {
    const wrong = ['черный', 'слово', 'небо', 'лето', 'апельсин']; //TODO сделать функцию для генерации неправильного ответа, пока затычка
    const index = Math.floor(Math.random() * wrong.length);
    return wrong[index];
  }

  const createCard = () => {

    const roll = Math.random();
    const index = Math.floor(Math.random() * words.length);
    setWord(words[index].word);
    setWordId(words[index].id);
    setImgLink(words[index].image);
    
    if (roll > 0.5) {
      setRightAnswer(true);
      setTranslate(words[index].wordTranslate);
    } else {
      setRightAnswer(false);
      setTranslate(getWrongAnswer());
    }
  }

  const checkAnswer = () => {
    if (userAnswer === rightAnswer) {
      setWinsCounter((s) => s + 1);
      setResults({...results, [wordId]: true})
      console.log('Верно!');
    } else {
      setResults({...results, [wordId]: false})
      console.log('Не верно!');
    }
    
    if (!isGameOver) {
      createCard();
    }
  }

  const handleEndGame = () => {
    dispatch(setGamePhase(GAME_PHASE.LOADING));    
    console.log('Результаты', results);
  }

  useEffect(() => {
    createCard();
  }, [words])

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

  useEffect(() => {
    if (secunds > 0) {
      setTimeout(() => {
        setSecunds(secunds => secunds - 1)
      }, 1000);
    } else {
      setIsGameOver(true)
    }
  }, [secunds, isGameOver])

  const handleAnswer = (answer: boolean) => {
    userAnswer = answer;
    checkAnswer();
    console.log('ответ пользователя', userAnswer);
    console.log('правильный ответ',rightAnswer);
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
        {isGameOver
        ? <Button onClick={handleEndGame} variant="outlined" color="secondary" endIcon={<SkipNextIcon />}>
            Завершить игру
          </Button>
        : <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
            <Box sx={{ mt: 5, display: "flex", columnGap: 6, justifyContent: "space-between" }}>
              <Typography sx={{pt: 1}} variant='body1'>Time left:</Typography>
              <Typography variant='h4' color="error">{secunds}</Typography>
            </Box>
            <Box
              component="img"
              sx={{
                width: 350,
                maxWidth: { xs: 250, md: 350 },
                maxHeight: 250,
              }}
              alt="Word illustration"
              src={`http://localhost:3001/${imgLink}`}
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
          }
    </Paper>
  )
}

