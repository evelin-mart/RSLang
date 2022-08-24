import { processAuthorizedRequest } from "../lib";
import { UserWord } from "./interface";

export const wordsUrlPath = `/words`;

const getUrlPath = (wordId: string) => `${wordsUrlPath}/${wordId}`;

export const getUserWords = async () => {
  return await processAuthorizedRequest<UserWord[]>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, wordsUrlPath);
}

export const getUserWordsById = async (wordId: string) => {
  return await processAuthorizedRequest<UserWord>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, getUrlPath(wordId));
}

export const addUserWord = async (wordId: string, wordData: UserWord) => {
  return await processAuthorizedRequest<UserWord>({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(wordData),
  }, getUrlPath(wordId));
}

export const updateUserWord = async (wordId: string, wordData: Partial<UserWord>) => {
  return await processAuthorizedRequest<UserWord>({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(wordData),
  }, getUrlPath(wordId));
}

export const deleteUserWord = async (wordId: string) => {
  return await processAuthorizedRequest<UserWord>({
    method: 'DELETE',
  }, getUrlPath(wordId));
}
