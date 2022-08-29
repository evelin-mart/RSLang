import React from 'react';
import { useGame, setProgress, GameResultsData, GAME_PHASE, setGamePhase, finishGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getRandomInt } from 'shared/lib';

export const AudiocallGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words, progress, isSound } = useGame();
  const skipStep = 100 / words.length;

  const handleSkipWord = () => {
    setProgress(progress + skipStep);
    if (progress >= 100) {
      setProgress(0);
    }
  }

  const handleEndGame = () => {
    const results: GameResultsData = {};
    words.forEach(({ id }) => {
      const result = Math.random() > 0.2;
      results[id] = result;
    });
    dispatch(setGamePhase(GAME_PHASE.LOADING));
    dispatch(finishGame({
      results,
      longestChain: getRandomInt(0, Object.keys(results).length) 
    }));
  }

  return (
    <Grid sx={{ height: "calc(100% - var(--header-height))", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton>
          <VolumeUpIcon sx={{ width: 100, height: 100 }} />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", columnGap: 2, justifyContent: "center" }}>
        <Button sx={{ textTransform: "none" }}>1. word1</Button>
        <Button sx={{ textTransform: "none" }}>2. word2</Button>
        <Button sx={{ textTransform: "none" }}>3. word3</Button>
        <Button sx={{ textTransform: "none" }}>4. word4</Button>
        <Button sx={{ textTransform: "none" }}>5. word5</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button onClick={handleSkipWord} variant="outlined" color="secondary" endIcon={<SkipNextIcon />}>
          Не знаю!
        </Button>
        <Button onClick={handleEndGame} variant="outlined" color="secondary" endIcon={<SkipNextIcon />}>
          Завершить игру
        </Button>
      </Box>
    </Grid>
  )
}
