import React from 'react';
import { useGame, GAME_PHASE, setGamePhase, finishGame, setLongestChain, addGameResult } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button } from '@mui/material';
import { getRandomInt } from 'shared/lib';

export const SprintGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words } = useGame();

  const handleEndGame = () => {
    // рандомные результаты
    // результаты(addGameResult({ id, result })) и самая длинная цепочка(setLongestChain) будут добавлятся по ходу игры с помощью dispatch
    words.forEach(({ id }) => {
      const result = Math.random() > 0.2;
      dispatch(addGameResult({ id, result }))
    });
    const longestChain = getRandomInt(0, Object.keys(words).length);
    dispatch(setLongestChain(longestChain));

    // в конце меняем фазу игры на LOADING, т.к. нужно дождаться обработки результатов
    // и запускаем action finishGame, где как раз и проиходит обработка
    dispatch(setGamePhase(GAME_PHASE.LOADING));
    /* dispatch(finishGame({
      results, // results = { [wordId]: boolean }
      longestChain: getRandomInt(0, Object.keys(results).length)
    }));

    console.log('Результаты', results);
     */
    dispatch(finishGame());
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
