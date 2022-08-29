export interface UserWord {
  difficulty?: UserWordDifficulty;
  optional: {
    totalUsed: number;
    guessed: number;
    chain: number;
    isLearned: boolean;
    isHard: boolean;
  };
}

export interface UserWordAnswer extends UserWord {
  id: string;
  wordId: string;
}

export enum UserWordDifficulty {
  HARD = 'hard',
  EASY = 'easy',
}

export const defaultUserWord: UserWord = {
  optional: {
    totalUsed: 0,
    guessed: 0,
    chain: 0,
    isLearned: false,
    isHard: false,
  },
};
