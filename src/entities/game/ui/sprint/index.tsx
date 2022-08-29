import React from 'react';
import { useGame, setProgress, GameResultsData, GAME_PHASE, setGamePhase, finishGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button } from '@mui/material';
import { getRandomInt } from 'shared/lib';

export const SprintGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words, progress, isSound } = useGame();

  const handleEndGame = () => {
    // рандомные результаты
    const results: GameResultsData = {};
    words.forEach(({ id }) => {
      const result = Math.random() > 0.2;
      results[id] = result;
    });
    dispatch(setGamePhase(GAME_PHASE.LOADING));
    dispatch(finishGame({
      results, // results = { [wordId]: boolean }
      longestChain: getRandomInt(0, Object.keys(results).length)
    }));

    console.log('Результаты', results);
    
  }

  return (
    <Grid sx={{ height: "calc(100% - var(--header-height))", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button onClick={handleEndGame} variant="outlined" color="secondary">
          Завершить игру
        </Button>
      </Box>
    </Grid>
  )
}
