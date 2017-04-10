'use strict';

const recast = require('recast');
const { parse, types: { builders }, print } = recast;

const lastImportStatement = require('./utils/last-import-statement');
const createImportStatement = require('./utils/create-import-statement');

/**
 * Turns a dash-erized locale name into a camelCase module name
 *
 * @param {string} locale
 * @return {string} the name for the module
 */
function createModuleNameFromLocale(locale) {
  return locale.split('-')
    .map((part, index) => index === 0 ? part : part.toUpperCase())
    .join('');
}

function findTranslationMap(ast) {
  return ast.program.body
    .filter(({ type }) => type === 'VariableDeclaration')
    .find(({ declarations }) => {
      return declarations.find(({ id: { name } }) => name === 'translationMap');
    });
}

function findTranslationDefinition(ast) {
  return ast.program.body
    .filter(({ type }) => type === 'ExpressionStatement')
    .filter(({ expression }) => expression.type === 'CallExpression')
    .filter(({ expression: { callee: { object: { type, name } } } }) => type === 'Identifier' && name === 'translationMap')
    .reduce((prev, lastExpression) => lastExpression, undefined);
}

function createTranslationDefinition(locale, moduleName) {
  return builders.expressionStatement(
    builders.callExpression(
      builders.memberExpression(
        builders.identifier('translationMap'),
        builders.identifier('set')
      ),
      [
        builders.literal(locale),
        builders.identifier(moduleName)
      ]
    )
  );
}

function importTranslation(source, locale, moduleLocation) {
  const ast = parse(source);
  const moduleName = createModuleNameFromLocale(locale);
  const importStatement = createImportStatement(moduleName, moduleLocation);

  const translationMapNode = findTranslationMap(ast);
  if (!translationMapNode) {
    return print(ast, { quote: 'single' }).code;
  }

  const lastImport = lastImportStatement(ast);
  if (lastImport) {
    const index = ast.program.body.indexOf(lastImport);
    ast.program.body.splice(index + 1, 0, importStatement);
  } else {
    ast.program.body.unshift(importStatement);
  }

  // Find insertion point for translation definition
  let newTranslationDefinitionAnchor = translationMapNode;
  const lastTranslationDefinition = findTranslationDefinition(ast);
  const newTranslationDefinition = createTranslationDefinition(locale, moduleName);

  if (lastTranslationDefinition) {
    newTranslationDefinitionAnchor = lastTranslationDefinition;
  }

  const index = ast.program.body.indexOf(newTranslationDefinitionAnchor);
  ast.program.body.splice(index + 1, 0, newTranslationDefinition);

  return print(ast, { quote: 'single' }).code;
}

module.exports = importTranslation;
module.exports.createModuleNameFromLocale = createModuleNameFromLocale;
module.exports.findTranslationMap = findTranslationMap;
module.exports.findTranslationDefinition = findTranslationDefinition;
module.exports.createTranslationDefinition = createTranslationDefinition;
