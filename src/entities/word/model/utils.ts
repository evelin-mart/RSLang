import { UserWord } from 'shared/api/users-words';

export const getWordProgress = ({ optional }: UserWord) =>
  (optional.guessed * 100) / optional.totalUsed;

export const getProgressbarColor = (progress: number) => {
  if (!progress) return 'inherit';
  if (progress <= 25) return 'error';
  if (progress <= 75) return 'primary';
  return 'success';
};

export const toggleWordState = (
  state: 'hard' | 'learned',
  userWord: UserWord,
  isNew: boolean,
) => {};
