<template>
	<view>
		考试页面
		
		<view v-for="(item,index) in 100" :key="index">{{index}}</view>
		
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import examApi from "@/api/exam.js"
	export default {
		data() {
			return {
				page : 1,
				limit : 5,
				examList : [],
				loadStatus : 'loading'
			}
		},
		onLoad() {
			this.initLoad()
		},
		onPullDownRefresh() {
			this.page = 1
			this.initLoad()
		},
		onReachBottom() {
			this.page += 1
			this.loadStatus = "more"
			console.log("上拉加载")
			this.initLoad()
		},
		methods: {
			async initLoad(){
				try{
					
					const data = {
						page : this.page,
						limit : this.limit
					}
					const response = await examApi.getExamList(data)
					let rows = response.rows
					
					this.examList = this.page === 1 ? rows : this.examList.concat(rows)
					
					this.loadStatus = this.examList.length !== response.count  ? "more" :  "nomore"
					
					console.log("response=>", this.examList)
				}catch(e){
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
