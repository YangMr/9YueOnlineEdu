<template>
	<view class="p-3">
		<view :class="[item.isgetcoupon ? 'coupon-isget' : '']" class="coupon mb-3" v-for="(item,index) in couponList" :key="index">
			<view class="flex flex-column  bg-hover-warning">
				<text class="font-md">￥{{item.price}}</text>
				<text class="font-sm text-ellipsis" v-if="item.title">适用{{item.typeName}}：{{item.title}}</text>
			</view>
			<view hover-class="bg-hover-warning" class="button bg-warning  flex align-center justify-center">
				{{item.btn}}
			</view>
		</view>
		
		<uni-load-more :status="moreStatus"></uni-load-more>
		
		
	</view>
</template>

<script>
	/**
	 * 1. 优惠卷数据的获取与渲染
	 * 2. 实现优惠卷页面的下拉刷新与上拉加载
	 * 3. 实现优惠卷是否过期的处理
	 * 3. 实现优惠卷适用课程类型的处理
	 * 
	 */
	import couponApi from "@/api/coupon.js"
	export default {
		data() {
			return {
				page : 1,
				limit : 10,
				couponList : [],
				moreStatus : "loading"
			}
		},
		onLoad(){
			this.initLoad()
		},
		// 下拉刷新方法
		onPullDownRefresh() {
			this.page = 1
			this.initLoad()
		},
		onReachBottom() {
			if(this.moreStatus !== 'more'){
				return 
			}

			this.page = this.page + 1
			this.initLoad()
		},
		methods: {
			async initLoad(){
				try{
					const data = {page : this.page, limit : this.limit}
					const response = await couponApi.getCouponList(data)
					response.rows = this.formatList(response.rows)
					this.couponList = this.page === 1 ? response.rows : this.couponList.concat(response.rows)
					this.moreStatus = response.rows.length < 10 ? 'noMore' : 'more'
				}catch(e){
					//TODO handle the exception
					this.moreStatus = "more"
					if(this.page > 1){
						this.page = this.page - 1
					}
					console.log("error=>", e)
				}finally{
					uni.stopPullDownRefresh()
				}
			},
			formatList(list){
				list.forEach(item=>{
					//1. 获取当前的时间
					const now = (new Date()).getTime()

					//2. 获取优惠卷过期的时间
					const end = (new Date(item.end_time)).getTime()

					//3. 判断优惠卷过期的时间是否小于当前的时间, 如果优惠卷过期的时间小于当前时间,则 返回true, 否则, 返回return false;
					item.expired = end < now
					
					//4. 根据优惠卷的使用情况动态设置按钮显示的文本
					item.btn = item.used === 1 ? '已使用' : (item.expired ? '已过期' : '立即使用')
	
					// 根据返回额type字端,来处理课程使用优惠卷情况
					item.typeName = item.type === 'course' ? '课程' : '专栏'
					
				})
				return list
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
	width: 490rpx;
	border-right: 4rpx dashed;
}
.button{
	width: 200rpx;
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
