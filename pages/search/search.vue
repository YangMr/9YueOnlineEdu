<template>
	<view class="px-2">
		<!-- 搜索栏标题 -->
		<view class="flex justify-between align-center py-3">
			<text class="font-md font-weight-bold">历史记录</text>
			<text class="font-sm text-light-muted" @click="handleHistoryClear">清除全部</text>
		</view>

		<!-- 搜索的历史记录 -->
		<view class="history flex flex-wrap">
			<text @click="handleSearchEvent(item)" class="item bg-hover-light px-2 py-1 font-sm rounded-circle" v-for="(item,index) in historyList" :key="index">{{item}}</text>
			<!-- <uni-badge size="normal" v-for="(item,index) in 20" :key="index" class="uni-badge-left-margin" text="uni" type="info" /> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索的历史记录
				historyList : [],
				// 搜索的关键词
				keyword : ''
			}
		},
		// 输入框输入时触发的方法
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		// 点击回车键或者确认键触发的方法
		onNavigationBarSearchInputConfirmed() {
			this.handleSearchEvent()
		},
		// 点击搜索按钮触发的方法
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.handleSearchEvent()
			}
		},
		onLoad() {
			const list = uni.getStorageSync("historyList")
			if(list){
				this.historyList = list
			}
		},
		methods: {
			// 搜索方法
			handleSearchEvent(value = ""){
				if(value !== ""){
					this.keyword = value
				}
				
				// 判断搜索的关键词是否为空
				if(this.keyword === ""){
					return this.$utils.toast("请输入关键词")
				}
				
				// 跳转到搜索结果页面
				this.navTo("/pages/search-result/search-result?keyword=" + this.keyword)
				
				// 添加历史记录
				this.handleAddHistory()
			},
			
			// 添加搜索的历史记录
			handleAddHistory(){
				// 判断搜索的关键字是否在历史记录里面
				const index = this.historyList.findIndex(item=> item === this.keyword)
				if(index !== -1){
					// 将存在的这条数据放在首位
					this.objToFirst(this.historyList, index)
				}else{
					this.historyList.unshift(this.keyword)
				}
				uni.setStorageSync("historyList", this.historyList)
			},			
			// 清除历史记录
			async handleHistoryClear() {
				try{
					const res =await this.$utils.modal("", "是否要清除搜索的历史记录")
					if(!res) return
					this.historyList = []
					uni.removeStorageSync("historyList")
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			
			},
			// 置顶数组的某一项 (将正在搜索的关键词如果在历史记录里面存在,则让当前搜索的关键词放在第一位)
			objToFirst(list, index){
				if(index !== 0){
					list.unshift(list.splice(index,1)[0])
				}
				return list
			}
		}
	}
</script>

<style lang="scss">
.history{
	
	.item{
		margin-right : 25rpx;
		margin-bottom: 25rpx;
		// min-width: 100rpx;
		max-width: 350rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
