(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/signin/signin"],{106:function(n,e,t){"use strict";(function(n,e){var o=t(4);t(26);o(t(25));var r=o(t(107));n.__webpack_require_UNI_MP_PLUGIN__=t,e(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},107:function(n,e,t){"use strict";t.r(e);var o=t(108),r=t(110);for(var i in r)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(i);t(112),t(114);var a,c=t(32),u=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);u.options.__file="pages/signin/signin.vue",e["default"]=u.exports},108:function(n,e,t){"use strict";t.r(e);var o=t(109);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},109:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return a})),t.d(e,"recyclableRender",(function(){return i})),t.d(e,"components",(function(){return o}));var r=function(){var n=this,e=n.$createElement;n._self._c},i=!1,a=[];r._withStripped=!0},110:function(n,e,t){"use strict";t.r(e);var o=t(111),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},111:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{token:"",code:"",openid:"",encryptedData:"",iv:"",visible:!1}},onLoad:function(){},methods:{getPhoneNumber:function(e){if(console.log(e,e.detail.errMsg,"methods-微信认证e"),"getPhoneNumber:ok"==e.detail.errMsg){e=e.detail;var t=this;n.login({provider:"weixin",onlyAuthorize:!0,success:function(n){console.log(n,"console.log-event");n.code;var o={code:n.code,encryptedData:e.encryptedData,iv:e.iv};console.log(o,"获取手机号data"),t.add_login(o)},fail:function(n){console.log(n,"err登录授权失败")}})}else this.$common.showToast("您拒绝了请求,不能正常使用小程序")},add_login:function(e){var t=this,o=this;o.$http.request({url:"login",method:"POST",header:{"Content-Type":"applicktion/json"},data:e}).then((function(e){200==e.data.code&&(t.$common.showToast(e.data.info),t.$common.setStorage("token",e.data.data.token),t.$common.setStorage("list_phone",e.data.data.phone),n.navigateBack({delta:1})),console.log(e,"sigin-login-res")}))},getUserProfile:function(){var e=this;n.getUserProfile({desc:"登录",success:function(t){console.log(t),n.login({provider:"weixin",success:function(n){console.log(n,"用户信息"),console.log(t,"用户info");var o=[{avatarUrl:t.userInfo.avatarUrl,nickName:t.userInfo.nickName,gender:t.userInfo.gender}],r=JSON.stringify(o),i={code:n.code,userInfo:r};console.log(i,"code-data"),e.$http.request({url:"authorization",method:"POST",header:{"Content-Type":"applicktion/json"},data:i}).then((function(n){e.visible=!0,console.log(n,"login------")}))}})},fail:function(n){console.log(n),e.$common.showToast("您拒绝了请求,不能正常使用小程序")}})}}};e.default=t}).call(this,t(2)["default"])},112:function(n,e,t){"use strict";t.r(e);var o=t(113),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},113:function(n,e,t){},114:function(n,e,t){"use strict";t.r(e);var o=t(115),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},115:function(n,e,t){}},[[106,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/signin/signin.js.map