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
			handleLogin() {
				alert("login")
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
	.login-bg {
		height: 220rpx;
		background-image: linear-gradient(120deg, #3BFDAF 0%, #70D6F2 100%);
	}

	.login-back {
		position: fixed;
		top: 0;
		left: 0;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		top: var(--status-bar-height);
	}

	.login-container {
		position: absolute;
		top: 200rpx;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding: 60rpx 70rpx 0 70rpx;

		.title {
			font-size: 22px;
			margin-bottom: 50rpx;
			color: #35404b;
		}

		.login-wechat .uni-icons {
			border: 1rpx solid #5ccc84;
			width: 47px;
			border-radius: 100%;
			height: 47px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
