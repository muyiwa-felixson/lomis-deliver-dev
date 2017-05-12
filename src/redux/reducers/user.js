import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'redux/constants';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, isLoading: true };
    case GET_USER_SUCCESS:
      return { ...state, user: action.result, isLoading: false };
    case GET_USER_FAILURE:
      return { ...state, error: action.result, isLoading: false };
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.result, isLoading: false };
    case LOGIN_FAILURE:
      return { ...state, error: action.result, isLoading: false };
    default:
      return state;
  }
};
