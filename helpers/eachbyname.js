/**
 * Each by name handlebars helper file.
 */

// Register a handlebars helper block.
module.exports.register = function (Handlebars, options)  {
  Handlebars.registerHelper('eachByName', function(context,options){
    var output = '';
    var contextSorted = context.concat()
    .sort(function(a,b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    for(var i = 0, j = contextSorted.length; i < j; i++) {
      output += options.fn(contextSorted[i]);
    }
    return output;
  });
};
