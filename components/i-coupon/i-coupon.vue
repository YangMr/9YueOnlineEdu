<template>
	<view class="p-2">
		<scroll-view class="scroll-row" scroll-x="true" >
			<view  :class="[item.isgetcoupon ? 'coupon-isget' : '']" class="coupon" v-for="(item,index) in list" :key="index">
				<view class="flex flex-column align-center justify-center bg-hover-warning">
					<text class="font-md">￥{{item.price}}</text>
					<text class="font-sm" v-if="item.value && item.value.title">适用{{item.type | couponFilterType}}：{{item.value.title}}</text>
					<!-- <text class="font-sm" v-if="item.title">适用{{item.type | couponFilterType}}：{{item.title}}</text> -->
				</view>
				<view @click="handleReceive(item)" class="button bg-warning  flex align-center justify-center">
					{{item.isgetcoupon ? '已领取' : '领取'}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import couponApi from "@/api/coupon.js"
	export default {
		name:"i-coupon",
		props : {
			list : {
				type : Array,
				default : () => ([])
			}
		},
		filters : {
			couponFilterType(value){
				let type = {
					course : '课程',
					column : '专栏'
				}
				console.log("value=>", value)
				return type[value]
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			// 领取优惠卷方法
			async handleReceive(item){
				if(item.isgetcoupon){
					this.$utils.toast("你已经领取过了")
					return
				}
				
				uni.showLoading({
					title : '领取中...',
					mask : false
				})
				
				try{
					const data = {coupon_id : item.id}
					const response = await couponApi.userCouponReceive(data)
					console.log("response=>", response)
					item.isgetcoupon = true
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.hideLoading()
				}
				
			}
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