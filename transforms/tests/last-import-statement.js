import test from 'ava';
import { lastImportStatement } from '../import-component';
import { parse } from 'recast';

test('it returns nothing when there are no import statements', (t) => {
  const ast = parse(`
    const { define } = skatejs;
  `);
  const lastImport = lastImportStatement(ast);

  t.is(lastImport, undefined);
});

test('it returns the import statement when there is only one', (t) => {
  const ast = parse(`
    import Foo from 'foo';
  `);
  const lastImport = lastImportStatement(ast);

  t.truthy(lastImport);
  t.is(lastImport.specifiers[0].local.name, 'Foo');
});

test('it returns the last import statement when there are multiple', (t) => {
  const ast = parse(`
    import Foo from 'foo';
    import Bar from 'bar';
  `);
  const lastImport = lastImportStatement(ast);

  t.truthy(lastImport);
  t.is(lastImport.specifiers[0].local.name, 'Bar');
});
