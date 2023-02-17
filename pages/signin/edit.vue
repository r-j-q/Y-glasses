<template>
	<view>
		<view class="tion" style="display: flex;flex-direction: column;justify-content: center;">
			<button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="changeAvatar">
				<image :src="avatar" class="avatar-img" mode="aspectFit" />
			</button>
			<text class="tion-text" style="width: 100%;text-align: center;">点击头像设置头像</text>
		</view>
		<view class="tion">
			<view>微信昵称</view>
			<input type="nickname" class="weui-input" v-model="nicknames" placeholder="请输入微信昵称"
				placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
		</view>
		<!-- <view class="top">
			<image :src=photo mode="aspectFill" class="image1" @click="upload()"></image>
			<!-- <view class="place">点击头像进行编辑</view> -->
		<button class="button" @click="jump()">保存</button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				username: "",
				phone: "",
				number: "",
				photo: "",
				photo1: "",
				idstate: true,
				scene: "",
				//微信头像
				avatar: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
				//微信昵称
				nicknames: "",
				token:"",
			}
		},
		onLoad(option) {
			this.token = this.$common.getStorages("token");
			this.nicknames = option.nickname;
			this.avatar = option.headimg;
		},
		onShow() {
		},
		methods:{
			changeAvatar(e) {
				console.log(e,"changeAvatar---changeAvatar");
				var that = this;
				if (e.detail.avatarUrl) {
					uni.uploadFile({
						url: 'http://bmj.shningmi.com/uploads',
						filePath: e.detail.avatarUrl,
						name: 'file',
						header:{
							"content-type":"multipart/form-data", 
							"token":that.token
						},
						success: (uploadFileRes) => {
							var data = JSON.parse(uploadFileRes.data);
							that.avatar = data.data.url;
						},
						fail: (error) => {
							uni.showToast({
								title: error,
								duration: 2000
							});
						},
						complete: () => {
							uni.hideLoading();
						}
					});
				}
			},
			jump(){
				var username;
				var userphoto;
				if(!this.avatar){
					this.$common.showToast("请设置头像")
					return;
				};
				if(!this.nicknames){
					this.$common.showToast("请输入名称");
					return;
				}
				var data = {
					nickname:this.nicknames,
					headimg:this.avatar,
				}
				this.$http.request({
					url:'editUser',
					method:'POST',
					header: {
						'Content-Type': 'applicktion/json',
					},
					data:data
					}).then(res=>{
						var that = this;
						that.$common.showToast(res.data.info)
						if(res.data.code == 200){
							setTimeout(()=>{
								uni.switchTab({
									url:"/pages/index/my"
								})
							},2000)
						}
					})
			},
			// upload(tion){
			// 	var that = this;
			// 	uni.chooseMedia({
			// 	  count: 1,
			// 	  mediaType: ['image'],
			// 	  sourceType: ['album', 'camera'],
			// 	  camera: 'back',
			// 	  success(res) {
			// 		  console.log(res,"res-res");
			// 		  var tempImg = res.tempFiles[0].tempFilePath;
			// 		  uni.uploadFile({
			// 		  	url:'http://bmj.shningmi.com/uploads',
			// 		  	filePath: tempImg,
			// 		  	name: 'file',
			// 			header:{
			// 				'Content-Type':'multipart/form-data'
			// 			},
			// 		  	success: (uploadFileRes) => {
			// 				console.log(uploadFileRes,"success-res");
			// 		  		var data = JSON.parse(uploadFileRes.data);
			// 				that.photo = data.data.url
			// 		  	}
			// 		  });
			// 	  }
			// 	})
			
			// },
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.tion{
		width: 660rpx;
		margin: 60rpx auto 0 auto;
	}
	.avatar-btn {
		height: 106rpx;
		width: 212rpx;
		border-radius: 20rpx;
		border: none;
		display: flex;
		background-color: white;
		justify-content: center;
		align-items: center;
	}
	/* .avatar-btn{
		
	}::after: 0 none; */
	
	.avatar-img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 20rpx;
	}
	.image1{
		width: 119rpx;
		height: 119rpx;
		border-radius: 100%;
	}
	.tion-text {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		margin-top: 36rpx;
	}
	.top{
		width: 660rpx;
		height: auto;
		margin: 50rpx auto 20rpx auto;
	}
	input{
		width: 660rpx;
		height: auto;
		margin: 20rpx auto 20rpx auto;
	}
		
	.place{
		width: 660rpx;
		margin: 0 auto;
		font-size: 28rpx;
		margin-top: 20rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #BBBBBB;
	}
	.button{
		width: 660rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border: 0;
		margin: 94rpx auto;
		background: #ECD91D;
		border-radius: 10rpx;
	}
	button::after{
	  border: none;
	}
</style>