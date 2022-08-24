import { WordsQueryOptions } from "../words";
import { Word } from 'entities/word';
import { UserWord } from 'shared/api/users-words';
import { WORDS_PER_PAGE } from "shared/constants";

export interface AggregatedWordsQueryOptions extends WordsQueryOptions {
  wordsPerPage?: number;
  filter?: string;
}

export const defaultQueryOptions: AggregatedWordsQueryOptions = {
  page: 0,
  group: 0,
  wordsPerPage: WORDS_PER_PAGE,
}

export interface AggregatedWord extends Omit<Word, 'id'> {
  _id: string;
  userWord?: UserWord;
}

export type AggregatedWordsResult = [{
  paginatedResults: AggregatedWord[];
  totalCount: [{
    count: number;
  }];
}]