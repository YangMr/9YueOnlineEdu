<template>
	<view>
		
		<i-book-list isBuy v-for="(item,index) in bookList" :key="index" :item="item"></i-book-list>
		
		
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import bookApi from "@/api/book.js"
	export default {
		data() {
			return {
				page : 1,
				limit : 10,
				bookList : [],
				loadStatus : 'loading',
				total : 0
			}
		},

		onLoad() {
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
					const response = await bookApi.getMyBookList(data)
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

<style lang="scss">
.card{
	padding: 0 !important; 
}
</style>
