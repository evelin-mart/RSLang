import { finishGame, setGamePhase, GAME_PHASE, useGame, GameResultsData } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { GameInformationWrapper } from '../info-wrapper';
import React from 'react';
import { GAME_COUNTDOWN } from 'shared/constants';
import { getRandomInt } from 'shared/lib';

export const GameCountdown = () => {
  const dispatch: AppDispatch = useDispatch();
  const [counter, setCounter] = React.useState<number>(GAME_COUNTDOWN);
  const { words } = useGame();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    }
  }, []);

  React.useEffect(() => {
    if (counter === 0) {
      // dispatch(setGamePhase(GAME_PHASE.PLAYING));

      // generating some random game results
      // skip playing phase and go directly to results
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
  }, [words, counter, dispatch]);

  return (
    <GameInformationWrapper>      
      <Typography variant="h5" sx={{ textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem"}, color: "grey.700" }}>
        Игра начнется через:<br/>{counter} 
      </Typography>
    </GameInformationWrapper>
  )
}
