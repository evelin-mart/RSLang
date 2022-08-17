import { useEffect } from 'react';
import { Page } from 'pages/page';
import { useNavigate, useParams } from 'react-router-dom';

const games: Record<string, { title: string }> = {
  audio: {
    title: 'Аудиовызов',
  },
  sprint: {
    title: 'Спринт',
  }
}

export const GamePage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId !== undefined && !games[gameId]) {
      navigate("/*", { replace: true });
    }
  }, [gameId]);

  const title = (gameId && games[gameId]) ? games[gameId].title : '';

  return (
    <Page pageClassName="game" title={title}>
      <div>Game: {gameId}</div>
    </Page>
  )
}
