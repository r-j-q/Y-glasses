(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/@dcloudio/uni-cli-shared/components/ad-interactive"],{207:function(e,t,n){"use strict";n.r(t);var r=n(208),a=n(210);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n(212);var o,d=n(32),u=Object(d["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);u.options.__file="Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/uni-cli-shared/components/ad-interactive.vue",t["default"]=u.exports},208:function(e,t,n){"use strict";n.r(t);var r=n(209);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},209:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c;"augmented"===e.$scope.data.scopedSlotsCompiler&&e.$setScopedSlotsParams("default",{options:e.options,data:e.adData,loading:e.loading,error:e.errorMessage})},i=!1,o=[];a._withStripped=!0},210:function(e,t,n){"use strict";n.r(t);var r=n(211),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},211:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="https://wxac1.dcloud.net.cn/openPage/acs",r="https://wxac1.dcloud.net.cn/openPage/acs",a={load:"load",close:"close",error:"error"},i={name:"AdInteractive",props:{options:{type:[Object,Array],default:function(){return{}}},disabled:{type:[Boolean,String],default:!1},adpid:{type:[Number,String],default:""},openType:{type:String,default:"interactive"},openPagePath:{type:String,default:""}},data:function(){return{adData:null,loading:!1,errorMessage:""}},created:function(){this._uniAdPlugin=null,this._interactiveUrl=null,this.openPagePath&&this.getAdData()},methods:{show:function(){null===this._uniAdPlugin&&(this._uniAdPlugin=this.selectComponent(".uni-ad-plugin")),this._uniAdPlugin.show()},getAdData:function(){var t=this;this.loading=!0,e.request({url:n,method:"POST",data:{adpid:this.adpid||"",appid:e.getAppBaseInfo().appId},timeout:5e3,dataType:"json",success:function(e){if(200===e.statusCode){var n=e.data;if(0===n.ret)t._interactiveUrl=n.data.adp_url,t.adData={imgUrl:n.data.icon_url,openPath:t.openPagePath+"?url="+encodeURIComponent(t._interactiveUrl)},t.$emit(a.load,t.adData);else{var r={errCode:n.ret,errMsg:n.msg};t.errorMessage=r,t.$emit(a.error,r)}}else t.$emit(a.error,{errCode:e.statusCode,errMsg:e.statusCode})},fail:function(e){t.$emit(a.error,{errCode:"",errMsg:e.errMsg})},complete:function(){t.loading=!1}})},onclick:function(){this.disabled||this._interactiveUrl&&(e.navigateTo({url:this.adData.openPath}),this._report())},_report:function(){e.request({url:r,data:{adpid:this.adpid,t:"10019"},timeout:5e3,dataType:"json"})}}};t.default=i}).call(this,n(2)["default"])},212:function(e,t,n){"use strict";n.r(t);var r=n(213),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},213:function(e,t,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/@dcloudio/uni-cli-shared/components/ad-interactive.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/@dcloudio/uni-cli-shared/components/ad-interactive-create-component',
    {
        'node-modules/@dcloudio/uni-cli-shared/components/ad-interactive-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(207))
        })
    },
    [['node-modules/@dcloudio/uni-cli-shared/components/ad-interactive-create-component']]
]);
