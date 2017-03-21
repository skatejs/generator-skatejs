function lastImportStatement(ast) {
  return ast.program.body
    .filter(({ type }) => type === 'ImportDeclaration')
    .reduce((previous, nextImport) => nextImport, undefined);
}

module.exports = lastImportStatement;
