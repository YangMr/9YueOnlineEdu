<template>
	<view>
		<!-- 返回箭头 -->
		<view class="login-back" @click="navBack()">
			<uni-icons type="arrowleft" size="20" color="#FFFFFF"></uni-icons>
		</view>
		
		<!-- 登录背景 -->
		<view class="login-bg"></view>
		
		<view class="login-container">
			<!-- 标题 -->
			<view class="flex">
				<text class="title">找回密码</text>
			</view>
		
			<!-- 登录/注册表单 -->
			<i-form @submit="handleSubmit" v-model="form" text="立即找回" :formList="formList">
			</i-form>
		</view>
		
	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	export default {
		data() {
			return {
				form : {
					phone : '',
					code : '',
					password : '',
					repassword : ''
				},
				formList : [
					{
						type : 'input',
						icon : 'person',
						props : 'phone',
						placeholder : '请输入手机号'
					},
					{
						type : 'code',
						icon : 'locked',
						props : 'code',
						placeholder : '验证码'
					},
					{
						type : 'password',
						icon : 'locked',
						props : 'password',
						placeholder : '请输入密码'
					},
					{
						type : 'password',
						icon : 'locked',
						props : 'repassword',
						placeholder : '请输入确认密码'
					}
				]
			}
		},
		methods: {
			async handleSubmit(){				
				try{
					uni.showLoading({
						title : '找回密码中...',
						mask : false
					})
					
					const response = await userApi.forgetPassword(this.form)
					
					console.log("response=>", response)
					
					this.$utils.toast("找回成功")
					
					setTimeout(()=>{
						this.navTo("/pages/login/login")
					},100)
					
					uni.hideLoading()
				}catch(e){
					//TODO handle the exception
					console.log("error", e)
				}
			}
		}
	}
</script>

<style>

</style>
