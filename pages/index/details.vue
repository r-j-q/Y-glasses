<template>
	<view>
		<view class="title">{{list.name}}</view>
		<view class="mian">
			 <rich-text :nodes="list.content"></rich-text>
			 <image :src=list.cover mode="aspectFill" class="image-text"></image>
		 </view>
		 <view class="time flex">
			 <view>时间:</view>
			 <view>{{list.create_at}}</view>
		 </view>
		 <view class="time flex">
			 <view>地址:</view>
			 <view>{{list.address}}</view>
		 </view>
		 <view class="sign">
			 <view class="title">请填写活动报名信息</view>
			 <view class="tion">
				 <view>姓名</view>
				 <input type="text" v-model="username" placeholder="请输入" placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;"/>
				 <view class="tagging">*请输入姓名</view>
			 </view>
			 <view class="tion">
				 <view>联系方式</view>
				 <input type="text" v-model="phone" placeholder="请输入" placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;"/>
				 <view class="tagging">*请输入联系方式</view>
			 </view>
		 </view>
		 <button class="button" @click="mit()">立即提交</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:'',
				//详情
				content:{
					title:'',
					img:'',
					time:''
				},
				activity_id:"",
				username:"",
				phone:"",
				id:"",
			}
		},
		onShow() {
			//获取信息
			this.contentList();
		},
		onLoad(option){
			this.id = option.id
		},
		methods:{
			//获取信息
			contentList(){
				var data = {
					id:this.id
				}
				this.$http.request({
					url:'getActivityDetails',
					method:'GET',
					header: {
						'Content-type':'multipart/form-data',
					},
					data:data,
				}).then(res =>{
					if(res.data.code == 200){
						console.log(res.data);
						var res = res.data.data.data;
						this.list = res;
						this.activity_id = res.id;
					}else{
						console.log(res.data.info);
						this.$common.showToast(res.data.info);
					}
				})
			},
			mit(){
				if(!this.username){
					this.$common.showToast("请输入姓名");
					return;
				}
				if(!/^1[3456789]\d{9}$/.test(this.phone)){
					this.$common.showToast("请输入手机号");
					return;
				}
				var data = {
					activity_id:this.activity_id,
					name:this.username,
					phone:this.phone
				};
				this.$http.request({
					url:'applyActivity',
					method:'POST',
					header: {
						'Content-type':'applicktion/json',				
					},
					data:data
				}).then(res=>{
					if(res.data.code == 200){
						var res = res.data;
						this.$common.showToast(res.info);
						setTimeout(()=>{
							uni.switchTab({
								url:"../index/index",
								animationType: 'pop-in',
								animationDuration: 300
							})
						},2000)
					}else{
						var res = res.data;
						this.$common.showToast(res.info)
					}
					
				})
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	.title{
		width: 692rpx;
		margin: 59rpx auto;
		font-size: 40rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #333333;
	}
	.mian{
		width: 684rpx;
		height: auto;
		margin: 0 auto;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #333333;
	}
	.sign{
		width: 690rpx;
		height: 532rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		margin: 30rpx auto;
		overflow: hidden;
		.title{
			margin:54rpx auto 0 auto;
			text-align: center;
			font-size: 34rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #333333;
		}
		.tion{
			width: 600rpx;
			height: auto;
			margin: 39rpx auto 63rpx auto;
			view{
				font-size: 28rpx;	
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
			input{
				height: 60rpx;
				width: 600rpx;
				border-bottom:1px solid #DCDCDC;;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #BBBBBB;
				margin-top: 6rpx;
			}
			.tagging{
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FF1E30;
				margin-top: 23rpx;
			}
		}
	}
	.button{
		width: 690rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border: 0;
		margin: 94rpx auto;
		background: #ECD91D;
		border-radius: 10rpx;
	}
	.image-text{
		width: 690rpx;
		height: 390rpx;
		margin: 20rpx auto;
	}
	.time{
		margin: 20rpx auto;
		width: 684rpx;
		height: 30rpx;
		line-height: 30rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #333333;
	}
</style>