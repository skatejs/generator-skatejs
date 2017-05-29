const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '<%= initialComponentName %>.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'raw-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(yml|yaml)$/,
        include: resolve(__dirname, '../translations'),
        loaders: [
          'json-loader',
          'yaml-loader'
        ]
      }
    ]
  }
};
