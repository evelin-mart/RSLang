import './styles.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { fetchWords, WordCard } from 'entities/word';
import { Loader } from 'widgets/loader/index';

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
      <li className="words-list__item" key={word.id}>
        <WordCard word={word}/>
      </li>
    ));
    content = <ul className="words-list">{renderedItem}</ul>;
  } else if (status === 'failed') {
    content = <div>Error! {error}</div>;
  }

  return (
    <Page pageClassName="textbook" title="Учебник">
      {content}
    </Page>
  )
}
