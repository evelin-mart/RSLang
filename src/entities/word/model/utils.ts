import { addUserWord, updateUserWord, UserWord } from 'shared/api/users-words';
import { Word } from './interface';

export const getWordProgress = ({ optional }: UserWord) =>
  (optional.guessed * 100) / optional.totalUsed;

export const getProgressbarColor = (progress: number) => {
  if (!progress) return 'inherit';
  if (progress <= 25) return 'error';
  if (progress <= 75) return 'primary';
  return 'success';
};

export const toggleWordState = (prop: 'isHard' | 'isLearned', userWord: UserWord, word: Word) => {
  let { isHard, isLearned } = userWord.optional;
  if (prop === 'isHard') {
    isHard = !isHard;
    isLearned = isHard ? false : isLearned;
  }
  if (prop === 'isLearned') {
    isLearned = !isLearned;
    isHard = isLearned ? false : isHard;
  }
  const newUserWord = {
    ...userWord,
    optional: {
      ...userWord.optional,
      isLearned,
      isHard,
    },
  };
  if (word.userWord) {
    updateUserWord(word.id, newUserWord);
  } else {
    addUserWord(word.id, newUserWord);
  }
};
