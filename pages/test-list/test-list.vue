<template>
	<view>
		<view v-for="(item,index) in examList" :key="index">
			<uni-card :is-shadow="false" class="card" isFull padding="20rpx 0">
				<view class="flex justify-between font-md px-2">
					<text class="h4 font-weight-bold">{{item.title}}</text>
					<text class="text-danger font-sm">时长：{{item.expire}}分钟</text>
				</view>
				<view class="flex my-3 font-md px-2 pb-1" style="color: #333;">
					<text class="flex-1 ">题目总数：{{item.question_count}}</text>
					<text class="flex-1">总分数：{{item.total_score}}</text>
					<text class="flex-1">及格分：{{item.pass_score}}</text>
				</view>
				<view class="border-top pt-3 pb-1 flex justify-end px-2" >
					<i-main-btn @click="handleStartTest(item)" :disabled="item.is_test" bClass="px-2" bStyle="height:80rpx;">{{item.is_test ? '你考过了' : '参加考试'}}</i-main-btn>
				</view>
			</uni-card>
			<view class="divider"></view>
		</view>
		
		
		
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
			
			uni.$on("refreshTestList", ()=>{
				this.initData()
			})
		},
		destroyed() {
			uni.$off("refreshTestList")
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
			initData(){
				this.page = 1
				this.initLoad()
			},
			handleStartTest(item){
				uni.showModal({
					content: '是否要开始考试？',
					success: res => {
						console.log("res=>", res)
						if(res.cancel) return
						
						this.navTo("/pages/test-detail/test-detail?id=" + item.id, {isLogin : true})
					},
				});
			},
			async initLoad(){
				try{
					
					const data = {
						page : this.page,
						limit : this.limit
					}
					this.loadStatus = "loading"
					const response = await examApi.getExamList(data)
					let rows = response.rows
					
					this.examList = this.page === 1 ? rows : this.examList.concat(rows)
					
					this.loadStatus = this.examList.length !== response.count  ? "more" :  "nomore"
					
					console.log("response=>", this.examList)
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
