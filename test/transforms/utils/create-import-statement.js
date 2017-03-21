import test from 'ava';
import createImportStatement from '../../../transforms/utils/create-import-statement';

test('it can create an import statement', (t) => {
  const importStatement = createImportStatement('Foo', 'bar');

  t.is(importStatement.type, 'ImportDeclaration');
  t.is(importStatement.specifiers[0].local.name, 'Foo');
  t.is(importStatement.source.value, 'bar');
});
