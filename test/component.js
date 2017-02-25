'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-skatejs:component', function () {
  describe('generating the component structure', function() {
    it('prompts for a component name if not given one', function() {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withPrompts({ componentName: 'x-foo' })
        .toPromise()
        .then(function() {
          // Make sure that the initial component was created
          assert.file('src/components/x-foo/component.js');
          assert.file('src/components/x-foo/styles.scss');
        });
    });

    it('can be given a component name to generate', function() {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments([ 'x-foo' ])
        .toPromise()
        .then(function() {
          // Make sure that the initial component was created
          assert.file('src/components/x-foo/component.js');
          assert.file('src/components/x-foo/styles.scss');
        });
    });
  });

  describe('validating the component name', function() {
    it('throws an error if no name is provided', function() {
      let caughtError = false;

      return helpers.run(path.join(__dirname, '../generators/component'))
        .toPromise()
        .catch(function({ message }) {
          // Make sure that the error has the right messaging
          assert.equal(message, 'A component name must be provided');
          caughtError = true;
        })
        .then(function() {
          // We want to make sure that an error was actually thrown
          assert(caughtError, 'The generator threw an error');
        });
    });

    it('prevents creating components without a hyphen', function() {
      let caughtError = false;

      return helpers.run(path.join(__dirname, '../generators/component'))
        .withPrompts({ componentName: 'foo' })
        .toPromise()
        .catch(function({ message }) {
          // Make sure that the error has the right messaging
          assert.equal(message, "The component name must include a hyphen, was 'foo'");
          caughtError = true;
        })
        .then(function() {
          // We want to make sure that an error was actually thrown
          assert(caughtError, 'The generator threw an error');
        });
    });
  });

  describe('configuring the generated component', function() {
    it('registers the component with the correct name', function() {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withPrompts({ componentName: 'x-foo' })
        .toPromise()
        .then(function() {
          assert.fileContent('src/components/x-foo/component.js', /return 'x-foo';/);
          assert.fileContent('src/components/x-foo/component.js', /Hello, world! I am x-foo!/);
        });
    });
  });

  describe('generating a test file', function() {
    it('makes a `describe` block with the right name', function() {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withPrompts({ componentName: 'x-foo' })
        .toPromise()
        .then(function() {
          assert.file('test/components/x-foo-test.js');
          assert.fileContent('test/components/x-foo-test.js', "describe('x-foo component', function() {");
        });
    });
  });
});
