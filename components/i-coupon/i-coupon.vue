<template>
	<view class="p-2">
		<scroll-view class="scroll-row" scroll-x="true" >
			<view  :class="[item.isgetcoupon ? 'coupon-isget' : '']" class="coupon" v-for="(item,index) in list" :key="index">
				<view class="flex flex-column align-center justify-center bg-hover-warning">
					<text class="font-md">￥{{item.price}}</text>
					<text class="font-sm" v-if="item.value && item.value.title">适用课程：{{item.value.title}}</text>
					<text class="font-sm" v-if="item.title">适用课程：{{item.title}}</text>
				</view>
				<view class="button bg-warning  flex align-center justify-center">
					领取
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"i-coupon",
		props : {
			list : {
				type : Array,
				default : () => ([])
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.coupon{
	min-width: 310rpx;
	display: inline-flex;
	color: #fff;
	margin-right: 30rpx;
}
.coupon > view:first-child{
	padding: 20rpx 30rpx;
	border-right: 4rpx dashed;
}
.button{
	width: 120rpx;
	color : #fff;
	font-size: 30rpx;
}
.coupon-isget > view:first-child{
	background-color: #dae0e5;
}
.coupon-isget > view:last-child{
	background-color: #dae0e5;
}
</style>