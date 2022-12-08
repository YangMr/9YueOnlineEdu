<template>
	<view @click="sendSmsCode" class="code flex align-center justify-center bg-main">
		{{codeDuration ? codeDuration + 's' : '发送'}}
	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	export default {
		name:"i-code",
		props : {
			mobile : {
				type : [String, Number]
			}
		},
		data() {
			return {
				codeDuration : null,
				interval : null,
				disabled : false
			};
		},
		methods : {
			// 发送验证码
			async sendSmsCode(){
				// 判断手机号不能为空
				if(!this.mobile){
					this.$utils.toast("手机号不能为空")
					return 
				}
				// 判断手机号格式是否正确
				if(!this.$utils.checkStr(this.mobile, 'mobile')){
					this.$utils.toast("手机号格式不正确")
					return 
				}
				
				// 如果正在倒计时,则不继续往下执行
				if(this.disabled){
					// uni.showModal({
					// 	content: `请在${this.codeDuration}秒后重试`,
					// 	showCancel: false
					// })
					this.$utils.toast(`请在${this.codeDuration}秒后重试`)
					return
				}
				
				// 验证码参数
				const data = {
					phone : this.mobile.trim()
				}
				let response 
				// 发送请求
				try{
					
					// 开启loading加载
					uni.showLoading({mask:true})
					
					// 发送验证码接口调用成功
					response = await userApi.sendSmsCode(data)
					console.log("code", response)
					// 隐藏loading
					uni.hideLoading()
					
					// 提示发送成功
					this.$utils.toast(response.toString())
					
					// 调用成功之后在进行倒计时
					// 设置倒计时未60s
					this.codeDuration = 60
					// 设置为按钮禁用
					this.disabled = true
					// 开启定时器
					this.interval = setInterval(() => {
						// 开始倒计时
						this.codeDuration--
						// 如果倒计时为0 
						if (this.codeDuration <= 0) {
							// 并且定时器是开启的状态
							if (this.interval) {
								// 清楚定时器
								clearInterval(this.interval)
								// s设置保存定时器的变量为null
								this.interval = null
								// 设置按钮为不禁用
								this.disabled = false
							}
						}
					}, 1000)
					
				}catch(e){
					//TODO handle the exception
					uni.hideLoading()
					this.$utils.toast("验证码发送失败")
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
.code{
	width: 200rpx;
	height : 100%;
	color : #fff;
	border-top-right-radius: 8rpx;
	border-bottom-right-radius: 8rpx;
	font-size: 14px;
}
</style>