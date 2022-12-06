<template>
	<form @submit="handleSubmit">
		<block v-for="(item,index) in formList" :key="index">
			<!-- 用户名 -->
			<view v-if="item.type" class="login-form" >
				<uni-icons :type="item.icon"></uni-icons>
				<input :name="item.props" :type="item.type" class="rounded font-md" :placeholder="item.placeholder" />
			</view>
			
			<!-- 验证码 -->
			<view  v-if="item.type === 'code'">
				<view  class="login-form">
					<!-- v-model -->
					<uni-icons :type="item.icon"></uni-icons>
					<input :name="item.props" :type="item.type" class="rounded font-md" :placeholder="item.placeholder" />
				</view>
			</view>
		</block>
		
		
		<!-- 按钮 -->
		<button class="bg-main btn font"  hover-class="bg-main-hover" form-type="submit">{{buttonText}}</button>
	</form>
</template>

<script>
	export default {
		name:"i-user-form",
		props : {
			form : {
				type : Object,
				default : () => ({})
			},
			buttonText : {
				type : String,
				default : '登 录'
			},
			formList : {
				type : Array,
				default : () => {
					return [
						// {
						// 	type : 'input',
						// 	props : 'username',
						// 	placeholder : '请输入用户名',
						// 	icon : 'person'
						// },
						// {
						// 	type : 'password',
						// 	props : 'password',
						// 	placeholder : '请输入密码',
						// 	icon : 'locked'
						// }
					]
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleSubmit(e){
				this.$emit("input", e.detail.value)
			}
		}
	}
</script>

<style lang="scss">
.login-form{
	position: relative;
	margin-bottom: 50rpx;
}
.login-form .uni-icons{
	position: absolute;
	left: 0;
	top: 0;
	width: 100rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #272727;
}
.login-form input{
	height: 100rpx;
	padding-left: 100rpx;
	padding-right: 20rpx;
	background-color: #f5f5f5;
}

.btn{
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	border-radius: 10rpx;
}
</style>