<template>
	<view>
		<view class="header-wrap">
			<view class="header">
				<image :src=user.user.headimg mode="aspectFill"></image>
				<view>{{user.user.nickname}}</view>
			</view>
		</view>
		<view class="list-wrap" @click="jump('../signin/activity')">
			<view class="list">
				<view class="left">
					<image src="../../static/index/13.png" mode="aspectFill"></image>
					<view>我的活动</view>
				</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view class="list-wrap" @click="jump('1')">
			<view class="list">
				<view class="left">
					<image src="../../static/index/13.png" mode="aspectFill"></image>
					<view>我的信息</view>
				</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view class="list-wrap martop">
			<view class="list">
				<view class="left">
					<image src="../../static/index/14.png" mode="aspectFill"></image>
					<view>客服中心</view>
				</view>
				<view class="phone" @click="call(user.customer_tel)">{{user.customer_tel}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{},
				customer_tel:"",
			}
		},
		onLoad() {
		
		},
		onShow() {
			//获取我的信息
			this.listItem();
		},
		methods: {
			//获取我的信息
			listItem(){
				this.$http.request({
					url:'getUserInfo',
					method:'GET',
					header: {
						'Content-type': 'multipart/form-data',
					},
				}).then(res =>{
					this.user = res.data.data;
				})
			},
			call(res){
				this.$common.call(res);
			},
			jump(res){
				if(res == 1){
					let nickname = this.user.user.nickname;
					let headimg = this.user.user.headimg;
					this.$common.navigator('../signin/edit?nickname='+nickname+ '&&headimg=' + headimg);
				}else{
					this.$common.navigator(res);
				}
			}
		},
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
	.header-wrap{
		width: 100%;
		height: 312rpx;
		overflow: hidden;
		background-image: url("../../static/index/1.png");
		.header{
			width: 710rpx;
			height: 119rpx;
			display: flex;
			align-items: center;
			margin: 159rpx auto 0 auto;
			image{
				width: 119rpx;
				height: 119rpx;
				border-radius: 100%;
			}
			view{
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #FFFFFF;
				margin-left: 19rpx;
			}
		}
	}
	.list-wrap{
		margin: 20rpx auto 0 auto;
		width: 710rpx;
		height: 101rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		.list{
			height: 100%;
			width: 670rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				height: 40rpx;
				line-height: 40rpx;
				image{
					width: 40rpx;
					height: 40rpx;
				}
				view{
					margin-left: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}
			.right{
				width: 14rpx;
				height: 14rpx;
				border: 1px solid #828282;
				border-left: none;
				border-bottom: none;
				transform: rotate(45deg);
			}
			.phone{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #EFC116;
			}
		}
	}
	.martop{
		margin-top: 40rpx;
	}
</style>