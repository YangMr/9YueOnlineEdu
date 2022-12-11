<template>
	<view>
		<i-list v-model="form" :userList="userSafeList"></i-list>
		
		<view class="p-3">
			<view class="bg-main btn" hover-class="bg-main-hover" @click="handleSubmit">保存</view>
		</view>
	</view>
</template>

<script>
	import userSafeList from "@/config/user-safe-list.js"
	import userApi from "@/api/user.js"
	export default {
		data() {
			return {
				userSafeList : userSafeList(),
				form : {
					opassword : '',
					password : '',
					repassword : ''
				}
			}
		},
		methods: {
			async handleSubmit(){
				try{
					uni.showLoading({
						title : '修改密码中...',
						mask: false
					})
					
					// 调用修改密码接口
					const response = await userApi.changePassword(this.form)

					
					uni.hideLoading()
					
					this.$utils.toast("修改成功")
					
					this.$store.dispatch("logout")
					
					this.navTo('/pages/login/login')
				}catch(e){
					//TODO handle the exception
					uni.hideLoading()
					console.log("error=>", e)
				}
				
			}
		}
	}
</script>

<style>

</style>
