import { Plugin } from 'cordova';

const namedColors: any = {
  black: '#000000',
  darkGray: '#A9A9A9',
  lightGray: '#D3D3D3',
  white: '#FFFFFF',
  gray: '#808080',
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  cyan: '#00FFFF',
  yellow: '#FFFF00',
  magenta: '#FF00FF',
  orange: '#FFA500',
  purple: '#800080',
  brown: '#A52A2A',
};
let exec: any;

export default class StatusBar extends Plugin {
  constructor(cordova: any) {
    super(cordova);
    this.isVisible = true;
    exec = cordova.exec;
    const that = this;

    window.setTimeout(() => {
      exec((res: any) => {
        if (typeof res === 'object') {
          if (res.type === 'tap') {
            cordova.fireWindowEvent('statusTap');
          }
        } else {
          that.isVisible = res;
        }
      }, null, 'StatusBar', '_ready', []);
    }, 0);
  }

  public overlaysWebView(doOverlay: string) {
    exec(null, null, 'StatusBar', 'overlaysWebView', [doOverlay]);
  }

  public styleDefault() {
    // dark text ( to be used on a light background )
    exec(null, null, 'StatusBar', 'styleDefault', []);
  }

  public styleLightContent() {
    // light text ( to be used on a dark background )
    exec(null, null, 'StatusBar', 'styleLightContent', []);
  }

  public styleBlackTranslucent() {
    // #88000000 ? Apple says to use lightContent instead
    exec(null, null, 'StatusBar', 'styleBlackTranslucent', []);
  }

  public styleBlackOpaque() {
    // #FF000000 ? Apple says to use lightContent instead
    exec(null, null, 'StatusBar', 'styleBlackOpaque', []);
  }

  public backgroundColorByName(colorname: string) {
    return this.backgroundColorByHexString(namedColors[colorname]);
  }

  public backgroundColorByHexString(hexString: string) {
    if (hexString.charAt(0) !== '#') {
      hexString = '#' + hexString;
    }

    if (hexString.length === 4) {
      const split = hexString.split('');
      hexString = '#' + split[1] + split[1] + split[2] + split[2] + split[3] + split[3];
    }

    exec(null, null, 'StatusBar', 'backgroundColorByHexString', [hexString]);
  }

  public hide() {
    exec(null, null, 'StatusBar', 'hide', []);
    this.isVisible = false;
  }

  public show() {
    exec(null, null, 'StatusBar', 'show', []);
    this.isVisible = true;
  }
}
