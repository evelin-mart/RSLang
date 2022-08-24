import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { WordCard } from 'entities/word';
import { Loader } from 'shared/components/loader';
import {
  List,
  ListItem,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
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

  const handleGroupChange = (event: SelectChangeEvent) => {
    const groupId = +event.target.value;
    dispatch(setGroup(groupId));
  };

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

  return (
    <Page pageName={PAGES.TEXTBOOK}>
      <Select value={String(group)} onChange={handleGroupChange}>
        <MenuItem value={0}>Раздел 1</MenuItem>
        <MenuItem value={1}>Раздел 2</MenuItem>
        <MenuItem value={2}>Раздел 3</MenuItem>
        <MenuItem value={3}>Раздел 4</MenuItem>
        <MenuItem value={4}>Раздел 5</MenuItem>
        <MenuItem value={5}>Раздел 6</MenuItem>
        <MenuItem value={6}>Сложные слова</MenuItem>
      </Select>
      {content}
    </Page>
  );
};
