'use strict';

const recast = require('recast');
const { parse, print } = recast;

const lastImportStatement = require('./utils/last-import-statement');
const createImportStatement = require('./utils/create-import-statement');

/**
 * @param {string} source the original file content
 * @param {string} componentLocation where to import the new component from
 * @return {string} the new file content
 */
function importComponent(source, componentLocation) {
  const ast = parse(source);
  const importStatement = createImportStatement(undefined, componentLocation);

  const lastImport = lastImportStatement(ast);
  if (lastImport) {
    const index = ast.program.body.indexOf(lastImport);
    ast.program.body.splice(index + 1, 0, importStatement);
  } else {
    ast.program.body.unshift(importStatement);
  }

  return print(ast, { quote: 'single' }).code;
}

module.exports = importComponent;
module.exports.lastImportStatement = lastImportStatement;
