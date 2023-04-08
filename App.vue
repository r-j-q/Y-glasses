<script>
	export default {
		globalData: {
			//1 蓝牙未连接  2蓝牙连接
			stateid:"1",
		        },
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	} 
</script>

<style lang="scss">  
	//支付组件  https://gitcode.net/dcloud/uni-pay/-/blob/master/pages/index/index.vue 
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性  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   */
	@import "@/uview-ui/index.scss";
</style>
