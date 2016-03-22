// var sweet = require('sweet.js');
var sweet = require('sweet.js/dist/sweet');
var path = require('path');
// var RSVP = require('rsvp');
var loaderUtils = require('loader-utils');
var fs = require('fs');

// var moduleCache = {};

// function resolve(loader, filepath) {
//   var promise = new RSVP.Promise(function(resolve, reject) {
//     loader.resolve(loader.context, filepath, function(err, res) {
//       if(err) {
//         reject(err);
//       }
//       else {
//         resolve(res);
//       }
//     });
//   });

//   return promise;
// }

module.exports = function(source) {
  var loader = this;
  loader.async();
  var config = loaderUtils.parseQuery(loader.query);
  var loaderRequest = loaderUtils.getCurrentRequest(this);
//   console.log('loaderRequest', loaderRequest);
  var fileRequest = loaderUtils.getRemainingRequest(this);
//   console.log('fileRequest', fileRequest);
  config.modules = config.modules || [];

  var modules = config.modules;
//   RSVP.all(config.modules.map(function(mod) {
//     if(moduleCache[mod]) {
//       return moduleCache[mod];
//     }
//     return resolve(loader, mod).then(function(res) {
//       moduleCache[mod] = sweet.loadNodeModule(process.cwd(), res);
//       return moduleCache[mod];
//     });
//   })).then(function(modules) {
//     if(config.readers) {
//       return RSVP.all(config.readers.map(function(mod) {
//         return resolve(loader, mod).then(function(res) {
//           sweet.setReadtable(res);
//         })
//       })).then(function() {
//         return modules;
//       });
//     }
//     return modules;
//   }).then(function(modules) {

    var result = sweet.compile(source, {
      modules: modules,
      //sourceMap: true,
      //filename: fileRequest,
      //readableNames: !!config.readableNames,
      
      // // used by sjs:
      cwd: path.dirname(fs.realpathSync(fileRequest)),
      transform: require('babel-core').transform,
      moduleResolver: require('sweet.js/dist/node-module-resolver').default,
      moduleLoader: require('sweet.js/dist/node-module-loader').default,
    });
    // console.log('result', result);
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
