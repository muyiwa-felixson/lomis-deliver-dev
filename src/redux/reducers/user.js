import { GET_USER } from 'redux/constants/users';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, ...state, action.result);
    default:
      return state;
  }
};
