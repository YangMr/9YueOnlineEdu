<template>
	<view>
		<block v-for="(item,index) in templateList" :key="index">
			
			<!-- 搜索框 -->
			<i-search-bar v-if="item.type === 'search'" @search="handleSearch" showIcon :placeholder="item.placeholder"></i-search-bar>
			
			<!-- 轮播图 -->
			<i-banner v-if="item.type === 'swiper'" :list="item.data"></i-banner>
			
			<!-- 分类模块 -->
			<i-nav v-if="item.type === 'icons'" :list="item.data"></i-nav>
			
			<!-- 优惠卷模块 -->
			<i-coupon v-if="item.type === 'coupon'" :list="couponList"></i-coupon>
		</block>
		
	</view>
</template>

<script>
	import indexApi from "@/api/index.js"
	export default {
		data() {
			return {
				templateList : [],
				couponList : []
			}
		},
		onLoad() {
			this.initLoad()
			this.loadConponList()
			
			uni.$on("userLogout", this.loadConponList)
			uni.$on("userLogin", this.loadConponList)
		},
		methods: {
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
				}
			}
		}
	}
</script>

<style>

</style>
