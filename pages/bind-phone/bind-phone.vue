<template>
	<view>
		<!-- 返回箭头 -->
		<view class="login-back" @click="navTo('/pages/tabbar/my/my', {navigator : 'switchTab'})">
			<uni-icons type="arrowleft" size="20" color="#FFFFFF"></uni-icons>
		</view>

		<!-- 登录背景 -->
		<view class="login-bg"></view>

		<view class="login-container">
			<!-- 标题 -->
			<view class="flex">
				<text class="title">绑定手机号</text>
			</view>

			<!-- 登录/注册表单 -->
			<i-form @submit="handleSubmit" v-model="form" text="绑定" :formList="formList">
			</i-form>

		</view>

	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	export default {
		data() {
			return {
				// 保存表单输入的数据
				form: {
					phone: '',
					code: ''
				},
				// 表单项配置
				formList: [{
						type: 'input',
						icon: 'person',
						placeholder: '请输入手机号',
						props: 'phone'
					},
					{
						type: 'code',
						icon: 'locked',
						placeholder: '验证码',
						props: 'code'
					}
				]
			}
		},
		methods: {
			// 绑定按钮触发的方法的
			async handleSubmit() {
				try {
					// 开启loading
					// uni.showLoading({
					// 	title : '绑定中...',
					// 	mask: false
					// })

					// 发送请求
					const response = await userApi.bindPhone(this.form)
					console.log("response=>", response)

					this.$store.dispatch("updateUserInfo", {phone : this.form.phone})

					// 提示绑定成功
					this.$utils.toast('绑定成功')

					setTimeout(()=>{
						// 跳转到个人中心页
						this.navTo('/pages/tabbar/my/my', {
							navigator: 'switchTab'
						})
						// this.navBack()
					},3000)
					
				} catch (e) {
					//TODO handle the exception
					console.log("error=>", e)
				} finally {
					// 隐藏loading
					// uni.hideLoading()
				}

			}
		}
	}
</script>

<style>

</style>
