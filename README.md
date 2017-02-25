# generator-skatejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Create Skate.js components with Webpack

## Installation

First, install [Yeoman](http://yeoman.io) and generator-skatejs using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/) version 6 or higher).

```bash
npm install -g yo generator-skatejs
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

This will create a new component, just like the first one.

**NOTE**: Currently, you have to import and define additional components manually in `src/index.js`.

## License

MIT © [Alex LaFroscia](alexlafroscia.com)


[npm-image]: https://badge.fury.io/js/generator-skatejs.svg
[npm-url]: https://npmjs.org/package/generator-skatejs
[travis-image]: https://travis-ci.org/alexlafroscia/generator-skatejs.svg?branch=master
[travis-url]: https://travis-ci.org/alexlafroscia/generator-skatejs
