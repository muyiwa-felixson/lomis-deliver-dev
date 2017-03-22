import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { GET_USER } from 'redux/constants/users';
import { App, Dashboard, Login } from 'containers';
import Api from 'helpers/api';
import config from 'config';

export default (store) => {
  const apiClient = new Api();

  function requireAuth(nextState, replace, cb) {
    apiClient.get(config.USER_URL).then((res) => {
      store.dispatch({ type: GET_USER, result: res });
      cb();
    }, (error) => {
      console.error(error);
      replace('/login');
      cb();
    }).catch((error) => {
      console.error(error);
      replace('/login');
      cb();
    });
  }
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={requireAuth} />
      <Route path="login" component={Login} />
    </Route>
  );
};
