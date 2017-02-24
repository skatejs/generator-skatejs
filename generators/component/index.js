'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing(componentName) {
    this.props = {};

    if (componentName) {
      this.props.componentName = componentName;
    }
  }

  prompting() {
    const { componentName } = this.props;
    const prompts = [];

    if (!componentName) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: 'What should we name this component?'
      });
    }

    return this.prompt(prompts).then(({ componentName }) => {
      if (componentName) {
        this.props.componentName = componentName;
      }
    });
  }

  writing() {
    const { componentName } = this.props;

    this.fs.copyTpl(
      this.templatePath('component/component.js'),
      this.destinationPath(`src/components/${componentName}/component.js`),
      this.props
    );

    this.fs.copy(
      this.templatePath('component/styles.scss'),
      this.destinationPath(`src/components/${componentName}/styles.scss`)
    );
  }
}
