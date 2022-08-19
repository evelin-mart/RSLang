export const baseUrl = 'http://localhost:3001/';

export const makeAbsUrl = (url: string) => `${baseUrl}${url}`;

export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'succeeded',
  FAIL = 'failed',
}
