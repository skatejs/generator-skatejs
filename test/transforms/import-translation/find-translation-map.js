import test from 'ava';
import { findTranslationMap } from '../../../transforms/import-translation';
import { parse } from 'recast';

function process(string) {
  return findTranslationMap(parse(string));
}

function variableKindMacro(t, kind) {
  const output = process(`
    ${kind} translationMap = new Map();
  `);

  t.is(output.type, 'VariableDeclaration');
}
variableKindMacro.title = (_, kind) => `can find a translation defined using ${kind}`;

test(variableKindMacro, 'const');
test(variableKindMacro, 'let');
test(variableKindMacro, 'var');

test('can find a translation map defined with other variables', (t) => {
  const output = process(`
    let translationMap = new Map(),
        foo = 'bar';
  `);

  t.is(output.type, 'VariableDeclaration');
});

test('returns `undefined` if the map does not exist', (t) => {
  const output = process(`
    const foo = 'bar';
  `);

  t.is(output, undefined);
});
