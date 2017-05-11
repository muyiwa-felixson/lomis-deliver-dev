import { GET_USER, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'redux/constants';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.result };
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.result, isLoading: false };
    case LOGIN_FAILURE:
      return { ...state, error: action.result, isLoading: true };
    default:
      return state;
  }
};
