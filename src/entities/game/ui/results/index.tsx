import { useGameResults, resetGame, useSound } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, Divider } from '@mui/material';
import { ResultsWordsList } from './words-list';
import { GameInformationWrapper } from '../info-wrapper';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './styles';

export type Sound = HTMLAudioElement | null;

export const GameResults = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ playSound, { isPlaying } ] = useSound();
  const { correctWords, failedWords } = useGameResults();
  const navigate = useNavigate();
  
  const handleReplay = () => {
    dispatch(resetGame());
  }

  const handleTextbookClick = () => {
    dispatch(resetGame());
    navigate('/textbook', { replace: true });
  }

  const correctWordsPercent = correctWords.length / (failedWords.length + correctWords.length);
  const result = correctWordsPercent >= 0.6
    ? 'Отличный результат!'
    : 'Такой себе результат';

  return (
    <GameInformationWrapper>      
      <Typography variant="h5" sx={{ textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem"}, color: "grey.700" }}>
        {result} 
      </Typography>
      <Box sx={styles.wordsList}>
        <Typography variant="body2" sx={[{ color: "error.light" }, styles.answersRow]}>
          <ErrorOutlineIcon fontSize="small" /> ошибок: {failedWords.length}
        </Typography>
        <ResultsWordsList words={failedWords} playSound={playSound} isPlaying={isPlaying} />
        <Divider sx={{ width: "50%", mb: 1 }} />
        <Typography variant="body2" sx={[{ color: "success.light" }, styles.answersRow]}>
          <TaskAltIcon fontSize="small" /> верных ответов: {correctWords.length}
        </Typography>
        <ResultsWordsList words={correctWords} playSound={playSound} isPlaying={isPlaying} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Button
          onClick={handleTextbookClick}
          variant="outlined"
          color="secondary">
          Учебник
        </Button>
        <Button 
          onClick={handleReplay}
          variant="outlined" 
          color="secondary">
          Сыграть еще раз
        </Button>
      </Box>
    </GameInformationWrapper>
  )
}
