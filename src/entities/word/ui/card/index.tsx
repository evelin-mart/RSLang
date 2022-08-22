import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import {
  Typography,
  Card,
  Chip,
  Stack,
  CardMedia,
  CardHeader,
  IconButton,
  CardContent,
  LinearProgress,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DoneIcon from '@mui/icons-material/Done';
import { makeAbsUrl } from '../../../../shared/constants';
import { Word, UserWord } from 'entities/word/model';
import styles from './styles.module.scss';

export type WordCardProps = {
  word: Word;
  play: Dispatch<SetStateAction<HTMLAudioElement[]>>;
  userWord?: UserWord;
};

export const WordCard = (props: WordCardProps) => {
  const { word, play } = props;

  //! mock
  const userWord: UserWord = {
    difficulty: 'easy',
    optional: {
      totalUsed: 8,
      guessed: 6,
      chain: 5,
      isLearned: true,
      isHard: false,
    },
  };

  const sounds = [
    makeAbsUrl(word.audio),
    makeAbsUrl(word.audioMeaning),
    makeAbsUrl(word.audioExample),
  ];

  const playSounds = () => {
    play(sounds.map((audio) => new Audio(audio)));
  };

  const wordClass = classNames(styles.container, {
    [styles.hard]: userWord && userWord.optional.isHard,
    [styles.learned]: userWord && userWord.optional.isLearned,
  });

  const getWordProgress = ({ optional }: UserWord) => (optional.guessed * 100) / optional.totalUsed;

  // TODO
  const toggleUserWord = () => true;

  return (
    <Card className={wordClass}>
      <CardHeader
        action={
          <IconButton color='primary' onClick={playSounds}>
            <VolumeUpIcon />
          </IconButton>
        }
        title={`${word.word} ${word.transcription}`}
        subheader={word.wordTranslate}
      />

      {userWord && (
        <LinearProgress
          color='success'
          variant='determinate'
          sx={{ height: 12 }}
          value={getWordProgress(userWord)}
        />
      )}

      <CardMedia component='img' image={makeAbsUrl(word.image)} alt={word.word} />

      <CardContent>
        <Typography variant='subtitle1'>Значение:</Typography>
        <Typography variant='body2'>
          <span dangerouslySetInnerHTML={{ __html: word.textMeaning }}></span>
        </Typography>
        <Typography variant='body2' sx={{ pb: 1 }}>
          {word.textMeaningTranslate}
        </Typography>
        <Typography variant='subtitle1'>Пример:</Typography>
        <Typography variant='body2'>
          <span dangerouslySetInnerHTML={{ __html: word.textExample }}></span>
        </Typography>
        <Typography variant='body2'>{word.textExampleTranslate}</Typography>
      </CardContent>

      {userWord && (
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center', pb: 2 }}>
          <Chip
            label={userWord.optional.isLearned ? 'в изученных' : 'в изученные'}
            onClick={toggleUserWord}
            icon={userWord.optional.isLearned ? <DoneIcon /> : undefined}
            size='small'
            color='success'
            variant={userWord.optional.isLearned ? undefined : 'outlined'}
          />
          <Chip
            label={userWord.optional.isHard ? 'в сложных' : 'в сложные'}
            onClick={toggleUserWord}
            icon={userWord.optional.isHard ? <DoneIcon /> : undefined}
            size='small'
            color='error'
            variant={userWord.optional.isHard ? undefined : 'outlined'}
          />
        </Stack>
      )}
    </Card>
  );
};
