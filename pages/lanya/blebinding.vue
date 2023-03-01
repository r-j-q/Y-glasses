<template>
	<view>
		<view class="blename-wrap" :style="{'height':screenHeight+'rpx'}">
			<view class="blename-top" v-if="newDeviceList != ''"  ></view>
			<view class="blename" v-for="(item,index) in newDeviceList" :key="index" @click="bleding(item)">
				<view class="blename-neibu">
					<view>{{item.name}}</view>
					<view>{{item.deviceId}}</view>
				</view>
			</view>
		</view>
		
		<view class="mask" v-if="lyswitch" @click="mask()"></view>
		<view class="bottom-frame" v-if="lyswitch">
			<view class="sign">
				<view class="title">请填写儿童姓名完成绑定</view>
				<view class="tion">
					<view class="tion1">姓名</view>
					<input class="tion2" type="text" v-model="children_name" placeholder="请输入姓名"
						placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
				</view>
				<view class="tion">
					<view class="tion1">儿童生日</view>
					<picker mode="date" :value="date" @change="bindDateChange" fields="day">
						<view class="uni-input tion3"	>
							{{date}}
						</view>
					</picker>
				</view>
				<view class="tion">
					<view class="tion1">设备名称</view>
					<view class="tion3">{{ipment}}</view>
				</view>
				<button class="button-ion" @click="mitlog()">绑定</button>
			</view>
		</view>
		<view class="btn-wrap">
			<button type="primary" class="btn-wrap1" @click="searchDevice" v-if="bluetoothStatus == 1">搜索设备</button>
			<button type="warn" class="btn-wrap2" @click="stopSearch" v-if="bluetoothStatus == 2" loading="bluetoothStatus == 2">停止搜索</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bluetoothStatus:1,
				newDeviceList:[],
				lyswitch:false,
				date: "选择儿童生日",
				ipment:"",//设备名称
				user_phone:"",//绑定手机号
				mac_address:"",//设备id
				children_name:"",//绑定姓名
				user_id:"",//用户id
				screenHeight:""
			}	
		},
		onLoad(option) {
			this.user_phone = option.user_phone;
		},
		onUnload(){
			this.stopSearch();
		},
		onReady() {
			// 计算屏幕剩余高度  填补剩余高度
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					let windowHeight = (res.windowHeight * (750 / res.windowWidth));
					_this.screenHeight = windowHeight-120;
				}
			});
		},
		onShow() {
			
		},
		methods:{
			mask(){
				this.lyswitch = false;
			},
			// 根据手机号创建用户
			mitlog() {
				if (!/^1[3456789]\d{9}$/.test(this.user_phone)) {
					this.$common.showToast("手机号无效");
					return;
				}
				if (!this.children_name) {
					this.$common.showToast("请输入姓名");
					return;
				}
				if(!this.date || isNaN(Date.parse(this.date)) != false){
					this.$common.showToast("请选择儿童生日");
					return;
				}
				uni.setStorage({
					key: 'user_phone',
					data: this.user_phone
				});
				uni.setStorage({
					key: 'mac_address',
					data: this.mac_address,
				});
				uni.showToast({
					title:"绑定中",
					icon:"none"
				});
				//根据用户创建id
				this.$http.glassesEst({
					url: "users",
					method: 'POST',
					data: {
						phone: this.user_phone
					}
				}).then(res => {
					if (res.data.status == 200) {
						this.user_id = res.data.data.user_id;
						this.addChildren();
					} else {
						this.$common.showToast(res.data.message);
					}
				})
			},
			//用户添加儿童
			addChildren() {
				this.$http.glassesEst({
					url: "children/add",
					method: 'POST',
					data: {
						user_id: this.user_id,
						child_name: this.children_name
					}
				}).then(res => {
					console.log(res, "用户添加儿童");
					if (res.data.status == 200) {
						this.children_id = res.data.data.childId
						this.update_birthday();
					} else {
						this.$common.showToast(res.data.message);
					}
				})
			},
			update_birthday(){
				console.log(this.date,"this.date,");
				this.$http.glassesEst({
					url: "users/update_birthday",
					method: 'PUT',
					data: {
						child_id: this.children_id,
						birthday:this.date,
					}
				}).then(res=>{
					if (res.data.status == 200) {
						this.binding();
					} else {
						this.$common.showToast(res.data.message);
					}
					
				})
			},
			//镜腿绑定
			binding() {
				this.$http.glassesEst({
					url: "users/device",
					method: 'POST',
					data: {
						child_id: this.children_id,
						mac_address: this.mac_address,
						device_type: "v2m"
					}
				}).then(res => {
					// this.$common.setStorage("children_id",this.children_id)
					if (res.data.status == 200) {
						uni.hideLoading();
						// this.$common.showToast("绑定成功");
						uni.showToast({
							title: '绑定成功',
							duration: 2000
						})
						this.stopSearch();
						var that = this;
						setTimeout(() =>{
							uni.navigateBack({
								delta: 1 //返回的页面数
							});
						},2000)
					} else {
						this.$common.showToast(res.data.message);
					}
					this.lyswitch = false;
					
				})
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
			
			//绑定设备
			bleding(info){
				this.lyswitch = true;
				this.ipment = info.name; 
				this.mac_address = info.deviceId;
			},
			bindDateChange:function(e) {
				let str = e.detail.value;
				console.log(str,"bindDateChange-str");
				this.date = str;
			},
			//开始搜索
			searchDevice(){
				var that = this;
				that.bluetoothStatus = 2;
				that.connectDevice()
			},
			connectDevice() {
				var that = this;
				uni.openBluetoothAdapter({
					//调用微信小程序api 打开蓝牙适配器接口
					success: function(res) {
						console.log("调用微信小程序api 打开蓝牙适配器接口");
						that.findBlue();
					},
					fail: function(res) {
						//如果手机上的蓝牙没有打开，可以提醒用户
						uni.showToast({
							title: '请打开蓝牙',
							type: 'error',
							icon: 'none'
						});
					}
				});
			},
			//搜索设备
			findBlue() {
				var that = this;
				uni.startBluetoothDevicesDiscovery({
					// services:'',  要搜索的蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。
					allowDuplicatesKey: false,
					interval: 0,
					success: function(res) {
						console.log("开启搜索设备");
						that.getBlue();
					}
				});
			},
			
			
			
			getBlue() {
				var that = this;
				//uni.getBluetoothDevices获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备
				uni.onBluetoothDeviceFound(() => {
					console.log("进行设备搜索");
					uni.getBluetoothDevices({
						success: function(res) {
							console.log("搜索到的设备",res)
							uni.hideLoading();
							that.newDeviceList = res.devices;
						},
						fail: function() {
							console.log('搜索蓝牙设备失败');
						}
					});
				})
			},
			stopSearch(){
				var that = this;
				that.bluetoothStatus = 1;
				uni.stopBluetoothDevicesDiscovery({
					success: function(res) {
						console.log('连接蓝牙成功之后关闭蓝牙搜索');
					},
				});
			}
		}
	}
