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
import { Word } from 'entities/word/model';
import { UserWord, defaultUserWord } from 'shared/api/users-words';
import styles from './styles.module.scss';
import { useUser } from 'entities/user/model/hooks';

export type WordCardProps = {
  word: Word;
  play: Dispatch<SetStateAction<HTMLAudioElement[]>>;
};

export const WordCard = (props: WordCardProps) => {
  const { word, play } = props;
  const { isAuthorized } = useUser();

  //! mock
  const userWord = 'userWord' in word ? word.userWord! : defaultUserWord;

  const sounds = [
    makeAbsUrl(word.audio),
    makeAbsUrl(word.audioMeaning),
    makeAbsUrl(word.audioExample),
  ];

  const playSounds = () => {
    play(sounds.map((audio) => new Audio(audio)));
  };

  const wordClass = classNames(styles.container, {
    [styles.hard]: isAuthorized && userWord.optional.isHard,
    [styles.learned]: isAuthorized && userWord.optional.isLearned,
  });

  const getWordProgress = ({ optional }: UserWord) => (optional.guessed * 100) / (optional.totalUsed || Infinity);

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

      {isAuthorized && (
        <LinearProgress
          color='primary'
          variant='determinate'
          sx={{ height: 12 }}
          value={getWordProgress(userWord)}
        />
      )}

      <CardMedia
        component='img'
        image={makeAbsUrl(word.image)}
        alt={word.word}
        sx={{ height: 200 }}
      />

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

      {isAuthorized && (
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center', pb: 2, mt: 'auto' }}>
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
