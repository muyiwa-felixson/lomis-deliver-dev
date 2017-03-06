import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Dashboard, Login } from './containers';
import Api from './helpers/api';

export default (store) => {
  const apiClient = new Api();

  function requireAuth(nextState, replace, cb) {
    apiClient.get('http://localhost:8080/v1/users/me').then((res) => {
      store.dispatch({ type: 'user_scucess', result: res.body });
      cb();
    }, (error) => {
      console.log(error);
      replace('/login');
      cb();
    }).catch((error) => {
      console.log(error);
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
