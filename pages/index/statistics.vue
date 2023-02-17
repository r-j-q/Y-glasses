<template>
	<view>
		<view class="picker-modal" v-if="visible"></view>
		<view class="parent" v-if="visible" @cancel="cancel" @confirm="confirm">
			<view class="parent-inside">
				<view class="buttonClass">
					<view @click="cancel()">取消</view>
					<view @click="confirm()">确定</view>
				</view>
				<view class="bor"></view>
				<picker-view v-if="visible" indicator-style="height:46rpx;line-height:46rpx;" @change="bindChange"
					@pickstart="pickstart" @pickend="bindpickend"
					:style="{transform:  visible ? 'translateY(0)' : 'translateY(100%)'}" :value="devalue">
					<picker-view-column style="text-align:center">
						<view class="item" style="height: 68rpx; line-height: 68rpx;" v-for="(item,index) in beforetime"
							:key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>


		<view class="bottom-frame" v-if="lyswitch">
			<view class="sign">
				<view class="title">请填写儿童姓名完成绑定</view>
				<view class="tion">
					<view>姓名</view>
					<input type="text" v-model="children_name" placeholder="请输入"
						placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
				</view>
				<button class="button" @click="mit()">绑定</button>
			</view>
		</view>
		<view class="header-wrap">
			<view class="top">
				<view>
					<view>姓名:</view>
					<view>{{children_name}}</view>
				</view>
				<view>
					<view>生日:</view>
					<view>{{children_date}}</view>
				</view>
				<view>
					<view>
						设备macDE:
					</view>
					<view>{{deviceId}}</view>
				</view>
			</view>
			<view class="bottom">
				<view class="first" @click="relieveData()">解除绑定</view>
				<view class="last" @click="notifyMy()">同步数据</view>
				<!-- <view class="last" @click="selData()">数据查询</view> -->
			</view>
		</view>

		<view class="middle-wrap flex justify items">
			<view class="left">用眼数据</view>
			<view class="right flex items" @click="listScreen()">{{choicetime}}
				<view class="arrow"></view>
			</view>
		</view>

		<view class="chart">
			<view class="chart-wrap">
				<view class="one" @click="tion(1)"
					:style="{'background':(aswitch == 1 ? '#32529B':'#ffffff'),'color':(aswitch != 1 ? '#32529B':'#ffffff')}">
					错误坐姿
				</view>
				<view class="two" @click="tion(2)"
					:style="{'background':(aswitch == 2 ? '#32529B':'#ffffff'),'color':(aswitch != 2 ? '#32529B':'#ffffff')}">
					近距离用眼
				</view>
				<view class="three" @click="tion(3)"
					:style="{'background':(aswitch == 3 ? '#32529B':'#ffffff'),'color':(aswitch != 3 ? '#32529B':'#ffffff')}">
					光照强弱</view>
				<view class="four" @click="tion(4)"
					:style="{'background':(aswitch == 4 ? '#32529B':'#ffffff'),'color':(aswitch != 4 ? '#32529B':'#ffffff')}">
					户外时间</view>
			</view>
			<view class="classlist flex">
				<view @click="cate(1)" :style="{'background':(classcate == 1 ? '#FFB58D':'#ffffff'),'color':(classcate != 1 ? '#000':'#ffffff')}">日数据</view>
				<view @click="cate(2)" :style="{'background':(classcate == 2 ? '#FFB58D':'#ffffff'),'color':(classcate != 2 ? '#000':'#ffffff')}">周数据</view>
				<view @click="cate(3)" :style="{'background':(classcate == 3 ? '#FFB58D':'#ffffff'),'color':(classcate != 3 ? '#000':'#ffffff')}">月数据</view>
			</view>
			<view class="guide-wrap">
				<view class="inside">
					<view style="color: #aef0c2;width: 160rpx;">{{eyearr[0]}}%</view>
					<view class="circular-top flex">
						<view class="quarter1">
							<view>健康</view>
							<image src="../../static/index/29.png" mode="aspectFill"></image>
						</view>
						<view class="quarter2">
							<view v-if="aswitch == 3 && classcate == 1">微强</view>
							<view v-else>轻度</view>
							<image src="../../static/index/30.png" mode="aspectFill"></image>
						</view>
					</view>
					<view style="color: #FFEAC2;width: 160rpx;">{{eyearr[1]}}%
					</view>
				</view>
				<view class="inside">
					<view style="color: #FFB58D;width: 160rpx;margin-top: 146rpx;">{{eyearr[2]}}%</view>
					<view class="circular-bottom flex" style="margin-top: 4rpx;">
						<view class="quarter3">
							<image src="../../static/index/31.png" mode="aspectFill"></image>
							<view v-if="aswitch == 3 && classcate == 1">较暗</view>
							<view v-else>中度</view>
						</view>
						<view class="quarter4">
							<image src="../../static/index/32.png" mode="aspectFit"></image>
							<view v-if="aswitch == 3 && classcate == 1">过曝</view>
							<view v-else>重度</view>
						</view>
					</view>
					<view style="color: #FF4747;width: 160rpx;margin-top: 146rpx;">{{eyearr[3]}}%</view>
				</view>
			</view>
			<view class="charts-min">{{yCompany}}</view>
			<view class="charts-box">
				<qiun-data-charts :style="visible?'display:none':''" type="column" :opts="opts" :chartData="chartData"
					:ontouch="true" />
			</view>
			<view class="charts-min" style="width: 98%;text-align: right;margin: 10rpx auto 100rpx auto;">时间/{{company}}</view>

		</view>
		<!-- <view @click="create1()">数据上传</view> -->
		<!-- <view @click="sztimes()" style="margin-top: 120rpx;">设置时间</view> -->
	</view>
