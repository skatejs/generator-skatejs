'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const sortPackageJson = require('sort-package-json');

module.exports = class extends Generator {
  initializing(initialComponentName) {
    this.props = {
      initialComponentName
    };
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('generator-skatejs') + ' generator!'
    ));

    let initialComponentNamePrompt = [];
    if (!this.props.initialComponentName) {
      let defaultAppName;

      if (this.appname.indexOf('-') === -1) {
        defaultAppName = `x-${this.appname}`;
      } else {
        defaultAppName = this.appname;
      }

      initialComponentNamePrompt.push({
        type: 'input',
        name: 'userProvidedComponentName',
        message: 'What should we call the main component?',
        default: defaultAppName
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

        return this.prompt([
          {
            type: 'input',
            name: 'projectDescription',
            message: 'How would you describe this project?',
            default: `\`${initialComponentName}\` custom element`
          },
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
        ]);
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

    // Demo page
    this._moveTemplateToProject('demo/index.html');
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
    let pkg = require(this.templatePath('package.json'));
    pkg = _.merge(pkg, {
      name: this.props.initialComponentName,
      description: this.props.projectDescription,
      author: {}
    });

    if (this.props.authorName) {
      pkg.author.name = this.props.authorName;
    }

    if (this.props.authorEmail) {
      pkg.author.email = this.props.authorEmail;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), sortPackageJson(pkg));
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
      'esdoc',
      'eslint',
      'eslint-plugin-import',
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
