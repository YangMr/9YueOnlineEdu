<template>
	<view>
		<view class="p-2">
			<i-skeleton width="100%" height="75rpx" oClass="rounded"></i-skeleton>
			<i-skeleton width="100%" height="300rpx" oClass="mt-2 rounded"></i-skeleton>
		</view>
		
		<view class="flex flex-wrap py-2">
			<view  style="width:25%" class="flex flex-column align-center justify-center" v-for="(item,index) in 8" :key="index">
				<i-skeleton width="75rpx" height="75rpx" circle oClass="mb-2"></i-skeleton>
				<i-skeleton width="75rpx" height="30rpx" oClass="rounded mb-2"></i-skeleton>
			</view>
		</view>
		
		<view class="p-2 flex justify-between mb-2">
			<i-skeleton width="49%" height="130rpx"></i-skeleton>
			<i-skeleton width="49%" height="130rpx"></i-skeleton>
		</view>
		
		<view class="p-2">
			<i-skeleton width="70rpx" height="35rpx"></i-skeleton>
		</view>
		
		<view class="flex p-2">
			<i-skeleton width="300rpx" height="170rpx"></i-skeleton>
			<view class="flex flex-column justify-between ml-2">
				<i-skeleton width="364rpx" height="38rpx"></i-skeleton>
				<i-skeleton width="120rpx" height="25rpx"> </i-skeleton>
				<i-skeleton width="170rpx" height="43rpx"></i-skeleton>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>