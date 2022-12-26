<template>
	<view>
		<!-- 倒计时 -->
		<i-timer-box v-if="expire > 0" @end="handleTestEnd" :expire="expire"></i-timer-box>

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
		<i-test-actions @submit="beforeSubmit" @on-page="handlePage" :current="current" :total="total"></i-test-actions>
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
				list: [],
				expire : 0,
				user_test_id : 0,
				isBack : false
			}
		},
		// 点击返回箭头触发的方法
		onBackPress() {
			if(this.isBack){
				uni.$emit("refreshTestList")
				return false
			} 
			
			uni.showModal({
				content: '是否要放弃这场考试?',
				cancelText: '继续做题',
				confirmText: '放弃',
				success: res => {
					if(res.confirm){
						this.isBack = true
						this.navBack()
					}
				},

			});
			
			return true
		},
		onLoad(e) {
			if(!e.id){
				this.$utils.toast("非法参数")
				setTimeout(()=>{
					this.navBack()
				})
			}
			
			this.id = e.id
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
			},
			unDone(){
				// 问题: 怎么样才能知道用户哪些题填了, 哪些没填
				let arr = [] // 用来保存没有填写的题目序号
				
				this.list.forEach((item,index)=>{
					if((item.type === 'answer' || item.type === 'completion') && !item.user_value[0]){
						arr.push(index+1)
					}else if((item.type === 'trueOrfalse' || item.type === 'radio') && item.user_value === -1){
						arr.push(index + 1)
					}else if(item.type === "checkbox" && item.user_value.length === 0){
						arr.push(index + 1)
					}
					
				})
				
				return arr
			}
		},
		methods: {
			// 初始化开始考试数据
			async initLoad(){
				try{
					uni.showLoading({
						title : "加载中...",
						mask : false
					})
					const data = {id : this.id}
					const response = await examApi.startExam(data)
					this.list = response.testpaper_questions
					this.total = response.testpaper_questions.length
					this.expire = response.expire
					this.user_test_id = response.user_test_id
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}finally{
					uni.hideLoading()
				}
			},
			// 考试时间结束方法
			handleTestEnd() {
				this.isBack = true
				this.$utils.toast("考试结束")
				setTimeout(()=>{
					this.navBack()
				},600)
			},
			// 上一题与下一题切换
			handlePage(page) {
				console.log("page=>", page)
				this.current = page
			},
			// 交卷前的验证
			beforeSubmit(){
				if(this.unDone.length > 0){
					uni.showModal({
						content: `还有题目没有完成,第${this.unDone}题`,
						showCancel: false,
						confirmText: '确定',
						success: res => {},
					});
					return
				}
				
				uni.showModal({
					content: '是否要交卷?',
					cancelText: '继续做题',
					confirmText: '现在交卷',
					success: res => {
						if(res.confirm){
							this.handleSubmit()
						}
					},

				});
				
			},
			// 交卷
			async handleSubmit() {
				try{
					uni.showLoading({
						title : '交卷中...',
						mask : false
					})
					const data = {
						user_test_id : this.user_test_id,
						value : this.list.map(item=>item.user_value)
					}
					const response = await examApi.endExam(data)

					this.$utils.toast("交卷成功")
					this.isBack = true
					setTimeout(()=>{
						this.navBack()
					},600)
				}catch(e){
					//TODO handle the exception
					console.log("error=>",e)
				}finally{
					uni.hideLoading()
				}
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
