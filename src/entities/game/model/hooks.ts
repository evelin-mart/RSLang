import { AppDispatch, useAppSelector } from 'app/store';
import { playSong } from 'pages/textbook/utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { makeAbsUrl } from 'shared/constants';
import { Sound } from '../ui';
import { setLongestChain } from './store';

export const useGame = () => {
  return useAppSelector((state) => state.game);
}

export const useGameResults = () => {
  const { results, words } = useAppSelector((state) => state.game);

  const correctWordIds = Object.keys(results).filter((id) => results[id]);
  const failedWordIds = Object.keys(results).filter((id) => !results[id]);

  const correctWords = words.filter(({ id }) => correctWordIds.includes(id));
  const failedWords = words.filter(({ id }) => failedWordIds.includes(id));
  
  return {
    correctWords,
    failedWords,
  }
}

export const useSoundEffect = () => {
  const [soundEffect, setSoundEffect] = React.useState<Sound>(null);
  const { isSound } = useGame();
  
  React.useEffect(() => {
    if (soundEffect) {
      playSong(soundEffect)
        .finally(() => setSoundEffect(null));
    }
    return () => {
      soundEffect && soundEffect.pause();
    };
  }, [soundEffect, setSoundEffect]);

  const playSoundEffect = (audioUrlPath: string) => {
    if (isSound) {
      setSoundEffect(new Audio(makeAbsUrl(audioUrlPath)));
    }
  }
  
  return [
    playSoundEffect
  ]
}

export const useSound = (): { playSound: typeof playSound, stopSound: typeof stopSound, isPlaying: boolean } => {
  const [sound, setSound] = React.useState<Sound>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    setIsPlaying(sound !== null);
    if (sound !== null) {
      playSong(sound)
        .finally(() => setSound(null));
    }
    return () => {
      sound && sound.pause();
    }
  }, [sound, setIsPlaying]);

  const playSound = React.useCallback((url: string) => {
    setSound(new Audio(makeAbsUrl(url)));
  }, [setSound])

  const stopSound = React.useCallback(() => {
    setSound(null);
  }, [setSound]);
  
  return {
    playSound,
    stopSound,
    isPlaying
  }
}

export const useLongestChain = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ chainCounter, setChainCounter ] = React.useState(0);
  const { longestChain } = useGame();

  React.useEffect(() => {
    if (longestChain < chainCounter) dispatch(setLongestChain(chainCounter));
  }, [chainCounter, dispatch, longestChain]);

  return [
    setChainCounter
  ];
}
