<template>
	<view>
		<view class="p-3">
			<view  class="flex justify-between align-center w-100">
				<view class="flex align-center">
					<image class="mr-2 bg-light rounded-circle" :src="item.user.avatar || ''" mode="" style="width:75rpx; height:75rpx;"></image>
					<view class="flex flex-column align-start justify-center">
						<text class="text-primary font-weight-bold">{{item.user.name}}</text>
						<text class="text-muted font">{{item.user.sex}}</text>
					</view>
				</view>
				<view v-if="item.is_top" class="bg-warning text-white px-2 py-1 font">精华</view>
			</view>
			
			<view v-if="!isContent" class="py-2" @click="handleToPostDetail">
				<text>{{item.desc.text}}</text>
				<view class="flex flex-wrap" v-if="item.desc.images.length > 0">
					<view class="flex justify-center align-center mt-1" style="width:33.33%;" v-for="(src,srcI) in item.desc.images" :key="srcI">
						<image style="width: 220rpx; height:220rpx;" :src="src || ''" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view v-else class="flex flex-column p-2" v-for="(item2,index2) in item.content" :key="index2">
				<text class="mb-1">{{item2.text}}</text>
				<image class="w-100" v-for="(img,imgIndex) in item2.images"  :key="imgIndex" :src="img" mode="widthFix"></image>
			</view>
			
			<view v-if="!isContent" class="flex align-center justify-between mt-2">
				<view class="flex align-center">
					<view class="flex align-center pr-2">
						<text class="iconfont icon-pinglun2"></text>
						<text class="ml-1 font-smaller">{{item.comment_count === 0 ? '评论' : item.comment_count}}</text>
					</view>
					<view :class="item.issupport ? 'text-danger' : ''" class="flex align-center pr-2" @click="$emit('support', item.id)">
						<text class="iconfont icon-dianzan2"></text>
						<text  class="ml-1 font-smaller">{{item.support_count === 0 ? '点赞' : item.support_count}}</text>
					</view>
				</view>
				<!-- <view style="font-size: 20rpx;"  @click="$emit('delete',item.id)" v-if="showDelete" class="iconfont icon-guanbi"></view> -->
				<button @click="$emit('delete',item.id)" v-if="showDelete" type="warn" size="mini">删除</button>
				<text class="text-light-muted font">
					{{item.created_time}}
				</text>
			</view>
		</view>
		<view class="divider"></view>
	</view>
</template>

<script>
	export default {
		name:"post-list",
		props : {
			item : {
				type : Object,
				default : () => ({})
			},
			isContent : {
				type : Boolean,
				default : false
			},
			showDelete : {
				type : Boolean,
				default : false
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleToPostDetail(){
				this.navTo("/pages/post-detail/post-detail?id=" + this.item.id)
			}
		}
	}
</script>

<style>
.iconfont{
	font-size : 23px;
}
</style>