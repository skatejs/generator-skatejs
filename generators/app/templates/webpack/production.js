const merge = require('webpack-merge');
const base = require('./development');
const webpack = require('webpack');

/**
 * Production Webpack Configuration
 *
 * Differences from the base config:
 *
 * - Minifies the output
 */
module.exports = merge(base, {
  output: {
    filename: '<%= initialComponentName %>.bundle.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devServer: undefined
});
