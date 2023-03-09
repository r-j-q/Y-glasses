<template>
	<view class="containers">
		<echarts style="height: 400px;width: 750upx;" ref="echarts" :option="option" canvasId="echartsT"></echarts>
		<!-- 	<view class="container_week fontSize13 textColorffb860">
			<span class="mrr c1">MA5 82.5500 </span><span class='c2'> Ma10 82.5900</span><span class='c3'>MA30
				82.7700</span>
		</view> -->
		<!-- @click="echartsClick" -->
		<!-- <echarts onViewClick="echartsClick" :option="option" style="height: 700px;width: 750upx;"></echarts> -->
	</view>
</template>

<script>
	// import echarts from '@/components/secharts/echarts/echarts.vue'
import echarts from "@/components/echarts-uniapp/echarts-uniapp.vue"
	export default {
		name: "categoryLine",
		props: ['count','children_id'],

		components: {
			echarts
		},
		watch: {
			count: function(newVal, oldVal) {
				this.handleTimeData()
				// setInterval(()=>{
				// 	this.handleTimeData()
				// },300000)
			}
		},
		data() {
			return {
				x_day_list: ['product', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h',
					'14h',
					'15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h'
				],
				x_week_list: ['product', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
				x_month_list: [],
				option: {},
				choicetime: "",
				listTime: ""


			}
		},


		mounted() {
			let _this = this;
			setTimeout(()=>{_this.handleTimeData()},1000)
			 
			// setInterval(()=>{
			// 	_this.handleTimeData()
			// },300000)

			// this.getUsdttradeKlineHistoryList(this.symbol, this.symbolDate, this.C2CKline_DASHUSDT)
		},
		methods: {
			echartsClick(v) {
				console.log('=======>', v)
			},
			handleTimeData() {
				let _this = this;
				console.log('=开始查询了======>', _this.count)
				_this.listTime = _this.$common.datetime();
				_this.choicetime = _this.listTime[0].date;
				let typeTime = 'daily';
				if (_this.count == 2) {
					typeTime = "weekly"
				} else if (_this.count == 3) {
					typeTime = "monthly"
				}
				_this.$http.glassesEst({
					url: `reports/${typeTime}?date=${_this.choicetime}&child_id=${_this.children_id}`,
					method: "GET",
					header: {
						'Content-type': 'multipart/form-data',
					},
					data: {
						// date: _this.choicetime,
						// child_id: _this.children_id,
					}
				}).then(res => {
					console.log('=查询结构返回了========>', res)
					// let source=[
					// 		['product', '2012', '2013', '2014', '2015', '2016', '2017'],
					// 		['错误坐姿', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
					// 		['近距离用眼', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
					// 		['光照强弱', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
					// 		['户外时间', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
					// 	]
					let source = []
					if (_this.count == 1) {
				          res.data.data.bad_posture_data.bad_posture_times_hour.unshift('错误坐姿');
						  res.data.data.nearwork_data.nearwork_hour.unshift('近距离用眼');
						  res.data.data.lux_data.lux_hour.unshift('光照强弱');
						  res.data.data.out_time_data.out_time_hour.unshift('户外时间');
						source = [
							_this.x_day_list,
							[...res.data.data.bad_posture_data.bad_posture_times_hour],
							[...res.data.data.nearwork_data.nearwork_hour],
							[...res.data.data.lux_data.lux_hour],
							[...res.data.data.out_time_data.out_time_hour] 
						]
						// console.log('=2222========>', res.data.data.bad_posture_data.bad_posture_times_hour)
					}
					if (_this.count == 2) {
						res.data.data.bad_posture_times_array.unshift('错误坐姿'),
						res.data.data.nearwork_burden_day_array.unshift('近距离用眼'),
						res.data.data.lux_day_array.unshift('光照强弱'),
						res.data.data.out_time_array.unshift('户外时间')
						source = [
							_this.x_week_list,
							[...res.data.data.bad_posture_times_array],
							[...res.data.data.nearwork_burden_day_array],
							[...res.data.data.lux_day_array],
							[...res.data.data.out_time_array]
						]
					}

					if (_this.count == 3) {
						res.data.data.time_array.unshift('product'),
						res.data.data.bad_posture_times_array.unshift('错误坐姿'),
						res.data.data.nearwork_burden_day_array.unshift('近距离用眼'),
						res.data.data.lux_day_array.unshift('光照强弱'),
						res.data.data.out_time_lux_array.unshift('户外时间')
						source = [
							[...res.data.data.time_array],
							[...res.data.data.bad_posture_times_array],
							[...res.data.data.nearwork_burden_day_array],
							[...res.data.data.lux_day_array],
							[...res.data.data.out_time_lux_array]
						]
					}
					// 日
					//错误坐姿  res.data.bad_posture_data.bad_posture_times_hour
					//近距离用眼  res.data.nearwork_data.nearwork_hour 
					//光照强弱  res.data.lux_data.lux_hour 
					//户外时间  res.data.out_time_data.out_time_hour 
					//周
					//错误坐姿  res.data.bad_posture_times_array
					//近距离用眼  res.data.nearwork_burden_day_array
					//光照强弱  res.data.lux_day_array
					//户外时间  res.data.out_time_array
					//月
					//错误坐姿  res.data.bad_posture_times_array
					//近距离用眼  res.data.nearwork_burden_day_array
					//光照强弱  res.data.lux_day_array
					//户外时间  res.data.out_time_lux_array
					//x轴 this.x_month_list= res.data.time_array.unshift('product')





					_this.myRadarEchart(source);

					// 月的x轴 time_array
				})
			},

			myRadarEchart(source) {
				console.log('=返回的数据========>', source)
				this.option = {
					legend: {
						show: false
					},
					tooltip: {
						trigger: 'axis',
						// axisPointer: {
						//   type: 'cross'
						// },
						borderWidth: 1,
						borderColor: '#f5f5f5',
						backgroundColor: '#fff',
						padding: 10,

						textStyle: { //文字样式
							color: '#6A6A6A',
							decoration: 'none',
							fontSize: 12,
							fontFamily: 'Verdana,sans-serif',

						},
						formatter(params) {
							let val = '';

							for (var x in params) {
								console.log('======>', params)
								val += "时间:" + params[x].value[0] + "\n"
								val += "错误坐姿:" + params[x].value[1] + "\n"
								val += "近距离用眼:" + params[x].value[2] + "\n"
								val += "光照强弱:" + params[x].value[3] + "\n"
								val += "户外时间:" + params[x].value[4] + "\n"

								return val
							}

						},

						extraCssText: 'width: 160px'
					},
					dataset: {
						source: source
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							textStyle: {
								color: "#000",
							}
						},
						axisLine: {
							lineStyle: {
								color: "#ccc",
								width: 1,
								type: "solid"
							}

						}
					},
					yAxis: {
						gridIndex: 0,
						axisLine: {
							lineStyle: {
								color: "#ccc",
								width: 1,
								type: "solid"
							}

						},

						axisLabel: {
							textStyle: {
								color: "#000",
							},
							formatter(value) {
								// return value + "°C";
								return value ;
							}

						},
					},

					grid: {
						top: '40%'
					},
					series: [{
							type: 'line',
							smooth: true,
							symbol: "none",
							seriesLayoutBy: 'row',
							emphasis: {
								focus: 'series'
							}
						},
						{
							type: 'line',
							smooth: true,
							seriesLayoutBy: 'row',
							symbol: "none",
							emphasis: {
								focus: 'series'
							}
						},
						{
							type: 'line',
							smooth: true,
							seriesLayoutBy: 'row',
							symbol: "none", //去掉线上圆点
							emphasis: {
								focus: 'series'
							}
						},
						{
							type: 'line',
							smooth: true,
							symbol: "none",
							seriesLayoutBy: 'row',
							emphasis: {
								focus: 'series'
							}
						},
						{
							type: 'pie',
							id: 'pie',
							// 修改饼图大小
							radius: '30%',
							center: ['50%', '15%'],
							emphasis: {
								focus: 'self'
							},
							label: {
								// formatter: '{b}: {@2012} ({d}%)'
								formatter: '{b}: {@source[0][2]}({d}%)'
							}
							// encode: {
							// 	itemName: 'product',
							// 	value: '2023',
							// 	tooltip: '2023'
							// }
						}
					]
				}


			}
		}


	}
</script>

<style>
	.containers {
		width: 94%;
		margin: 0 auto;
		height: 400px;

		margin: 0 auto;
		position: relative;

	}


	.container100 {
		width: 100%;
		height: 100%;
	}

	.c1 {
		color: burlywood
	}

	.c2 {
		color: blue;
		margin: 0 10upx;
	}

	.c3 {
		color: blueviolet;
	}
</style>
