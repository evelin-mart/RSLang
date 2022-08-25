import { games } from 'shared/constants/games';
import { addWordResult, GameInformationWrapper, GAME_PHASE, setGamePhase, setWords, useGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl,  MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import React from 'react';
import * as wordsApi from 'shared/api/words';

export const GameStartScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { gameId } = useGame();
  const [group, setGroup] = React.useState('0');
  
  if (!gameId) return <></>;

  const { title, description } = games[gameId];
  
  const handleGroupChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  }

  const handleStartGame = async () => {
    const words = await wordsApi.getWords({ group: +group, page: 0 });
    dispatch(setWords(words));
    words.forEach(({ id }) => {
      const result = Math.random() > 0.2;
      dispatch(addWordResult({ id, result }));
    });
    dispatch(setGamePhase(GAME_PHASE.RESULTS));
  }

  const renderDifficultyOptions = () => {
    return ['Раздел 1', 'Раздел 2', 'Раздел 3', 'Раздел 4', 'Раздел 5', 'Раздел 6', 'Сложные слова'].map((value, i) => (
      <MenuItem key={i} value={String(i)}>{value}</MenuItem>
    ))
  }

  return (
    <GameInformationWrapper title={title}>
      <Typography variant="body1" sx={{ fontSize: 18, color: "grey.700" }}>{description}</Typography>
      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth variant="standard" color="secondary" sx={{ mb: 3 }}>
          <Select
            defaultValue="0"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={group}
            label="Сложность"
            onChange={handleGroupChange}
            sx={{ fontSize: "1.2rem", color: "grey.900"}}
          >
            {renderDifficultyOptions()}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleStartGame}
            startIcon={<VideogameAssetIcon />}
          >Играть</Button>
        </Box>
      </Box>
    </GameInformationWrapper>
  )
}
