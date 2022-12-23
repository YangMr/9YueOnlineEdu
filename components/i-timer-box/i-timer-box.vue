<template>
	<view>
		<view class="timer-box">
			考试时间 {{timeOut|formatType}}
		</view>
		<view style="height: 90rpx;"></view>
	</view>
	
</template>

<script>
	import utils from "@/common/js/utils.js"
	let timer = null
	export default {
		name:"i-timer-box",
		props : {
			expire : {
				type : Number,
				default : 1
			}
		},
		filters : {
			formatType(value){
				
				let hours = parseInt(value%(60*60*24)/(60*60))
				let minutes = parseInt(value%(60*60)/60)
				let seconds = value%60
				
	
				return utils.addZero(hours) + ":" + utils.addZero(minutes) + ":" + utils.addZero(seconds)
			}
		},
		data() {
			return {
				timeOut : 0
			};
		},
		mounted() {
			// 页面加载时将分钟转化成秒了
			this.timeOut = this.expire * 60
			
			if(this.timeOut > 0){
				timer = setInterval(this.handleTimeOut, 1000)
			}
		},
		beforeDestroy() {
			if(timer){
				clearInterval(timer)
			}
		},
		methods : {
			handleTimeOut(){
				if(this.timeOut === 0){
					this.$emit("end")
					clearInterval(timer)
					return
				}
				this.timeOut--
			}
		}
	}
</script>

<style lang="scss">
.timer-box{
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1rpx solid #f60;
	border-bottom: 1rpx solid #f60;
	color :#f60;
	padding:20rpx 0;
	background-color: #fff;
	font-size:35rpx;
	height: 50rpx;
	position: fixed;
	left : 0;
	right : 0;
	z-index : 9999;
}
</style>