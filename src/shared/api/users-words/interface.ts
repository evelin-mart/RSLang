export interface UserWord {
  difficulty: UserWordDifficulty;
  optional: {
    totalUsed: number;
    guessed: number;
    chain: number;
    isLearned: boolean;
    isHard: boolean;
  };
}

export enum UserWordDifficulty {
  HARD = 'hard',
  EASY = 'easy',
}

export const defaultUserWord: UserWord = {
  difficulty: UserWordDifficulty.EASY,
  optional: {
    totalUsed: 0,
    guessed: 0,
    chain: 0,
    isLearned: false,
    isHard: false,
  }
}