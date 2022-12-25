<template>
	<view>
		<!-- 倒计时 -->
		<i-timer-box @end="handleTestEnd" :expire="60"></i-timer-box>

		<!-- 考试题 -->
		<uni-card isFull :is-shadow="false" :title="q.type|formatType" :extra="`第${current}题`" note="Tips">
			<!-- 题目 -->
			<view class="mb-2">
				<mp-html :content="q.title">
					<view class="flex align-center justify-center  py-3">
						加载中...
					</view>
				</mp-html>
			</view>
			
			<!-- 问答题-->
			<textarea v-model="q.user_value[0]" v-if="q.type === 'answer'" value="" placeholder="请输入答案..." class="border w-100 p-2" style="box-sizing: border-box;" />
		
			<!-- 填空题 -->
			<view v-if="q.type === 'completion'">
				<textarea v-for="(item,index) in q.user_value" :key="index" v-model="q.user_value[index]"  value="" placeholder="请输入答案..." class="border w-100 p-2 mb-2" style="box-sizing: border-box;" />
				<i-main-btn bClass="py-2" @click="handleAddCompletion">添加填空</i-main-btn>
			</view>
			
			<!-- 判断题/单选题 -->
			<view v-if="q.type === 'trueOrfalse' || q.type === 'radio'">
				<i-test-question :checked="q.user_value === index" @click="handleDone" :index=index :label="item" v-for="(item,index) in q.options" :key="index"></i-test-question>
			</view>
			
			<!-- 多选题 -->
			<view v-if="q.type === 'checkbox'">
				<i-test-question :checked="index|formatChecked(q.user_value)" @click="handleDone" :index=index :label="item" v-for="(item,index) in q.options" :key="index"></i-test-question>
			</view>
		</uni-card>

		<!-- 底部tab -->
		<i-test-actions @submit="handleSubmit" @on-page="handlePage" :current="current" :total="total"></i-test-actions>
	</view>
</template>

<script>
	import examApi from "@/api/exam.js"
	const qType = {
		answer : "问答题",
		completion : '填空题',
		trueOrfalse : '判断题',
		checkbox : '多选题',
		radio : '单选题'
	}
	export default {
		data() {
			return {
				id : 0,
				current: 1,
				total: 0,
				list: []
			}
		},
		onBackPress() {
			// uni.showModal({
			// 	content: '是否要放弃这场考试？',
			// 	cancelText: '继续做题',
			// 	confirmText: '放弃',
			// 	success: res => {
			// 		if (res.confirm) {
			// 			console.log('用户点击确定');
			// 			this.navTo("/pages/test-list/test-list")
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	},

			// });
			// return true
		},
		onLoad(e) {
			this.id = e.id
			console.log("id", this.id)
			this.initLoad()
		},
		filters : {
			formatType(type){
				return qType[type]
			},
			formatChecked(index,arr){
				console.log(index,arr)
				return arr.includes(index)
			}
		},
		computed : {
			q(){
				return this.list[this.current - 1] || {}
			}
		},
		methods: {
			// 初始化开始考试数据
			async initLoad(){
				try{
					const data = {id : this.id}
					const response = await examApi.startExam(data)
					console.log("response=>", response)
					this.list = response.testpaper_questions
					this.total = response.testpaper_questions.length
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			// 考试时间结束方法
			handleTestEnd() {
				alert("考试时间结束")
			},
			// 上一题与下一题切换
			handlePage(page) {
				console.log("page=>", page)
				this.current = page
			},
			// 交卷
			handleSubmit() {
				alert("交卷")
			},
			// 添加填空
			handleAddCompletion(){
				this.list[this.current - 1].user_value.push("")
			},
			handleDone(index){
				if(this.q.type === 'radio' || this.q.type === 'trueOrfalse'){
					this.list[this.current - 1].user_value = index
					return
				}
				
				let i = this.q.user_value.findIndex(item=>{
					return item == index
				})

				if(i == -1){
					this.q.user_value.push(index)
				}else{
					this.q.user_value.splice(i,1)
				}
			}
		}
	}
</script>

<style>
#_root{
	color : #000 !important;
	font-size: 34rpx;
}
</style>
