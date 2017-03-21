import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import { stripIndent } from 'common-tags';

function runDemoGenerator() {
  return helpers.run(path.join(__dirname, '../../generators/demo'))
    .inTmpDir((dir) => {
      const webpackFilePath = path.join(dir, 'webpack/development.js');

      fs.ensureFileSync(webpackFilePath);
      fs.writeFileSync(webpackFilePath, stripIndent`
        module.exports = {
          output: {
            filename: 'x-foo.bundle.js'
          }
        }
      `);
    });
}

test.serial('generates a new demo page based on a provided argument', async () => {
  await runDemoGenerator()
    .withArguments([ 'index' ])
    .withPrompts({ componentTagName: 'x-foo' })
    .toPromise();

  assert.file('demo/index.html');
});

test.serial('throws an error if the page name is not provided', async (t) => {
  const promise = runDemoGenerator()
    .withPrompts({ componentTagName: 'x-foo' })
    .toPromise();
  const error = await t.throws(promise);

  t.is(error.message, 'Page name must be provided');
});

test.serial('generates a new demo page based on a prompt', async () => {
  await runDemoGenerator()
    .withPrompts({
      demoPageName: 'index',
      componentTagName: 'x-foo'
    });

  assert.file('demo/index.html');
});

test.serial('it displays a the provided component', async () => {
  await runDemoGenerator()
    .withArguments([ 'index' ])
    .withPrompts({
      componentTagName: 'x-foo'
    })
    .toPromise();

  assert.fileContent('demo/index.html', '<x-foo></x-foo>');
});

test.serial('it throws an error when a component name is not provided', async (t) => {
  const promise = runDemoGenerator()
    .withArguments([ 'index' ])
    .toPromise();
  const error = await t.throws(promise);

  t.is(error.message, 'Must provide a component to display');
});

test.serial('it adds a link to the Webpack output file', async () => {
  await runDemoGenerator()
    .withArguments([ 'index' ])
    .withPrompts({ componentTagName: 'x-some-component-name' })
    .toPromise();

  assert.fileContent('demo/index.html', '/dist/x-foo.bundle.js');
});

test.serial('it falls back to the component name if it can\'t read from webpack', async() => {
  await helpers.run(path.join(__dirname, '../../generators/demo'))
    .withArguments([ 'index' ])
    .withPrompts({ componentTagName: 'x-foo' })
    .toPromise();

  assert.fileContent('demo/index.html', '/dist/x-foo.bundle.js');
});

test.serial('if the file name given has an extension, `.html` is not added', async () => {
  await runDemoGenerator()
    .withArguments([ 'index.foo' ])
    .withPrompts({ componentTagName: 'x-foo' })
    .toPromise();

  assert.file('demo/index.foo');
});

test('if the file name has a slash, it is created as a subdirectory', async () => {
  await runDemoGenerator()
    .withArguments([ 'foo/index' ])
    .withPrompts({ componentTagName: 'x-foo' })
    .toPromise();

  assert.file('demo/foo/index.html');
});

test.serial('a file name with a slash and a custom extension', async () => {
  await runDemoGenerator()
    .withArguments([ 'foo/index.bar' ])
    .withPrompts({ componentTagName: 'x-foo' })
    .toPromise();

  assert.file('demo/foo/index.bar');
});
