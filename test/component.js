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
});
