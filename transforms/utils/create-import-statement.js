const recast = require('recast');
const { types: { builders } } = recast;

/**
 * Creates a Recast import statement
 *
 * @param {string} componentName the name of the default import
 * @param {string} componentLocation the place to import the component from
 * @return {ImportDeclaration}
 */
function createImportStatement(componentName, componentLocation) {
  const imports = componentName
    ? [
        builders.importDefaultSpecifier(
          builders.identifier(componentName)
        )
      ]
    : [];

  return builders.importDeclaration(
    imports,
    builders.literal(componentLocation)
  );
}

module.exports = createImportStatement;
