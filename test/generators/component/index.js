import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

test.serial('prompts for a component name if not given one', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  // Make sure that the initial component was created
  assert.file('src/x-foo/component.js');
  assert.file('src/x-foo/story.js');
  assert.file('src/x-foo/styles.scss');

  // Make sure that the file was added to the index
  assert.fileContent('src/index.js', "import './x-foo/component.js';");
});

test.serial('can be given a component name to generate', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withArguments([ 'x-foo' ])
    .toPromise();

  // Make sure that the initial component was created
  assert.file('src/x-foo/component.js');
  assert.file('src/x-foo/styles.scss');
});

test.serial('throws an error if no name is provided', async (t) => {
  const promise = helpers.run(path.join(__dirname, '../../../generators/component'))
    .toPromise();

  const error = await t.throws(promise);

  t.is(error.message, 'A component name must be provided');
});

test.serial('prevents creating components without a hyphen', async (t) => {
  const promise = helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'foo' })
    .toPromise();

  const error = await t.throws(promise);

  t.is(error.message, "The component name must include a hyphen, was 'foo'");
});

test.serial('registers the component with the correct name', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  assert.fileContent('src/x-foo/component.js', /return 'x-foo';/);
  assert.fileContent('src/x-foo/component.js', /Hello, world! I am x-foo!/);
});

test.serial('adds a class name for the component', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  assert.fileContent('src/x-foo/component.js', /export default class XFoo extends Component/);
  assert.fileContent('src/x-foo/component.js', /define\(XFoo\);/);
});

test.serial('makes a `describe` block with the right name', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  assert.file('test/components/x-foo-test.js');
  assert.fileContent('test/components/x-foo-test.js', "describe('x-foo component', function() {");
});

test.serial('generates the index file when one does not exist', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  assert.file('src/index.js');
});

test.serial('adds the new component to an existing index file', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .inTmpDir((dir) => {
      fs.copySync(path.join(__dirname, '../../../generators/component/templates/src'), path.join(dir, 'src'));
    })
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  // Make sure that the file was added to the index
  assert.fileContent('src/index.js', "import './x-foo/component.js';");

  assert.fileContent('src/index.js', "import 'skatejs-web-components';");
});
