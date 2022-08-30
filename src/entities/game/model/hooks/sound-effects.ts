import React from 'react';
import { Sound } from '../../ui';
import { useGame } from './game';
import rightSound from 'shared/sounds/right.mp3';
import wrongSound from 'shared/sounds/wrong.mp3';

export enum SOUND_EFFECT {
  RIGHT, WRONG,
}

export const useSoundEffect = () => {
  const [soundEffect, setSoundEffect] = React.useState<Sound>(null);
  const { isSound } = useGame();

  const sounds = React.useRef<Record<SOUND_EFFECT, Sound> | null>(null);

  React.useEffect(() => {
    sounds.current = {
      [SOUND_EFFECT.RIGHT]: new Audio(rightSound),
      [SOUND_EFFECT.WRONG]: new Audio(wrongSound),
    }
  }, [])
  
  React.useEffect(() => {
    if (soundEffect) {
      soundEffect.play()
        .finally(() => setSoundEffect(null))
    }
  }, [soundEffect]);

  const playSoundEffect = React.useCallback((soundEffect: SOUND_EFFECT) => {
    if (isSound && sounds.current !== null) {
      setSoundEffect(sounds.current[soundEffect]);
    }
  }, [isSound]);
  
  return [
    playSoundEffect
  ]
}