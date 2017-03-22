import { ROUNDS_REQUESTS, ROUNDS_SUCCESS, ROUNDS_FAILURE, COUNT_REQUESTS, COUNT_SUCCESS, COUNT_FAILURE } from 'redux/constants/rounds';
import config from 'config';

export function fetchRounds() {
  return {
    types: [ROUNDS_REQUESTS, ROUNDS_SUCCESS, ROUNDS_FAILURE],
    promise: client => client.get(config.ROUND_URL),
  };
}

export function fetchRoundCount(id) {
  return {
    types: [COUNT_REQUESTS, COUNT_SUCCESS, COUNT_FAILURE],
    promise: client => client.get(`${config.ROUND_COUNT_URL}${id}`),
  };
}
