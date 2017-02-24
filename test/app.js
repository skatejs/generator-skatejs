'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-skatejs:app', function () {
  describe('creating the initial component', function() {
    it('creates a component with the correct name', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ initialComponentName: 'x-foo' })
        .toPromise()
        .then(function() {
          // Make sure that the initial component was created
          assert.file('src/components/x-foo/component.js');
          assert.file('src/components/x-foo/styles.scss');
        });
    });

    it.skip('does not prompt the user with an invalid component name', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inTmpDir(function() {
          // Do something to set the appname for this run
        })
        .toPromise()
        .then(function() {
          assert.file('src/components/x-foo/component.js');
          assert.noFile('src/components/foo/component.js');
        });
    });
  });
});
