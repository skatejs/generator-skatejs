const { resolve } = require('path');
const { readFileSync } = require('fs');

const pathIsInside = require('path-is-inside');
const findRoot = require('find-root');

const PROPKEY_ESNEXT = 'esnext';
const sourceDirectory = resolve(__dirname, '../src');
const nodeModuleDirectory = resolve(__dirname, '../node_modules');

module.exports = {
  entry: resolve(sourceDirectory, 'index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '<%= initialComponentName %>.bundle.js'
  },
  resolve: {
    mainFields: [PROPKEY_ESNEXT, 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: (filepath) => {
          return pathIsInside(filepath, sourceDirectory) ||
            (pathIsInside(filepath, nodeModuleDirectory) &&
            hasPkgEsnext(filepath));
        },
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', {
                modules: false,
                targets: {
                  browsers: [
                    'last 2 versions',
                    'ie 11'
                  ]
                }
              }]
            ],
            plugins: [
              ['transform-react-jsx', {
                pragma: 'h'
              }]
            ]
          }
        }
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

/**
 * Find package.json for file at `filepath`.
 * Return `true` if it has a property whose key is `PROPKEY_ESNEXT`.
 */
function hasPkgEsnext(filepath) {
  const pkgRoot = findRoot(filepath);
  const packageJsonPath = resolve(pkgRoot, 'package.json');
  const packageJsonText = readFileSync(packageJsonPath, {encoding: 'utf-8'});
  const packageJson = JSON.parse(packageJsonText);

  return {}.hasOwnProperty.call(packageJson, PROPKEY_ESNEXT);
}
