const { webpack } = require('@webpack-blocks/webpack2');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const DashboardPlugin = require('webpack-dashboard/plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

exports.extraConfigs = isDev => [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Tether: 'tether',
    'window.Tether': 'tether',
    // Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
    // Button: 'exports-loader?Button!bootstrap/js/dist/button',
    // Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
    // Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
    // Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
    // Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
    // Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
    // Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
    // Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
    // Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
    // Util: 'exports-loader?Util!bootstrap/js/dist/util',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: !isDev,
    debug: isDev,
    options: {
      context: __dirname,
      output: { path: './' }, // This has to be './' and not your output folder.
      postcss() {
        return [
          postcssFlexbugsFixes,
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 10',
            ],
          }),
        ];
      },
    },
  }),
];
exports.development = [
  new DashboardPlugin({ minimal: true }),
  new BrowserSyncPlugin(
      // BrowserSync options
    {
        // browse to http://localhost:3000/ during development
      host: 'localhost',
      port: +process.env.PORT + 2,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
      proxy: `http://localhost:${+process.env.PORT}`,
      reload: false,
    }),
];
exports.production = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
  }),
];
