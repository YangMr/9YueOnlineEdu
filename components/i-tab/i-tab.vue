<template>
	<view class="flex border-bottom">
		<view @click="handleTab(index)" :class="[index === current ? 'tab-item-active' : '']" class="tab-item" v-for="(item,index) in tabs" :key="index">
			<text class="font-md">{{item.title}}</text>
			<view v-if="index === current" class="tab-line animate__animated animate__fadeIn animate__faster "></view>
		</view>
	
	</view>
</template>

<script>
	export default {
		name:"i-tab",
		props : {
			current : {
				type : Number,
				default : 0
			},
			tabs : {
				type : Array,
				default : () => ([])
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleTab(index){
				this.$emit("tab",index)
			}
		}
	}
</script>

<style lang="scss">
.tab-item{
	position: relative;
	display: flex;
	flex-direction: column;
	flex : 1;
	align-items: center;
	justify-content: center;
	padding : 20rpx;
	color : #888;
}
.tab-line{
	width: 50rpx;
	height :10rpx;
	background-color: #00cf8a;
	border-radius: 10rpx;
	position: absolute;
	bottom : 0;
}
.tab-item-active{
	color :#00cf8a;
	font-weight: bold;
}
</style>