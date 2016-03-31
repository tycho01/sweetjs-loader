var path = require('path');
var loader_path = path.join(__dirname, '../index');
var macro_path = path.join(__dirname, './macros.sjs');

module.exports = {
  context: __dirname,
  // entry: path.join(__dirname, 'basic.js'),
  entry: {
    basic: './basic.js',
    remote: './remote.js',
  },
  output: {
    // filename: BUNDLE_PATH,
    path: __dirname,
    filename: '[name].out.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: loader_path + '?modules[]=' + macro_path,
      }
    ]
  }
}
