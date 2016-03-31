var fs = require('fs');
var path = require('path');
var loaderUtils = require('loader-utils');
var sweet = require('sweet.js/dist/sweet');

// var moduleCache = {};

// let resolve = (loader, path) => new Promise((res, rej) =>
//   loader.resolve(loader.context, path, (err, resp) =>
//     err ? rej(err) : res(resp)
//   ));

module.exports = function(source) {
  var loader = this;
  loader.async();
  var config = loaderUtils.parseQuery(loader.query);
  var loaderRequest = loaderUtils.getCurrentRequest(this);
  var fileRequest = loaderUtils.getRemainingRequest(this);
  // console.log('fileRequest', fileRequest);
  config.modules = config.modules || [];

  var modules = config.modules;
//   Promise.all(config.modules.map((mod) =>
//     moduleCache[mod] || resolve(loader, mod).then((res) => {
//       moduleCache[mod] = sweet.loadNodeModule(process.cwd(), res);
//       return moduleCache[mod];
//     });
//   )).then((modules) => {
//     if(config.readers) {
//       return Promise.all(config.readers.map((mod) => resolve(loader, mod).then((res) => sweet.setReadtable(res)))).then(() => modules);
//     }
//     return modules;
//   }).then((modules) => {

// console.log('source', source);
// console.log('modules', modules);
var macros = modules.map(path => fs.readFileSync(path, {encoding: 'utf8'})).join('\n');
// console.log('macros', macros);

    var result = sweet.compile(macros + source, {
      // modules: modules,
      //sourceMap: true,
      //filename: fileRequest,
      //readableNames: !!config.readableNames,

      // // used by sjs:
      cwd: path.dirname(fs.realpathSync(fileRequest)),
      transform: require('babel-core').transform,
      moduleResolver: require('sweet.js/dist/node-module-resolver').default,
      moduleLoader: require('sweet.js/dist/node-module-loader').default,
    });
    // // console.log('result', result);
    // console.log('result.code', result.code);

    // loader.cacheable && loader.cacheable();
    // fs.writeFileSync(argv.out, output.code, 'utf8');
    // fs.writeFileSync(fileRequest, result.code, 'utf8');
    loader.callback(null, result.code, result.sourceMap);
    // console.log('done');

//   }).catch(function(err) {
//     loader.callback(err);
//   });
};
