import { ROUNDS_SUCCESS, ROUNDS_FAILURE, ROUNDS_REQUESTS, COUNT_REQUESTS, COUNT_SUCCESS, COUNT_FAILURE } from 'redux/constants/rounds';

const initialState = {
  round: [],
  isLoading: false,
  error: false,
  roundStatus: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUNDS_REQUESTS:
      return { ...state, isLoading: true, error: false };
    case ROUNDS_SUCCESS: {
      const len = action.result.length;
      console.log(action.result[len - 1], 'action in success');
      return { ...state, round: action.result[len - 1], isLoading: false, error: false };
    }
    case ROUNDS_FAILURE:
      return { ...state, round: action.result, isLoading: false, error: true };
    case COUNT_REQUESTS:
      return { ...state, isLoading: true, error: false };
    case COUNT_SUCCESS:
      return { ...state, roundStatus: action, isLoading: false, error: false };
    case COUNT_FAILURE:
      return { ...state, round: action.result, isLoading: false, error: true };
    default:
      return state;
  }
};