</template>

<script>
	var uChartsInstance = {};
	export default {
		data() {
			return {
				eyearr:[],
				yCompany:"分钟", //y轴单位 
				company:"小时",//x轴单位
				phone: "", //用户手机号
				arrtitle: [], //用眼数据
				children_date: "", //儿童生日
				services: "00000001-0000-1000-8000-00805F9B34FB",
				wirerid: "00000002-0000-1000-8000-00805F9B34FB",
				noityid: "00000003-0000-1000-8000-00805F9B34FB",
				user_id: "", //用户id
				children_name: "", //儿童姓名
				children_id: "", //儿童id
				deviceId:"",//设备id
				lyswitch: false, //输入儿童姓名显示隐藏
				visible: false,
				listTime: "",
				beforetime: [],
				yeartime: [], //年时间
				monthtime: [], //月时间
				daytime: [], //日时间
				listIndex: 0,
				aswitch: 1,
				choicetime: "", //选择时间
				chartData: {},
				// infoDatatime: [], //图表数据时间
				infoDatahour: [], //24时
				devalue: 0, //时间选择器key
				showCanvas: 'true', //控制图表显示隐藏
				slideSwitch: "false", //滑动事件结束后点击
				classcate:1, //日周月数据
				stateid:"",//蓝牙连接状态
				opts: {
					touchMoveLimit: 30,
					enableScroll: true,
					scrollPosition: "left",
					update: true,
					legend: {
						show: false
					},
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 16,
						fontSize: 12,
					},
					yAxis: {
						data: [{
							min: 0,
							tofix: 0,
							calibration: false,
						}],
						// splitNumber: 6
					},
					extra: {
						tooltip: {
							//是否显示提示框
							showBox: true,
							//是否显示左侧图例
							legendShow: false
						},
						//y柱状图设置
						column: {
							type: "group",
							width: 8,
							// labelPosition:"insideTop",
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							barBorderRadius: [
								50,
								50,
								50,
								50
							]
						}
					}
				}
			};
		},
		onLoad() {

		},
		onShow() {
			uni.getSystemInfo({
				success: res => {
					this.width = res.screenWidth * 0.8
				}
			})
			// this.children_id = this.$common.getStorages("children_id");
			this.user_phone(); //获取缓存里用户手机号
			// this.datetimes();
			this.testing(); // 蓝牙是否异常断开
			// this.statusCheck();
		},
		onReady() {
		},
		methods: {
			cate(res){
				this.classcate = res;
				if(res == 1){
					this.company = "小时";
				}else{
					this.company = "天";
				}
									//选择的时间   数据类型   时间跨度
				this.obtainData(this.choicetime, this.aswitch,res);
			},
			//获取缓存手机号
			user_phone() {
				var phone = uni.getStorageSync("user_phone");
				this.phone = phone;
				if (!phone) {
					//存储无手机号 让用户输入手机号，获取信息
					uni.showToast({
						title:'手机号错误,请前往绑定眼睛中重新绑定',
						icon:'none',
						duration: 3000
					})
					setTimeout(() =>{
						uni.navigateBack({
							delta: 1 //返回的页面数
						});
					},3000)
				} else if (phone) {
					//获取用户信息
					this.user_info(phone);
				}
			},
			user_info(res) {
				this.$http.glassesEst({
					url: "users/children",
					method: 'GET',
					data: {
						phone: res
					}
				}).then(res => {
					if (res.data.status == 200) {
						var len = res.data.data.children.length - 1;
						var res = res.data.data.children[len];
						if(!res.mac_address){
							var that = this;
							var mac = uni.getStorageSync('mac_address');
							uni.removeStorageSync("mac_address");
							uni.removeStorageSync("user_phone");
							uni.closeBLEConnection({
								deviceId: mac,
								success(res) {
									var App = getApp();
									App.globalData.stateid = 1;
									that.stateid = 1;
								}
							})
							
							uni.showToast({
								title:'手机号错误,请前往绑定眼睛中重新绑定',
								icon:'none',
								duration: 3000
							})
						}else if(res.mac_address != null){
							this.children_date = res.birthday; //儿童生日
							this.children_id = res.id; //儿童id
							this.deviceId = res.mac_address;
							this.children_name = res.name;
							this.datetimes();
							console.log(this.deviceId,"this.deviceId");
						}
						
					} else {
						this.$common.showToast(res.data.message);
					}
				})
				// /users
			},
			times() {
				var that = this;
				var len = that.typedArr("84640215556A");
				that.writeData(len);
				var gth = this.arrlog();
				that.writeData(gth);
			},

			sztimes() {
				var that = this;
				var len = that.typedArr("816101aaaa");
				that.writeData(len);
			},

			//监听数据
			notifyMy() {
				//显示加载框
				var App = getApp();
				this.stateid = App.globalData.stateid;
				if(App.globalData.stateid == 1){
					uni.showToast({
						title:"请连接蓝牙后进行操作",
						icon:'none',
						duration:2000
					}) 
					return;	
				}
				console.log(this.stateid);
				uni.showLoading({
					title: '数据同步中'
				});
				var that = this;
				that.arrtitle = [];
				console.log("数据同步中");
				// that.deviceId = that.$common.getStorages("mac_address");
				uni.notifyBLECharacteristicValueChange({
					state: true, // 启用 notify 功能
					deviceId: that.deviceId,
					serviceId: that.services,
					characteristicId: that.noityid,
					success: (res) => {
						// 监听特征值变化事件
						wx.onBLECharacteristicValueChange((result) => {
							const resData = that.ab2hex(result.value)
							console.log(resData, "resData");
							that.title = resData;
							if (resData != "826201aaaa" && resData.length == 40) {
								var len = that.typedArr("8262015555")
								that.writeData(len);
								var text = resData;
								var tst = '';
								for (let i = 0; i < text.length; i += 2) {
									var xt = text.slice(i, i + 2);
									if (i <= 36) {
										tst += xt + " ";
									} else {
										tst += xt
									}
								}
								that.arrtitle.push(tst);
							} else if (resData == "826201aaaa" && that.arrtitle.length > 0) {
								that.create1(that.arrtitle);
							} else if (resData == "826201aaaa" && that.arrtitle.length == 0) {
								that.$common.showToast("佩戴时间过短，没有数据");
							} else if (resData.slice(0, 6) == "806005") {
								if (resData.slice(14, 16) == "00") {
									this.aswitch = 1;
									this.classcate = 1;
									var chtime = this.listTime[0].date;
									this.obtainData(chtime,1,1);
									uni.showToast({
										title: "同步成功",
										icon: "success",
										duration: 2000
									})
								} else if (resData.slice(14, 16) == "01") {
									that.$common.showToast("设置时间失败，请重试");
								}
							};
						})

					}
				})
				setTimeout(() => {
					var len = that.typedArr("8262015555")
					that.writeData(len)
				}, 100)
			},

			create1(infores) {
				const interval = Math.round(new Date().getTime() / 1000).toString();
				this.$http.glassesEst({
					url: "uploads/create1",
					method: "POST",
					data: {
						child_id: this.children_id,
						records: infores,
						device_time: interval,
						platform: "webapp",
					}
				}).then(res => {
					if (res.data.status = 200) {
						//重置时间
						this.times();
					} else {
						this.$common.showToast(res.data.message);
					}
				})
			},


			writeData(data) {
				var that = this;
				var buffer1;
				buffer1 = data.buffer
				// var buffer1 = that.arrlog().buffer;
				wx.writeBLECharacteristicValue({
					deviceId: that.deviceId,
					serviceId: that.services,
					characteristicId: that.wirerid, //写死
					// 这里的value是ArrayBuffer类型
					value: buffer1,
					success: (res) => {
						console.log('首次写入特征数据---', res);
					},
					fail: (res) => {}
				})
			},
			typedArr(data) {
				var typedArray = new Uint8Array(data.match(/[\da-f]{2}/gi).map((h) => {
					return parseInt(h, 16)
				}))
				return typedArray;
			},
			ab2hex(buffer) {

				let x = new Uint8Array(buffer);
				let strHex = ""
				let str = ""
				for (let i = 0; i < x.length; i++) {
					strHex = strHex + x[i].toString(16).padStart(2, "0")
					str = str + String.fromCharCode(x[i])
				}
				return strHex;
			},



			testing() {
				var that = this;
				var App = getApp();
				if (App.globalData.stateid == 1) {
					that.$common.showToast("蓝牙异常断开")
					setTimeout(() => {
						uni.redirectTo({
							url: "/pages/index/binding"
						})
					}, 2000)
				}
			},
			//绘制图表
			getServerData(info) {
				this.infoDatahour = [];
				// this.infoDatatime = [];
				var len = info.length;
				var iden;
				if(this.classcate == 1){
					iden = 0
				}else if(this.classcate == 2 || this.classcate ==3){
					iden = 1;
				}
				var arr =  Array.from({ length: len }, (_, i) => iden + (i)) // 1-30
				this.infoDatahour = arr;
				// this.infoDatatime = info;
				var infolist = info;
				var listdata = [];
				// var healthy; // 健康
				var slight; //轻微
				var moderate; //中度
				var serious; //重度
				var aswitch = this.aswitch; //健康 -户外时间选线
				var classcate = this.classcate; // 日-月数据选线
				var eyeData; // 健康---重度具体数据
				var healthyColor; // 健康颜色
				var slightColor; // 轻微颜色
				var moderateColor; // 中度颜色
				var seriousColor; //重度颜色
				//--------------------------
				var healthyber = 0; //健康百分比数据
				var slightber = 0; //轻度百分比数据
				var moderateber = 0;//中度百分比数据
				var severeber = 0;//重度百分比数据
				var sum = 0;
				var dataarr = []; // 百分比数组
				
				//每小时错误用眼
				var errorTime = {
					slight: 5, //轻微
					moderate: 15, //中度
					serious: 20, //重度
				}
				//每天错误用眼
				var errorDay = {
					slight: 60, //轻微
					moderate: 90, //中度
					serious: 120,
				}
				
				// //每小时光照的影响 	
				var hourLux = {
					slight:400,
					moderate: 700, 
					serious: 1000, 
				}
				
				//每天光照对眼睛影响
				var errorLux = {
					slight:8000, //轻微
					moderate: 15000, //中度
					serious: 20000,
				}
				
				//每小时户外时间
				var outdoorshour = {
					slight: 5, //轻微
					moderate: 10, //中度
					serious: 15,
				}
				
				//每天户外时间
				var outdoorsDay = {
					slight:30, //轻微
					moderate: 80, //中度
					serious: 120,
				}
				
				if(aswitch == 1 || aswitch == 2){
					 eyeData = classcate == 1 ? errorTime : errorDay;
					 healthyColor = "#aef0c2";
					 slightColor = "#FFEAC2";
					 moderateColor = "#FFB58D";
					 seriousColor = "#FF4747";
				}
				if(aswitch == 3){
					eyeData = classcate == 1 ? hourLux : errorLux;
					if(classcate == 1){
						healthyColor = "#FFB58D"; //FFB58D <400 过暗
						slightColor = "#aef0c2"; //aef0c2 健康
						moderateColor = "#FFEAC2"; //FFEAC2 微强 
						seriousColor = "#FF4747"; //
					}else{
						healthyColor = "#FF4747";
						slightColor = "#FFB58D";
						moderateColor = "#FFEAC2";
						seriousColor = "#aef0c2";
					}
				}
				if(aswitch == 4){
					eyeData = classcate == 1 ? outdoorshour : outdoorsDay;
					healthyColor = "#FF4747";
					slightColor = "#FFB58D";
					moderateColor = "#FFEAC2";
					seriousColor = "#aef0c2";
				}
				// if(aswitch != 3 && classcate != 1){
				infolist.forEach(item=>{
					if(item < eyeData.slight){
						// <400 较暗
							healthyber += item;
							listdata.push({
								"value": item,
								"color": healthyColor
							})
						}else if(item >= eyeData.slight && item < eyeData.moderate){
							slightber += item;
							//400 - 700 之间  健康
							listdata.push({
								"value": item,
								"color": slightColor
							})
						}else if(item >= eyeData.moderate && item < eyeData.serious){
							// 700 - 1000 微强
							moderateber += item;
							listdata.push({
								"value": item,
								"color": moderateColor
							})
						}else if(item >= eyeData.serious){
							// 过曝
							severeber += item;
							listdata.push({
								"value": item,
								"color": seriousColor
							})
						}
				})
				//四个值的总数
				sum = healthyber+slightber+moderateber+severeber;
				dataarr.push(Math.floor(healthyber/sum * 100));
				dataarr.push(Math.floor(slightber/sum * 100));
				dataarr.push(Math.floor(moderateber/sum * 100));
				dataarr.push(Math.floor(severeber/sum * 100));
				//四个值全部为0
				if(sum == 0){
					this.eyearr  = [0,0,0,0];
				}else{
					var diff = 100 - (dataarr[0] + dataarr[1] + dataarr[2] +dataarr[3]);
					for(let i=0;i<diff;i++){
						dataarr[i]++;
					}
					if(this.aswitch == 4){
						dataarr.reverse();
					}
					console.log(this.aswitch,"this.aswitch--打印");
					if(this.aswitch == 3){
						console.log(dataarr,'dataarrres()');
						if(classcate == 1){
							var arr = [dataarr[1],dataarr[2],dataarr[0],dataarr[3]];
							dataarr = arr;
						}else{
							dataarr.reverse();
						}
					}
					this.eyearr = dataarr;
				}
				let res = {
					categories: this.infoDatahour,
					series: [{
						// （宽度设置）和
						name: "",
						data: listdata,
						padding: "6",
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			},
			
			//设置时间
			arrlog() {
				const interval = Math.round(new Date().getTime() / 1000).toString();
				const src = new Uint8Array(8);
				src[0] = 0X80;
				src[1] = 0X60;
				src[2] = 0X04;
				src[3] = interval & 0xFF;
				src[4] = (interval >> 8) & 0xFF;
				src[5] = (interval >> 16) & 0xFF;
				src[6] = (interval >> 24) & 0xFF;
				src[7] = src[3] + src[4] + src[5] + src[6];
				return src;
			},

			//解除绑定
			relieveData() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定解除绑定吗？',
					success: function(res) {
						console.log(that.children_id, "that.children_id")
						if (res.confirm) {
							that.$http.glassesEst({
								url: "users/unbind",
								method: "DELETE",
								data: {
									child_id: that.children_id,
								}
							}).then(res => {
								uni.closeBLEConnection({
									deviceId: that.deviceId,
									success(res) {
										var App = getApp();
										App.globalData.stateid = 1;
										that.stateid = 1;
									}
								})
								uni.removeStorageSync("mac_address");
								uni.removeStorageSync("user_phone");
								that.$common.showToast(res.data.message);
							})

						} else if (res.cancel) {
							that.$common.showToast("取消")
						}
					}
				});

			},

			// asyncData(resData) {
			// 	var that = this;
			// 	that.lesid++;
			// 	const interval = Math.round(new Date().getTime() / 1000).toString();
			// 	if (that.lesid < 5) {
			// 		this.$http.glassesEst({
			// 			url: "uploads",
			// 			method: "POST",
			// 			data: {
			// 				child_id: 35165,
			// 				records: resData,
			// 				// device_time: interval,
			// 				// platform: "webapp",
			// 			}
			// 		}).then(res => {
			// 			console.log(res, "info");
			// 		})
			// 	}
			// },
			//取消
			cancel() {
				this.visible = false;
			},
			//确认
			confirm() {
				if (this.slideSwitch == true) {
					this.$common.showToast('请滚动结束后点击');
					return;
				}
				this.visible = false;
				var e = this.devalue;
				//日期数据赋值
				this.aswitch = 1;
				this.classcate = 1;
				// this.listTime
				this.choicetime = this.listTime[e].date;
				this.obtainData(this.choicetime, 1, 1);
			},
			//滚动快结束时触发
			bindChange(e) {
				var e = e.detail.value;
				this.devalue = e;
			},
			//结束时触发
			bindpickend() {
				this.slideSwitch = false;
			},
			//滚动开始时触发
			pickstart() {
				this.slideSwitch = true;
			},
			//时间三级联动
			listScreen(id) {
				var that = this;
				that.listTime.forEach(item => {
					that.beforetime.push(item.date);
				})
				this.visible = true;
				this.showCanvas = false;
			},
			//返回一年的时间
			datetimes() {
				//返回时间
				this.listTime = this.$common.datetime();
				// console.log(this.listTime,"this.listTime--00")
				this.choicetime = this.listTime[0].date;
				this.obtainData(this.choicetime, 1,1);
			},
			// reports/daily 同步数据
			obtainData(times, index, time_span) {
				console.log(times, "times---times")
				console.log(this.children_id, "this.children_id")
				console.log(time_span,"time_span--time_span");
				var ble;
				if (time_span == 1 ) ble = "getReportsDaily"; //getReportsDaily
				if (time_span == 2 ) ble = "getWeekly";
				if (time_span == 3 ) ble = "getMonthly";
				//  bmj.shningmi.com/getReportsDaily
				 // bmj.shningmi.com/getWeekly
				 // bmj.shningmi.com/getMonthly
				// this.$http.glassesEst({
				// 	url:ble,
				// 	method:"GET",
				// 	header: {
				// 			'Content-type': 'multipart/form-data',
				// 		},
				// 	data: {
				// 			date: times,
				// 			child_id: this.children_id,
				// 		}	
				// }).then(res =>{
					this.$http.request({
						url: ble,
						method: "GET",
						header: {
							'Content-type': 'multipart/form-data',
						},
						data: {
							date: times,
							child_id: this.children_id,
						}
					}).then(res => {
					console.log(res,"console.log()打印查看数据");
					if (index == 1) {
						if(time_span == 1)this.getServerData(res.data.data.bad_posture_data.bad_posture_hour);						
						if(time_span == 2)this.getServerData(res.data.data.bad_posture_times_array);
						if(time_span == 3)this.getServerData(res.data.data.bad_posture_times_array);
						// this.getServerData(res.data.data.bad_posture_data.bad_posture_times_hour);
					}
					if (index == 2) {
						if(time_span == 1){
							this.getServerData(res.data.data.nearwork_data.nearwork_hour);
						}else{
							this.getServerData(res.data.data.nearwork_day_array);
						}
					}
					if (index == 3) {
						if(time_span == 1){
							this.getServerData(res.data.data.lux_data.lux_hour);
						}else{
							this.getServerData(res.data.data.lux_day_array);
						}
					}
					if (index == 4) {
						if(time_span == 1){
							this.getServerData(res.data.data.out_time_data.out_time_hour);
						}else{
							this.getServerData(res.data.data.out_time_array);
						}
						
					}
				})
				// this.$http.request({
				// 	url: "getReportsDaily",
				// 	method: "GET",
				// 	header: {
				// 		'Content-type': 'multipart/form-data',
				// 	},
				// 	data: {
				// 		date: times,
				// 		child_id: this.children_id,
				// 	}
				// }).then(res => {
				// 	console.log(res,"res--669log");
				// 	if (index == 1) {
				// 		this.getServerData(res.data.data.bad_posture_data.bad_posture_hour);
				// 		// this.getServerData(res.data.data.bad_posture_data.bad_posture_times_hour);
				// 	}
				// 	if (index == 2) {
				// 		this.getServerData(res.data.data.nearwork_data.nearwork_hour);
				// 	}
				// 	if (index == 3) {
				// 		this.getServerData(res.data.data.lux_data.lux_hour);
				// 	}
				// 	if (index == 4) {
				// 		this.getServerData(res.data.data.out_time_data.out_time_hour);
				// 	}
				// })
				
				
				
				// uni.request({
				// 	url:"http://akeso.com.cn/api/open/reports/+'ble'",
				// 	// monthly"
				// 	// weekly",
				// 	// daily",
				// 	method:"GET",
				// 	header: {
				// 				'Content-type': 'multipart/form-data',
				// 	},
				// 	data: {
				// 		date: times,
				// 		child_id: this.children_id,
				// 	},
				// 	success:(res)=>{
				// 		console.log(res,"res--GETgeTget");
				// 			if (index == 1) {
				// 				this.getServerData(res.data.data.bad_posture_data.bad_posture_hour);
				// 			}
				// 			if (index == 2) {
				// 				this.getServerData(res.data.data.nearwork_data.nearwork_hour);
				// 			}
				// 			if (index == 3) {
				// 				this.getServerData(res.data.data.lux_data.lux_hour);
				// 			}
				// 			if (index == 4) {
				// 				this.getServerData(res.data.data.out_time_data.out_time_hour);
				// 			}
				// 	}		
				// })
			},
			//儿童姓名
			mit() {
				if (!this.children_name) {
					this.$common.showToast("请输入用户姓名之后,点击确定");
				} else {
					uni.showLoading({
						title: "绑定中",
					});
					this.createUser();
				}
			},
			// 内容切换
			tion(res) {
				this.chartData = {};
				this.aswitch = res;
				this.yCompany = res == '3' ? 'lux' : '分钟'; 
								//选择的时间   数据类型   时间跨度
				this.obtainData(this.choicetime, res,this.classcate);
			},
		}
	};
