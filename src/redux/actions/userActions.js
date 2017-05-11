import { GET_USER, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'redux/constants';
import config from 'config';

export function getUser(result) {
  return {
    type: GET_USER,
    result,
  };
}

export function loginUser(params) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: client => client.post(config.AUTH_URL, 'application/x-www-form-urlencoded', {
      data: params,
    }),
  };
}
