import { Word } from 'entities/word';
import { STATUS } from 'shared/constants';
import { LoadingState } from 'shared/lib';

export interface TextbookState extends LoadingState {
  page: number;
  group: number;
  words: Word[];
}

export const getLastSeenPage = (group?: number) => {
  const pages = localStorage.getItem('pages');
  if (!pages) {
    const pages = Array(6).fill(0);
    localStorage.setItem('pages', JSON.stringify(pages));
    localStorage.setItem('group', String(0));
    return [0, 0];
  }
  if (!group) group = Number(localStorage.getItem('group') || 0);
  const page: number = JSON.parse(pages)[group];
  return [group, page];
};

export const setLastSeenPage = (group: number, n: number) => {
  const pages = JSON.parse(localStorage.getItem('pages') || '');
  pages[group] = n;
  localStorage.setItem('group', group.toString());
  localStorage.setItem('pages', JSON.stringify(pages));
};

const [group, page] = getLastSeenPage();

export const initialState: TextbookState = {
  page,
  group,
  words: [],
  status: STATUS.IDLE,
  error: null,
};
