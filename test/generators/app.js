import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

test.serial('creates a component with the correct name', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({ userProvidedComponentName: 'x-foo' })
    .toPromise();

  assert.file('src/components/x-foo/component.js');
  assert.file('src/components/x-foo/styles.scss');
});

test.serial('can be given a component name as an argument', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withArguments([ 'my-cool-component' ])
    .toPromise();

  assert.file('src/components/my-cool-component/component.js');
  assert.file('src/components/my-cool-component/styles.scss');

  assert.jsonFileContent('package.json', {
    name: 'my-cool-component',
    description: '`my-cool-component` custom element'
  });
});

test.serial('sets the package name the same as the initial component', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({ userProvidedComponentName: 'foo-bar-baz' })
    .toPromise();

  assert.jsonFileContent('package.json', {
    name: 'foo-bar-baz'
  });
});

test.serial('generates default description based on the component name', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({ userProvidedComponentName: 'foo-bar-baz' })
    .toPromise();

  assert.jsonFileContent('package.json', {
    description: '`foo-bar-baz` custom element'
  });
});

test.serial('sets the author name correctly if present', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({
      userProvidedComponentName: 'x-foo',
      authorName: 'MeowMeow FuzzyFace'
    })
    .toPromise();

  assert.jsonFileContent('package.json', {
    author: {
      name: 'MeowMeow FuzzyFace'
    }
  });
});

test.serial('sets the author email correctly if present', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({
      userProvidedComponentName: 'x-foo',
      authorEmail: 'loosecannon@lapd.gov'
    })
    .toPromise();

  assert.jsonFileContent('package.json', {
    author: {
      email: 'loosecannon@lapd.gov'
    }
  });
});

test.serial('can add to an existing package.json', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .inTmpDir(function(dir) {
      const tmpPkg = path.join(dir, 'package.json');

      fs.writeJsonSync(tmpPkg, {});
    })
    .withPrompts({
      userProvidedComponentName: 'x-foo'
    })
    .toPromise();

  assert.jsonFileContent('package.json', {
    name: 'x-foo'
  });

  assert.file('src/components/x-foo/component.js');
});

test.serial('uses the existing author name if present', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .inTmpDir(function(dir) {
      fs.writeJsonSync(path.join(dir, 'package.json'), {
        name: 'x-foo-bar'
      });
    })
    .toPromise();

  assert.jsonFileContent('package.json', {
    name: 'x-foo-bar'
  });

  assert.file('src/components/x-foo-bar/component.js');
});

test.serial('does not override the existing author name', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .inTmpDir(function(dir) {
      fs.writeJsonSync(path.join(dir, 'package.json'), {
        name: 'existing-package-name'
      });
    })
    .withArguments([ 'x-foo-bar' ])
    .toPromise();

  assert.jsonFileContent('package.json', {
    name: 'existing-package-name'
  });

  assert.file('src/components/x-foo-bar/component.js');
});

test.serial('does not override the existing description', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .inTmpDir(function(dir) {
      fs.writeJsonSync(path.join(dir, 'package.json'), {
        description: 'original description'
      });
    })
    .withArguments([ 'x-foo-bar' ])
    .withPrompts({
      projectDescription: 'Some other description'
    })
    .toPromise();

  assert.jsonFileContent('package.json', {
    description: 'original description'
  });
});

test.serial('does not override the existing author', async () => {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .inTmpDir(function(dir) {
      fs.writeJsonSync(path.join(dir, 'package.json'), {
        author: 'original author'
      });
    })
    .withArguments([ 'x-foo-bar' ])
    .withPrompts({
      authorName: 'Some name'
    })
    .toPromise();

  assert.jsonFileContent('package.json', {
    author: 'original author'
  });
});

async function checkForFileMacro(t, fileName) {
  await helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({ userProvidedComponentName: 'x-foo' })
    .toPromise();

  assert.file(fileName);
}

checkForFileMacro.title = (provided, input) => `generates the dotfile: ${input}`;

test(checkForFileMacro, '.gitignore');
test(checkForFileMacro, '.eslintrc.js');
test(checkForFileMacro, '.esdoc.json');
test(checkForFileMacro, 'karma.conf.js');
test(checkForFileMacro, 'webpack/.eslintrc.js');
test(checkForFileMacro, 'test/.eslintrc.json');
