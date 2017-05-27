import test from 'ava';
import { stripIndent } from 'common-tags';
import transform from '../../../transforms/import-component';

test('adding a module to an empty file', (t) => {
  const output = transform('', './components/my-component/component.js');

  const fixture = stripIndent`
    import './components/my-component/component.js';
  `;

  t.is(output, fixture);
});

test('adding a module to a file that already has some', (t) => {
  const output = transform(stripIndent`
    import 'skatejs-web-componnts';
    import './components/first-component/component.js';
  `, './components/second-component/component.js');

  const fixture = stripIndent`
    import 'skatejs-web-componnts';
    import './components/first-component/component.js';
    import './components/second-component/component.js';
  `;

  t.is(output, fixture);
});

test('adding a mmodule to a file with non-import code', (t) => {
  const output = transform(stripIndent`
    const foo = 'bar';
  `, './components/x-foo/component.js');

  const fixture = stripIndent`
    import './components/x-foo/component.js';
    const foo = 'bar';
  `;

  t.is(output, fixture);
});

test('adding a mmodule to a file with imports and other stuff', (t) => {
  const output = transform(stripIndent`
    import Foo from 'bar';
    const foo = 'bar';
  `, './components/x-foo/component.js');

  const fixture = stripIndent`
    import Foo from 'bar';
    import './components/x-foo/component.js';
    const foo = 'bar';
  `;

  t.is(output, fixture);
});
