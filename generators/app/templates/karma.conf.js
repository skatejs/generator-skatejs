/* eslint-env node */

'use strict';

const webpackConfig = require('./webpack/test.js');

const testFiles = 'test/**/*-test.js';
const entryPoint = 'src/index.js';

module.exports = function(config) {
  config.set({
    frameworks: [ 'mocha' ],

    browsers: [
      'Chrome'
    ],

    files: [
      {
        pattern: entryPoint,
        watched: true
      },
      {
        pattern: testFiles,
        watched: true
      }
    ],

    preprocessors: {
      [entryPoint]: [ 'webpack' ],
      [testFiles]: [ 'webpack' ]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
