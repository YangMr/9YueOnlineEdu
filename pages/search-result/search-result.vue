<template>
	<view class="search-result flex flex-column flex-1">
		<!-- tab -->
		<i-tab @tab="handleTab" :current="current" :tabs="tabs"></i-tab>
		
		<!-- 搜索结果列表 -->
		<swiper class="flex-1 flex flex-column"  @change="handleChange" :current="current" :duration="200">
			<swiper-item class="flex" v-for="(item,index) in tabs" :key="index">
				<scroll-view class="flex-1" scroll-y="true" >
					<i-course-list :item="m" v-for="(m,n) in item.list" :key="n"></i-course-list>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current : 0,
				tabs : [
					{
						title : '课程',
						list : [
							{
							  "id": 6,
							  "title": "VueCli 实战在线教育后台系统",
							  "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/10ccf3a973f5193bec3c.png",
							  "price": "9.98",
							  "t_price": "9.98",
							  "type": "media"
							},
							{
							  "id": 7,
							  "title": "uni-app实战视频点播app小程序",
							  "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/47d1aa930177515cd95e.png",
							  "price": "9.98",
							  "t_price": "9.98",
							  "type": "media"
							},
							{
							  "id": 11,
							  "title": "uni-app实战直播app全栈开发",
							  "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/c948f4a7e402473337cb.png",
							  "price": "90.00",
							  "t_price": "90.00",
							  "type": "video"
							}
						]
					},
					{
						title : '专栏',
						list : [
							{
							  "id": 11,
							  "title": "uni-app实战直播app全栈开发",
							  "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/c948f4a7e402473337cb.png",
							  "price": "90.00",
							  "t_price": "90.00",
							  "type": "video"
							}
						]
					}
				]
			}
		},
		onNavigationBarSearchInputClicked() {
			this.navBack()
		},
		methods: {
			handleTab(index){
				console.log("index=>", index)
				this.current = index
			},
			handleChange(e){
				console.log("e=>", e)
				this.current = e.detail.current
			}
		}
	}
</script>

<style>
page{
	height : 100%;
	display: flex;
	flex-direction: column;
}
</style>
