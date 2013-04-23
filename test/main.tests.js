var expect    = require('chai').expect;
var jsdom     = require('jsdom');
var rendirect = require('../');

describe('rendirects!', function () {
  it('should add the rendirect function to the request object', function () {
    var res = {};
    
    rendirect()({}, res, function(){});
    
    expect(res.rendirect)
      .to.be.a('function');
  });

  it('should call next', function (done) {
    rendirect()({}, {}, done);
  });

  describe('when rendirecting', function () {
    var headers, content;

    beforeEach(function () {
      headers={};
      content='';
      
      var req = {};
      
      var res = {
        set: function (k, h) {
          headers[k] = h;
        },
        send: function (c) {
          content = c;
        } 
      };

      rendirect()(req, res, function(){});

      res.rendirect({ wait: 5, message: 'Jose is redirecting you', url: 'http://google.com'});
    });

    it('should put the Content-Type', function () {
      expect(headers['Content-Type']).to.equal('text/html');
    });

    it('should contain the meta tag', function () {
      jsdom.env(
        content,
        ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
          var meta = window.$('meta')[0];
          expect(meta.attr('http-equiv')).to.equal('refresh');
          expect(meta.attr('url').split(';')[0]).to.equal('5');
          expect(meta.attr('url').split(';')[1]).to.equal('URL=http://google.com');
        }
      );
    });

    it('should contain the message', function () {
      expect(content.indexOf('Jose is redirecting you')).to.not.equal(-1);
    });

  }); 


  describe('when using custom view', function () {
    var viewName, locals;

    beforeEach(function () {
      viewName={};
      locals='';
      
      var req = {};
      
      var res = {
        render: function (vn, ls) {
          locals = ls;
          viewName = vn;
        } 
      };

      rendirect({view: 'myrendirect'})(req, res, function(){});

      res.rendirect({ wait: 5, message: 'Jose is redirecting you', url: 'http://google.com'});
    });

    it('should work', function () {
      expect(viewName).to.equal('myrendirect');
      expect(locals.wait).to.equal(5);
      expect(locals.message).to.equal('Jose is redirecting you');
      expect(locals.url).to.equal('http://google.com');
    });

  }); 

});