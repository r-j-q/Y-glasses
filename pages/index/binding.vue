<style lang="scss">
	.bottom-frame {
		width: 100%;
		height: 600rpx;
		position: fixed;
		bottom: 0;
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
	
	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: black;
		opacity: .3;
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
</style>
<template>
	<view class="content">
		<view class="main-wrap">
			<image src="../../static/index/16.png" mode="aspectFill" class="image1" v-if="stateid == 2"></image>
			<image src="../../static/index/23.png" mode="aspectFill" class="image1" v-if="stateid == 1"></image>
			<view class="name">{{ipment}}</view>
			<view class="two" v-if="stateid == 1">
				<image src="../../static/index/24.png" mode="aspectFill"></image>
				<view style="color: #999999;">已断开</view>
			</view>
			<view class="two" v-if="stateid == 2">
				<image src="../../static/index/17.png" mode="aspectFill"></image>
				<view>已连接</view>
			</view>
			<view class="three" @click="connect()" v-if="stateid == 1">
				<view>连接蓝牙</view>
			</view>
			<view class="three"@click="closeBle()" v-if="stateid == 2" style="color: #32529B;">
				<view>断开连接</view>
			</view>
			<view style="color: red;margin-top: 26rpx;font-size: 23rpx;">
				<view>请开启蓝牙和定位后进行连接</view>
			</view>
		</view>
		<image src="../../static/index/15.png" mode="aspectFill" class="image-bottom"></image>
		<view v-for="(item,index) in inArray" :key="index" @click="createBLEConnection(item)"
			style="display: flex;justify-content: space-between;width: 100%;height: auto;">
			<view>
				name:{{item.name}}
			</view>
			<view>
				deviceId:{{item.deviceId}}
			</view>
		</view>
		
		
		
		<view class="mask" v-if="lyswitch" @click="climask()"></view>
		<view class="bottom-frame" v-if="lyswitch">
			<view class="sign">
				<view class="title">请在下方输入手机号查询</view>
				<view class="tion">
					<view class="tion1">手机号</view>
					<input class="tion2" type="text" v-model="user_phone" placeholder="请输入绑定的手机号"
						placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
				</view>
				<button class="button-ion" @click="mitlog()">查询</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inArray: [],
				index: 0,
				address: '',
				lydeviceId: "", //蓝牙眼镜地址
				children_name: "", //儿童姓名
				aswitch: true, //输入儿童姓名显示隐藏
				deviceId: "",
				ipment:"",
				stateid:"",
				lyswitch:false,
				user_phone:"",
				record:1,
				debounce:true,//节流
				interval:"",//计时器
				jsq:1,
			}
		},
		onReady(){
		},
		onLoad() {

		},
		onShow(){
			this.obtain();
		},
		onHide(){
			clearInterval(this.interval);
		},
		onUnload(){
			clearInterval(this.interval);
		},
		methods: {
			climask(){
				this.lyswitch = false;
			},
			obtain(){
				this.record = 1;
				var mac = uni.getStorageSync('mac_address');
				this.deviceId = mac;
				this.user_phone = uni.getStorageSync("user_phone");
				var App = getApp();
				this.stateid = App.globalData.stateid;
			},
			connect() {
				var App = getApp();
				var bledeviceId;
				//缓存里没有手机号的情况
				if(!this.user_phone){
						this.lyswitch = true;
					} else {
						var that = this;
						console.log(that.debounce,"未进入if判断");
						if(that.debounce){
							that.record = 1;
							that.debounce = false;
							that.connectDevice();
						}
					}
			},
			//15秒为连接提醒用户重连
			chronology(){
				var that = this;
				// var App = getApp();
				// var intvalid = App.globalData.stateid;
					var interval = setInterval(()=>{
						that.record++;
						if(that.stateid == 2){
							clearInterval(interval);
						}
						if(that.record >= 15 && that.stateid != 2){
							clearInterval(interval); 
							that.record = 1;
							uni.stopBluetoothDevicesDiscovery({
								success: function(res) {
									console.log('连接失败');
								}
							});
							uni.showToast({
								title:"请折起静腿并重新打开后再次连接",
								icon:'none',
								duration:5000
							})
							that.debounce = true;
							let con= uni.getStorageSync('counting');
							console.log("外部con",con);
							if(con >= 2){
								uni.removeStorageSync("mac_address");
								uni.removeStorageSync("user_phone")
								that.user_phone = "";
								that.mac_address = "";
								uni.setStorageSync('counting',1);
							}else{
								let unt = con + 1;
								console.log(unt,"unt--->counting");
								uni.setStorageSync('counting',unt);
							}
						}
					},1000)
					that.interval = interval;
				
			},
			mitlog(){
				if(!/^1[3456789]\d{9}$/.test(this.user_phone)){
					this.$common.showToast("请输入正确手机号");
					return;
				}
				this.$http.glassesEst({
					url: "users/children",
					method: 'GET',
					data: {
						phone: this.user_phone
					}
				}).then(res => {
					if (res.data.status == 200) {
						var len = res.data.data.children.length - 1;
						if(res.data.data.children[len].mac_address){
							this.$common.setStorage("user_phone",this.user_phone);
							this.$common.setStorage("mac_address",res.data.data.children[len].mac_address);
							this.deviceId = res.data.data.children[len].mac_address;
							this.connectDevice();
						}else{
							this.$common.navigator("/pages/lanya/blebinding?user_phone="+ this.user_phone);
						}
					} else {
						this.$common.navigator("/pages/lanya/blebinding?user_phone="+ this.user_phone);
					}
					this.lyswitch = false;
				})
			},
			//初始化蓝牙适配器
			connectDevice() {
				var that = this;
				console.log("进入1")
				uni.openBluetoothAdapter({
					//调用微信小程序api 打开蓝牙适配器接口
					success: function(res) {
						that.findBlue();
					},
					fail: function(res) {
						//如果手机上的蓝牙没有打开，可以提醒用户
						uni.showToast({
							title: '请打开蓝牙',
							type: 'error',
							icon: 'none'
						});
						that.record = 1;
						that.debounce = true;
					}
				});
			},
			//搜索设备
			findBlue() {
				var that = this;
				that.chronology();
				console.log("进入2")
				uni.startBluetoothDevicesDiscovery({
					// services:'',  要搜索的蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。
					allowDuplicatesKey: false,
					interval: 0,
					success: function(res) {
						uni.showLoading({
							title: '正在搜索设备'
						});
						that.getBlue();
					},
					fail:function(res){
						var that = this;
						that.record = 1;
						that.debounce = true;
					}
				});
			},



			getBlue() {
				var that = this;
				console.log("进入3", that.deviceId);
				//uni.getBluetoothDevices获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备
				uni.onBluetoothDeviceFound(() => {
					uni.getBluetoothDevices({
						success: function(res) {
							for (var i = 0; i < res.devices.length; i++) {
								if (res.devices[i].deviceId == that.deviceId) {
									that.connetBlue(that.deviceId);
								}
							}
						},
						fail: function() {
							var that = this;
							that.record = 1;
							that.debounce = true;
							that.$common.showToast('搜索蓝牙设备失败');
						}
					});
				})
			},
			//根据设备id连接设备
			connetBlue() {
				console.log("进入4")
				var that = this;
				uni.createBLEConnection({
					deviceId: that.deviceId, //设备id
					success: function(res) {
						uni.showToast({
							title: '连接成功',
							icon: 'fails',
							duration: 800
						});
						//蓝牙连接成功，将值该外2
						var App = getApp();
					    App.globalData.stateid = 2;
						that.stateid = 2;
						uni.stopBluetoothDevicesDiscovery({
							success: function(res) {
								console.log('连接蓝牙成功之后关闭蓝牙搜索');
							}
						});
						that.record = 1;
						that.debounce = true;
						that.testing();
						// that.getServiceId();
					},
					fail:function(){
						that.record = 1;
						that.debounce = true;
					}
				});
			},
			//蓝牙异常断开
			testing() {
				console.log("进入5")
				var that = this;
				uni.onBLEConnectionStateChange(function(res) {
					if(res.connected == false){
						that.record = 1;						
						that.debounce = true;
						that.$common.showToast("蓝牙断开")
						var App = getApp();
						App.globalData.stateid = 1;
						that.stateid = 1;
					}
				})
			},
			//蓝牙断开连接
			closeBle() {
				console.log("进入6")
				var that = this;
				uni.closeBLEConnection({
					deviceId: that.deviceId,
					success(res) {
						that.record = 1;
						that.debounce = true;
						var App = getApp();
						App.globalData.stateid = 1;
						that.stateid = 1;
					}
				})
			},

		}
	}
</script>

<style>
</style>
<style>
	page {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	.content {
		height: 100vh;
		overflow: auto;
	}

	.main-wrap {
		width: 650rpx;
		height: auto;
		margin: 295rpx auto 20rpx auto;
		display: flex;
		align-items: center;
		flex-direction: column;

		.image1 {
			width: 100%;
			height: 259rpx;
		}

		.name {
			margin-top: 86rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}

		.two {
			width: 106rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 23rpx;
			margin-top: 30rpx;

			image {
				width: 20rpx;
				height: 23rpx;
			}

			view {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #32529B;
			}
		}

		.three {
			width: 163rpx;
			height: 163rpx;
			margin-top: 59rpx;
			background: #FFFFFF;
			box-shadow: 0 5rpx 51rpx 0 rgba(98, 98, 98, 0.11);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			view {
				text-align: justify;
				width: 50rpx;
				height: 60rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}
	}

	.list {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		width: 50%;
	}

	.image-bottom {
		width: 750rpx;
		height: 315rpx;
		position: absolute;
		bottom: 0;
	}
</style>
