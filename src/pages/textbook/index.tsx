import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { WordCard } from 'entities/word';
import { Loader } from 'shared/components/loader';
import { List, ListItem, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import styles from './styles.module.scss';
import { STATUS, PAGES } from '../../shared/constants';
import { play, stop } from './utils';
import { getHardWords, getWords, setGroup, setLastSeenPage, setPage } from './model';
import { useUser } from 'entities/user/model/hooks';

export const TextbookPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words, status, error, page, group, totalPages } = useAppSelector(
    (state) => state.textbook,
  );
  const { isAuthorized } = useUser();
  const [sounds, setSounds] = useState<HTMLAudioElement[]>([]);

  useEffect(() => {
    sounds.length && play(sounds);
    return () => {
      sounds.length && stop(sounds);
    };
  }, [sounds]);

  useEffect(() => {
    if (group === 6) {
      dispatch(getHardWords());
    } else {
      dispatch(getWords(isAuthorized));
    }
    setLastSeenPage(group, page);
  }, [page, group, dispatch, isAuthorized]);

  const handleGroupChange = (event: SelectChangeEvent) => {
    const groupId = +event.target.value;
    dispatch(setGroup(groupId));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, pageId: number) => {
    dispatch(setPage(pageId - 1));
  };

  let content: JSX.Element | undefined;

  if (status === STATUS.LOADING) {
    content = <Loader />;
  }

  if (status === STATUS.SUCCESS) {
    if (!words.length) {
      if (page === 0) {
        content = <Typography variant='h4'>В данном разделе нет слов</Typography>;
      } else {
        dispatch(setPage(page - 1));
      }
    } else {
      const renderedItem = words.map((word) => (
        <ListItem key={word.id} sx={{ p: 0, alignItems: 'stretch' }} className={styles.listItem}>
          <WordCard word={word} play={setSounds} />
        </ListItem>
      ));
      content = (
        <>
          <List sx={{ pt: 3 }} className={styles.list}>
            {renderedItem}
          </List>
          <Pagination
            className={styles.pagination}
            color='primary'
            count={group === 6 ? totalPages : 30}
            page={page + 1}
            onChange={handlePageChange}
          />
        </>
      );
    }
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
      <Select value={String(group)} sx={{ width: 250, m: 1 }} onChange={handleGroupChange}>
        <MenuItem value={0}>Раздел 1</MenuItem>
        <MenuItem value={1}>Раздел 2</MenuItem>
        <MenuItem value={2}>Раздел 3</MenuItem>
        <MenuItem value={3}>Раздел 4</MenuItem>
        <MenuItem value={4}>Раздел 5</MenuItem>
        <MenuItem value={5}>Раздел 6</MenuItem>
        {isAuthorized && <MenuItem value={6}>Сложные слова</MenuItem>}
      </Select>
      <strong>Страница {page + 1}</strong>
      {content}
    </Page>
  );
};
