import { Word } from "entities/word";
import { STATUS } from "shared/constants";
import { LoadingState } from "shared/lib";
import { AggregatedWord } from 'shared/api/user-aggregated-words';

export interface TextbookState extends LoadingState {
  page: number;
  group: number;
  words: Word[] | AggregatedWord[];
}

export const initialState: TextbookState = {
  page: 0,
  group: 0,
  words: [],
  status: STATUS.IDLE,
  error: null,
};
