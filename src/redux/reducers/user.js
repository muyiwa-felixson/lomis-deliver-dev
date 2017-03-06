import { LOADUSER } from 'redux/actions/userActions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOADUSER:
      return { ...state, user: Object.assign({}, action.user) };
    default:
      return state;
  }
};
