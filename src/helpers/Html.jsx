import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default ({ store, assets, component }) => { // eslint-disable-line
  const content = component ? renderToString(component) : 'Front End Repository';
  return (
    <html
      lang="en-us" //eslint-disable-line
    >
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="http://diegoddox.github.io/react-redux-toastr/4.4/react-redux-toastr.min.css" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key} media="screen, projection"
            rel="stylesheet" type="text/css" charSet="UTF-8"
          />,
          )}
        <script src="https://use.fortawesome.com/944f6af3.js" />
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{ __html: `window.reduxData=${serialize(store.getState())};` }}
          charSet="UTF-8"
        />
        {Object.keys(assets.javascript).map((script, i) =>
            <script src={assets.javascript[script]} key={i} /> // eslint-disable-line
        )}
      </body>
    </html>
  );
};
