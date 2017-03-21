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

## Adding additional demo pages

By default, a `demo/index.html` file will be generated, which imports your `webpack` output file and instantiates your initial component.  However, it's often useful to create multiple demo pages that can show off your component under other configurations, or that utilize other components.

You can generate additional demo pages using

```
yo skatejs:demo __name_of_page__
```

where the new page will be created at `demo/__name_of_page__.html`.

The command accepts a number of different naming conventions:

```bash
yo skatejs:demo # Be prompted for the name of the page and the component to instantiate
yo skatejs:demo my-page some-component-name # Provide both the name of the page and the component to instantiate
yo skatejs:demo my-page.xyz # Create a page at `demo/my-page.xyz`
yo skatejs:demo pages/about # Create a page at `pages/about.html`
```

Just as with the initial page, the entire `demo/` directory is made available at the root of the development server when you run `yarn start`; this means that if you run `yo skatejs:demo my-page`, you can visit that page at `localhost:8080/my-page.html`.

**Note**: If for some reason there is a problem detecting the name of your output file, the name of the component to instantiate will be used instead.

## License

MIT © [Alex LaFroscia](alexlafroscia.com)


[npm-image]: https://badge.fury.io/js/generator-skatejs.svg
[npm-url]: https://npmjs.org/package/generator-skatejs
[travis-image]: https://travis-ci.org/alexlafroscia/generator-skatejs.svg?branch=master
[travis-url]: https://travis-ci.org/alexlafroscia/generator-skatejs
[yeoman]: http://yeoman.io/
[yarn]: https://yarnpkg.com
