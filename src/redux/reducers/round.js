import { ROUNDS_REQUESTS, ROUNDS_SUCCESS, ROUNDS_FAILURE, COUNT_REQUESTS, COUNT_SUCCESS, COUNT_FAILURE, SINGLE_ROUND_FAILURE, SINGLE_ROUND_SUCCESS, SINGLE_ROUND_REQUEST, IMPORTED_ROUND_REQUESTS, IMPORTED_ROUND_SUCCESS, IMPORTED_ROUND_FAILURE, IMPORT_REQUESTS, IMPORT_SUCCESS, IMPORT_FAILURE } from 'redux/constants/rounds';

const initialState = {
  round: {},
  isLoading: false,
  error: false,
  roundStatus: [],
  importLoading: false,
  importMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUNDS_REQUESTS:
      return { ...state, isLoading: true, error: false };
    case ROUNDS_SUCCESS: {
      const len = action.result.length;
      return { ...state, round: action.result[len - 1], isLoading: false, error: false };
    }
    case ROUNDS_FAILURE:
      return { ...state, round: action.result, isLoading: false, error: true };
    case SINGLE_ROUND_REQUEST:
      return { ...state, isLoading: true, error: false };
    case SINGLE_ROUND_SUCCESS:
      return { ...state, round: action.result[0], isLoading: false, error: false };
    case SINGLE_ROUND_FAILURE:
      return { ...state, isLoading: false, error: true };
    case COUNT_REQUESTS:
      return { ...state, isLoading: true, error: false };
    case COUNT_SUCCESS:
      return { ...state, roundStatus: action.result, isLoading: false, error: false };
    case COUNT_FAILURE:
      return { ...state, round: action.result, isLoading: false, error: true };
    case IMPORTED_ROUND_REQUESTS:
      return { ...state, importLoading: true, error: false };
    case IMPORTED_ROUND_SUCCESS:
      return { ...state, importLoading: false, round: action.result[0], error: false };
    case IMPORTED_ROUND_FAILURE:
      return { ...state, importLoading: false, round: action.result, error: true };
    case IMPORT_REQUESTS:
      return { ...state, importLoading: true, error: false };
    case IMPORT_SUCCESS:
      return { ...state, importLoading: true, importMessage: action.result, error: false };
    case IMPORT_FAILURE:
      return { ...state, importLoading: false, importMessage: action.result, error: true };
    default:
      return state;
  }
};
