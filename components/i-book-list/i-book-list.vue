<template>
	<view class="scroll-row-item course course-one"  @click="handleToDetailPage(item.id)">
		<view class="position-relative">
			<image class="rounded" :src="item.cover" mode=""></image>
			<view class="text-white font-sm position-absolute">{{item.type|formatType}}</view>
		</view>
		<view class="flex flex-column ">
			<text class="text-ellipsis font-md">{{item.title}}</text>
			<slot name="desc"></slot>
			<view class="flex flex-1 align-end">
				<slot>
					<text class="font-md text-danger" v-if="item.price == 0">免费</text>
					<text class="font-md text-danger" v-else-if="item.price > 0">￥{{item.price}}</text>
					<text class="font-sm text-light-muted" v-if="item.t_price">￥{{item.t_price}}</text>
					
					<!-- 订阅 -->
					<view class="flex align-center text-muted ml-auto border rounded-circle border-danger px-2 py-1 justify-center ">
						<text>{{item.sub_count}}人订阅</text>
						<text class="iconfont icon-xiayibu ml-1"></text>
					</view>
				</slot>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-book-list",
		props : {
			item : {
				type : Object,
				default : () => ({})
			}
		},
		filters : {
			formatType(value){
				let type = {
					media : '图文',
					audio : '音频',
					video : '视频',
					column : '专栏'
				}
				
				return type[value]
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleToDetailPage(id){
				

				this.navTo("/pages/book-detail/book-detail?id=" + id)
				
				// this.navTo("/pages/course/course?id=" + this.item.id)
			}
		}
	}
</script>

<style lang="scss">

.course > view:first-child > view{
	background-color: rgba(0,0,0,0.4);
	padding:5rpx 10rpx;
	right : 10rpx;
	bottom: 10rpx;
}

.course-one{
	display: flex !important;
	padding:20rpx;
}
.course-one > view:first-child{
	margin-right: 20rpx;
}
.course-one > view:first-child, .course-one > view:first-child image{
	width: 185rpx;
	height: 235rpx;
}
.course-one > view:last-child{
	width : 505rpx;
}
</style>