</script>

<style>
		.blename-wrap{
			width: 90%;
			margin: 20rpx auto 0 auto;
			line-height: 100rpx;
			overflow: scroll;
		}
		.blename{
			width: 100%;
			height: 100rpx;
			border-bottom: 1rpx solid #e5e5e5;
		}
		.blename-top{
			width: 100%;
			height: 1rpx;
			background-color: #e5e5e5;
		}
		.blename-neibu{
			width: 90%;
			height: 100%;
			display: flex;
			margin: 0 auto;
			justify-content: space-between;
		}
		.blename-neibu view:first-child{
			color: #000;
			font-size: 30rpx;
		}
		.blename-neibu view:last-child{
			color: #828282;
			font-size: 32rpx;
		}
		.ding{
			position: absolute;
			height: 700rpx;
			width: 600rpx;
			background-color: aqua;
			top: 280rpx;
			left: 75rpx;
		}
		.ding1{
			margin: 50rpx auto 30rpx auto;
			font-weight: 600;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			width: 100%;
			text-align: center;
		}
		.bottom-frame {
			width: 100%;
			height: 800rpx;
			position: fixed;
			bottom: 0;
			z-index: 100;
			background-color: white;
			border-top-right-radius: 15rpx;
			border-top-left-radius: 15rpx;
		}
		
		.sign {
			width: 690rpx;
			height: 800rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			margin: 30rpx auto;
			overflow: hidden;
		}
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
		}
		
		
		.tion2{
			height: 60rpx;
			width: 600rpx;
			border-bottom: 1px solid #DCDCDC;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #BBBBBB;
			margin-top: 6rpx;
		}
		.tion3{
			height: 60rpx;
			width: 600rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #BBBBBB;
			margin-top: 6rpx;
		}
		.tion1 {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
		}
		.tagging {
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FF1E30;
			margin-top: 23rpx;
		}
		.button-ion {
			width: 690rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border: 0;
			margin: 0rpx auto;
			background: #ECD91D;
			border-radius: 10rpx;
		}
		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: black;
			opacity: .3;
		}
	/* pages/device/new.wxss */
	.scroll-wrap {
	  width: 100vw;
	  height: 100vh;
	  padding: 0 30rpx;
	  padding-bottom: 150rpx;
	  box-sizing: border-box;
	}
	
	.btn-wrap {
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  width: 100vw;
	  height: 100rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.btn-wrap button{
		width: 300rpx;
		height: 70rpx;
		font-size: 32rpx;
		line-height: 70rpx;
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