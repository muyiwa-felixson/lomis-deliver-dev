import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import user from './user';
import locations from './location';
import rounds from './round';

const reducer = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  user,
  locations,
  rounds,
});

export default reducer;
