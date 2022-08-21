import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { fetchWords, WordCard } from 'entities/word';
import { Loader } from 'shared/components/loader';
import { List, ListItem } from '@mui/material';
import styles from './styles.module.scss';
import { STATUS, PAGES } from '../../shared/constants';
import { play, stop } from './utils';

export const TextbookPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { value: words, status, error } = useAppSelector((state) => state.words);
  const [sounds, setSounds] = useState<HTMLAudioElement[]>([]);

  useEffect(() => {
    sounds.length && play(sounds);
    return () => {
      sounds.length && stop(sounds);
    };
  }, [sounds]);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchWords());
    }
  }, [status, dispatch]);

  let content: JSX.Element | undefined;

  if (status === STATUS.LOADING) {
    content = <Loader />;
  }

  if (status === STATUS.SUCCESS) {
    const renderedItem = words.map((word) => (
      <ListItem key={word.id} sx={{ p: 0 }} className={styles.listItem}>
        <WordCard word={word} play={setSounds} />
      </ListItem>
    ));
    content = (
      <List sx={{ p: 0, alignItems: 'flex-start' }} className={styles.list}>
        {renderedItem}
      </List>
    );
  }

  if (status === STATUS.FAIL) {
    content = (
      <div>
        <p>Error! {error}</p>
      </div>
    );
  }

  const title = `Учебник \\ Раздел 1 \\ Страница 1`;

  return (
    <Page pageName={PAGES.TEXTBOOK} title={title}>
      {content}
    </Page>
  );
};
