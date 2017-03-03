# generator-skatejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Create Skate.js components with Webpack

## Installation

Before you can install [`yeoman`][yeoman] and this generator, make sure you have Node.js 6.7.0 or better installed, as well as the [`yarn`][yarn] package manager.

With this complete, you can install the command line utilities that you need:

```bash
yarn global add yo generator-skatejs
```

## Generating a new project

To generate a new project:

```bash
mkdir my-cool-component
cd my-cool-component
yo skatejs
```

This will walk you through any required configuration.

## Adding more components to an existing project

Since the practice of composing multiple components together is so common, this generator also allows you to add new components to an existing project.

```bash
yo skatejs:component my-second-component
```

This will create a new component and test file with the same structure as the first one.

**NOTE**: The newly created component will be automatically imported for you through a codemod that modifies the `src/index.js` file.  The way that it inserts newlines is not something that I can control; you might want to verify that the file looks okay after generating a new component.

## License

MIT © [Alex LaFroscia](alexlafroscia.com)


[npm-image]: https://badge.fury.io/js/generator-skatejs.svg
[npm-url]: https://npmjs.org/package/generator-skatejs
[travis-image]: https://travis-ci.org/alexlafroscia/generator-skatejs.svg?branch=master
[travis-url]: https://travis-ci.org/alexlafroscia/generator-skatejs
[yeoman]: http://yeoman.io/
[yarn]: https://yarnpkg.com
