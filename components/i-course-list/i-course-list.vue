<template>
	<view class="flex" :class="'course-'+type">
		<view class="left position-relative">
			<image :src="item.cover" mode=""></image>
			<view class="type font-sm">{{item.type|typeFilter}}</view>
		</view>
		<view class="right flex flex-column">
			<view class="title text-ellipsis font-md">
				{{item.title}}
			</view>
			<view class="flex flex-1 align-end">
				<text class="font-md text-danger">{{item.price}}</text>
				<text class="font-sm text-light-muted">{{item.t_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-course-list",
		props :{
			type : {
				type : String,
				default : "row"
			},
			item : {
				type : Object,
				default : () => ({})
			}
		},
		filters : {
			typeFilter(value){
				const type = {
					media:"图文",
					audio:"音频",
					video:"视频",
					column:"专栏"
				}
				
				return type[value]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.course-row{
	padding:20rpx;
}
.course-row .left {
	margin-right:20rpx;
}
.course-row .left image{
	width: 300rpx;
	height: 170rpx;
	flex-shrink: 1;
}
.course-row .left .type{
	position: absolute;
	right: 10rpx;
	bottom: 20rpx;
	color : #fff;
	background-color: rgba(0,0,0,0.4);
	padding: 0 10rpx;
}
.course-row .right{
	flex : 1;
	// background-color: yellow;
}
</style>