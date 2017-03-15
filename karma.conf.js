const webpackConfig = require('./webpack/webpack.config.js');

module.exports = function (config) {
  config.set({
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    browsers: ['Chrome'], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: ['mocha', 'chai-sinon'], // use the mocha test framework
    files: [
      'tests.webpack.js', // Test files
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai-sinon',
      'karma-coverage',
      'karma-webpack',
      'karma-sourcemap-loader',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'], // preprocess with webpack and our sourcemap loader
    },
    reporters: ['mocha', 'coverage'], // report results in this format
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },
  });

  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci']; // eslint-disable-line no-param-reassign
  }
};
