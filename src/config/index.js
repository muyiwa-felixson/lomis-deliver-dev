const env = process.env.NODE_ENV || 'development';

const config = require(`./${env}.js`); // eslint-disable-line import/no-dynamic-require

export default config;
