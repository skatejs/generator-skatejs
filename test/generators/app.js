'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

describe('generator-skatejs:app', function () {
  describe('creating the initial component', function() {
    it('creates a component with the correct name', function() {
      return helpers.run(path.join(__dirname, '../../generators/app'))
        .withPrompts({ userProvidedComponentName: 'x-foo' })
        .toPromise()
        .then(function() {
          assert.file('src/components/x-foo/component.js');
          assert.file('src/components/x-foo/styles.scss');
        });
    });

    it('can be given a component name as an argument', function() {
      return helpers.run(path.join(__dirname, '../../generators/app'))
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
  });

  describe('generating the `package.json`', function() {
    describe('setting the package name', function() {
      it('sets the package name the same as the initial component', function() {
        return helpers.run(path.join(__dirname, '../../generators/app'))
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
      return helpers.run(path.join(__dirname, '../../generators/app'))
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
        return helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            userProvidedComponentName: 'x-foo',
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
        return helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            userProvidedComponentName: 'x-foo',
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

    describe('integrating with an existing `package.json`', function() {
      describe('grabbing the default name', function() {
        it('does nothing if the name is empty', function() {
          return helpers.run(path.join(__dirname, '../../generators/app'))
            .inTmpDir(function(dir) {
              const tmpPkg = path.join(dir, 'package.json');

              fs.writeJsonSync(tmpPkg, {});
            })
            .withPrompts({
              userProvidedComponentName: 'x-foo'
            })
            .toPromise()
            .then(function() {
              assert.jsonFileContent('package.json', {
                name: 'x-foo'
              });

              assert.file('src/components/x-foo/component.js');
            });
        });

        it('uses the existing name if present', function() {
          return helpers.run(path.join(__dirname, '../../generators/app'))
            .inTmpDir(function(dir) {
              fs.writeJsonSync(path.join(dir, 'package.json'), {
                name: 'x-foo-bar'
              });
            })
            .toPromise()
            .then(function() {
              assert.jsonFileContent('package.json', {
                name: 'x-foo-bar'
              });

              assert.file('src/components/x-foo-bar/component.js');
            });
        });
      });

      describe('keeping existing data', function() {
        it('does not override the existing name', function() {
          return helpers.run(path.join(__dirname, '../../generators/app'))
            .inTmpDir(function(dir) {
              fs.writeJsonSync(path.join(dir, 'package.json'), {
                name: 'existing-package-name'
              });
            })
            .withArguments([ 'x-foo-bar' ])
            .toPromise()
            .then(function() {
              assert.jsonFileContent('package.json', {
                name: 'existing-package-name'
              });

              assert.file('src/components/x-foo-bar/component.js');
            });
        });

        it('does not override the existing description', function() {
          return helpers.run(path.join(__dirname, '../../generators/app'))
            .inTmpDir(function(dir) {
              fs.writeJsonSync(path.join(dir, 'package.json'), {
                description: 'original description'
              });
            })
            .withArguments([ 'x-foo-bar' ])
            .withPrompts({
              projectDescription: 'Some other description'
            })
            .toPromise()
            .then(function() {
              assert.jsonFileContent('package.json', {
                description: 'original description'
              });
            });
        });

        it('does not override the existing author', function() {
          return helpers.run(path.join(__dirname, '../../generators/app'))
            .inTmpDir(function(dir) {
              fs.writeJsonSync(path.join(dir, 'package.json'), {
                author: 'original author'
              });
            })
            .withArguments([ 'x-foo-bar' ])
            .withPrompts({
              authorName: 'Some name'
            })
            .toPromise()
            .then(function() {
              assert.jsonFileContent('package.json', {
                author: 'original author'
              });
            });
        });
      });
    });
  });

  describe('generating dotfiles', function() {
    function testForFile(name) {
      it(`generates the dotfile: ${name}`, function() {
        return helpers.run(path.join(__dirname, '../../generators/app'))
          .withPrompts({ userProvidedComponentName: 'x-foo' })
          .toPromise()
          .then(function() {
            assert.file(name);
          });
      })
    }

    testForFile('.gitignore');
    testForFile('.eslintrc.js');
    testForFile('.esdoc.json');
    testForFile('karma.conf.js');
    testForFile('webpack/.eslintrc.js');
    testForFile('test/.eslintrc.json');
  });
});
