<template>
	<view>
		<!-- 帖子分类tab -->
		<scroll-view @scrolltolower="handleLoadBbs" class="scroll-row px-1 pt-2" scroll-x="true" >
			<view @click="handleClickTab(index)" :class="activeIndex === index ? 'bg-main text-white' : 'bg-light text-muted'" v-for="(item,index) in bbsList" :key="index"  class="border mx-1 mb-2 scroll-row-item px-3 py-1 bg-light text-muted rounded">{{item.title}}</view>
			
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
				total : 0
			}
		},
		onLoad() {
			this.initLoadBbs()
		},
		methods: {
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
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			handleClickTab(index){
				this.activeIndex = index
			},
		}
	}
</script>

<style>
.text-white{
	color : #fff;
}
</style>
