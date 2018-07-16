import { Plugin } from 'cordova';

let exec: any;

export default class Track extends Plugin {
  constructor(cordova: any) {
    super(cordova);
    exec = cordova.exec;
  }

  public screen(type: string) {
    type = String(type);
    exec(() => {  }, () => {  }, 'CDVTrack', 'trackScreen', [type, '']);
  }

  public event(type: string, param: any = '') {
    type = String(type);
    exec(() => {  }, () => {  }, 'CDVTrack', 'trackEvent', [type, param]);
  }
}
