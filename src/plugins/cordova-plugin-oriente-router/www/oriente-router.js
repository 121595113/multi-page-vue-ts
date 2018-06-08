'use strict';

cordova.define("cordova-plugin-oriente-router.router", function (require, exports, module) {
  var exec = require('cordova/exec');
  var utils = require('cordova/utils');

  exports.push = function (location) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var url = location.path.replace(/^(\/@|@)/, '');
    var query = location.query;
    exec(success, error, 'CDVNavigator', 'routeToPage', [url, query]);
  };

  exports.back = function (success, error) {
    exec(success, error, 'CDVNavigator', 'routeToPage', ['oriente://cashalo.com/goback', '']);
  };

  exports.isNative = function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return (/^\/@.*:/.test(url));
  };
});

