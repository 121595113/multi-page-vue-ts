webpackJsonp([0],{FeBl:function(t,e){var o=t.exports={version:"2.5.6"};"number"==typeof __e&&(__e=o)},P9wR:function(t,e){},gORT:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("mvHQ"),n=o.n(a),r=o("7+uW"),s=void 0,u={name:"HelloWorld",data:function(){return{url:"",method:"get",cordova:r.a.cordova,data:"\n        {\n\n        }\n        ",result:"",state:""}},mounted:function(){s=this.$cordova.axios},computed:{dataLable:function(){return"get"===this.method?"params":"data"}},methods:{request:function(){var t=this,e=JSON.parse(this.data);s&&s[this.method](this.url,e).then(function(e){t.state="成功1",t.result=n()(e),console.log(e)}).catch(function(e){t.state="失败1",t.result=n()(e),console.log(e)})},request2:function(){var t=this,e=JSON.parse(this.data);s&&s.request({url:this.url,data:e}).then(function(e){t.state="成功2",t.result=n()(e),console.log(e)}).catch(function(e){t.state="失败2",t.result=n()(e),console.log(e)})}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"hello"},[o("h2",[t._v("cordova-plugin-axios")]),t._v(" "),o("div",{staticClass:"control-group"},[t._v("url:"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],attrs:{placeholder:"请输入请求地址"},domProps:{value:t.url},on:{input:function(e){e.target.composing||(t.url=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"control-group"},[t._v("method:\n    "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.method,expression:"method"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.method=e.target.multiple?o:o[0]}}},[o("option",{attrs:{value:"get"}},[t._v("GET")]),t._v(" "),o("option",{attrs:{value:"post"}},[t._v("POST")])])]),t._v(" "),o("div",{staticClass:"control-group"},[t._v(t._s(t.dataLable)+":"),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.data,expression:"data"}],domProps:{value:t.data},on:{input:function(e){e.target.composing||(t.data=e.target.value)}}})]),t._v(" "),o("button",{on:{click:t.request}},[t._v("发送请求1")]),t._v(" "),o("button",{on:{click:t.request2}},[t._v("发送请求2")]),t._v(" "),t.result?o("div",[t._v(t._s(t.state)+":"+t._s(t.result))]):t._e()])},staticRenderFns:[]};var i=o("VU/8")(u,l,!1,function(t){o("P9wR")},"data-v-46e2a60a",null);e.default=i.exports},mvHQ:function(t,e,o){t.exports={default:o("qkKv"),__esModule:!0}},qkKv:function(t,e,o){var a=o("FeBl"),n=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}}});