webpackJsonp([4],{eV92:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),i=(n("sVYa"),{render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]});var r=n("VU/8")({name:"App",data:function(){return{}}},i,!1,function(e){n("qPAX")},null,null).exports,a=n("/ocq");o.default.use(a.a);var d=new a.a({routes:[{path:"/",name:"LandingPage",component:function(){return n.e(0).then(n.bind(null,"wSyU"))}},{path:"/helloworld",name:"HelloWorld",component:function(){return n.e(1).then(n.bind(null,"gORT"))}}]}),u=n("cndz"),c=n.n(u),l=window.navigator||{},p=l.userAgent||"";function s(e){return e.test(p)}s(/webkit\W.*(chrome|chromium)\W/i),s(/mozilla.*\Wfirefox\W/i),"Microsoft Internet Explorer"===l.appName||s(/\bTrident\b/),s(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),s(/opera.*\Wpresto\W/i),s(/webkit\W(?!.*chrome).*safari\W/i),s(/(ipad|android(?!.*mobile)|tablet)/i),s(/googletv|sonydtv/i),s(/webkit\W/i);var f=s(/android/i),v=(s(/(ipad|iphone|ipod)/i),s(/ipad/i),s(/iphone/i),s(/ipod/i),s(/MicroMessenger/i),function(){var e=/(iPhone|iPad|iPod) OS ([\d_]+)/.exec(p);if(!e||e<=2)return 0;var t=(e[2]||"").split("_")[0];t&&window.parseInt(t)}(),n("zL8q")),b=n.n(v);n("tvR6");if(o.default.use(b.a),o.default.use(c.a),o.default.config.productionTip=!1,"file:"===window.location.protocol||"8080"===window.location.port){var h=document.createElement("script");h.setAttribute("type","text/javascript"),h.setAttribute("src","../cordova-"+(f?"android":"ios")+".js"),document.body.appendChild(h)}var m=new o.default({el:"#app",router:d,render:function(e){return e(r)}});d.beforeEach(function(e,t,n){return m.$cordova.router&&m.$cordova.router.isNative(e.fullPath)?(m.$cordova.router.push(e),n(!1)):n(!0)})},qPAX:function(e,t){},tvR6:function(e,t){}},["eV92"]);