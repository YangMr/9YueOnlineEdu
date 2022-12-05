<template>
	<view class="content">
		<!-- free.css -->
		<view class="flex">
			<view>1</view>
			<view>2</view>
		</view>
		
		<!-- common.css -->
		<view class="bg-main p-2">hello word</view>
		
		<!-- animate.css -->
		<view :class="[active ? 'animate__bounceOutLeft' : '']" class="animate__animated  bg-main p-2">hello word</view>
	
		<button @click="active = true">click</button>
		
		<!-- iconfont.css -->
		<text class="iconfont icon-mail" style="font-size:100rpx; color:yellow;"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				active : false
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
