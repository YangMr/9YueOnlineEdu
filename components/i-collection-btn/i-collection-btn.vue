<template>
	<view>
		<text :class="isfava ? 'text-main' : ''" @click="handleSubmit" class="iconfont icon-shoucang1" style="font-size: 50rpx;"></text>
	</view>
</template>

<script>
	import collectApi from "@/api/collection.js"
	export default {
		name:"i-collection-btn",
		props : {
			// 课程/专栏id
			goods_id : {
				type : [String,Number],
				default : ""
			},
			// 类型：course课程，column专栏，book电子书
			type : {
				type : String,
				default : "course"
			},
			// 是否收藏
			isfava : {
				type : Boolean,
				default : false
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleSubmit(){
				console.log("isfava", this.isfava)
				// 1. 当前是收藏还是取消收藏 // 2. 获取收藏/取消收藏所需要的参数
				if(this.isfava){
					this.handleUnCollect()
				}else{
					this.handleCollect()
				}
			},
			// 收藏
			async handleCollect(){
				try{
					uni.showLoading({
						title: '收藏中...',
						mask: false
					});
					
					const data = {
						goods_id : this.goods_id,
						type : this.type
					}
					const response = await collectApi.collect(data)
					
					this.$utils.toast("收藏成功")
					
					this.$emit("success", true)
					console.log("Res=>", response)
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.hideLoading()
				}
			},
			// 取消收藏
			async handleUnCollect(){
				try{
					uni.showLoading({
						title: '取消收藏中...',
						mask: false
					});
					
					const data = {
						goods_id : this.goods_id,
						type : this.type
					}
					const response = await collectApi.uncollect(data)
					
					this.$utils.toast("取消收藏成功")
					
					this.$emit("success", false)
					console.log("Res=>", response)
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.hideLoading()
				}
			}
		
		}
	}
</script>

<style>

</style>