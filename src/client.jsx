import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import ApiClient from './helpers/api';
import createStore from './redux/create';

// const store = createStore(reducers);
const client = new ApiClient();
const store = createStore(client, window.reduxData);
const mountNode = document.getElementById('content');


render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory}>
        {routes(store)}
      </Router>
      <ReduxToastr />
    </div>
  </Provider>, mountNode);
