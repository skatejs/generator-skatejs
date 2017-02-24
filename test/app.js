'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-skatejs:app', function () {
  describe('creating the initial component', function() {
    it('creates a component with the correct name', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ userProvidedComponentName: 'x-foo' })
        .toPromise()
        .then(function() {
          assert.file('src/components/x-foo/component.js');
          assert.file('src/components/x-foo/styles.scss');
        });
    });

    it('can be given a component name as an argument', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withArguments([ 'my-cool-component' ])
        .toPromise()
        .then(function() {
          assert.file('src/components/my-cool-component/component.js');
          assert.file('src/components/my-cool-component/styles.scss');

          assert.jsonFileContent('package.json', {
            name: 'my-cool-component',
            description: '`my-cool-component` custom element'
          });
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

  describe('generating the `package.json`', function() {
    describe('setting the package name', function() {
      it('sets the package name the same as the initial component', function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ userProvidedComponentName: 'foo-bar-baz' })
          .toPromise()
          .then(function() {
            assert.jsonFileContent('package.json', {
              name: 'foo-bar-baz'
            });
          });
      });
    });

    it('generates default description based on the component name', function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ userProvidedComponentName: 'foo-bar-baz' })
        .toPromise()
        .then(function() {
          assert.jsonFileContent('package.json', {
            description: '`foo-bar-baz` custom element'
          });
        });
    });

    describe('the `author` field', function() {
      it('sets the name correctly if present', function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            authorName: 'MeowMeow FuzzyFace'
          })
          .toPromise()
          .then(function() {
            assert.jsonFileContent('package.json', {
              author: {
                name: 'MeowMeow FuzzyFace'
              }
            });
          });
      });

      it('sets the email correctly if present', function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            authorEmail: 'loosecannon@lapd.gov'
          })
          .toPromise()
          .then(function() {
            assert.jsonFileContent('package.json', {
              author: {
                email: 'loosecannon@lapd.gov'
              }
            });
          });
      });
    });
  });
});
