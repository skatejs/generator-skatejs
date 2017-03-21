import test from 'ava';
import { findTranslationDefinition } from '../../../transforms/import-translation.js';
import { parse } from 'recast';

function process(string) {
  return findTranslationDefinition(parse(string));
}

test('returns a translation definition', (t) => {
  const output = process(`
    translationMap.set('en-US', enUS);
  `);

  t.deepEqual(output.expression.arguments.map((arg) => arg.value || arg.name), [ 'en-US', 'enUS' ]);
});

test('returns the last translation definition if there are multiple', (t) => {
  const output = process(`
    translationMap.set('en-US', enUS);
    translationMap.set('ca-FR', caFR);
  `);

  t.deepEqual(output.expression.arguments.map((arg) => arg.value || arg.name), [ 'ca-FR', 'caFR' ]);
});

test('returns `undefined` if there are none', (t) => {
  const output = process(`
    const foo = 'bar';
  `);

  t.is(output, undefined);
});
