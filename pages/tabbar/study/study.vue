<template>
		<view class="search-result flex flex-column flex-1">
			<!-- tab -->
			<view class="px-3">
				<i-card-tab :tabs="cardTabs"></i-card-tab>
			</view>
		
			<!-- tab -->
			<i-tab @tab="handleTab" :current="current" :tabs="tabs"></i-tab>
		
		
			<!-- 搜索结果列表 -->
			<swiper class="flex-1 flex flex-column" @change="handleChange" :current="current" :duration="200">
				<swiper-item class="flex" v-for="(item,index) in tabs" :key="index">
		
					<scroll-view @scrolltolower="handleLoadMore(item)" class="flex-1" scroll-y="true">
						<i-course-list type="one" :item="m" v-for="(m,n) in item.list" :key="n">
							<view slot="desc" class="font-sm text-muted my-1">学习进度</view>
							<view class="font-sm">
								<text class="text-danger mr-1" v-if="n === 0">最近学习</text>
								<text class="text-muted">已学习 {{m.progress}}%</text>
							</view>
						</i-course-list>
						<uni-load-more :status="item.loadMore"></uni-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
			
			<!-- 用户在未登录的情况下显示no-login -->
			<i-no-login v-if="!hasLogin"></i-no-login>
		</view>
</template>

<script>
	import studyApi from "@/api/study.js"
	import {
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				cardTabs: [{
						id: 1,
						icon: 'iconfont icon-OrderHistory',
						title: '帖子',
						path: '/pages/my-post/my-post',
						isLogin: true
					},
					{
						id: 2,
						icon: 'iconfont icon-pinglun2',
						title: '考试',
						path: '/pages/my-test/my-test'
					},
					{
						id: 3,
						icon: 'iconfont icon-shoucang1',
						title: '电子书',
						path: '/pages/my-book/my-book'
					}
				],
				current: 0,
				tabs: [{
						title: '课程',
						type: 'course',
						page: 1,
						list: [],
						loadMore: "more"
					},
					{
						title: '专栏',
						type: 'column',
						page: 1,
						list: [],
						loadMore: "more"
					}
				],
			}
		},
		computed: {
			...mapGetters([
				"hasLogin"
			])
		},
		onShow(e) {
			if(this.hasLogin){
				this.tabs.forEach((item)=>{
					item.page = 1
					item.loadMore = "more"
				})
				this.initLoad()
			}
		},
		methods: {
			async initLoad() {
				try {
					const tab = this.tabs[this.current]
					const response = await studyApi.getStudyHistoryList({
						type: tab.type,
						page: tab.page,
					})

					tab.list = tab.page === 1 ? response.rows : [...tab.list, ...response.rows]
					tab.loadMore = response.rows.length < 10 ? 'noMore' : 'more'
					console.log("response=>", tab)
				} catch (e) {
					tab.loadStatus = 'more'
					if (tab.page > 1) {
						tab.page = tab.page - 1
					}
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			handleTab(index) {
				this.current = index
			},
			handleChange(e) {
				this.current = e.detail.current
				const tab = this.tabs[this.current]
				if (tab.loadMore === "more" && tab.page === 1) {
					this.initLoad()
				}
			},
			// 上拉加载
			handleLoadMore(item) {
				if (item.loadMore !== 'more') return
				item.page = item.page + 1
				this.initLoad()
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
