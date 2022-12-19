<template>
	<view>
		
		<indexSkeleton v-if="loadingStatus"></indexSkeleton>
		
		<view v-else>
			<block v-for="(item,index) in templateList" :key="index">
				
				<!-- 搜索框 -->
				<i-search-bar v-if="item.type === 'search'" @search="handleSearch" showIcon :placeholder="item.placeholder"></i-search-bar>
				
				<!-- 轮播图 -->
				<i-banner v-if="item.type === 'swiper'" :list="item.data"></i-banner>
				
				<!-- 分类模块 -->
				<i-nav v-if="item.type === 'icons'" :list="item.data"></i-nav>
				
				<!-- 优惠卷模块 -->
				<i-coupon v-if="item.type === 'coupon'" :list="couponList"></i-coupon>
				
				<!-- 拼团模块 -->
				<view v-if="item.type === 'promotion'">
					<view class="divider"></view>
					
					<view class="flex px-2 py-3">
						<text class="font-md font-weight-bold">拼团</text>
					</view>
					<view>
						<scroll-view class="scroll-row" scroll-x="true" >
							<!-- <i-course-list v-for="(course,i) in courseList" :key="i" :item="course"></i-course-list> -->
						</scroll-view>
					</view>
				</view>
				
				
				<!-- 最新列表 -->
				<view v-if="item.type === 'list'">
					<view class="divider"></view>
					
					<view class="flex px-2 align-center justify-between py-3">
						<text class="font-md font-weight-bold">{{item.title}}</text>
						<text v-if="item.more" class="font-sm text-light-muted">查看更多</text>
					</view>
					<view>
						<scroll-view class="scroll-row" scroll-x="true" >
							<i-course-list :type="item.listType" v-for="(course,i) in item.data" :key="i" :item="course"></i-course-list>
						</scroll-view>
					</view>
				</view>
				
				<!-- 广告模块 -->
				<view v-if="item.type === 'imageAd'" >
					<view class="divider"></view>
					<image style="height:360rpx; width:100%;" :src="item.data" mode=""></image>
				</view>
				
			</block>
			
		</view>
		
	</view>
</template>

<script>
	import indexApi from "@/api/index.js"
	import indexSkeleton from "./index-skeleton.vue"
	export default {
		data() {
			return {
				templateList : [],
				couponList : [],
				loadingStatus : false
			}
		},
		components : {
			indexSkeleton
		},
		onPullDownRefresh() {
			this.init()
		},
		onLoad() {
			this.loadingStatus = true
			this.init()
		},
		methods: {
			async init(){
				this.initLoad()
				this.loadConponList()
				uni.$on("userLogout", this.loadConponList)
				uni.$on("userLogin", this.loadConponList)
			},

			// 点击搜索框触发的方法
			handleSearch() {
				this.navTo("/pages/search/search")
			},
			// 初始化数据
			async initLoad(){
				try{
					const response = await indexApi.getIndexList()
					this.templateList = response
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.stopPullDownRefresh()
					this.loadingStatus = false
				}
			},
			// 获取可用优惠卷的数据
			async loadConponList(){
				try{
					const response = await indexApi.getCouponList()
					console.log("r=>", response)
					this.couponList = response
				}catch(e){
					//TODO handle the exception
				}finally{
					this.loadingStatus = false
				}
			}
		}
	}
</script>

<style>

</style>
