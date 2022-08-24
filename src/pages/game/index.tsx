import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from 'pages/page';
import { GAME, PAGES } from 'shared/constants';
import { games } from 'shared/constants/games';

export const GamePage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: GAME }>();

  useEffect(() => {
    if (gameId !== undefined && !games[gameId]) {
      navigate('/*', { replace: true });
    }
  }, [gameId, navigate]);

  const title = (gameId && games[gameId]) ? games[gameId].title : '';

  return (
    <Page pageName={PAGES.GAME} title={title}>
      <div>Game: {gameId}</div>
    </Page>
  )
}
