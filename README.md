# generator-skatejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

> Create Skate.js components with Webpack

This generator sets up a project scaffold that helps with a number of things:

- Creating an easy-to-use development environment through [Storybook][storybook]
- Styling components through [Sass][sass]
- Localizing text
- Testing component logic through [Karma][karma]
- Bundling a preparing a production package with [Webpack 2][webpack]

## Installation

Before you can install [`yeoman`][yeoman] and this generator, make sure you have Node.js 6.7.0 or better installed, as well as the [`yarn`][yarn] package manager.

With this complete, you can install the command line utilities that you need:

```bash
yarn global add yo generator-skatejs
```

The commands for running, testing and building your project are included in the generated README.

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

## Adding translation files

Depending on your site's needs, you might need to localize your UI so that it can be translated into multiple languages. This project includes a sub-generator for creating YAML files to store your translation keys, and helper functions to render those strings.

You can create a new translation locale using:

```bash
yo skatejs:translation en-US
```

where `en-US` could be any locale identifier. This identifier is used to match against the value passed into the `createTranslationHelper` function, which would presumably be the current locale.

The helper that is generated can then be imported and used like so, assuming your component has a `locale` prop:

```javascript
import createTranslationHelper from '../../util/translation.js';

const { Component, h } = skate;

export default class extends Component {
  renderCallback({ locale }) {
    const t = createTranslationHelper(locale);

    return (
      <p>
        { t('key') }
      </p>
    );
  }
}
```

You can also use objects to namespace translation strings to keep things better organized.  If you had a YAML file structure like this, for example:

```yaml
header:
  title: My Site
  about: About me
```

You could access those values like so:

```javascript
const t = createTranslationHelper(locale);

t('header.title'); // `My Site`
t('header.about'); // `About me`
```

## License

MIT © [Alex LaFroscia](alexlafroscia.com)


[npm-image]: https://badge.fury.io/js/generator-skatejs.svg
[npm-url]: https://npmjs.org/package/generator-skatejs
[travis-image]: https://travis-ci.org/alexlafroscia/generator-skatejs.svg?branch=master
[travis-url]: https://travis-ci.org/alexlafroscia/generator-skatejs
[coveralls-image]: https://coveralls.io/repos/github/alexlafroscia/generator-skatejs/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/alexlafroscia/generator-skatejs?branch=master
[yeoman]: http://yeoman.io/
[yarn]: https://yarnpkg.com
[storybook]: https://storybook.js.org/
[sass]: http://sass-lang.com/
[karma]: https://karma-runner.github.io
[webpack]: https://webpack.github.io/
