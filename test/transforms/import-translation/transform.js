import test from 'ava';
import { stripIndent } from 'common-tags';
import transform from '../../../transforms/import-translation';

test('importing the initial translation', (t) => {
  const source = stripIndent`
    const translationMap = new Map();
  `;
  const output = transform(source, 'en-US', 'translations/en-US.yml');
  const fixture = stripIndent`
    import enUS from 'translations/en-US.yml';
    const translationMap = new Map();
    translationMap.set('en-US', enUS);
  `;

  t.is(output, fixture);
});

test('importing additional translations', (t) => {
  const source = stripIndent`
    import enUS from 'translations/en-US.yml';
    const translationMap = new Map();
    translationMap.set('en-US', enUS);
  `;
  const output = transform(source, 'fr-CA', 'translations/fr-CA.yml');
  const fixture = stripIndent`
    import enUS from 'translations/en-US.yml';
    import frCA from 'translations/fr-CA.yml';
    const translationMap = new Map();
    translationMap.set('en-US', enUS);
    translationMap.set('fr-CA', frCA);
  `;

  t.is(output, fixture);
});

test('aborts transformations if the translationn map cannot be found', (t) => {
  const source = stripIndent`
    const foo = 'bar';
  `;
  const output = transform(source, 'en-US', 'translations/en-US.yml');
  t.is(output, source)
});