</script>
<!-- ============================================================================================ -->
<style>
	.en-wrap {
		width: 420rpx;
		height: 80rpx;
		margin: 10rpx auto;
		display: flex;
		justify-content: space-between;
	}

	view[class^="gend"] {
		width: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	view[class^="gend"] :first-child {
		width: 60rpx;
		height: 30rpx;
	}

	view[class^="gend"] :last-child {
		font-size: 23rpx;
	}


	.green {
		background-color: #00FF00;
	}

	.yellow {

		background-color: #FFFF00;
	}

	.red {
		background-color: #ff0000;
	}

	.charts-min {
		color: #666666;
		font-size: 26rpx;
	}

	.picker-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 998;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.buttonClass {
		width: 82%;
		margin: 10rpx auto;
		display: flex;
		justify-content: space-between;
		text-align: center;
		padding-top: 5px;
	}

	.buttonClass view {
		width: 22%;
		height: 56rpx;
		font-size: 26rpx;
		border-radius: 8%;
		line-height: 56rpx;
	}

	.buttonClass view:first-child {
		background-color: #f0f0f0;
		color: #0ea65d;
	}

	.buttonClass view:last-child {
		background-color: #05c160;
		color: #f5fffc;
	}

	page {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}

	uni-picker-view {
		display: block;
	}

	uni-picker-view .uni-picker-view-wrapper {
		display: flex;
		position: relative;
		overflow: hidden;
		height: 100%;
		background-color: white;
	}

	uni-picker-view[hidden] {
		display: none;
	}

	picker-view {
		width: 100%;
		// height: 600upx;
		height: 400rpx;
		margin-top: 20upx;
	}
</style>
<style lang="less">
	.classlist{
		width: 300rpx;
		height: 50rpx;
		margin: 0 0 30rpx 60rpx;
		font-size: 26rpx;
		border: .5rpx solid black;
		// border-top: 1rpx solid black;
		font-family: Source Han Sans CN;
		view{
			width: 100rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
		}
		view:nth-child(2){
			border-left: .5rpx solid black;
			border-right: .5rpx solid black;
		}
	}
	.inside {
		height: auto;
		width: 100%;
		display: flex;
	}

	.quarter1 {
		border-radius: 223rpx 0 20rpx 0;
		background-color: #aef0c2;
		position: relative;
		view{
			margin: 70rpx 58rpx 18rpx 108rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #66C184;
		}
		image{
			width: 70rpx;
			height: 70rpx;
			margin-left: 106rpx;
		}
		/* #66C184; */
		&:before {
			content: '';
			position: absolute;
			top: 60rpx;
			left: 50rpx;
			width: 50rpx;
			height: 1rpx;
			background-color: #aef0c2;
			transform: rotate(45deg);
		}

		&::after {
			content: '';
			position: absolute;
			top: 43rpx;
			left: -42rpx;
			width: 100rpx;
			height: 1rpx;
			background-color: #aef0c2;
			transform: rotate(0deg);
		}
	}

	.quarter2 {
		border-radius: 0 223rpx 0 20rpx;
		background-color: #FFEAC2;
		position: relative;
		view{
			margin: 70rpx 108rpx 18rpx 58rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FF9F3F;
		}
		image{
			width: 70rpx;
			height: 70rpx;
			margin-left: 54rpx;
		}
		&:before {
			content: '';
			position: absolute;
			top: 60rpx;
			left: 130rpx;
			width: 50rpx;
			height: 1rpx;
			background-color: #FFEAC2;
			transform: rotate(-45deg);
		}

		&::after {
			content: '';
			position: absolute;
			top: 43rpx;
			left: 172rpx;
			width: 100rpx;
			height: 1rpx;
			background-color: #FFEAC2;
			transform: rotate(0deg);
		}
	}

	.quarter3 {
		border-radius: 0 20rpx 0 223rpx;
		background-color: #FFB58D;
		position: relative;
		view{
			margin-left: 110rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FC470A;
		}
		image{
			width: 70rpx;
			height: 70rpx;
			margin: 41rpx 54rpx 6rpx 106rpx;
		}
		&:before {
			content: '';
			position: absolute;
			top: 185rpx;
			right: 120rpx;
			width: 150rpx;
			height: 1rpx;
			background-color: #FFB58D;
			// #FFB58D;
			// transform: rotate(-45deg);
		}
	}

	.quarter4 {
		border-radius: 20rpx 0 223rpx 0;
		background-color: #FF4747;
		position: relative;
		view{
			margin-left: 70rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FFFFFF;
		}
		image{
			width: 70rpx;
			height: 70rpx;
			margin: 41rpx 106rpx 6rpx 54rpx;
		}
		&:before {
			content: '';
			position: absolute;
			top: 185rpx;
			left: 120rpx;
			width: 150rpx;
			height: 1rpx;
			background-color: #FF4747;
			// #FFB58D;
			// transform: rotate(-45deg);
		}
	}

	view[class^="circular"] {
		width: 450rpx;
		height: 223rpx;
		margin: 0 auto;
		justify-content: space-between;
	}

	view[class^="quarter"] {
		width: 223rpx;
		height: 223rpx;
		color: white;
	}

	.guide-wrap {
		width: 620rpx;
		height: 500rpx;
		margin: 0rpx auto;
		// flex-direction: column;
	}
</style>
<style lang="scss" scoped>
	.parent-inside {
		width: 100%;
		height: 100%;
		background-color: white;
		// transition: all .3s;
	}

	.animation {
		background: rgba(0, 0, 0, .5);
		position: fixed;
		width: 100%;
		top: 0;
		right: 0;
		animation: animation .3s ease;
		height: 100%;
		z-index: 3;
	}




	.parent {
		height: 560rpx;
		width: 100%;
		background-color: white;
		z-index: 999;
		box-shadow: 2rpx 2rpx 3rpx #000000;
		position: fixed;
		animation: animation 1s ease;
		bottom: 0;
	}

	@keyframes animation {
		0% {
			position: fixed;
			width: 100%;
			bottom: -560rpx;
			right: 0;
		}

		100% {
			position: fixed;
			width: 100%;
			bottom: 0;
			right: 0
		}
	}

	.parentbutton {
		width: 90%;
		height: 40upx;
		margin: 10upx auto;
		display: flex;
		justify-content: space-between;
	}

	.parentbutton button {
		border: 0;
		color: #1989fa;
		width: 18%;
		font-size: 26upx;
		height: 46upx;
		line-height: 46upx;
	}

	.bor {
		width: 100%;
		height: 1rpx;
		border-bottom: 1px solid #f9f9f9
	}

	.button {
		width: 90%;
		height: 90rpx;
		border-radius: 12rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: white;
		border: none;
		background-color: #3e9dd9;
		line-height: 90rpx;
		margin: 50rpx auto;
		box-shadow: 6rpx 3rpx 12rpx 1rpx #e1e1e1;
	}


	.charts-box {
		width: 100%;
		height: 400rpx;
		margin: 0 auto;
		// background-color: #1989fa;
	}

	.header-wrap {
		width: 710rpx;
		height: 312rpx;
		margin: 20rpx auto;
		background: #FFFFFF;
		border-radius: 10rpx;
		overflow: hidden;

		.top {
			width: 90%;
			margin: 32rpx auto;
			font-size: 28Rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 52rpx;

			view {
				display: flex;
			}
		}

		.bottom {
			width: 89.6%;
			margin: .8rpx auto;
			display: flex;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #32529B;

			.first {
				width: 200rpx;
				height: 60rpx;
				border: 2rpx solid #32529B;
				border-radius: 10rpx;
				text-align: center;
				line-height: 60rpx;
			}

			.last {
				width: 200rpx;
				height: 60rpx;
				color: #FFFFFF;
				background: #32529B;
				border: 2rpx solid #32529B;
				border-radius: 10rpx;
				text-align: center;
				line-height: 60rpx;
				margin-left: 32rpx;
			}
		}
	}

	.flex {
		display: flex;
	}

	.items {
		align-items: center;
	}

	.justify {
		justify-content: space-between;
	}

	.middle-wrap {
		width: 710rpx;
		height: 53rpx;
		margin: 41rpx auto;

		.left {
			width: 142rpx;
			height: auto;
			text-align: right;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}

		.right {
			width: 210rpx;
			height: 53rpx;
			background: #FFFFFF;
			border-radius: 27rpx;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}
	}

	.arrow {
		width: 12rpx;
		height: 12rpx;
		border: 1px solid #828282;
		border-left: none;
		border-bottom: none;
		transform: rotate(45deg);
	}

	.chart-wrap {
		width: 640rpx;
		height: 70rpx;
		margin: 60rpx auto 36rpx auto;
		border-radius: 35rpx;
		display: flex;

		view {
			width: 160rpx;
			line-height: 100%;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #32529B;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.one {
			border: 3rpx solid #32529B;
			border-radius: 38rpx 0 0 38rpx;
		}

		.two {
			border-top: 3rpx solid #32529B;
			border-bottom: 3rpx solid #32529B;
		}

		.three {
			border-top: 3rpx solid #32529B;
			border-left: 3rpx solid #32529B;
			border-bottom: 3rpx solid #32529B;
		}

		.four {
			border: 3rpx solid #32529B;
			border-radius: 0 38rpx 38rpx 0;
		}
	}

	.chart1 {
		background-color: #32529B;
		color: #FFFFFF;
	}

	.chart2 {
		background-color: #FFFFFF;
		color: #32529B;
	}

	.chart {
		width: 710rpx;
		height: auto;
		margin: 0 auto;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	.bottom-frame {
		width: 100%;
		height: 600rpx;
		position: fixed;
		bottom: 0;
		z-index: 100;
		background-color: white;
		border-top-right-radius: 15rpx;
		border-top-left-radius: 15rpx;
	}

	.sign {
		width: 690rpx;
		height: 532rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		margin: 30rpx auto;
		overflow: hidden;

		.title {
			margin: 54rpx auto 0 auto;
			text-align: center;
			font-size: 34rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #333333;
		}

		.tion {
			width: 600rpx;
			height: auto;
			margin: 39rpx auto 63rpx auto;

			view {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}

			input {
				height: 60rpx;
				width: 600rpx;
				border-bottom: 1px solid #DCDCDC;
				;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #BBBBBB;
				margin-top: 6rpx;
			}

			.tagging {
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FF1E30;
				margin-top: 23rpx;
			}
		}
	}

	.button {
		width: 690rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border: 0;
		margin: 94rpx auto;
		background: #ECD91D;
		border-radius: 10rpx;
	}
</style>
