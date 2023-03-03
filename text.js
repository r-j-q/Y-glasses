setTimeout(function () {
  option = {
    legend: {
      show:false
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
							fontSize:12,
							fontFamily: 'Verdana,sans-serif',

						},
						// formatter(params) {
						// 	let val = '';
							
						// 	for (var x in params) {
						// 	  console.log('======>',params)
						// 		val += 	"时间:" + params[x].value[0] + "\n"
						// 		val += "错误坐姿:" + params[x].value[1] + "\n"
						// 		val += "近距离用眼:" + params[x].value[2] + "\n"
						// 		val += "光照强弱:" + params[x].value[3] + "\n"
						// 		val += "户外时间:" + params[x].value[4] + "\n"
							 
						// 		return val
						// 	}

						// },
						// position: function (pos, params, el, elRect, size) {
						//   const obj = {
						//     top: 10
						//   };
						//   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
						//   return obj;
						// },
						extraCssText: 'width: 160px'
					},
    dataset: {
      source: [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['错误坐姿', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ['近距离用眼', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ['光照强弱', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
        ['户外时间', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        	symbol: "none",
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        	symbol: "none",
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
      	symbol: "none", //去掉线上圆点
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        	symbol: "none",
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)' 
        },
        encode: {
          itemName: 'product',
          value: '2012',
          tooltip: '2012'
        }
      }
    ]
  };
  myChart.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart.setOption({
        series: {
          id: 'pie',
          label: {
            
            formatter: '{b}: {@[' + dimension + ']}'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  myChart.setOption(option);
});