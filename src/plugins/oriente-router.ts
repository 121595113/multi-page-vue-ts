import { Plugin } from 'fe-cordova';

let exec: any;

export default class Router extends Plugin {
  constructor(cordova: any) {
    super(cordova);
    exec = cordova.exec;
  }

  public push(location: any) {
    const success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    const url = location.path.replace(/^(\/@|@)/, '');
    const query = location.query || {};
    exec(success, error, 'CDVNavigator', 'routeToPage', [url, query]);
  }

  public back(success: () => void, error: () => void) {
    exec(success, error, 'CDVNavigator', 'routeToPage', ['oriente://cashalo.com/goback', '']);
  }

  public isNative() {
    const url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return (/^\/@.*:/.test(url));
  }
}
