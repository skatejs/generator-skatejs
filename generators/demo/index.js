'use strict';

const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing(demoPageName, componentTagName) {
    this.props = {};

    if (demoPageName) {
      this.props.demoPageName = demoPageName;
    }

    if (componentTagName) {
      this.props.componentTagName = componentTagName;
    }
  }

  prompting() {
    const { demoPageName, componentTagName } = this.props;
    const prompts = [];

    if (!demoPageName) {
      prompts.push({
        type: 'input',
        name: 'demoPageName',
        message: 'What should the file name be?'
      });
    }

    if (!componentTagName) {
      prompts.push({
        type: 'input',
        name: 'componentTagName',
        message: 'Which component would you like to test?'
      });
    }

    return this.prompt(prompts)
      .then((responses) => {
        Object.keys(responses).forEach((key) => {
          this.props[key] = responses[key];
        });
      })
      .then(() => {
        const { demoPageName, componentTagName } = this.props;

        if (!demoPageName) {
          throw new Error('Page name must be provided');
        }

        if (!componentTagName) {
          throw new Error('Must provide a component to display');
        }
      })
      .then(() => {
        const projectRoot = this.destinationRoot();

        try {
          this.props.bundleName = require(path.join(projectRoot, 'webpack/development.js')).output.filename;
        } catch(e) {
          this.props.bundleName = `${this.props.componentTagName}.bundle.js`;
        }
      });
  }

  writing() {
    const { demoPageName } = this.props;
    const { dir, name, ext } = path.parse(demoPageName);
    let pathToFile = '';

    pathToFile += dir ? `${dir}/` : '';

    pathToFile += name;

    pathToFile += ext ? ext : '.html';

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`demo/${pathToFile}`),
      this.props
    );
  }
}
