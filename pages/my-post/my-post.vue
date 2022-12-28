<template>
	<view>
		
		<post-list @support="handleSupport" @delete="handleDeletePost" showDelete v-for="(item,index) in postList" :key="index" :item="item"></post-list>
		
		
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import {mapGetters} from "vuex"
	export default {
		data() {
			return {
				page : 1,
				limit : 5,
				postList : [],
				loadStatus : 'loading'
			}
		},
		computed : {
			...mapGetters([
				"hasLogin"
			])
		},
		onLoad() {
			this.initLoad()
		},

		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			this.page += 1
			this.loadStatus = "more"
			this.initLoad()
		},
		methods: {
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
					const item = this.postList.find(item=>{
						return item.id === id
					})
					
					const data = {post_id : id}
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
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
				
			
			},
			handleDeletePost(id){
				uni.showModal({
					content: '是否要删除该帖子?',
					success: async res => {
						if(res.confirm){
							this.deletePost(id)
						}
					}
				});
			},
			async deletePost(id){
				try{
				
					uni.showLoading({
						title: '删除中...',
						mask: false
					})
					const data = {id}
					const response = await bbsApi.deleteMyPost(data)
					this.$utils.toast("删除成功")
					this.initData()
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.hideLoading()
				}
			},
			initData(){
				this.page = 1
				this.initLoad()
			},
			async initLoad(){
				try{
					
					const data = {
						page : this.page,
						limit : this.limit
					}
					this.loadStatus = "loading"
					const response = await bbsApi.getMyPostList(data)
					let rows = response.rows
					
					this.postList = this.page === 1 ? rows : this.postList.concat(rows)
					
					this.loadStatus = this.postList.length !== response.count  ? "more" :  "nomore"
					
					console.log("response=>", this.postList)
				}catch(e){
					this.loadStatus = "more"
					if(this.page > 1){
						this.page -= 1
					}
					//TODO handle the exception
					console.log("error=>", e)
				}finally{

					uni.stopPullDownRefresh()
				}
			}
		}
	}
</script>

<style lang="scss">
.card{
	padding: 0 !important; 
}
</style>
