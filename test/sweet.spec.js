var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var opts = require('./webpack.config.js');

describe('sweet-loader', () => {

  // beforeEach(() => {})

  it('should work', (done) => {
    var PATH = path.join(__dirname, 'basic.out.js');
    if (fs.existsSync(PATH)) fs.unlinkSync(PATH);

    webpack(opts, function(err, stats) {
    	expect(err).toBe(null);
      expect(fs.existsSync(PATH)).toBe(true);
    	var content = fs.readFileSync(PATH, {encoding: 'utf8'});
    	expect(content.indexOf('42') > -1).toBe(true);
    	expect(content.indexOf('id(')).toBe(-1);
    	done();
    });
  });

  it('even for remote files', (done) => {
    var PATH = path.join(__dirname, 'remote.out.js');
    if (fs.existsSync(PATH)) fs.unlinkSync(PATH);

    webpack(opts, function(err, stats) {
    	expect(err).toBe(null);
      expect(fs.existsSync(PATH)).toBe(true);
    	var content = fs.readFileSync(PATH, {encoding: 'utf8'});
    	expect(content.indexOf('35') > -1).toBe(true);
    	expect(content.indexOf('id(')).toBe(-1);
    	done();
    });
  });

});
