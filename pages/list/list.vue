<template>
	<view>
		<view v-for="(item,index) in bookList" :key="index">
			<i-course-list type="one" :item="item"></i-course-list>
		</view>
		
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import detailApi from "@/api/detail.js"
	export default {
		data() {
			return {
				module : '',
				page : 1,
				limit : 10,
				bookList : [],
				loadStatus : 'loading',
				total : 0
			}
		},
		onLoad(e) {
			if(e.module){
				this.module = e.module
				
				let title =  e.module === 'course' ? '课程' : '专栏'
				uni.setNavigationBarTitle({
					title :  title + '列表'
				})
			}
			
			this.initLoad()
		},
		
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			if(this.bookList.length >= this.total){
				return
			}
			
			this.page += 1
			this.loadStatus = "more"
			this.initLoad()
		},
		methods: {
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
					const response = await detailApi.getCourseList(data)
					this.total = response.count
					let rows = response.rows
					
					this.bookList = this.page === 1 ? rows : this.bookList.concat(rows)
					
					this.loadStatus = this.bookList.length !== response.count  ? "more" :  "nomore"
					
					console.log("response=>", this.bookList)
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

<style>

</style>
