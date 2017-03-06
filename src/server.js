/* eslint react/jsx-filename-extension: 0*/
import express from 'express';
import React from 'react';
import cookie from 'react-cookie';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from 'routes';
import Html from 'helpers/Html';
import ApiClient from 'helpers/api';
import createStore from 'redux/create';
import { Provider } from 'react-redux';

const app = express();
app.set('views', `${__dirname}/templates`);
app.set('view engine', 'ejs');

const development = (process.env.NODE_ENV || 'development') === 'development';
if (!development) {
  app.use('/assets', express.static(`${__dirname}/assets`, { maxAge: 86400 }));
}
// This should be the default route for testing html template
// before being converted to react compoonent
app.get('/templates/:templateName', (req, res) => {
  const templateName = req.params.templateName;
  res.render(templateName, { title: 'Hey', assets: webpackIsomorphicTools.assets() });
});

// Wild card route for the default react component
app.get('*', (req, res) => {
  cookie.plugToRequest(req, res);
  const client = new ApiClient(req);
  const store = createStore(client);
  match({ routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
        );
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send(renderToString(<Html
        store={store}
        assets={webpackIsomorphicTools.assets()}
        component={component}
      />));
    } else {
      res.status(404).send('Not found');
    }
  });
});

const port = process.env.PORT || 8000;

export default () => app.listen(port, () => {
  console.info(`==> 🌎  ENV=${process.env.NODE_ENV}`);
  console.info(`==> ✅  Front-end server is listening at http://localhost:${port}`);
});
