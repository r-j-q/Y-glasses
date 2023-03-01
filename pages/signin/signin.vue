<style lang="scss">
	.header-wrap {
		width: 90%;
		margin: 0 auto;
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

	.phone-wrap {
		position: absolute;
		width: 80%;
		height: 480rpx;
		background-color: white;
		border-radius: 15rpx;
		left: 10%;
		margin-top: 220rpx;
		z-index: 100;

		.phone {
			width: 80%;
			margin: 200rpx auto 0 auto;
			text-align: center;

			.first {
				font-size: 42rpx;
				font-weight: 500;
			}

			.last {
				font-size: 26rpx;
				font-weight: 400;
				color: #9b9a9d;
				margin-top: 10rpx;
			}

			.bottom-phone {
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				margin: 30rpx auto;
				font-size: 35rpx;
				border-radius: 60rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
<template>
	<view>
		<view class="mask" v-if="visible"></view>
		<view class="phone-wrap" v-if="visible">
			<view class="phone">
				<view class="first">绑定手机号</view>
				<view class="last">请先绑定手机号在进行操作</view>
				<button type="primary" class='bottom-phone' open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber">微信用户一键绑定</button>
			</view>
		</view>
		<view class="header-wrap">
			<view class="header">
			</view>
			<view class="content">
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<button class="bottom" type="primary" withCredentials="true" @tap="getUserProfile">授权登录</button>
			<!-- <button type="primary" class='btn' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">使用手机号登录</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				code: '',
				openid: '',
				encryptedData: '',
				iv: '',
				visible: false,
			}
		},
		onLoad() {},
		methods: {
			getPhoneNumber(e) {
				console.log(e, e.detail.errMsg, "methods-微信认证e");
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					var e = e.detail;
					let that = this;
					uni.login({
						"provider": "weixin",
						"onlyAuthorize": true, // 微信登录仅请求授权认证
						success: function(event) {
							console.log(event, "console.log-event");
							const {
								code
							} = event
							//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
							var data = {
								code: event.code,
								encryptedData: e.encryptedData,
								iv: e.iv,
							}
							console.log(data, "获取手机号data");
							that.add_login(data)
						},
						fail: function(err) {
							console.log(err, "err登录授权失败");
							// 登录授权失败  
							// err.code是错误码
						}
					})
				} else {
					this.$common.showToast("您拒绝了请求,不能正常使用小程序")
				}
			},


			add_login(data) {
				let that = this;
				that.$http.request({
					url: 'login',
					method: 'POST',
					header: {
						'Content-Type': 'applicktion/json',
					},
					data: data,
				}).then(res => {
					if (res.data.code == 200) {
						this.$common.showToast(res.data.info);
						this.$common.setStorage("token", res.data.data.token);
						this.$common.setStorage("list_phone", res.data.data.phone);
						uni.navigateBack({
							delta: 1 // 返回的页面数
						})
						// uni.navigateTo({

						// })
						// this.$common.navigator('./index/index');
					}
					console.log(res, "sigin-login-res");
				})
			},

			getUserProfile() {
				uni.getUserProfile({
					desc: '登录',
					success: (info) => {
						console.log(info)
						//这里取到的是用户的信息，自己安排自己的业务
						uni.login({
							provider: 'weixin',
							success: (res) => {
								console.log(res, "用户信息");
								console.log(info, "用户info")
								// uni.showLoading({
								// 	title: '登录中'
								// });
								var arr = [{
									"avatarUrl": info.userInfo.avatarUrl,
									"nickName": info.userInfo.nickName,
									"gender": info.userInfo.gender
								}];
								var drr = JSON.stringify(arr);
								var data = {
									code: res.code,
									userInfo: drr,
								}

								console.log(data, "code-data");
								this.$http.request({
									url: 'authorization',
									method: 'POST',
									header: {
										'Content-Type': 'applicktion/json',
									},
									data: data,
								}).then(login => {
									this.visible = true
									console.log(login, "login------");
								})

								//这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
							}
						})
					},
					fail: (err) => {
						console.log(err);
						this.$common.showToast('您拒绝了请求,不能正常使用小程序')
					}
				})
			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx auto 90rpx auto;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 86%;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
