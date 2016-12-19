var css = require('css');
module.exports = function(source) {
  this.cacheable();
  var result = {};
  css.parse(source).stylesheet.rules
    .filter(rule => rule.selectors && rule.selectors.some(sel => sel === ':root'))
    .forEach(rule => rule.declarations
      .filter(decl => decl.type === 'declaration' && decl.property.indexOf('--') === 0)
      .forEach(decl => result[decl.property] = decl.value));
  return 'module.exports = ' + JSON.stringify(result);
};
