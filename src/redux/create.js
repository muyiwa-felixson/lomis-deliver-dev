/* eslint-disable global-require */
import { createStore as _createStore, applyMiddleware } from 'redux';

import createMiddleware from './middleware/clientMiddleware';

export default (client, data) => {
  const middleware = [createMiddleware(client)];
  const finalCreateStore = applyMiddleware(...middleware)(_createStore);


  const reducer = require('./reducers');
  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }
  return store;
};
