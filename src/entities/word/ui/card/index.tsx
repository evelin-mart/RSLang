import React from 'react';
import { Word } from 'entities/word/model';
import { Paper, Typography, Card, CardMedia } from '@mui/material';
import styles from './styles.module.scss'

export type WordCardProps = {
  word: Word;
}

// const baseUrl = 'https://react-learnwords-jsfe2022.herokuapp.com/';
const baseUrl = 'http://localhost:3001/';

export const WordCard = (props: WordCardProps) => {
  const { word } = props;

  return (
    <Card sx={{ display: 'flex' }} className={styles.container}>
      <CardMedia component='img' sx={{ flexBasis: '30%' }} image={`${baseUrl}${word.image}`} alt={word.word} />
      <Typography variant='subtitle1' component='p'>
        {word.word}
      </Typography>
      <Typography variant='subtitle1' component='p'>
        {word.wordTranslate}
      </Typography>
    </Card>
  );
}