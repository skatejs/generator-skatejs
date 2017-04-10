import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

test.serial('it generates a new translation file based on an argument', async () => {
  await helpers.run(path.join(__dirname, '../../generators/translation'))
    .withArguments([ 'en-US' ])
    .toPromise();

  assert.file('translations/en-US.yml');
});

test.serial('it generates a new translation file based on an a prompt', async () => {
  await helpers.run(path.join(__dirname, '../../generators/translation'))
    .withPrompts({ locale: 'en-US' })
    .toPromise();

  assert.file('translations/en-US.yml');
});

test.serial('it throws an error if the translation name is not provided', async (t) => {
  const promise = helpers.run(path.join(__dirname, '../../generators/translation'))
    .toPromise();
  const error = await t.throws(promise);

  t.is(error.message, 'A locale name must be provided');
});

test.serial('it generates the translation helper if it does not exist', async () => {
  await helpers.run(path.join(__dirname, '../../generators/translation'))
    .withArguments([ 'en-US' ])
    .toPromise();

  assert.fileContent('src/util/translation.js', 'export default function createTranslationHelper');
  assert.fileContent('src/util/translation.js', "import enUS from '../../translations/en-US.yml';");
  assert.fileContent('src/util/translation.js', "translationMap.set('en-US', enUS);");
});

test.serial('it imports new translation files to the helper without overwriting it', async () => {
  await helpers.run(path.join(__dirname, '../../generators/translation'))
    .inTmpDir((dir) => {
      const filePath = path.join(dir, 'src/util/translation.js');
      fs.ensureFileSync(filePath);
      fs.writeFileSync(filePath, `
        import enUS from '../../translations/en-US.yml';

        const translationMap = new Map();
        translationMap.set('en-US', enUS);
      `);
    })
    .withArguments([ 'fr-CA' ])
    .toPromise();

  // Check that the old config was not removed, and that the new translation was added
  assert.fileContent('src/util/translation.js', "import enUS from '../../translations/en-US.yml';");
  assert.fileContent('src/util/translation.js', "translationMap.set('en-US', enUS);");
  assert.fileContent('src/util/translation.js', "import frCA from '../../translations/fr-CA.yml';");
  assert.fileContent('src/util/translation.js', "translationMap.set('fr-CA', frCA);");
});
