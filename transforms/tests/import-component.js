import test from 'ava';
import { stripIndent } from 'common-tags';
import transform from '../import-component';

test('adding a module to an empty file', (t) => {
  const output = transform(stripIndent`
    const { define } = skatejs;
  `, 'MyComponent', './components/my-component/component.js');

  const fixture = stripIndent`
    import MyComponent from "./components/my-component/component.js";
    const { define } = skatejs;
    define(MyComponent);
  `;

  t.is(output, fixture);
});

test('adding a module to a file that already has one', (t) => {
  const output = transform(stripIndent`
    import MyComponent from 'foo';
    const { define } = skatejs;
    define(MyComponent);
  `, 'MyOtherComponent', './components/my-component/component.js');

  const fixture = stripIndent`
    import MyComponent from 'foo';
    import MyOtherComponent from "./components/my-component/component.js";
    const { define } = skatejs;
    define(MyComponent);
    define(MyOtherComponent);
  `;

  t.is(output, fixture);
});
