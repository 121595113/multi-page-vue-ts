cordova.define('cordova-plugin-track.track', function (require, exports, module) {
    var exec = require('cordova/exec');
    exports.screen = function (type) {
      type = String(type);
      return new Promise((resolve, reject) => {
        exec(resolve, reject, 'CDVTrack', 'trackScreen', [type, ''])
      });
    };
    exports.event = function (type, param) {
      type = String(type);
      param = param || '';
      return new Promise((resolve, reject) => {
        exec(resolve, reject, 'CDVTrack', 'trackEvent', [type, param])
      });
    };
});
