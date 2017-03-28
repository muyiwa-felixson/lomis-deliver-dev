import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import user from './user';
import rounds from './round';

const reducer = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  user,
  rounds,
});

export default reducer;
