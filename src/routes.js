import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Dashboard, Login } from 'containers';
import { getUser } from 'redux/actions/userActions';

export default (store) => {
  function requireAuth(nextState, replace, cb) {
    store.dispatch(getUser())
      .then(() => {
        cb();
      })
      .catch(() => {
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
