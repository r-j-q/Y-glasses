<template>
	<view>
		<view class="activite-wrap" v-for="(item,index) in list" :key="index">
			<view class="top">
				<view></view>
				<view>{{item.name}}</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view>姓名:</view>
					<view>联系方式:</view>
					<view>体验地址:</view>
				</view>
				<view class="right">
					<view>
						<view v-if="item.name">{{item.name}}</view>
						<view v-else>无</view>
					</view>
					<view>
						<view v-if="item.phone">{{item.phone}}</view>
						<view v-else>无</view>
					</view>
					<view>
						<view v-if="item.address">{{item.address}}</view>
						<view v-else>无</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tips-bottom" v-if="state">没有更多内容了~</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				tity:1,//触底刷新的页数
				state:false
			}
		},
		onLoad() {
			this.activf(1);
		},
		onShow() {
			
		},
		onReachBottom(){
			let len = this.tity++;
			this.activf(len);
			uni.showLoading({
				title:"加载中",
			})
		},
		methods:{
			activf(index){
				var data = {
					page:index,
					limit:10
				};
				this.$http.request({
					url:'myActivityLst',
					method:'GET',
					header: {
						'Content-type':'multipart/form-data',
					},
					data:data,
				}).then(res =>{
					console.log(res,"res==200");
					
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
					uni.hideLoading();
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
	.tips-bottom{
		margin: 0 auto;
		line-height: 100rpx;
		height: 120rpx;
		width: 100%;
		text-align: center;
	}
	.activite-wrap{
		width: 710rpx;
		height: 326rpx;
		background: #FFFFFF;
		opacity: 0.98;
		border-radius: 30rpx;
		margin: 30rpx auto;
		.top{
			margin: 0 auto;
			width: 90%;
			height: 96rpx;
			border-bottom: 1rpx dashed #000000;
			display: flex;
			align-items: center;
			:first-child{
				width: 8rpx;
				height: 28rpx;
				background: #32529B;
			}
			:last-child{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #333333;
				margin-left: 10rpx;
			}
		}
		.bottom{
			width: 90%;
			height: 160rpx;
			margin: 35rpx auto;
			display: flex;
			.left{
				height: 160rpx;
				width: 166rpx;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.right{
				height: 160rpx;
				width: auto;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
</style>