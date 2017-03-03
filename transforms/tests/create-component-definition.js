import test from 'ava';
import { createComponentDefinition } from '../import-component';

test('it can create an import statement', (t) => {
  const def = createComponentDefinition('Foo');

  t.is(def.type, 'ExpressionStatement');

  t.is(def.expression.callee.type, 'Identifier');
  t.is(def.expression.callee.name, 'define');

  t.is(def.expression.arguments[0].type, 'Identifier');
  t.is(def.expression.arguments[0].name, 'Foo');
});
