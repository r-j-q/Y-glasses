(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/statistics"],{82:function(t,e,a){"use strict";(function(t,e){var i=a(4);a(26);i(a(25));var n=i(a(83));t.__webpack_require_UNI_MP_PLUGIN__=a,e(n.default)}).call(this,a(1)["default"],a(2)["createPage"])},83:function(t,e,a){"use strict";a.r(e);var i=a(84),n=a(86);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a(88),a(90),a(92);var s,r=a(32),c=Object(r["default"])(n["default"],i["render"],i["staticRenderFns"],!1,null,"ba7e820e",null,!1,i["components"],s);c.options.__file="pages/index/statistics.vue",e["default"]=c.exports},84:function(t,e,a){"use strict";a.r(e);var i=a(85);a.d(e,"render",(function(){return i["render"]})),a.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),a.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),a.d(e,"components",(function(){return i["components"]}))},85:function(t,e,a){"use strict";var i;a.r(e),a.d(e,"render",(function(){return n})),a.d(e,"staticRenderFns",(function(){return s})),a.d(e,"recyclableRender",(function(){return o})),a.d(e,"components",(function(){return i}));try{i={uButton:function(){return a.e("uview-ui/components/u-button/u-button").then(a.bind(null,193))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var t=this,e=t.$createElement;t._self._c},o=!1,s=[];n._withStripped=!0},86:function(t,e,a){"use strict";a.r(e);var i=a(87),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},87:function(t,e,a){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){a.e("components/categoryLine/index").then(function(){return resolve(a(200))}.bind(null,a)).catch(a.oe)},o={components:{CategoryLine:n},data:function(){return{count:1,listYong:[{name:"日数据",id:1},{name:"周数据",id:2},{name:"月数据",id:3}],eyearr:[],yCompany:"分钟",company:"小时",phone:"",arrtitle:[],children_date:"",services:"00000001-0000-1000-8000-00805F9B34FB",wirerid:"00000002-0000-1000-8000-00805F9B34FB",noityid:"00000003-0000-1000-8000-00805F9B34FB",user_id:"",children_name:"",children_id:"",deviceId:"",lyswitch:!1,visible:!1,listTime:"",beforetime:[],yeartime:[],monthtime:[],daytime:[],listIndex:0,aswitch:1,choicetime:"",chartData:{},infoDatahour:[],devalue:0,showCanvas:"true",slideSwitch:"false",classcate:1,stateid:"",opts:{touchMoveLimit:30,enableScroll:!0,scrollPosition:"left",update:!0,legend:{show:!1},xAxis:{disableGrid:!0,scrollShow:!0,itemCount:16,fontSize:12},yAxis:{data:[{min:0,tofix:0,calibration:!1}]},extra:{tooltip:{showBox:!0,legendShow:!1},column:{type:"group",width:8,activeBgColor:"#000000",activeBgOpacity:.08,barBorderRadius:[50,50,50,50]}}}}},onLoad:function(){var t=this;setInterval((function(){t.notifyMy()}),3e5)},onShow:function(){this.user_phone(),this.testing()},onReady:function(){},methods:{cate:function(t){this.count=t,this.classcate=t,this.company=1==t?"小时":"天"},user_phone:function(){var e=t.getStorageSync("user_phone");this.phone=e,e?e&&this.user_info(e):(t.showToast({title:"手机号错误,请前往绑定眼睛中重新绑定",icon:"none",duration:3e3}),setTimeout((function(){t.navigateBack({delta:1})}),3e3))},user_info:function(e){var a=this;this.$http.glassesEst({url:"users/children",method:"GET",data:{phone:e}}).then((function(e){if(200==e.data.status){var i=e.data.data.children.length-1;e=e.data.data.children[i];if(e.mac_address)null!=e.mac_address&&(a.children_date=e.birthday,a.children_id=e.id,a.deviceId=e.mac_address,a.children_name=e.name,a.datetimes(),console.log(a.deviceId,"this.deviceId"));else{var n=a,o=t.getStorageSync("mac_address");t.removeStorageSync("mac_address"),t.removeStorageSync("user_phone"),t.closeBLEConnection({deviceId:o,success:function(t){var e=getApp();e.globalData.stateid=1,n.stateid=1}}),t.showToast({title:"手机号错误,请前往绑定眼睛中重新绑定",icon:"none",duration:3e3})}}else a.$common.showToast(e.data.message)}))},times:function(){var t=this,e=t.typedArr("84640215556A");t.writeData(e);var a=this.arrlog();t.writeData(a)},sztimes:function(){var t=this,e=t.typedArr("816101aaaa");t.writeData(e)},notifyMy:function(){var e=this,a=getApp();if(this.stateid=a.globalData.stateid,1!=a.globalData.stateid){console.log(this.stateid),t.showLoading({title:"数据同步中"});var n=this;n.arrtitle=[],console.log("数据同步中"),t.notifyBLECharacteristicValueChange({state:!0,deviceId:n.deviceId,serviceId:n.services,characteristicId:n.noityid,success:function(a){i.onBLECharacteristicValueChange((function(a){var i=n.ab2hex(a.value);if(console.log(i,"resData"),n.title=i,"826201aaaa"!=i&&40==i.length){var o=n.typedArr("8262015555");n.writeData(o);for(var s=i,r="",c=0;c<s.length;c+=2){var d=s.slice(c,c+2);r+=c<=36?d+" ":d}n.arrtitle.push(r)}else if("826201aaaa"==i&&n.arrtitle.length>0)n.create1(n.arrtitle);else if("826201aaaa"==i&&0==n.arrtitle.length)n.$common.showToast("佩戴时间过短，没有数据");else if("806005"==i.slice(0,6))if("00"==i.slice(14,16)){e.aswitch=1,e.classcate=1;var l=e.listTime[0].date;e.obtainData(l,1,1),t.showToast({title:"同步成功",icon:"success",duration:2e3})}else"01"==i.slice(14,16)&&n.$common.showToast("设置时间失败，请重试")}))}}),setTimeout((function(){var t=n.typedArr("8262015555");n.writeData(t)}),100)}else t.showToast({title:"请连接蓝牙后进行操作",icon:"none",duration:2e3})},create1:function(t){var e=this,a=Math.round((new Date).getTime()/1e3).toString();this.$http.glassesEst({url:"uploads/create1",method:"POST",data:{child_id:this.children_id,records:t,device_time:a,platform:"webapp"}}).then((function(t){(t.data.status=200)?e.times():e.$common.showToast(t.data.message)}))},writeData:function(t){var e,a=this;e=t.buffer,i.writeBLECharacteristicValue({deviceId:a.deviceId,serviceId:a.services,characteristicId:a.wirerid,value:e,success:function(t){console.log("首次写入特征数据---",t)},fail:function(t){}})},typedArr:function(t){var e=new Uint8Array(t.match(/[\da-f]{2}/gi).map((function(t){return parseInt(t,16)})));return e},ab2hex:function(t){for(var e=new Uint8Array(t),a="",i=0;i<e.length;i++)a+=e[i].toString(16).padStart(2,"0"),String.fromCharCode(e[i]);return a},testing:function(){var e=this,a=getApp();1==a.globalData.stateid&&(e.$common.showToast("蓝牙异常断开"),setTimeout((function(){t.redirectTo({url:"/pages/index/binding"})}),2e3))},getServerData:function(t){this.infoDatahour=[];var e,a=t.length;1==this.classcate?e=0:2!=this.classcate&&3!=this.classcate||(e=1);var i=Array.from({length:a},(function(t,a){return e+a}));this.infoDatahour=i;var n,o,s,r,c,d=t,l=[],u=this.aswitch,h=this.classcate,f=0,m=0,v=0,g=0,p=0,_=[],w={slight:5,moderate:15,serious:20},y={slight:60,moderate:90,serious:120},b={slight:400,moderate:700,serious:1e3},D={slight:8e3,moderate:15e3,serious:2e4},S={slight:5,moderate:10,serious:15},F={slight:30,moderate:80,serious:120};if(1!=u&&2!=u||(n=1==h?w:y,o="#aef0c2",s="#FFEAC2",r="#FFB58D",c="#FF4747"),3==u&&(n=1==h?b:D,1==h?(o="#FFB58D",s="#aef0c2",r="#FFEAC2",c="#FF4747"):(o="#FF4747",s="#FFB58D",r="#FFEAC2",c="#aef0c2")),4==u&&(n=1==h?S:F,o="#FF4747",s="#FFB58D",r="#FFEAC2",c="#aef0c2"),d.forEach((function(t){t<n.slight?(f+=t,l.push({value:t,color:o})):t>=n.slight&&t<n.moderate?(m+=t,l.push({value:t,color:s})):t>=n.moderate&&t<n.serious?(v+=t,l.push({value:t,color:r})):t>=n.serious&&(g+=t,l.push({value:t,color:c}))})),p=f+m+v+g,_.push(Math.floor(f/p*100)),_.push(Math.floor(m/p*100)),_.push(Math.floor(v/p*100)),_.push(Math.floor(g/p*100)),0==p)this.eyearr=[0,0,0,0];else{for(var T=100-(_[0]+_[1]+_[2]+_[3]),x=0;x<T;x++)_[x]++;if(4==this.aswitch&&_.reverse(),console.log(this.aswitch,"this.aswitch--打印"),3==this.aswitch)if(console.log(_,"dataarrres()"),1==h){i=[_[1],_[2],_[0],_[3]];_=i}else _.reverse();this.eyearr=_}var C={categories:this.infoDatahour,series:[{name:"",data:l,padding:"6"}]};this.chartData=JSON.parse(JSON.stringify(C))},arrlog:function(){var t=Math.round((new Date).getTime()/1e3).toString(),e=new Uint8Array(8);return e[0]=128,e[1]=96,e[2]=4,e[3]=255&t,e[4]=t>>8&255,e[5]=t>>16&255,e[6]=t>>24&255,e[7]=e[3]+e[4]+e[5]+e[6],e},relieveData:function(){var e=this;t.showModal({title:"提示",content:"确定解除绑定吗？",success:function(a){console.log(e.children_id,"that.children_id"),a.confirm?e.$http.glassesEst({url:"users/unbind",method:"DELETE",data:{child_id:e.children_id}}).then((function(a){t.closeBLEConnection({deviceId:e.deviceId,success:function(t){var a=getApp();a.globalData.stateid=1,e.stateid=1}}),t.removeStorageSync("mac_address"),t.removeStorageSync("user_phone"),e.$common.showToast(a.data.message)})):a.cancel&&e.$common.showToast("取消")}})},cancel:function(){this.visible=!1},confirm:function(){if(1!=this.slideSwitch){this.visible=!1;var t=this.devalue;this.aswitch=1,this.classcate=1,this.choicetime=this.listTime[t].date,this.obtainData(this.choicetime,1,1)}else this.$common.showToast("请滚动结束后点击")},bindChange:function(t){t=t.detail.value;this.devalue=t},bindpickend:function(){this.slideSwitch=!1},pickstart:function(){this.slideSwitch=!0},listScreen:function(t){var e=this;e.listTime.forEach((function(t){e.beforetime.push(t.date)})),this.visible=!0,this.showCanvas=!1},datetimes:function(){this.listTime=this.$common.datetime(),this.choicetime=this.listTime[0].date,this.obtainData(this.choicetime,1,1)},obtainData:function(t,e,a){var i,n=this;console.log(t,"times---times"),console.log(this.children_id,"this.children_id"),console.log(a,"time_span--time_span"),1==a&&(i="getReportsDaily"),2==a&&(i="getWeekly"),3==a&&(i="getMonthly"),console.log("=====bleble====>",i),this.$http.request({url:i,method:"GET",header:{"Content-type":"multipart/form-data"},data:{date:t,child_id:this.children_id}}).then((function(t){console.log(t,"console.log()打印查看数据"),1==e&&(1==a&&n.getServerData(t.data.data.bad_posture_data.bad_posture_hour),2==a&&n.getServerData(t.data.data.bad_posture_times_array),3==a&&n.getServerData(t.data.data.bad_posture_times_array)),2==e&&(1==a?n.getServerData(t.data.data.nearwork_data.nearwork_hour):n.getServerData(t.data.data.nearwork_day_array)),3==e&&(1==a?n.getServerData(t.data.data.lux_data.lux_hour):n.getServerData(t.data.data.lux_day_array)),4==e&&(1==a?n.getServerData(t.data.data.out_time_data.out_time_hour):n.getServerData(t.data.data.out_time_array))}))},mit:function(){this.children_name?(t.showLoading({title:"绑定中"}),this.createUser()):this.$common.showToast("请输入用户姓名之后,点击确定")},tion:function(t){this.count=t,this.chartData={},this.aswitch=t,this.yCompany="3"==t?"lux":"分钟",this.obtainData(this.choicetime,t,this.classcate)}}};e.default=o}).call(this,a(2)["default"],a(1)["default"])},88:function(t,e,a){"use strict";a.r(e);var i=a(89),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},89:function(t,e,a){},90:function(t,e,a){"use strict";a.r(e);var i=a(91),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},91:function(t,e,a){},92:function(t,e,a){"use strict";a.r(e);var i=a(93),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},93:function(t,e,a){}},[[82,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/statistics.js.map