import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from 'pages/page';
import { GAME, PAGES } from 'shared/constants';
import { games } from 'shared/constants/games';
import { GAME_PHASE, resetGame, setGameId, useGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { GameStartScreen, GameResults, GameInterface } from 'entities/game';

export const GamePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { gamePhase } = useGame();
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: GAME }>();
  
  useEffect(() => {
    if (gameId !== undefined) {
      if (!games[gameId]) {
        navigate('/*', { replace: true });
      } else {
        dispatch(setGameId(gameId));
      }
    }
    return () => {
      dispatch(resetGame());
    }
  }, [gameId, navigate, dispatch]);

  return (
    <Page pageName={PAGES.GAME}>
      <GameInterface>
        {gamePhase === GAME_PHASE.START && <GameStartScreen />}
        {gamePhase === GAME_PHASE.RESULTS && <GameResults />}
      </GameInterface>
    </Page>
  )
}
