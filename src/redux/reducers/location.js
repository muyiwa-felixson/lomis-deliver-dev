import { LOCATIONS_REQUESTS, LOCATIONS_SUCCESS, LOCATIONS_FAILURE } from 'redux/constants/locations';

const initialState = {
  locations: [],
  isLoading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATIONS_REQUESTS:
      return { ...state, isLoading: true, error: false };
    case LOCATIONS_SUCCESS:
      return { ...state, locations: action.result, isLoading: false, error: false };
    case LOCATIONS_FAILURE:
      return { ...state, locations: action.result, isLoading: false, error: true };
    default:
      return state;
  }
};
