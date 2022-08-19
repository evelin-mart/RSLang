import { makeAbsUrl } from '../../../../constants';
import { Typography, Card, CardMedia, CardHeader, IconButton, CardContent } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Word } from 'entities/word/model';
import styles from './styles.module.scss';
import { play } from './utils';

export type WordCardProps = {
  word: Word;
};

export const WordCard = (props: WordCardProps) => {
  const { word } = props;

  const sounds = [
    makeAbsUrl(word.audio),
    makeAbsUrl(word.audioMeaning),
    makeAbsUrl(word.audioExample),
  ];

  const playSounds = () => {
    play(sounds);
  }

  return (
    <Card className={styles.container}>
      <CardHeader
        action={
          <IconButton color='primary' onClick={playSounds}>
            <VolumeUpIcon />
          </IconButton>
        }
        title={`${word.word} ${word.transcription}`}
        subheader={word.wordTranslate}
      />
      <CardMedia component='img' image={makeAbsUrl(word.image)} alt={word.word} />
      <CardContent>
        <Typography variant='subtitle1'>Значение</Typography>
        <Typography variant='body2'>{word.textMeaning}</Typography>
        <Typography variant='body2'>{word.textMeaningTranslate}</Typography>
        <Typography variant='subtitle1'>Пример</Typography>
        <Typography variant='body2'>{word.textExample}</Typography>
        <Typography variant='body2'>{word.textExampleTranslate}</Typography>
      </CardContent>
    </Card>
  );
};
