<template>
	<view class="fankui">
		<view class="">
			<view class="m_b_20">
				产品款式:
			</view>
			<u-radio-group v-model="valuemy" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				产品设计:
			</view>
			<u-radio-group v-model="valuesj" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				产品包装:
			</view>
			<u-radio-group v-model="valuebz" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				产品的价格:
			</view>
			<u-radio-group v-model="valuejg" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				软件的界面:
			</view>
			<u-radio-group v-model="valuejm" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				软件的功能:
			</view>
			<u-radio-group v-model="valuegn" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				服务态度:
			</view>
			<u-radio-group v-model="valuetd" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				服务专业性:
			</view>
			<u-radio-group v-model="valueyx" @change="radioGroupChange">
				<u-radio v-for="(item, index) in listmy" :key="index" :name="item.name" :disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="">
			<view class="m_b_20">
				你最想使用的镜片:
			</view>
			<u-checkbox-group @change="checkboxGroupChange">
				<u-checkbox v-model="item.checked" v-for="(item, index) in list" :key="index"
					:name="item.name">{{item.name}}</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="">
			<view class="m_b_20">
				你最想要的应用功能:
			</view>
			<u-checkbox-group @change="checkboxGroupChange2">
				<u-checkbox v-model="item.checked" v-for="(item, index) in list2" :key="index"
					:name="item.name">{{item.name}}</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="" style="height: 20px;">
			
		</view>
		<u-input v-model="value" placeholder="请输入反馈信息" class="stylecss" :type="type" :border="border"
			:auto-height='true' />
		<button class="btu" @click="subit">提交</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				listmy: [{
						name: '满意',
						disabled: false
					},
					{
						name: '不满意',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				valuemy: '',
				valuesj: '',
				valuebz: '',
				valuejg: '',
				valuejm: '',
				valuegn: '',
				valuetd: '',
				valueyx: '',
jingpian:[],
					yingyong:[],


				list: [{
						name: '离焦镜片',
						checked: false,
						disabled: false
					},
					{
						name: '环焦镜片',
						checked: false,
						disabled: false
					},
					{
						name: '棱镜',
						checked: false,
						disabled: false
					},
					{
						name: '防蓝光镜片',
						checked: false,
						disabled: false
					}
				],
				list2: [{
						name: '通话',
						checked: false,
						disabled: false
					},
					{
						name: '拍摄',
						checked: false,
						disabled: false
					},
					{
						name: '导航',
						checked: false,
						disabled: false
					},
					{
						name: '听广播',
						checked: false,
						disabled: false
					}
				],

				type: "textarea",
				value: "",
				border: "none"
			}
		},
		onLoad(option) {

		},
		onUnload() {

		},
		onReady() {
			// 计算屏幕剩余高度  填补剩余高度
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					let windowHeight = (res.windowHeight * (750 / res.windowWidth));
					_this.screenHeight = windowHeight - 120;
				}
			});
		},
		onShow() {

		},
		methods: {
			radioGroupChange(e) {
				console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				console.log(e);
				 this.jingpian =e.toString()
			},
			checkboxGroupChange2(e) {
				console.log(e);
					this.yingyong =e.toString()
			},
			change(e) {
			 this.jingpian =e.toString()
								 
				console.log('e000:',this.jingpian);
			},
			change2(e) {
			 
				console.log('e:', e);
			},

			subit() {
				// if (this.value == "") {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: "请输入内容"
				// 	})
				// 	return
				// }
				var data = {
					remark: this.value=='不满意'?0:1,
					kuanshi:this.valuemy=='不满意'?0:1,
					sheji:this.valuesj=='不满意'?0:1,
					baozhuang:this.valuebz=='不满意'?0:1,
					jiage:this.valuejg=='不满意'?0:1,
					jiemian:this.valuejm=='不满意'?0:1,
					gongneng:this.valuegn=='不满意'?0:1,
					taidu:this.valuetd=='不满意'?0:1,
					zhuanyexing:this.alueyx=='不满意'?0:1,
					jingpian:this.jingpian,
					yingyong:this.yingyong,
				}

				this.$http.glassesEst({
					url: `feedbacks`,
					method: "post",
					header: {
						'Content-type': 'multipart/form-data',
					},
					data: data
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: "反馈成功"
					})

				})







			},
		}
	}
</script>

<style scoped>
	.stylecss {
		width: 90%;
		margin: 0 auto;
		min-height: 600upx;
		/* margin-top: 100upx; */
	}

	.m_b_20 {
		padding: 20upx 0;
	}

	.btu {
		width: 80%;
		height: 80upx;
		line-height: 80upx;

		color: #fff;
		margin: 0 auto;
		margin-top: 100upx;
		background-color: cornflowerblue;
	}

	.fankui {
		padding: 20upx;
	}
</style>