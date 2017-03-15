import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import user from './user';

const reducer = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  user,
});

export default reducer;
