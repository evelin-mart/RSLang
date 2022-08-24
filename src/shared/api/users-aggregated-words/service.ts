import { processAuthorizedRequest } from "../lib";
import { UserWordDifficulty } from "../users-words";
import {
  AggregatedWordsQueryOptions,
  AggregatedWordsResult,
  defaultQueryOptions,
  AggregatedWord } from "./interface";

const queryOptionsToString = ({ wordsPerPage, group = 0, page = 0, filter }: AggregatedWordsQueryOptions) => {
  const resultFilter = filter !== undefined
    ? filter
    : JSON.stringify({ $and: [ { page }, { group } ] });
  
  const params = [`filter=${resultFilter}`];
  if (wordsPerPage !== undefined) params.push(`wordsPerPage=${wordsPerPage}`);

  return params.join('&');
}

export const urlPath = `/aggregatedWords`;

export const getAggregatedWords = async (queryOptions: AggregatedWordsQueryOptions = { ...defaultQueryOptions }) => {
  const url = `${urlPath}?${queryOptionsToString(queryOptions)}`;
  const [{ paginatedResults }] = await processAuthorizedRequest<AggregatedWordsResult>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, url);
  return paginatedResults;
}

export const getAggregatedWordById = async (wordId: string) => {
  const url = `${urlPath}/${wordId}`;
  const [word] = await processAuthorizedRequest<[AggregatedWord]>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, url);
  return word;
}

export const getAggregatedWordsByDifficulty = async (difficulty: UserWordDifficulty) => {
  const filter = { "userWord.difficulty": difficulty };
  return getAggregatedWords({ filter: JSON.stringify(filter) });
}