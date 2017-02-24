'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('generator-skatejs') + ' generator!'
    ));

    let defaultAppName;

    if (this.appname.indexOf('-') === -1) {
      defaultAppName = `x-${this.appname}`;
    } else {
      defaultAppName = this.appname;
    }

    const prompts = [
      {
        type: 'input',
        name: 'initialComponentName',
        message: 'What should we call the main component?',
        default: defaultAppName
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'How would you describe this project?'
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
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
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
    this._moveTemplateToProject('README.md');
    this._moveTemplateToProject('package.json');
    this._moveToProject('.gitignore');

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

  install() {
    // Runtime Dependencies
    this.yarnInstall([
      'skatejs'
    ], { dev: false });

    // Development Dependencies
    this.yarnInstall([
      'babel-core',
      'babel-loader',
      'babel-plugin-transform-react-jsx',
      'babel-preset-es2015',
      'esdoc',
      'eslint',
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
