import {
        ROUNDS_REQUESTS,
        ROUNDS_SUCCESS,
        ROUNDS_FAILURE,
        COUNT_REQUESTS,
        COUNT_SUCCESS,
        COUNT_FAILURE,
        SINGLE_ROUND_FAILURE,
        SINGLE_ROUND_SUCCESS,
        SINGLE_ROUND_REQUESTS,
        ROUNDS_BY_LOCATION_REQUESTS,
        ROUNDS_BY_LOCATION_SUCCESS,
        ROUNDS_BY_LOCATION_FAILURE,
        IMPORTED_ROUND_REQUESTS,
        IMPORTED_ROUND_SUCCESS,
        IMPORTED_ROUND_FAILURE,
        IMPORT_REQUESTS,
        IMPORT_SUCCESS,
        IMPORT_FAILURE,
        TOGGLE_CLICKED,
      } from 'redux/constants';
import config from 'config';

export function fetchRounds() {
  return {
    types: [ROUNDS_REQUESTS, ROUNDS_SUCCESS, ROUNDS_FAILURE],
    promise: client => client.get(config.ROUND_URL),
  };
}

export function fetchSingleRound(id) {
  return {
    types: [SINGLE_ROUND_REQUESTS, SINGLE_ROUND_SUCCESS, SINGLE_ROUND_FAILURE],
    promise: client => client.get(`${config.ROUND_URL}/round/${id}`),
  };
}

export function fetchImportedRound(id) {
  return {
    types: [IMPORTED_ROUND_REQUESTS, IMPORTED_ROUND_SUCCESS, IMPORTED_ROUND_FAILURE],
    promise: client => client.get(`${config.ROUND_URL}/round/${id}`),
  };
}

export function fetchRoundCount(id) {
  return {
    types: [COUNT_REQUESTS, COUNT_SUCCESS, COUNT_FAILURE],
    promise: client => client.get(`${config.ROUND_COUNT_URL}/${id}`),
  };
}

export function getRoundsByLocation(url, location) {
  return {
    types: [ROUNDS_BY_LOCATION_REQUESTS, ROUNDS_BY_LOCATION_SUCCESS, ROUNDS_BY_LOCATION_FAILURE],
    promise: client => client.get(`${url}/${location}`),
  };
}

export function runImport(params) {
  return {
    types: [IMPORT_REQUESTS, IMPORT_SUCCESS, IMPORT_FAILURE],
    promise: client => client.post(config.IMPORT_URL, 'application/x-www-form-urlencoded', {
      data: params,
    }),
  };
}

export function toggleSidebar(option) {
  return {
    type: TOGGLE_CLICKED,
    value: option,
  };
}
