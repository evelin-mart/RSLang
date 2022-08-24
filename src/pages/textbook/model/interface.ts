import { Word } from "entities/word";
import { STATUS } from "shared/constants";
import { LoadingState } from "shared/lib";

export interface TextbookState extends LoadingState {
  page: number;
  group: number;
  words: Word[];
}

export const initialState: TextbookState = {
  page: 0,
  group: 0,
  words: [],
  status: STATUS.IDLE,
  error: null,
};
