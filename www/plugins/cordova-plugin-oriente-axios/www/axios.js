'use strict';

cordova.define("cordova-plugin-oriente-axios.axios", function (require, exports, module) {
  var exec = require('cordova/exec');

  exports.request = function (options) {
    var cloneOptions = Object.assign({}, options);
    var url = cloneOptions.url,
        method = cloneOptions.method,
        params = cloneOptions.params,
        data = cloneOptions.data;

    delete cloneOptions.url;
    delete cloneOptions.method;
    delete cloneOptions.params;
    delete cloneOptions.data;
    method = method.toUpperCase();
    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', [method || 'GET', url, method === 'GET' ? params : data, options]);
    });
  };

  exports.get = function (url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['GET', url, params, options]);
    });
  };

  exports.delete = function (url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['GET', url, params, options]);
    });
  };

  exports.head = function (url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['GET', url, params, options]);
    });
  };

  exports.post = function (url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['POST', url, data, options]);
    });
  };

  exports.put = function (url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    options.data = data;
    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['POST', url, data, options]);
    });
  };

  exports.patch = function (url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    options.data = data;
    return new Promise(function (resolve, reject) {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['POST', url, data, options]);
    });
  };

  exports.all = function () {
    var iterable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return Promise.all(iterable);
  };

  exports.race = function () {
    var iterable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return Promise.race(iterable);
  };
});
