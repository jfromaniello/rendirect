var ejs = require('ejs');
var fs = require('fs');
var defaultTemplate = ejs.compile(fs.readFileSync(__dirname + '/defaultTemplate.ejs').toString());

module.exports = function (options) {
  return function (req, res, next) {
    res.rendirect = function (rendirOptions) {

      if (!rendirOptions.url) {
        throw new Error('rendirect: url is required');
      }

      rendirOptions.wait = typeof rendirOptions.wait === 'undefined' ? 5 : rendirOptions.wait;
      rendirOptions.message = rendirOptions.message || ('Redirecting to ' + rendirOptions.url);

      if (options && options.view){
        return res.render(options.view, rendirOptions);
      }

      res.set('Content-Type', 'text/html');
      res.send(defaultTemplate(rendirOptions));
    };
    next();
  };
};