<template>
	<view class="cont">
		<view class="header-wrap">
			<u-swiper height="600" :list="list1" @change="change" @click="click"></u-swiper>
			<!-- <image src="../../static/index/1.png" mode="aspectFill" class="image"></image>
			<image src="http://bmj.shningmi.com/bmj1.png" mode="aspectFill" class="image1"></image> -->
		</view>
		<view class="address-wrap-out">
			<view class="address-wrap">
				<view class="address flex justify items">
					<view class="left">上海市沪宜公路653号</view>
					<view class="right">
						<image src="../../static/index/3.png" mode="aspectFill" class="first"
							@click="handleMapLocation()"></image>
						<image src="../../static/index/4.png" mode="aspectFill" @click="call('15002113568')"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="border-bottom-20">


			<view class="main-wrap flex justify ">
				<view class="main" @click="jump('./binding')">
					<image src="../../static/index/8.png" mode=""></image>
					<view>绑定眼镜</view>
				</view>
				<view class="main" @click="jump('./statistics')">
					<image src="../../static/index/7.png" mode=""></image>
					<view>用眼统计</view>
				</view>
				<view class="main" @click="jump('./activity')">
					<image src="../../static/index/6.png" mode=""></image>
					<view>预约试用</view>
				</view>
				<view class="main">
					<image src="../../static/index/5.png" mode=""></image>
					<view>健康商城</view>
				</view>
			</view>
		</view>
		<view class="border-bottom-20">
		<view class="list">
			<view class="title">我的活动</view>
			<view class="list-mian" v-if="list.length>0" v-for="(item,index) in list" :key="index" @click="jump('./details?id='+item.id)">
				<image :src="item.cover" mode="scaleToFill"></image>
			</view>
			<view class="nodata-style"  v-if="list.length==0">
				
			 
			<u-empty
			 
			        mode="data"
			        icon="http://cdn.uviewui.com/uview/empty/data.png"
			>
			</u-empty>
			</view>
			<view class="bottom" v-if="state">没有更多内容了~</view>
		</view>
		</view>
		<view class="pointout-wrap" v-if="!token" @click="navi()">
			<view class="pointout">
				<view class="out1">登录后体验全部功能</view>
				<view class="flex out2">去登陆<view class="arrow"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				tity: 1,
				state: false,
				token: "",
				list1: [
					'http://bmj.shningmi.com/bmj1.png',
					'http://bmj.shningmi.com/bmj1.png'
				]
			}
		},
		onLoad() {
			this.counting();
		},
		onShow() {
			this.list = [];
			this.tity = 1;
			this.activityList(this.tity);
			this.token = this.$common.getStorages("token");
		},
		onReachBottom() {
			this.tity++;
			this.activityList(this.tity);
		},
		onShareAppMessage() {
			
		},
		methods: {
			change(){},
			//缓存里面存入记数
			counting() {
				// Counting
				uni.setStorageSync('counting', 1);
			},
			navi() {
				uni.navigateTo({
					url: "../signin/signin",
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			jump(res) {
				this.$common.navigator(res);
			},
			activityList(res) {
				var data = {
					page: res,
					limit: 10,
				}
				this.$http.request({
					url: 'getActivityLst',
					method: 'GET',
					header: {
						'Content-type': 'multipart/form-data',
					},
					data: data,
				}).then(res => {
					if (res.data.code == 200) {
						var info = res.data.data.data;
						console.log(info, "then-res");
						info.forEach((item) => {
							console.log(item, "item-forEach");
							this.list.push(item);
						})
					} else {
						uni.showToast({
							title: res.data.info,
							icon: 'none',
							duration: 2000
						})
					}
					this.state = res.data.data.data.length == 0 ? true : false
				})
			},
			//拨打电话
			call(res) {
				this.$common.call(res);
			},
			//页面跳转
			jump(res) {
				this.$common.navigator(res);
			},
			handleMapLocation() {
				let address = '上海市沪宜公路653号';
				uni.openLocation({
					// 传入你要去的纬度
					latitude: Number(31.29232),
					// 传入你要去的经度
					longitude: Number(121.31446),
					// 传入你要去的地址信息 不填则为空
					address: address,
					// 缩放大小
					scale: 18,
					success: function() {
						console.log('成功的回调success');
					}
				});
			},


		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f5f5f5;
	}

	.arrow {
		margin: auto 0 auto 10rpx;
		width: 12rpx;
		height: 12rpx;
		border: 1px solid #828282;
		border-left: none;
		border-bottom: none;
		transform: rotate(45deg);
	}

	.pointout-wrap {
		width: 100%;
		height: 60rpx;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		background-color: white;
		border-top: 1rpx solid #f8f9fa;
		box-shadow: 0 2rpx 40rpx 0 #f8f9fa;
		display: flex;
		position: fixed;
		bottom: 0;
		line-height: 60rpx;
		font-size: 26rpx;
	}

	.pointout {
		width: 86%;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
	}
	.nodata-style{
		padding: 60upx 0;
	}
</style>
<style lang="scss" scoped>
	$width:100%;

	.bottom {
		margin: 60rpx auto 30rpx auto;
		width: 100%;
		text-align: center;
	}

	.flex {
		display: flex;
	}

	.justify {
		justify-content: space-between;
	}

	.items {
		align-items: center;
	}

	.header-wrap {
		width: $width;
		// height: 500upx;




	}

	.header-top {
		width: 100%;
		height: 414rpx;
		background-color: #2C405A;
	}

	.address-wrap-out {
		width: 100%;
		background-color: #f5f5f5;
		border-bottom: 20upx solid #f5f5f5;
		border-top: 20upx solid #f5f5f5;
	}

	.address-wrap {
		width: 96%;
		padding: 40upx 20upx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 0 auto;


		.address {
			width: 100%;
			height: 100%;
			margin: 0 auto;

			.left {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.right {
				image {
					height: 60rpx;
					width: 60rpx;
				}

				.first {
					margin-right: 24rpx;
				}
			}
		}
	}

	.border-bottom-20 {
		border-bottom: 20upx solid #f5f5f5;
		border-radius: 10upx;
		background-color: #f5f5f5;
		overflow: hidden;
	}

	.main-wrap {
		width: 96%;
		height: auto;
		// margin: 10rpx auto 46rpx auto;
		margin: 0 auto;
		padding: 30upx;
		background-color: #fff;
		border-radius: 10upx;

		.main {
			justify-content: center;
			text-align: center;

			image {
				width: 112rpx;
				height: 112rpx;
			}

			view {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-top: 18rpx;
			}
		}
	}

	.list {
		width:96%;
		margin: 0 auto;
		overflow: hidden;
		height: auto;
		background: #FFFFFF;
		// border-radius: 30rpx;

		.title {
			width: 90%;
			 padding: 20upx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}

		.list-mian {
			width: 90%;
			margin: 20rpx auto;
			height: 260rpx;
			left: 5%;
			z-index: 99;
			border-radius: 30rpx;
			box-shadow: 1px 1px 3px 1px #bbb;

			image {
				border-radius: 30rpx;
				width: 100%;
				height: 194rpx;
				border-radius: 12rpx;
				margin-top: 36rpx;
			}
		}
	}
</style>
