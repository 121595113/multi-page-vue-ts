import { Plugin } from 'cordova';

let CDV: any;
export default class Device extends Plugin {
  constructor(cordova: any) {
    super(cordova);
    CDV = cordova;
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.cordova = null;
    this.model = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.serial = null;
  }
  public cordovaReady() {
    this.getInfo((info: any) => {
      // ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
      // TODO: CB-5105 native implementations should not return info.cordova
      this.available = true;
      this.platform = info.platform;
      this.version = info.version;
      this.uuid = info.uuid;
      this.cordova = CDV.version;
      this.model = info.model;
      this.isVirtual = info.isVirtual;
      this.manufacturer = info.manufacturer || 'unknown';
      this.serial = info.serial || 'unknown';
      this.notify('cordovaInfoReady', []);
    }, () => {
      this.available = false;
    });
  }
  public onCordovaInfoReady() {

  }
  public getInfo(successCallback: (info?: any) => void, errorCallback: () => void) {
    CDV.exec(successCallback, errorCallback, 'Device', 'getDeviceInfo', []);
  }

}
