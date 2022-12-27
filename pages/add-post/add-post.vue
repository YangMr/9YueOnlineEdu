<template>
	<view>
		<picker mode="selector" :range="menu" @change="handleChange">
			<view class="p-2">
				<button size="mini" class="w-100" type="default">
					{{activeIndex === -1 ? '选择社区' : menu[activeIndex]}}
				</button>
			</view>
		</picker>
		
		<view class="c">
			<uni-card  v-for="(item,index) in form" :key="index" :is-shadow="false" isFull title=" " padding="20rpx 0" :extra="index === 0 ? '' : '移除'">
				<view>
					<textarea v-model="item.text" placeholder="请填写帖子内容" class="bg-light w-100 p-2 " style="box-sizing: border-box;" />
				</view>
				<view>
					上传组件
				</view>
			</uni-card>
		</view>
		
		
		<view style="height: 125rpx;"></view>
		<view class="p-2 button">
			<i-main-btn bClass="py-2" @click="handleAddContent">添加内容</i-main-btn>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex : -1,
				menu :['张三','里斯'],
				form : [
					{
						text : '',
						images : []
					}
				]
			}
		},
		computed : {
			selectBbs(){
				return this.activeIndex === -1 ? '选择社区' : this.menu[this.activeIndex]
			}
		},
		methods: {
			handleChange(e){
				console.log("e=>", e)
				this.activeIndex = e.detail.value
			},
			handleAddContent(){
				this.form.push({
					text : '',
					images : []
				})
			}
		}
	}
</script>

<style lang="scss">
// /deep/ .c > .uni-card__header { 
// 	border-bottom: none !important;
// }
/deep/ .c > .uni-card:nth-child(1) .uni-card__header{
	border: none !important;
}
.button{
	position: fixed;
	bottom : 0;
	left : 0;
	right : 0;
	background-color: #fff;
}
</style>
