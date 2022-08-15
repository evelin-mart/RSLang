import './styles.scss';
import React from 'react';
import { Word } from 'entities/word/model';

export type WordCardProps = {
  word: Word;
}

export const WordCard = (props: WordCardProps) => {
  const { word } = props;

  return (
    <div className="word-card">
      <div>{word.word}</div>
      <div>{word.wordTranslate}</div>
    </div>
  )
}