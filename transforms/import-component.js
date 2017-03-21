'use strict';

const recast = require('recast');
const { parse, types: { builders }, print } = recast;

const lastImportStatement = require('./utils/last-import-statement');
const createImportStatement = require('./utils/create-import-statement');

function lastComponentDefinition(ast) {
  return ast.program.body
    .filter(({ type }) => type === 'ExpressionStatement')
    .filter(({ expression: { callee } }) => callee.type === 'Identifier' && callee.name === 'define')
    .reduce((previous, nextDec) => nextDec, undefined);
}

function createComponentDefinition(componentName) {
  return builders.expressionStatement(
    builders.callExpression(
      builders.identifier('define'),
      [
        builders.identifier(componentName)
      ]
    )
  );
}

/**
 * @param {string} source the original file content
 * @param {string} componentName the name of the new component
 * @param {string} componentLocation where to import the new component from
 * @return {string} the new file content
 */
function importComponent(source, componentName, componentLocation) {
  const ast = parse(source);
  const importStatement = createImportStatement(componentName, componentLocation);
  const componentDefinition = createComponentDefinition(componentName);

  const lastImport = lastImportStatement(ast);
  if (lastImport) {
    const index = ast.program.body.indexOf(lastImport);
    ast.program.body.splice(index + 1, 0, importStatement);
  } else {
    ast.program.body.unshift(importStatement);
  }

  const lastDef = lastComponentDefinition(ast);
  if (lastDef) {
    const index = ast.program.body.indexOf(lastDef);
    ast.program.body.splice(index + 1, 0, componentDefinition);
  } else {
    ast.program.body.push(componentDefinition);
  }

  return print(ast).code;
}

module.exports = importComponent;
module.exports.lastImportStatement = lastImportStatement;
module.exports.lastComponentDefinition = lastComponentDefinition;
module.exports.createImportStatement = createImportStatement;
module.exports.createComponentDefinition = createComponentDefinition;
