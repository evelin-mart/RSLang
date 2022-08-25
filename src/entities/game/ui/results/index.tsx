import { Link } from 'react-router-dom';
import { games } from 'shared/constants/games';
import { setGameId, useGame, useGameResults, resetGame, setGameSource } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { ResultsWordsList } from './words-list';
import { GameInformationWrapper } from '../info-wrapper';

export const GameResults = () => {
  const dispatch: AppDispatch = useDispatch();
  const { gameId, source } = useGame();
  const { correctWords, failedWords } = useGameResults();
  if (!gameId) return <></>;

  const { title } = games[gameId];
  
  const handleReplay = () => {
    dispatch(resetGame()); // maybe make separate action for replay?
    dispatch(setGameId(gameId));
    dispatch(setGameSource(source));
  }

  return (
    <GameInformationWrapper title={title}>      
      <Box>
        <Typography variant="h5">
          Отличный результат: 
        </Typography>
        <Typography variant="body2" sx={{ color: "error.light" }}>
          ошибок: {failedWords.length}
        </Typography>
        <Typography variant="body2" sx={{ color: "success.light" }}>
          верных ответов: {correctWords.length}
        </Typography>
      </Box>
      <ResultsWordsList correctWords={correctWords} failedWords={failedWords} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {source === 'textbook' 
          && <Link to='/textbook'>Вернуться в учебник</Link>}
        <Button 
          onClick={handleReplay}
          variant="contained" 
          color="secondary">Сыграть еще раз</Button>
      </Box>
    </GameInformationWrapper>
  )
}
