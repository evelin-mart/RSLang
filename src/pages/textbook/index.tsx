import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { fetchWords, WordCard } from 'entities/word';
import { Loader } from 'shared/components/loader';
import { List, ListItem } from '@mui/material';
import styles from './styles.module.scss';
import { STATUS } from '../../constants';

export const TextbookPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { value: words, status, error } = useAppSelector((state) => state.words);

  React.useEffect(() => {
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
        <WordCard word={word} />
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
    <Page pageClassName='textbook' title='Учебник'>
      {content}
    </Page>
  );
};
