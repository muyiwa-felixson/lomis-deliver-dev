const env = process.env.NODE_ENV || 'developement';

const config = require(`./${env}.js`); // eslint-disable-line import/no-dynamic-require

export default config;
