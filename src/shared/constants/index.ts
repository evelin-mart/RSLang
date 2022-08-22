export const baseUrl = 'http://localhost:3001/';

export const makeAbsUrl = (url: string) => `${baseUrl}${url}`;

export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'succeeded',
  FAIL = 'failed',
}

export enum PAGES {
  MAIN = 'main',
  TEXTBOOK = 'textbook',
  STATISTICS = 'statistics',
  GAME = 'game',
  AUTH = 'auth',
  NOT_FOUND = 'not-found',
}