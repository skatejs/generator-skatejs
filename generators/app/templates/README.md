# <%= initialComponentName %>

## Getting Started

To work on your component, first get your dependencies installed

```bash
yarn install
```

## Testing

[Karma][karma] will build your source files and tests together using Webpack and run them in the browser for you. Two commands are provided:

```bash
yarn test
```

This runs the tests in a "watched" mode, where the browser will be refreshed when files change and the tests will be re-run automatically.

```bash
yarn test:ci
```

This just runs through the tests one time, which is idea for Continuous Integration setups.


## Building production assets

To build a production-ready version of the assets, use:

```bash
yarn build
```

This runs the exact same process as during development, just two small differences:

- The file is run through Babili to compress it
- The file is given an extension of `.min.js` instead of `.js`

This file can then be found at `dist/<%= initialComponentName %>.bundle.min.js`.

## Linting your Project

[ESLint][eslint] is a powerful tool for statically analyzing your code, allowing you to catch formatting mistakes, detect unused variables, keep your coding style consistent and many other useful things. You can run ESLint on your project with:

```bash
yarn lint
```

but it's even more useful when [run in your editor][eslint-integrations].

[eslint]: http://eslint.org/
[eslint-integrations]: http://eslint.org/docs/user-guide/integrations
[karma]: http://karma-runner.github.io/
