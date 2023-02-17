<template>
	<view>
		<view class="main-wrap" v-for="(item,index) in list" :key="index">
			<image :src=item.cover mode="aspectFill"></image>
			<view class="main-bottom">
				<view class="left">{{item.name}}</view>
				<view class="right" @click="jump('./details?id='+item.id)">立即预约</view>
			</view>
		</view>
		<view class="bottom" v-if="state">没有更多内容了~</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				tity:1,
				state:false
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.list = [];
			this.tity = 1;;
			this.activityList();
		},
		onReachBottom(){
			console.log("触底了");
			this.tity++;
			this.activityList(this.tity);
		},
		methods:{
			jump(res){
				this.$common.navigator(res);
			},
			activityList(res){
				var data = {
					page:res,
					limit:10,
				}
				this.$http.request({
					url:'getActivityLst',
					method:'GET',
					header: {
						'Content-type': 'multipart/form-data',
					},
					data:data,
				}).then(res =>{
					if(res.data.code == 200){
						var info = res.data.data.data;
						info.forEach((item)=>{
							this.list.push(item);
						})
					}else{
						uni.showToast({
							title:res.data.info,
							icon:'none',
							duration:2000
						})
					}
					this.state = res.data.data.data.length == 0 ? true : false
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
	.bottom{
		margin: 60rpx auto 30rpx auto;
		width: 100%;
		text-align: center;
	}
	.main-wrap{
		width: 710rpx;
		height: 408rpx;
		background: #FFFFFF;
		opacity: 0.98;
		border-radius: 30rpx;
		margin: 22rpx 20rpx;
		image{
			width: 670rpx;
			height: 256rpx;
			margin: 23rpx 20rpx 30rpx 20rpx;
		}
		.main-bottom{
			width: 640rpx;
			height: 66rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				width: 405rpx;
				height: 66rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 36rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.right{
				width: 160rpx;
				height: 50rpx;
				font-size: 22rpx;
				background: #ECD91D;
				border-radius: 10rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}
</style>


