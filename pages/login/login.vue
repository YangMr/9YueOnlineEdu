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
				<text class="title">{{type === 'login' ? '登 录' : '注 册'}}</text>
			</view>

			<!-- 登录/注册表单 -->
			<i-form @submit="handleSubmit" v-model="form" :text="type === 'login' ? '登录' : '注册'" :formList="formList">
			</i-form>

			<!-- 注册账号/忘记密码 -->
			<view class="flex align-center justify-between my-3 font">
				<text class="py-3 text-main" @click="handleToggle">
					{{type === 'login' ? '注册账号' : '去登录'}}
				</text>
				<text @click="navTo('/pages/forget/forget')" class="py-3 text-light-muted"
					v-if="type === 'login'">忘记密码?</text>
			</view>

			<!-- 第三方登录图标 -->
			<view class="flex align-center justify-center login-wechat">
				<uni-icons type="weixin" size="25" color="#5ccc84"></uni-icons>
			</view>


			<!-- 用户协议 -->
			<checkbox-group @change="handleCheckboxChange" v-if="type === 'login'"
				class="flex align-center justify-center mt-4">
				<label class="text-light-muted">
					<checkbox value="1" color="#7fd49e"
						style="transform: scale(0.7); position: relative; top :-2rpx;" />
					<text class="font">已阅读并同意用户协议&隐私声明</text>
				</label>
			</checkbox-group>
		</view>



	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	export default {
		data() {
			return {
				// 登录注册切换的状态
				type: 'login',
				//是否同意用户隐私协议状态 false 未同意 true 已同意
				checked: false,
				// 定义表单输入的数据
				form: {
					username: '',
					password: ''
				},
				// 表单列表数据
				formList: [{
						type: 'input',
						placeholder: '请输入用户名',
						props: 'username',
						icon: 'person'
					},
					{
						type: 'password',
						placeholder: '请输入密码',
						props: 'password',
						icon: 'locked'
					}
				]
			}
		},
		methods: {
			handleToggle() {
				this.type = this.type === 'login' ? 'reg' : 'login'
				this.type === 'login' ? this.handleAddForm() : this.handleRemoveForm()

			},
			handleAddForm() {
				delete this.form.repassword
				this.formList.pop()
				this.$utils.resetForm(this.form)
			},
			handleRemoveForm() {
				this.form.repassword = ""
				this.$utils.resetForm(this.form)
				
				this.formList.push({
					type: 'password',
					placeholder: '请输入确认密码',
					props: 'repassword',
					icon: 'locked'
				})
			},
			handleCheckboxChange(e) {
				// this.checked = e.detail.value.length ? true : false
				this.checked = !!e.detail.value.length
			},
			handleSubmit() {
				// 判断是否勾选用户协议
				if (!this.checked && this.type === 'login') {
					this.$utils.toast('请先阅读并同意用户协议&隐私声明')
					return
				}

				// 判断用户名是否为空
				if (!this.form.username) {
					this.$utils.toast('用户名不能为空')
					return
				}
				// 判断密码是否为空
				if (!this.form.password) {
					this.$utils.toast('密码不能为空')
					return
				}

				this.type === 'login' ? this.handleLogin() : this.handleRegister()
			},
			async handleLogin() {
				try{
					// 开启loading
					uni.showLoading({
						title : '登录中',
						mask : false
					})
					
					// 发送请求
					const response = await userApi.login(this.form)
					
					// 将登录之后返回的token以及用户信息寻出到vuex
					this.$store.commit("setToken", response.token)
					this.$store.commit("setUserInfo", response)
					
					console.log("response=>", response)
					
					uni.$emit("userLogin")
					
					// 判断登录之后的用户信息里面有没有绑定手机号, 绑定: 进入个人中心 没绑定: 绑定手机号页面
					if(!response.phone){
						this.navTo("/pages/bind-phone/bind-phone")
						return 
					}
					
					// 绑定手机号了,则跳转到个人中心
					// this.navBack()
					this.navTo("/pages/tabbar/my/my", {navigator : 'switchTab'})
			
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}finally{
					uni.hideLoading()
				}
			},
			async handleRegister() {
				try{
					uni.showLoading({title: "注册中...",mask : false})
					const response = await userApi.register(this.form)
					this.$utils.toast("注册成功")
					this.handleToggle()
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}finally{
					uni.hideLoading()
				}

			}
		}
	}
</script>

<style lang="scss">

</style>
