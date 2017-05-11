import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'redux/constants';
import config from 'config';

export function getUser() {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
    promise: client => client.get(config.USER_URL),
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
