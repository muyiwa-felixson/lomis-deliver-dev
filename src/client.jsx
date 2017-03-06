import React from 'react';
import { render } from 'react-dom';
// import { App } from 'containers';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import routes from './routes';
import ApiClient from './helpers/api';
import createStore from './redux/create';

// const store = createStore(reducers);
const client = new ApiClient();
const store = createStore(client, window.reduxData);
const mountNode = document.getElementById('content');

match({
  history: browserHistory,
  routes: routes(store) },
  (error, redirectLocation, renderProps) => {
    render(
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>, mountNode);
  });


/* render(
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('content'));*/

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./reducers', () => {
//     store.replaceReducer(require('./redux/reducers').default);
//   });
// }

// const mountNode = document.getElementById('content');
// render(<App />, mountNode, () => {
//   console.log('client side now active');
// });
