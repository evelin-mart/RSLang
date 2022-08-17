import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { fetchWords, WordCard } from 'entities/word';
import { Loader } from 'shared/components/loader';
import { List, ListItem } from '@mui/material';

export const TextbookPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { value: words, status, error } = useAppSelector((state) => state.words);
  
  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWords());
    }
  }, [status, dispatch]);
  
  let content: JSX.Element | undefined;

  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'succeeded') {
    const renderedItem = words.map((word) => (
      <ListItem key={word.id} sx={{ width: 'auto' }}>
        <WordCard word={word}/>
      </ListItem>
    ));
    content = <List sx={{ display: 'flex', rowGap: 2, p: 0, m: 0, flexWrap: 'wrap' }}>{renderedItem}</List>;
  } else if (status === 'failed') {
    content = <div>Error! {error}</div>;
  }

  return (
    <Page pageClassName="textbook" title="Учебник">
      {content}
    </Page>
  )
}
