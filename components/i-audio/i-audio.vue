<template>
	<view class="bg-light">
		<view class="px-5 pt-5">
			<image style="width:100%; height:400rpx; border-radius: 20rpx;" :src="poster" mode="aspectFill"></image>
		</view>
		
		<view class="mb-5 audio-slider">
			<slider activeColor="#5ccc84" block-color="#5ccc84" block-size="15" />
			<text class="current-time">00:00:00</text>
			<text class="duration">00:10:10</text>
		</view>
		
		<view class="audio-btn flex align-center justify-center pb-5">
			<text class="iconfont icon-ziyuan11 "></text>
			<text class="iconfont icon-bofang2 mx-3"></text>
			<text class="iconfont icon-shoucang1 "></text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-audio",
		props : {
			poster : {
				type : String,
				default : ''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.audio-slider{
	position: relative;
}
.audio-slider text{
	position: absolute;
	top:35rpx;
	font-size: 25rpx;
}
.audio-slider .current-time{
	left: 30rpx;
}
.audio-slider .duration{
	right: 30rpx;
}
.audio-btn text:first-child, .audio-btn text:last-child{
	font-size: 60rpx;
	color: #bbb;
}
.audio-btn text:nth-child(2){
	font-size: 100rpx;
	color:rgb(92, 204, 132);
}
</style>