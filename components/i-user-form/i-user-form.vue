<template>
	<view>
		<block v-for="(item,index) in formList" :key="index">
			<!-- 用户名 -->
			<view v-if="item.type" class="login-form flex align-center" >
				<uni-icons :type="item.icon"></uni-icons>
				<input v-model="value[item.props]" :type="item.type" class="input w-100 rounded font-md" :placeholder="item.placeholder" />
			</view>
			
			<!-- 验证码 -->
			<view  v-if="item.type === 'code'">
				<view  class="login-form">
					<!-- v-model -->
					<uni-icons :type="item.icon"></uni-icons>
					<input v-model="value[item.props]"  :type="item.type" class="rounded font-md" :placeholder="item.placeholder" />
				</view>
			</view>
		</block>
		
		
		<!-- 按钮 -->
		<button class="bg-main btn font"  hover-class="bg-main-hover" form-type="submit">{{buttonText}}</button>
	</view>
</template>

<script>
	export default {
		name:"i-user-form",
		props : {
			value : {
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
			
		}
	}
</script>

<style lang="scss">
.login-form{
	position: relative;
	margin-bottom: 50rpx;
	background-color: #f5f5f5;
	height: 100rpx;
}
.login-form .uni-icons{
	width: 100rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #272727;
}
.login-form .input{
	height: 100% !important;
	border: none;
	background: transparent;
	outline: none;
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