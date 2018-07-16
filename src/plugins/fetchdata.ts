import { Plugin } from 'fe-cordova';

let exec: any;

export default class FetchData extends Plugin {
  constructor(cordova: any) {
    super(cordova);
    exec = cordova.exec;
  }

  public fetchDataFromNative(successFn: () => void, errorFn: () => void) {
    const setStore = (data: any) => {
      try {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            window.localStorage.setItem(key, data[key]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    const success = () => {
      setStore.apply(null, arguments);
      successFn.apply(null, arguments);
    };

    if (successFn) {
      exec(success, errorFn, 'LocalDataShare', 'acquire', []);
      return;
    }

    return new Promise((resolve, reject) => {
      exec(resolve, reject, 'LocalDataShare', 'acquire', []);
    })
      .then((data) => {
        setStore(data);
        return data;
      });
  }

}
