'use strict';

const Generator = require('yeoman-generator');

const importTranslationTransform = require('../../transforms/import-translation');

module.exports = class extends Generator {
  initializing(locale) {
    this.props = {};

    if (locale) {
      this.props.locale = locale;
    }
  }

  prompting() {
    const { locale } = this.props;
    const prompts = [];

    if (!locale) {
      prompts.push({
        type: 'input',
        name: 'locale',
        message: 'What locale would you like to generate a file for?'
      });
    }

    return this.prompt(prompts)
      .then(({ locale }) => {
        if (locale) {
          this.props.locale = locale;
        }
      })
      .then(() => {
        const { locale } = this.props;

        if (!locale) {
          throw new Error('A locale name must be provided');
        }
      });
  }

  writing() {
    const { locale } = this.props;
    const translationHelperPath = this.destinationPath('src/util/translation.js');

    this.fs.write(
      this.destinationPath(`translations/${locale}.yml`),
      'key: Hello, world!'
    );

    if (!this.fs.exists(translationHelperPath)) {
      this.fs.copy(
        this.templatePath('helper.js'),
        translationHelperPath
      );
    }

    // Import the new translation
    const originalSource = this.fs.read(translationHelperPath);
    const modifiedSource = importTranslationTransform(originalSource, locale, `../../translations/${locale}.yml`);
    this.fs.write(translationHelperPath, modifiedSource);
  }

  install() {
    this.installDependencies();
  }
}
