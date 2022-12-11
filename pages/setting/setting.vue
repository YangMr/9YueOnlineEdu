<template>
	<view>
		<!-- 设置列表 -->
		<i-list @version="handleGetVersion" @update="handleCheckeUpdate" @clear="handleClearStorage" :userList="settingList"></i-list>
	
		<!-- 退出登录按钮 -->
		<view v-if="hasLogin" class="p-3">
			<view class="bg-main btn" hover-class="bg-main-hover" @click="handleSubmit">退出登录</view>
		</view>
		
	
	</view>
</template>

<script>
	import settingList from "@/config/setting-list.js"
	import userApi from "@/api/user.js"
	import {mapGetters} from "vuex"
	export default {
		data() {
			return {
				settingList : settingList()
			}
		},
		computed : {
			...mapGetters([
				"hasLogin"
			])
		},
		methods: {
			// 清除缓存
			async handleClearStorage(){
				try{
					const res = await this.$utils.modal("","是否清除缓存?")
					console.log("Res=>", res)
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
				console.log("123")
			},
			// 检查更新
			handleCheckeUpdate(){
				this.$utils.toast('当前功能暂无开放')
			},
			// 当前版本
			handleGetVersion(){
				this.$utils.toast('当前功能暂无开放')
			},
			// 退出登录
			async handleSubmit(){
				try{
					const res = await this.$utils.modal("","是否要退出登录?")
					console.log("Res=>", res)
					if(res) {
						// 调用退出登录接口
						await userApi.logout()
						// 清空本地和vuex存储的token userinfo
						await this.$store.dispatch("logout")
						// 提示退出登录成功
						this.$utils.toast("退出登录成功")
						// 返回上一页
						this.navBack()
					}
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
				// uni.showModal({
				// 	// title: '提示',
				// 	content: '是否要退出登录?',
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			}
		}
	}
</script>

<style>

</style>
