
export interface UserSettings {
  wordsPerDay: number;
  optional: {
    avatar: string | null,
    dailyStats: {
      new: number;
      learned: number;
      date: Date;
    }[]
  }
}

export const defaultUserSettings: UserSettings = {
  wordsPerDay: 0,
  optional: {
    avatar: null,
    dailyStats: [],
  }
}