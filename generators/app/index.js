'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const sortPackageJson = require('sort-package-json');

module.exports = class extends Generator {
  initializing(initialComponentName) {
    // Hold the current properties
    this.props = {
      initialComponentName
    };

    // Store an in-memory version of the project's `package.json`
    this.pkg = this.fs.readJSON(this.destinationPath('package.json')) || {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('generator-skatejs') + ' generator!'
    ));

    let initialComponentNamePrompt = [];
    if (!this.props.initialComponentName) {
      initialComponentNamePrompt.push({
        type: 'input',
        name: 'userProvidedComponentName',
        message: 'What should we call the main component?',
        default: this.pkg.name
      });
    }

    return this.prompt(initialComponentNamePrompt)
      .then(({ userProvidedComponentName }) => {
        if (userProvidedComponentName) {
          this.props = _.merge(this.props, {
            initialComponentName: userProvidedComponentName
          });
        }

        const { initialComponentName } = this.props;
        const additionalPrompts = [];

        // Only prompt for a package description if one does not already exist
        if (!this.pkg.description) {
          additionalPrompts.push({
            type: 'input',
            name: 'projectDescription',
            message: 'How would you describe this project?',
            default: `\`${initialComponentName}\` custom element`
          });
        }

        // Only prompt for a author information if it is not defined
        if (!this.pkg.author) {
          additionalPrompts.push(
            {
              type: 'input',
              name: 'authorName',
              message: 'What should we call you?'
            },
            {
              type: 'input',
              name: 'authorEmail',
              message: 'What is your email address?'
            }
          );
        }

        return this.prompt(additionalPrompts);
      })
      .then((props) => {
        this.props = _.merge(this.props, props);
      });
  }

  default() {
    const { initialComponentName } = this.props;

    // Run the component generator for the name we already gave
    this.composeWith(require.resolve('../component'), {
      arguments: [ initialComponentName ]
    });
  }

  writing() {
    // Basic project structure
    this._generatePackageJson();
    this._moveTemplateToProject('README.md');
    this._moveToProject('.gitignore');
    this._moveToProject('.eslintrc.js');
    this._moveToProject('.esdoc.json');

    // Core src files
    this._moveTemplateToProject('src/index.js');
    this._moveToProject('src/util/style.js');

    // Webpack configuration
    this._moveTemplateToProject('webpack/development.js');
    this._moveTemplateToProject('webpack/production.js');
    this._moveTemplateToProject('webpack/test.js');
    this._moveToProject('webpack/.eslintrc.js');

    // Demo page
    this._moveTemplateToProject('demo/index.html');

    // Test files
    this._moveToProject('test');
    this._moveToProject('test/.eslintrc.json');
    this._moveToProject('karma.conf.js');
  }

  _moveToProject(filePath) {
    this.fs.copy(
      this.templatePath(filePath),
      this.destinationPath(filePath)
    );
  }

  _moveTemplateToProject(filePath) {
    this.fs.copyTpl(
      this.templatePath(filePath),
      this.destinationPath(filePath),
      this.props
    );
  }

  _generatePackageJson() {
    const templatePackage  = require(this.templatePath('package.json'));
    const basePackage = {
      name: this.props.initialComponentName,
      description: this.props.projectDescription,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail
      }
    };

    // this.pkg <- answers given just now <- existing files <- file in template
    this.pkg = _.merge(basePackage, this.pkg, templatePackage);

    // Sort the keys, so that the merged files doesn't look weird
    this.pkg = sortPackageJson(this.pkg);

    // Write the file back out to disk
    this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  }

  install() {
    // Runtime Dependencies
    this.yarnInstall([
      'skatejs'
    ], { dev: false });

    // Development Dependencies
    this.yarnInstall([
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-plugin-transform-react-jsx',
      'babel-preset-es2015',
      'bore',
      'chai',
      'esdoc',
      'eslint',
      'eslint-plugin-import',
      'karma',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack',
      'mocha',
      'node-sass',
      'raw-loader',
      'sass-loader',
      'webpack',
      'webpack-bundle-size-analyzer',
      'webpack-dev-server',
      'webpack-merge'
    ], { dev: true });
  }
}
