import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { WordCard } from 'entities/word';
import { Loader } from 'shared/components/loader';
import { Button, List, ListItem, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { STATUS, PAGES } from '../../shared/constants';
import { play, stop } from './utils';
import { getWords, setGroup } from './model';

export const TextbookPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words, status, error, page, group } = useAppSelector((state) => state.textbook);
  const [sounds, setSounds] = useState<HTMLAudioElement[]>([]);

  useEffect(() => {
    sounds.length && play(sounds);
    return () => {
      sounds.length && stop(sounds);
    };
  }, [sounds]);

  useEffect(() => {
    dispatch(getWords());
  }, [page, group, dispatch]);

  const handleGroupChange = (groupId: number) => {
    dispatch(setGroup(groupId));
  }

  let content: JSX.Element | undefined;

  if (status === STATUS.LOADING) {
    content = <Loader />;
  }

  if (status === STATUS.SUCCESS) {
    const renderedItem = words.map((word) => (
      <ListItem key={word.id} sx={{ p: 0, alignItems: 'stretch' }} className={styles.listItem}>
        <WordCard word={word} play={setSounds} />
      </ListItem>
    ));
    content = (
      <List sx={{ p: 0 }} className={styles.list}>
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
      <Typography variant="subtitle1">Group: {group}</Typography>
      <Typography variant="subtitle1">Page: {page}</Typography>
      <List sx={{display: "flex"}}>
        <ListItem>
          <Button onClick={() => handleGroupChange(0)}>Group1</Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => handleGroupChange(1)}>Group2</Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => handleGroupChange(2)}>Group3</Button>
        </ListItem>
      </List>
      {content}
    </Page>
  );
};
