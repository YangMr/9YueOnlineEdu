<template>
	<view>
		<!-- 搜索框 -->
		<i-search-bar @search="handleSearch" showIcon placeholder="请输入搜索关键词"></i-search-bar>

		<!-- 轮播图 -->
		<i-banner :list="bannerList"></i-banner>

		<!-- 分类模块 -->
		<i-nav :list="iconList"></i-nav>

		<!-- 优惠卷模块 -->
		<i-coupon :list="couponList"></i-coupon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [{
						"src": "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/dishaweb/08C9150BC2B163AEC012D6E544C75DD2.png",
						"url": "http://www.dishaxy.com",
						"type": "webview",
						"course_title": "VueCli 实战商城后台管理系统",
						"course_id": 538
					},
					{
						"src": "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/dishaweb/96bd39ce1d334b8493bac12bb1aa4223.png",
						"url": "",
						"type": "course",
						"course_title": "VueCli 实战商城后台管理系统",
						"course_id": 538
					}
				],
				iconList: [{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/e8a7876274d45405e704.png",
						"name": "活动",
						"url": "http://www.dishaxy.com",
						"type": "webview",
						"course_title": "VueCli 实战商城后台管理系统",
						"course_id": 538
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/267d76844eefe2e7ce81.png",
						"name": "考试",
						"url": "",
						"type": "module",
						"module": "test"
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/ea3f0d7724e2119058b8.png",
						"name": "秒杀",
						"url": "",
						"type": "module",
						"module": "flashsale"
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/e5e8ae6780f437983ec3.png",
						"name": "拼团",
						"url": "",
						"type": "module",
						"module": "group"
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/1ffe181c57d0b7919824.png",
						"name": "直播",
						"type": "module",
						"url": "",
						"page_id": 0,
						"page_title": "",
						"course_title": "",
						"course_id": "",
						"module": "live"
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/10b103f786cffae72dba.png",
						"name": "专栏",
						"type": "module",
						"url": "",
						"page_id": 0,
						"page_title": "",
						"course_title": "",
						"course_id": "",
						"module": "column"
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/ffc5d0c974d0b1b74abc.png",
						"name": "电子书",
						"type": "module",
						"url": "",
						"page_id": 0,
						"page_title": "",
						"course_title": "",
						"course_id": "",
						"module": "book"
					},
					{
						"src": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/f6db135632407f0ff282.png",
						"name": "社区",
						"type": "module",
						"url": "",
						"page_id": 0,
						"page_title": "",
						"course_title": "",
						"course_id": "",
						"module": "bbs"
					}
				],
				couponList: [{
						"id": 83,
						"type": "course",
						"goods_id": 1636,
						"price": "4.00",
						"c_num": 300000,
						"received_num": 15,
						"start_time": "2022-07-14T16:00:00.000Z",
						"end_time": "2025-08-22T16:00:00.000Z",
						"value": {
							"id": 1636,
							"title": "中级经济法-知识点精讲课"
						},
						"isgetcoupon": false
					},
					{
						"id": 39,
						"type": "column",
						"goods_id": 184,
						"price": "8.90",
						"c_num": 10000,
						"received_num": 140,
						"start_time": "2021-09-09T16:00:00.000Z",
						"end_time": "2034-10-16T16:00:00.000Z",
						"value": {
							"id": 184,
							"title": "VueCli 实战商城后台管理系统"
						},
						"isgetcoupon": false
					},
					{
						"id": 33,
						"type": "course",
						"goods_id": 6,
						"price": "5.00",
						"c_num": 100000,
						"received_num": 120,
						"start_time": "2021-06-28T17:58:01.000Z",
						"end_time": "2035-07-28T16:00:00.000Z",
						"value": {
							"id": 6,
							"title": "VueCli 实战在线教育后台系统"
						},
						"isgetcoupon": false
					},
					{
						"id": 19,
						"type": "course",
						"goods_id": 11,
						"price": "50.00",
						"c_num": 100000,
						"received_num": 87,
						"start_time": "2021-05-15T17:03:00.000Z",
						"end_time": "2032-06-29T16:00:00.000Z",
						"value": {
							"id": 11,
							"title": "uni-app实战直播app全栈开发"
						},
						"isgetcoupon": false
					},
					{
						"id": 18,
						"type": "course",
						"goods_id": 12,
						"price": "5.00",
						"c_num": 10000,
						"received_num": 82,
						"start_time": "2021-05-15T17:02:00.000Z",
						"end_time": "2032-06-29T16:00:00.000Z",
						"value": {
							"id": 12,
							"title": "unicloud商城全栈开发"
						},
						"isgetcoupon": false
					}
				]
			}
		},
		methods: {
			// 点击搜索框触发的方法
			handleSearch() {
				this.navTo("/pages/search/search")
			}
		}
	}
</script>

<style>

</style>
