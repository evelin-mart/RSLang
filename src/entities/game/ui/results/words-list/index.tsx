import { List, ListItem, Typography, IconButton } from '@mui/material';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styles from '../styles';
import React from 'react';
import { makeAbsUrl } from 'shared/constants';
import { playSong } from 'pages/textbook/utils';
import { Sound, useGame } from 'entities/game';


type WordsListProps = {
  words: AggregatedWord[];
  sound: Sound;
  setSound: React.Dispatch<React.SetStateAction<Sound>>;
}

export const ResultsWordsList = ({ words, sound, setSound }: WordsListProps) => {
  const { isSound } = useGame();

  React.useEffect(() => {
    if (sound) {
      playSong(sound)
        .finally(() => setSound(null));
    }
    return () => {
      sound && sound.pause();
    };
  }, [sound, setSound]);

  const handlePlay = (audioUrlPath: string) => {
    if (isSound) {
      setSound(new Audio(makeAbsUrl(audioUrlPath)));
    }
  }

  const listItems = words.map((word) => {
    return (
      <ListItem key={word.id} sx={{ p: 0, mb: 1 }} >
        <IconButton
          disabled={sound !== null}
          size="small"
          onClick={() => handlePlay(word.audio)}
          sx={styles.playButton}>
          <VolumeUpIcon />
        </IconButton>
        <Typography component="span">
          {word.word} 
        </Typography>
        <Typography component="span" sx={{ color: "grey.500"}}>
          &nbsp;–&nbsp;{word.wordTranslate}
        </Typography>
      </ListItem>
    );
  });

  return (
    <List sx={{ p: 0 }}>
      {listItems}
    </List>
  )
}
