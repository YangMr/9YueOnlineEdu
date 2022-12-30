<template>
	<view>
		<view class="flex flex-wrap">
			<i-course-list :module='module'  v-for="(item,index) in bookList" :key="index" :type="module === 'course' || module ==='column' ? 'one' : 'two' " :item="item"></i-course-list>
		</view>
		
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import detailApi from "@/api/detail.js"
	import indexApi from "@/api/index.js"
	import liveApi from "@/api/live.js"
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
				
				// let title =  e.module === 'course' ? '课程' : '专栏'
				let type = {
					course : '课程',
					column : '专栏',
					flashsale : '秒杀',
					group : '拼团',
					live : '直播'
				}
				uni.setNavigationBarTitle({
					title :  type[this.module] + '列表'
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
					
					let requestApi = {
						course :  detailApi.getCourseList(data),
						column :  detailApi.getColumnList(data),
						flashsale :  indexApi.getFlashsaleList(data),
						group :  indexApi.getGroupList(data),
						live :   liveApi.getLiveList(data)
					}
					
					if(this.module === 'flashsale' || this.module === 'group'){
						data.usable = 1
					}
					
					console.log('this.module',requestApi[this.module])
					
					let response =await requestApi[this.module]
					// if(this.module === 'course'){
					// 	 response = await detailApi.getCourseList(data)
					// }else if(this.module ==='column' ){
					// 	 response = await detailApi.getColumnList(data)
					// }else if(this.module === 'flashsale'){
					// 	data.usable = 1
					// 	response = await indexApi.getFlashsaleList(data)
					// }else if(this.module === 'group'){
					// 	data.usable = 1
					// 	response = await indexApi.getGroupList(data)
					// }else if(this.module === 'live'){
					// 	response = await liveApi.getLiveList(data)
					// }
					
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
