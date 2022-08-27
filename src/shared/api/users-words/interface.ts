import { dateToJson } from "shared/lib";

export interface UserWord {
  difficulty?: UserWordDifficulty;
  optional: {
    totalUsed: number;
    guessed: number;
    chain: number;
    isLearned: boolean;
    learnDate: string;
    isHard: boolean;
  };
}

export enum UserWordDifficulty {
  HARD = 'hard',
  EASY = 'easy',
}

export const defaultUserWord: UserWord = {
  // difficulty: UserWordDifficulty.EASY,
  optional: {
    totalUsed: 0,
    guessed: 0,
    chain: 0,
    isLearned: false,
    learnDate: dateToJson(new Date(0)),
    isHard: false,
  }
}