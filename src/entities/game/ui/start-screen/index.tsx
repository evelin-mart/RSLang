import { games } from 'shared/constants/games';
import { GameInformationWrapper, GAME_PHASE, setGamePhase, useGame } from 'entities/game';
import { AppDispatch, useAppSelector } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, FormControl,  MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import React from 'react';
import { startGame, setGameGroup } from 'entities/game';
import { STATUS } from 'shared/constants';
import { LoadingButton } from '@mui/lab';
import { useUser } from 'entities/user';

export const GameStartScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { gameId, loadingProcess, group, words, source } = useGame();
  const { group: textbookGroup } = useAppSelector((state) => state.textbook);
  const user = useUser();
  
  React.useEffect(() => {
    const currentGroup = source === 'textbook'
      ? textbookGroup : 0;
    dispatch(setGameGroup(currentGroup));
  }, [dispatch, source, textbookGroup]);

  React.useEffect(() => {
    if (loadingProcess.status === STATUS.SUCCESS) {
      dispatch(setGamePhase(GAME_PHASE.COUNTDOWN));
    }
  }, [loadingProcess, dispatch, words]);

  if (!gameId) return <></>;

  const loading = loadingProcess.status === STATUS.LOADING;
  const { title, description } = games[gameId];
  
  const handleGroupChange = (event: SelectChangeEvent) => {
    dispatch(setGameGroup(+event.target.value));
  }

  const handleStartGame = async () => {
    dispatch(startGame());
  }

  const groups = ['Раздел 1', 'Раздел 2', 'Раздел 3', 'Раздел 4', 'Раздел 5', 'Раздел 6'];
  if (user.isAuthorized) {
    groups.push('Сложные слова');
  }

  const renderDifficultyOptions = () => {
    return groups.map((value, i) => (
      <MenuItem key={i} value={String(i)}>{value}</MenuItem>
    ))
  }

  return (
    <GameInformationWrapper title={title}>
      <Typography variant="body1" sx={{ fontSize: 18, color: "grey.700" }}>{description}</Typography>
      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth variant="standard" color="secondary" sx={{ mb: 3 }}>
          <Select
            disabled={source === "textbook"}
            defaultValue="0"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={String(group)}
            label="Сложность"
            onChange={handleGroupChange}
            sx={{ fontSize: "1.2rem", color: "grey.900"}}
          >
            {renderDifficultyOptions()}
          </Select>
        </FormControl>
        {loadingProcess.status === STATUS.FAIL &&
          <Typography sx={{ color: "error.light", textAlign: "center", mb: 1 }}>Извините, но слов нет!</Typography>
        }
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            loading={loading}
            color="secondary"
            variant="outlined"
            onClick={handleStartGame}
            startIcon={<VideogameAssetIcon />}
          >Играть ({groups[group]})</LoadingButton>
        </Box>
      </Box>
    </GameInformationWrapper>
  )
}
