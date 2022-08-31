import { setGamePhase, GAME_PHASE, useTimer } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { GameInformationWrapper } from '../info-wrapper';
import React from 'react';
import { GAME_COUNTDOWN } from 'shared/constants';

export const GameCountdown = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ startTimer, stopTimer, timerCounter ] = useTimer(GAME_COUNTDOWN, -1);

  React.useEffect(() => {
    startTimer(() => {
      dispatch(setGamePhase(GAME_PHASE.PLAYING));
    })
    return () => {
      stopTimer()
    };
  }, [dispatch, startTimer, stopTimer]);

  return (
    <GameInformationWrapper>      
      <Typography variant="h5" sx={{ textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem"}, color: "grey.700" }}>
        Игра начнется через:<br/>{timerCounter} 
      </Typography>
    </GameInformationWrapper>
  )
}
