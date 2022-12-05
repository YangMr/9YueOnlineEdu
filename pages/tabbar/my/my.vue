<template>
	<view class="my-container">
		<!-- 绿色背景 -->
		<view class="my-bg"></view>
		
		<!-- 用户信息 -->
		<i-user-info></i-user-info>
		
		<!-- tab -->
		<i-card-tab></i-card-tab>
		
	</view>
</template>

<script>
	import iUserInfo from "./components/i-user-info.vue"
	export default {
		data() {
			return {
				
			}
		},
		components : {
			iUserInfo
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.my-container{
	position: relative;
}
.my-bg{
	height : 340rpx;
	background-color: #5ccc84;
	border-bottom-left-radius: 30rpx;
	border-bottom-right-radius: 30rpx;
}

</style>
