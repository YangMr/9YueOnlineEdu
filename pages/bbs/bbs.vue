<template>
	<view>
		<!-- 帖子分类tab -->
		<scroll-view @scrolltolower="handleLoadBbs" class="scroll-row px-1 pt-2" scroll-x="true" >
			<view @click="handleClickTab(item,index)" :class="activeIndex === index ? 'bg-main text-white' : 'bg-light text-muted'" v-for="(item,index) in bbsList" :key="index"  class="border mx-1 mb-2 scroll-row-item px-3 py-1 bg-light text-muted rounded">{{item.title}}</view>
			
			<view class="scroll-row-item" v-if="bbsLoadStatus =='loading'">
				<uni-load-more  :status="bbsLoadStatus" :iconSize="13"></uni-load-more>
			</view>
		</scroll-view>
		<view class="divider"></view>
		
		<!-- 总帖子/总用户 -->
		<view class="flex py-2">
			<view class="flex-1 flex justify-center align-center text-muted font-md">
				<text class="font-weight-bold mr-2">总帖子</text> {{postCount}}
			</view>
			<view class="flex-1 flex justify-center align-center text-muted font-md">
				<text class="font-weight-bold mr-2">总用户</text> {{userCount}}
			</view>
		</view>
		<view class="divider"></view>
		
		
		<!-- 帖子列表 -->
		<post-list :item="item" v-for="(item,index) in postList" :key="index"></post-list>
		<uni-load-more  :status="postListLoadStatus" :iconSize="13"></uni-load-more>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	export default {
		data() {
			return {
				activeIndex : 0,
				bbsLoadStatus : 'loading',
				bbsPage : 1, // 社区列表页码
				bbsList : [], // 社区列表
				postCount : 0, // 总帖子
				userCount : 0, // 总用户
				total : 0,
				listQuery : {
					page : 1,
					keyword : "",
					bbs_id : ""
				},
				postListLoadStatus : 'loading',
				postListTotal : "",
				postList : []
			}
		},
		onLoad() {
			this.initLoadBbs()
			this.initLoadPostList()
		},
		onNavigationBarSearchInputConfirmed(e) {
			this.listQuery.keyword = e.text
			this.listQuery.page = 1
			this.postList = []
			this.initLoadPostList()
		},
		onPullDownRefresh() {
			try{
				this.listQuery.page = 1
				this.initLoadPostList()
			}catch(e){
				//TODO handle the exception
			}finally{
				uni.stopPullDownRefresh()
			}
		},
		onReachBottom() {
			if(this.postList.length === this.postListTotal) return
			
			this.listQuery.page += 1
			this.initLoadPostList()
		},
		methods: {
			async initLoadPostList(){
				try{
					uni.showLoading({
						title: '加载中...',
						mask : false
					})
					this.postListLoadStatus = "loading"
					const response = await bbsApi.getPostList(this.listQuery)
					this.postListTotal = response.count
					this.postList = this.listQuery.page === 1 ? response.rows : this.postList.concat(response.rows)
					
					this.postListLoadStatus = this.postList.length === this.postListTotal ? 'noMore' : 'more'
					
					console.log("response=>", this.postList.length)
				}catch(e){
					//TODO handle the exception
					this.postListLoadStatus = "more"
					if(this.listQuery.page > 1){
						this.listQuery.page -=1
					}
				}finally{
					uni.hideLoading()
				}
			},
			handleLoadBbs(){
				if(this.total === this.bbsList.length) return
				this.bbsPage += 1
				this.initLoadBbs()
			},
			async initLoadBbs(){
				try{
					this.bbsLoadStatus = "loading"
					const data = {page : this.bbsPage}
					const response = await bbsApi.getBbsList(data)
					let bbs = response.rows
					
		
					
					if(this.bbsPage === 1){
						bbs.unshift({
							id : 0, 
							title : '全部'
						})
					}
					
					this.bbsList = this.bbsPage === 1 ? bbs : this.bbsList.concat(bbs)
					
					this.bbsLoadStatus = this.bbsList.length === response.count ? 'noMore' : 'more'
					
					this.userCount = response.userCount
					this.postCount = response.postCount
					this.total = response.count
					console.log("response=>", this.bbsList)
				}catch(e){
					this.bbsLoadStatus = "more"
					if(this.bbsPage.page > 1){
						this.bbsPage.page -=1
					}
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			handleClickTab(item,index){
				
				if(this.activeIndex === index) return
				// console.log("item=>", item)
				this.activeIndex = index
				this.listQuery.bbs_id = item.id
				this.listQuery.page = 1
				this.postList = []
				this.initLoadPostList()
			},
		}
	}
</script>

<style>
.text-white{
	color : #fff;
}
</style>
