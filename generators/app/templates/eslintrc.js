'use strict';

module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  'plugins': [
    'import'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'sourceType': 'module'
  },
  'globals': {
    'ShadyCSS': true,
    'skate': true
  },
  'rules': {
    // Built-in Rules
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', {
      // Ignore the `h` import because JSX transforms into it
      'varsIgnorePattern': 'h'
    }]
  }
};
