import test from 'ava';
import { createTranslationDefinition } from '../../../transforms/import-translation.js';

test('can create an expression that defines a new translation', (t) => {
  const translationDef = createTranslationDefinition('en-US', 'enUS');
  const { expression } = translationDef;

  t.is(expression.type, 'CallExpression');

  const { callee } = expression;

  t.is(callee.type, 'MemberExpression');
  t.is(callee.object.type, 'Identifier');
  t.is(callee.object.name, 'translationMap');
  t.is(callee.property.type, 'Identifier');
  t.is(callee.property.name, 'set');

  const { arguments: args } = expression;
  const [ locale, module ] = args;

  t.is(args.length, 2);
  t.is(locale.type, 'Literal');
  t.is(locale.value, 'en-US');
  t.is(module.type, 'Identifier');
  t.is(module.name, 'enUS');
});
