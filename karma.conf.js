const WEBPACK_CONFIG = require('./webpack.config.js');
const options = require('./commonConfig.js');

module.exports = (config) => {
  config.set({
    files: [ './tests/**/*.js' ],
    preprocessors: {
      './tests/**/*.js': [ 'webpack' ]
    },
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-webpack', 'karma-chrome-launcher', 'karma-jasmine' ],
    webpack: WEBPACK_CONFIG,
    reporters: 'progress',
    port: options.karmaPort,
    browsers: [ 'Chrome' ],
    colors: true,
    autoWatch: true
  });
};
