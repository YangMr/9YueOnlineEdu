<template>
	<view class="p-3">
		<view :class="[item.isgetcoupon ? 'coupon-isget' : '']" class="coupon" v-for="(item,index) in couponList" :key="index">
			<view class="flex flex-column align-center justify-center bg-hover-warning">
				<text class="font-md">￥{{item.price}}</text>
				<text class="font-sm" v-if="item.title">适用课程：{{item.title}}</text>
			</view>
			<view class="button bg-warning  flex align-center justify-center">
				领取
			</view>
		</view>
	</view>
</template>

<script>
	import couponApi from "@/api/coupon.js"
	export default {
		data() {
			return {
				page : 1,
				limit : 10,
				couponList : []
			}
		},
		onLoad(){
			this.initLoad()
		},
		methods: {
			async initLoad(){
				try{
					const data = {page : this.page, limit : this.limit}
					const response = await couponApi.getCouponList(data)
					// console.log("response=>", response)
					this.couponList = response.rows
					
					console.log("this.couponList",this.couponList)
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			}
		}
	}
</script>

<style>
.coupon{
	width: 100%;
	display: inline-flex;
	color: #fff;
	margin-right: 30rpx;
}
.coupon > view:first-child{
	padding: 20rpx 30rpx;
	flex:1;
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
