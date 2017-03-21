import test from 'ava';
import { createModuleNameFromLocale as c } from '../../../transforms/import-translation'

test('it does nothing with a locale without a dash', (t) => {
  t.is(c('en'), 'en');
});

test('it turns a locale with a dash into a camelCase module', (t) => {
  t.is(c('en-US'), 'enUS');
});
