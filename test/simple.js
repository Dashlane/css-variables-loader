/* eslint no-eval: 0 */
var test = require('ava');
var cssVariableLoader = require('..');

var loader = cssVariableLoader.bind({ cacheable: function(){} });

var check = function(name, css, result){
    test(name, function(t){
        var module = { exports: {} };
        eval(loader(css));
        t.same(module.exports, result);
    });
};

check('should handle a simple variable',
    ':root { --theme: red }',
    { '--theme': 'red' })
check('should handle multiple variables',
    ':root { --theme: red; --accent: blue }',
    { '--accent': 'blue', '--theme': 'red' })
check('should handle multiple declarations',
    ':root { --theme: red } :root { --accent: blue }',
    { '--accent': 'blue', '--theme': 'red' })
check('should not import non-variables',
    ':root { color: red }',
    {})
check('should only import from :root',
    ':hover { --theme: red }',
    {})
check('should import from :root among multiple selectors',
    ':hover, :root { --theme: red }',
    { '--theme': 'red' })
check('should not break when there is a comment',
  ':root { --theme: red; /* important info */ --accent: blue }',
  { '--accent': 'blue', '--theme': 'red' })
