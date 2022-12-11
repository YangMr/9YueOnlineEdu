<template>
	<view class="animate__animated  animate__fadeInDown animate__faster">
		<!-- 绿色背景 -->
		<view class="my-bg"></view>
		
		<view class="my-container">
			<!-- 用户信息 -->
			<i-user-info :hasLogin="hasLogin" :userInfo="userInfo"></i-user-info>
			
			<!-- tab -->
			<i-card-tab></i-card-tab>
			
			<!-- 选项列表 -->
			<i-list border></i-list>
		</view>
		
		
		
		
		
		
		
	</view>
</template>

<script>
	import iUserInfo from "./components/i-user-info.vue"
	import {mapGetters} from "vuex"
 	export default {
		data() {
			return {
				
			}
		},
		computed : {
			...mapGetters([
				"hasLogin",
				"userInfo"
			])
		},
		// 点击右上角菜单按钮触发的方法
		onNavigationBarButtonTap() {
			this.navTo("/pages/setting/setting")
		},
		components : {
			iUserInfo
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.my-bg{
	height : 340rpx;
	background-color: #5ccc84;
	border-bottom-left-radius: 100rpx;
	border-bottom-right-radius: 100rpx;
	position: fixed;
	left:0;
	right:0;
}

.my-container{
	position: relative;
	padding:0 30rpx;
}

</style>
