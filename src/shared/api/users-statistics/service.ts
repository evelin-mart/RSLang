import { processAuthorizedRequest } from "../lib";
import { UserStatistics } from './interface';

export const statisticsUrlPath = `/statistics`;

export const getUserStatistics = async () => {
  return await processAuthorizedRequest<UserStatistics>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, statisticsUrlPath);
}

export const updateUserStatistics = async (userStatistics: Partial<UserStatistics>) => {
  return await processAuthorizedRequest<UserStatistics>({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userStatistics),
  }, statisticsUrlPath);
}