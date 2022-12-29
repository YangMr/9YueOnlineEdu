<template>
	<view>
		<view style="height : 100rpx;"></view>
		<view class="test-actions">
			
			<view :class="current <= 1 ? 'text-light-muted' : ''" class="iconfont icon-shangyibu" hover-class="bg-light" @click="prev"></view>
			<view hover-class="bg-light" @click="$emit('open')">
				<view class="iconfont icon-leimupinleifenleileibie"></view>
				<view class="flex justify-center align-center font-sm">
					<text class="text-main">{{current}}</text>
					<text>/{{total}}</text>
				</view>
			</view>
			
			<view v-if="showSubmit" hover-class="bg-light" @click="submit">
				<view class="iconfont icon-tijiao"></view>
				<text class="font-sm">交卷</text>
			</view>
			
			<view  :class="current >= total ? 'text-light-muted' : ''"  hover-class="bg-light" class="iconfont icon-xiayibu" @click="next"></view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"i-test-actions",
		props : {
			current : {
				type : Number,
				default : 1
			},
			total : {
				type : Number,
				default : 1
			},
			showSubmit : {
				type : Boolean,
				default : true
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			// 上一题
			prev(){
				if(this.current === 1){
					return
				}
				this.$emit("on-page", this.current-1)
			},
			// 下一题
			next(){
				if(this.current === this.total){
					return
				}
				this.$emit("on-page", this.current+1)
			},
			// 交卷
			submit(){
				this.$emit("submit")
			}
		}
	}
</script>

<style lang="scss">
.test-actions{
	position: fixed;
	left : 0;
	right : 0;
	bottom : 0;
	height: 100rpx;
	z-index: 1;
	background-color: #fff;
	display: flex;
	border-top:1rpx solid #ccc;
}
.test-actions > view{
	flex : 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.test-actions > .iconfont{
	font-size : 40rpx;
}
</style>