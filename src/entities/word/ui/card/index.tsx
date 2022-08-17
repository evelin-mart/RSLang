import React from 'react';
import { Word } from 'entities/word/model';
import { Paper, Typography, Card } from '@mui/material';

export type WordCardProps = {
  word: Word;
}

export const WordCard = (props: WordCardProps) => {
  const { word } = props;

  return (
    <Card sx={{ padding: 1 }}>
      <Typography variant="subtitle1" component="p">
        {word.word}
      </Typography>
      <Typography variant="subtitle1" component="p">
        {word.wordTranslate}
      </Typography>
    </Card>
  )
}