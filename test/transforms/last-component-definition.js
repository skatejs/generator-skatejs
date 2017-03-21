import test from 'ava';
import { lastComponentDefinition } from '../../transforms/import-component';
import { parse } from 'recast';

test('it returns nothing when there are no component definitions', (t) => {
  const ast = parse(`
    const { define } = skatejs;
  `);
  const lastDef = lastComponentDefinition(ast);

  t.is(lastDef, undefined);
});

test('it returns the expression when there is only one', (t) => {
  const ast = parse(`
    define(MyComponent);
  `);
  const lastDef = lastComponentDefinition(ast);

  t.truthy(lastDef);
  t.is(lastDef.expression.arguments[0].name, 'MyComponent');
});

test('it returns the expression when there are multiple', (t) => {
  const ast = parse(`
    define(MyComponent);
    define(MyOtherComponent);
  `);
  const lastDef = lastComponentDefinition(ast);

  t.truthy(lastDef);
  t.is(lastDef.expression.arguments[0].name, 'MyOtherComponent');
});

test('it does not consider expression statements besides `define`', (t) => {
  const ast = parse(`
    define(MyComponent);
    define(MyOtherComponent);
    someOtherFunction(someOtherSimilarFunctionArgument);
  `);
  const lastDef = lastComponentDefinition(ast);

  t.truthy(lastDef);
  t.is(lastDef.expression.arguments[0].name, 'MyOtherComponent');
});
