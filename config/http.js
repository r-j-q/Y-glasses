const baseUrl= "http://bmj.shningmi.com/";
// const glaUrl = "https://akeso.com.cn/api/v5/sessions/";
const glaUrl = "http://akeso.com.cn/api/open/";
function glassesEst(params){
	var arg = "";
		if (params && params.data) {
			arg = {
				method: params.method,
				data: params.data,
				url: glaUrl + params.url,
			}
		} else {
			arg = {
				method: params.method,
				url: glaUrl + params.url,
			}
		}
		return new Promise(function(resolve, reject){
			uni.request({
				...arg,
				success: (res) => {
					// if(res.data.code == 200){
						resolve(res);
					// }
				}
			})
		})
}

function request(params){
	var arg = "";
	var token = uni.getStorageSync('token');
	console.log(params.url,"params.url");
	if(params.url != "authorization" && params.url != "login"){	
		if(!token){
			uni.navigateTo({
				url:"../signin/signin",
				animationType: 'pop-in',
				animationDuration: 300
			})
			return;
		}else{
			params.header.token = token;
		}
	}
	if (params && params.data) {
		arg = {
			method: params.method,
			header: params.header,
			data: params.data,
			url: baseUrl + params.url,
		}
	} else {
		arg = {
			method: params.method,
			header: params.header,
			url: baseUrl + params.url,
		}
	}
	console.log(arg,"proarg");
	return new Promise(function(resolve, reject){
		uni.request({
			...arg,
			success: (res) => {
				console.log(res.data.code,"res.data.code");
				if(res.data.code == 200){
					resolve(res);
				}
				// else if(res.data.code == 209){
				// 	uni.navigateTo({
				// 		url:"../signin/signin",
				// 		animationType: 'pop-in',
				// 		animationDuration: 300
				// 	})
				// }
			}
		})
	})
}

export {
	request,
	glassesEst
}