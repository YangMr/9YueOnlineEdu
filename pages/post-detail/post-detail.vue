<template>
	<view>
		<!-- 帖子内容 -->
		<post-list :item="detail" isContent></post-list>
		
		<!-- 评论 -->
		<view class="px-2 ">
			<view class="comment-list" v-for="(item,index) in commentList" :key="index">
				<image class="face" :src="item.user.avatar" mode=""></image>
				<view class="flex-1">
					<view class="top">{{item.user.name}}</view>
					<view class="content">{{item.content}}</view>
					<view class="date">{{item.created_time}}</view>
					
					<!-- 评论 -->
					<view class="bg-light mt-2">
						<view class="comment-list" v-for="(item2,index2) in item.post_comments" :key="index2">
							<image class="face" :src="item2.user.avatar" mode=""></image>
							<view class="flex-1">
								<view class="top">{{item2.user.name}}</view>
								<view class="content">{{item2.content}}</view>
								<view class="date">{{item2.created_time}}</view>
							</view>
						</view>	
					</view>
				</view>
			</view>
			
			<button :disabled="loadMoreStatus === 'loading' || loadMoreStatus === 'noMore'" @click="handleLoadMore" class="w-100" type="default" size="mini">
				{{loadMoreStatus === 'more' ? '点击加载更多' : (loadMoreStatus === 'noMore' ? '没有更多了' : '加载中')}}
			</button>
		</view>
		
		
		<!-- 发布评论 -->
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	export default {
		data() {
			return {
				detail: {
					"id": 0,
					"desc": {
						"images": [],
						"text": ""
					},
					"content": "",
					"user_id":0,
					"comment_count": 0,
					"support_count": 0,
					"is_top": 0,
					"created_time": "",
					"user": {
						"id": 0,
						"avatar": "",
						"sex": "",
						"name": ""
					},
					"issupport": false
				},
				page : 1,
				total : 0,
				commentList : [],
				loadMoreStatus : 'more'
			}
		},
		onLoad(e) {
			if (!e.id) {
				this.$utils.toast("非法参数")
				return this.navBack()
			}
			
			this.detail.id = e.id
			
			this.initLoadPostDetail()
		},
		methods: {
			// 点击加载更多
			handleLoadMore(){
				if(this.commentList.length === this.total) return
				
				this.page += 1
				this.initLoadCommentList()
			},
			async initLoadPostDetail(){
				try{
					
					const data = {id : this.detail.id}
					const response = await bbsApi.readPostDetail(data)
					console.log("response=>", response)
					this.detail = response
					
					this.initLoadCommentList()
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			async initLoadCommentList(){
				try{
					this.loadMoreStatus = "loading"
					const data = {
						page : this.page,
						post_id : this.detail.id
					}
					const response = await bbsApi.readPostCommentList(data)
					this.total = response.count
					this.commentList = this.page === 1 ? response.rows : this.commentList.concat(response.rows)
					this.loadMoreStatus = this.commentList.length === this.total ? 'noMore' : 'more'
					console.log("this.commentList=>", this.commentList)
				}catch(e){
					this.loadMoreStatus = "more"
					if(this.page > 1){
						this.page -= 1
					}
					//TODO handle the exception
					console.log("error=>", e)
				}
			}
		}
	}
</script>

<style lang="scss">
.comment-list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding:20rpx 0;
}
.comment-list .face{
	width: 70rpx;
	height: 70rpx;
	border-radius: 100%;
	margin-right: 20rpx;
	background-color: #eee;
}
.comment-list .top{
	color : #007aff;
	font-size : 24rpx;
}
.comment-list .content{
	padding: 8rpx 0;
}
.comment-list .date{
	color : #666;
	font-size : 24rpx;
}
</style>
