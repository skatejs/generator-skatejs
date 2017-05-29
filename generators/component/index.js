'use strict';

const Generator = require('yeoman-generator');

const classify = require('../../lib/classify');
const importComponentTransform = require('../../transforms/import-component');

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

      componentName = this.props.componentName;
      if (!componentName) {
        throw new Error('A component name must be provided');
      }

      if (!componentName.includes('-')) {
        throw new Error(`The component name must include a hyphen, was '${componentName}'`);
      }

      this.props.className = classify(this.props.componentName);
    });
  }

  writing() {
    const { componentName } = this.props;
    const componentDestinationPath = `src/components/${componentName}/component.js`;
    const indexFilePath = this.destinationPath('src/index.js');

    if (!this.fs.exists(indexFilePath)) {
      this.fs.copy(
        this.templatePath('src/index.js'),
        indexFilePath
      );
    }

    this.fs.copyTpl(
      this.templatePath('component/component.js'),
      this.destinationPath(componentDestinationPath),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('component/story.js'),
      this.destinationPath(`src/components/${componentName}/story.js`),
      this.props
    );

    this.fs.copy(
      this.templatePath('component/styles.scss'),
      this.destinationPath(`src/components/${componentName}/styles.scss`)
    );

    this.fs.copyTpl(
      this.templatePath('test/component/component-test.js'),
      this.destinationPath(`test/components/${componentName}-test.js`),
      this.props
    );

    // Import the new component
    const originalIndexSource = this.fs.read(indexFilePath);
    const relativeDestinationPath = componentDestinationPath.replace('src/', './');
    const modifiedIndexSource = importComponentTransform(originalIndexSource, relativeDestinationPath);
    this.fs.write(indexFilePath, modifiedIndexSource);
  }
}
