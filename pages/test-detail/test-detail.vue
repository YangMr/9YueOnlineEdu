<template>
	<view>
		<!-- 倒计时 -->
		<i-timer-box @end="handleTestEnd" :expire="60"></i-timer-box>
		
		
		<!-- 考试题 -->

		<!-- 底部tab -->
		<i-test-actions @submit="handleSubmit" @on-page="handlePage" :current="current" :total="total"></i-test-actions>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current : 2,
				total : 10
			}
		},
		onBackPress() {
			// uni.showModal({
			// 	content: '是否要放弃这场考试？',
			// 	cancelText: '继续做题',
			// 	confirmText: '放弃',
			// 	success: res => {
			// 		if (res.confirm) {
			// 			console.log('用户点击确定');
			// 			this.navTo("/pages/test-list/test-list")
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	},

			// });
			// return true
		},
		methods: {
			// 考试时间结束方法
			handleTestEnd(){
				alert("考试时间结束")
			},
			// 上一题与下一题切换
			handlePage(page){
				console.log("page=>", page)
				this.current = page
			},
			// 交卷
			handleSubmit(){
				alert("交卷")
			}
		}
	}
</script>

<style>

</style>
