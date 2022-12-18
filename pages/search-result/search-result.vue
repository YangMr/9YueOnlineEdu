<template>
	<view class="search-result flex flex-column flex-1">
		<!-- tab -->
		<i-tab @tab="handleTab" :current="current" :tabs="tabs"></i-tab>
		
		<!-- 搜索结果列表 -->
		<swiper class="flex-1 flex flex-column"  @change="handleChange" :current="current" :duration="200">
			<swiper-item class="flex" v-for="(item,index) in tabs" :key="index">
				<scroll-view @scrolltolower="handleLoadMore(item)" class="flex-1" scroll-y="true" >
					<i-course-list type="one" :item="m" v-for="(m,n) in item.list" :key="n"></i-course-list>
					<uni-load-more :status="item.loadMore"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import searchApi from "@/api/search.js"
	export default {
		data() {
			return {
				current : 0,
				tabs : [
					{
						title : '课程',
						type : 'course',
						page : 1,
						list : [],
						loadMore : "more"
					},
					{
						title : '专栏',
						type : 'column',
						page : 1,
						list : [],
						loadMore : "more"
					}
				],
				keyword : ""
			}
		},
		onNavigationBarSearchInputClicked() {
			this.navBack()
		},
		onLoad(e) {
			console.log("e=>", e)
			this.keyword = e.keyword
			this.initLoad()
		},
		methods: {
			async initLoad(){
				try{
					const tab = this.tabs[this.current]
					const response = await searchApi.search({
						keyword : this.keyword,
						type : tab.type,
						page : tab.page,
					})
					
					tab.list = tab.page === 1 ? response.rows : [...tab.list, ...response.rows]
					tab.loadMore = response.rows.length < 10 ? 'noMore' : 'more'

				}catch(e){
					tab.loadStatus = 'more'
					if(tab.page > 1){
						tab.page = tab.page - 1
					}
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			handleTab(index){
				this.current = index
			},
			handleChange(e){
				this.current = e.detail.current
				const tab = this.tabs[this.current]
				if(tab.loadMore === "more" && tab.page === 1){
					this.initLoad()
				}
			},
			// 上拉加载
			handleLoadMore(item){
				if(item.loadMore !== 'more') return
				item.page = item.page + 1
				this.initLoad()
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
