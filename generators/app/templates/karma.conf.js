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

    // Set custom context files to inject the additional
    // script tags required by the bundle
    customContextFile: 'test/static/context.html',
    customDebugFile: 'test/static/debug.html',

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
