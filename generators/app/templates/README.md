# <%= initialComponentName %>

## Getting Started

To work on your component, first get your dependencies installed

```bash
yarn install
```

You can run a development server locally using `webpack-dev-server` using:

```bash
yarn start
```

This will start up a development server that does a few things for you:

- Watch your source files and re-run Webpack whenever files change
- Serves up the contents of `demo/`, which is configured to link to the version of your component that Webpack is producing
- Automatically reload the page when the component is re-built

Note that you'll need to open your browser to `localhost:8080/webpack-dev-server` to get the live-reload capabilities.

## Building production assets

To build a production-ready version of the assets, use:

```bash
yarn build
```

This runs the exact same process as during development, just two small differences:

- The file is run through Uglify to compress it
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
