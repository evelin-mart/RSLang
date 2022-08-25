import { useGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Grid } from '@mui/material';
import React from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CloseIcon from '@mui/icons-material/Close';

export const GameInterface = ({ children }: React.PropsWithChildren) => {
  const dispatch: AppDispatch = useDispatch();
  const game = useGame();
  
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton color="secondary">
          <VolumeUpIcon />
        </IconButton >
        <IconButton color="secondary">
          <FullscreenIcon />
        </IconButton>
        <IconButton color="secondary">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        {children}
      </Box>
    </Grid>
  )
}
