import React from 'react';
import { render } from 'react-dom';
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
