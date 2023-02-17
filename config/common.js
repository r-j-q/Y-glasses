function navigator(url){
	uni.navigateTo({
		url:url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}

function call(res){
	uni.makePhoneCall({
				phoneNumber:res, //电话号码
				success: function(e) {
					console.log(e);
				},
				fail: function(e) {
					console.log(e);
				}
			})
}

function transitTime(timestamp) {
  let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '年';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';

  function change(stage) {
    if (stage < 10) {
      return "0" + stage;
    } else {
      return stage;
    }
  }
  let D = change(date.getDate()) + '日 ';
  let h = change(date.getHours()) + ':';  // 小时
  let m = change(date.getMinutes());      // 分钟
  let s = change(date.getSeconds());      // 秒
  return Y + M + D + h + m;
}

function setStorage(name,data){
	uni.setStorage({
		key:name,//对应要修改的键名
		data:data,//修改的数据会覆盖之前键名对应的数据
		success(res){
			return res;
			console.log(res)
		}
	})
}

function removeAge(name){
	uni.removeStorage({//通过key（键值名）来删除对应数据
		key:name,
		success(res) {
			return res;
			console.log(res)
		}
	})
}


function ClearStorage(){
	uni.clearStorage();//清空所有数据
}
//取缓存
function getStorages(name){
	 const data = uni.getStorageSync(name);
	 return data;
}

// //存缓存
// function setStorage(key,data){
// 	uni.setStorage({
// 		key:key,
// 		data:data,
// 	})
// }


function showToast(msg){
	uni.showToast({
	       title: msg,
	       icon: 'none',
	       duration: 2000,
	   })
}

//获取日期
function datetime(AddYearCount) {
	var now = new Date();
		var check = [];
		for (let i = 0; i < 365; i++) {
			//24 * 3600 * 1000 就是计算一天的时间  
			var date = new Date(now.getTime() - i * 24 * 3600 * 1000);
			var year = date.getFullYear();
			var month = (date.getMonth() + 1) <=9 ?  '0'+ (date.getMonth()+1):(date.getMonth()+1);
			var day = date.getDate()<=9 ?'0'+ date.getDate():date.getDate();
			var dt2 = new Date(now.getTime() + i * 24 * 3600 * 1000);
			var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			var weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
		
			// console.log(duty);
			//把七天的时间和星期添加到数组中
			check.push({
				date:year + "-" +month + "-" + day,
				year: year,
				month:month,
				day: day,
				weekday: weekDays[dt2.getDay()],
				week: weekDay[dt2.getDay()],
			});
		}

		return check;
	
		// return check
	
	
		// console.log("进入了")
	 //      var dd = new Date(); 
	 //      dd.setYear(dd.getFullYear()-AddYearCount);//获取AddMonthCount月后的日期 
	 //      var y = dd.getFullYear(); 
	 //      var m = dd.getMonth()+1;//获取当前月份的日期 
	 //      var d = dd.getDate(); 
	 //      //判断 月
	 //      if(m < 10){
	 //        m = "0" + m;
	 //      }else{
	 //        m = m;
	 //      }
	 //      //判断 日n     
	 //      if(d < 10){//如果天数<10
	 //        d = "0" + d;
	 //      }else{
	 //        d = d;
	 //      }
		//   var timeJson = {
		// 	  year:y,
		// 	  time:y,
		// 	  day:d,
		//   };
		//   return timeJson;
		  // return {y+"-"+m+"-"+d,timeJson};
		}
		
	function dateFormat(date, time, fmt) {
		// (this.date,this.time,'YYYY-mm-dd HH:MM:SS')
		var Monthe = date.split('-'); //年月日分割
		var times = time.split(':')
		/*
		 * 日期格式转换
		 * fmt   将要转换的格式样式
		 * date  需转换的时间
		 * console.log(YHUtility.dateFormat('YYYY-mm-dd HH-MM-SS', object.value));
		 * */
		let ret;
		const opt = {
			"Y+": Monthe[0], // 年
			"m+": Monthe[1], // 月
			"d+": Monthe[2], // 日
			"H+": times[0], // 时
			"M+": times[1], // 分
			"S+": "00" // 秒
			// 若需要更多其它格式化字符可以继续向下添加，但必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	}

export{
	navigator,
	call,
	getStorages,
	showToast,
	removeAge,
	ClearStorage,
	setStorage,
	datetime,
	transitTime,
	dateFormat
	}