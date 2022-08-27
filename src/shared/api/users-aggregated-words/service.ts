import { processAuthorizedRequest } from "../lib";
import {
  AggregatedWordsQueryOptions,
  AggregatedWordsResult,
  defaultQueryOptions,
  AggregatedWord, 
  AggregatedWordInResponse} from "./interface";

const queryOptionsToString = ({ wordsPerPage, group, page, filter }: AggregatedWordsQueryOptions) => {
  const resultFilter = filter !== undefined
    ? filter
    : JSON.stringify({ $and: [ { page }, { group } ] });
  
  const params = [`filter=${resultFilter}`];
  params.push(`wordsPerPage=${wordsPerPage}`);

  return params.join('&');
}

const transformId = (word: AggregatedWordInResponse): AggregatedWord => {
  const id = word._id || '';
  delete word._id;
  return { ...word, id };
}

export const urlPath = `/aggregatedWords`;

export const getAggregatedWords = async (queryOptions: AggregatedWordsQueryOptions) => {
  const url = `${urlPath}?${queryOptionsToString({...defaultQueryOptions, ...queryOptions})}`;
  const [{ paginatedResults }] = await processAuthorizedRequest<AggregatedWordsResult>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, url);
  return paginatedResults.map(transformId);
}

export const getAggregatedWordById = async (wordId: string) => {
  const url = `${urlPath}/${wordId}`;
  const [word] = await processAuthorizedRequest<[AggregatedWordInResponse]>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, url);
  return transformId(word);
}

export const getHardAggregatedWords = async () => {
  const filter = { "userWord.optional.isHard": "true" };
  return getAggregatedWords({ filter: JSON.stringify(filter) });
}