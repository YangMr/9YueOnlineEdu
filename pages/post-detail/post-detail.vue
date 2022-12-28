<template>
	<view>
		<!-- 帖子内容 -->
		<post-list :item="detail" isContent></post-list>
		
		<!-- 评论 -->
		<view class="px-2 ">
			<view class="comment-list" v-for="(item,index) in commentList" :key="index">
				<image class="face" :src="item.user.avatar" mode=""></image>
				<view class="flex-1"  @click="handleOpenComment({reply_id : item.id, reply_user : item.user})">
					<view class="top">{{item.user.name}}</view>
					<view class="content">{{item.content}}</view>
					<view class="date">{{item.created_time}}</view>
					
					<!-- 评论 -->
					<view class="bg-light mt-2">
						<view class="comment-list" v-for="(item2,index2) in item.post_comments" :key="index2">
							<image class="face" :src="item2.user.avatar" mode=""></image>
							<view class="flex-1">
								<view class="top">
									<text>{{item2.user.name}}</text>
									@ <text>{{item2.reply_user.name}}</text>	
								</view>
								<view class="content">{{item2.content}}</view>
								<view class="date">{{item2.created_time}}</view>
							</view>
						</view>	
					</view>
				</view>
			</view>
			
			<button  :disabled="loadMoreStatus === 'loading' || loadMoreStatus === 'noMore'" @click="handleLoadMore" class="w-100 mt-2" type="default" size="mini">
				{{loadMoreStatus === 'more' ? '点击加载更多' : (loadMoreStatus === 'noMore' ? '没有更多了' : '加载中')}}
			</button>
		</view>
		
		
		<!-- 发布评论 -->
		<view style="height: 100rpx;"></view>
		<view style="height: 100rpx; " class="bg-white px-2 border-top align-center flex fixed-bottom">
			<view @click="handleOpenComment(false)" class="border rounded text-light-muted flex-1 bg-light px-2 py-1 mr-2">
				说一句吧
			</view>
			<view @click="handleSupport" class="flex align-center justify-center" :class="detail.issupport ? 'text-danger' : ''">
				<text class="iconfont icon-dianzan2" style="font-size:20px;"></text>
				<text class="ml-1">{{detail.support_count || "点赞"}}</text>
			</view>
			<i-comment-popup @send="handleSendComment" ref="commentPop"></i-comment-popup>
		</view>
		
		
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import {mapGetters} from "vuex"
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
				loadMoreStatus : 'more',
				commentForm : {
					reply_id : 0,
					reply_user : null
				}
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
		computed : {
			...mapGetters([
				"hasLogin"
			])
		},
		methods: {
			// 发表评论
			async handleSendComment(content){
				console.log("content=>", content)
				try{
					uni.showLoading({
						title: '发表中...',
						mask: false
					});
					let data = {
						"post_id": this.detail.id, //帖子ID
						"content": content, //评论内容
						"reply_id": 0, //被回复评论id，等于0时为一级评论
					}	
					
					if(this.commentForm.reply_user){
						data.reply_id = this.commentForm.reply_id
						data.reply_user = this.commentForm.reply_user
					}
					
					const response = await bbsApi.addComment(data)
					console.log("response=>", response)
					this.page = 1
					this.initLoadCommentList()
					uni.$emit("refresh")
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.hideLoading()
				}
			},
			// 拉起发布评论弹出层
			handleOpenComment(data){
				console.log("data=>", data)
				if(data){
					this.commentForm.reply_id = data.reply_id
					console.log("this.commentForm.reply_id=>", this.commentForm.reply_id)
					this.commentForm.reply_user = data.reply_user
					this.commentForm.reply_user.username = data.reply_user.name
				}else{
					this.commentForm = {
						reply_id : 0,
						reply_user : null
					}
				}
				
				this.$refs['commentPop'].open()
			},
			// 点赞触发的方法
			async handleSupport(id){
				try{
					console.log("hasLogin=>",this.hasLogin)
					if(!this.hasLogin){
						this.navTo("/pages/login/login")
						return 
					}
					// "issupport": false  没有点赞 true 已经点赞
					// 什么情况下调用点赞的接口 ? 
					// 什么情况下调用取消点赞的接口 ? 		
					// const item = this.postList.find(item=>{
					// 	return item.id === id
					// })
					
					const item = this.detail
					
					const data = {post_id : this.detail.id}
					if(!item.issupport){
						
						const response = await bbsApi.supportPostList(data)
						item.support_count += 1
						
						this.$utils.toast("点赞成功")
						// 点赞接口
						console.log("点赞")
					}else{
						const response = await bbsApi.unsupportPostList(data)
						item.support_count -= 1
						
						this.$utils.toast("取消点赞")
						// 取消点赞接口
						console.log("取消点赞")
					}
					item.issupport = !item.issupport
					
					uni.$emit("refresh")
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
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
