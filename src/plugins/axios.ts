import { Plugin } from 'cordova';

let exec: any;
export default class Axios extends Plugin {
  constructor(cordova: any) {
    super(cordova);
    exec = cordova.exec;
  }

  public request(options: any) {
    const cloneOptions = Object.assign({}, options);
    const url = cloneOptions.url;
    let method = cloneOptions.method;
    let params = cloneOptions.params;
    const data = cloneOptions.data;

    delete cloneOptions.url;
    delete cloneOptions.method;
    delete cloneOptions.params;
    delete cloneOptions.data;
    method = method.toUpperCase() || 'GET';
    params = method === 'GET' ? params : data;
    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', [method, url, params, options]);
    });
  }

  public get(url: string) {
    const params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['GET', url, params, options]);
    });
  }

  public delete(url: string) {
    const params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['GET', url, params, options]);
    });
  }

  public head(url: string) {
    const params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['GET', url, params, options]);
    });
  }

  public post(url: string) {
    const data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['POST', url, data, options]);
    });
  }

  public put(url: string) {
    const data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    options.data = data;
    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['POST', url, data, options]);
    });
  }

  public patch(url: string) {
    const data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    options.data = data;
    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'CDVNetworking', 'sendRequest', ['POST', url, data, options]);
    });
  }

  public all() {
    const iterable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return Promise.all(iterable);
  }

  public race() {
    const iterable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return Promise.race(iterable);
  }
}
