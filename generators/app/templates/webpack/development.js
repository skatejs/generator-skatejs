const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '<%= initialComponentName %>.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(yml|yaml)$/,
        include: resolve(__dirname, '../translations'),
        use: [
          'json-loader',
          'yaml-loader'
        ]
      }
    ]
  }
};
