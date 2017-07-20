import test from 'ava';
import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

test.serial('imports the class name correctly', async () => {
  await helpers.run(path.join(__dirname, '../../../generators/component'))
    .withPrompts({ componentName: 'x-foo' })
    .toPromise();

  assert.fileContent('src/x-foo/story.js', "import XFoo from './component.js';");
  assert.fileContent('src/x-foo/story.js', "define(XFoo);");
});
