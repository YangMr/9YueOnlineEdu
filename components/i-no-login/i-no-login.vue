<template>
	<view class="no-login flex flex-column align-center justify-center">
		<image class="img" src="../../static/noLogin.png" mode=""></image>
		<text class="my-2 text-muted font">登录后才可以查看我的学习哦</text>
		<button type="default" plain size="mini" @click="navTo('/pages/login/login')">立即登录</button>
	</view>
</template>

<script>
	export default {
		name:"i-no-login",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.no-login{
	background-color: #fff;
	position: fixed;
	left :0;
	bottom :0;
	right : 0;
	top : 0;
	
	.img{
		width : 350rpx;
		height: 350rpx;
	}
}
</style>