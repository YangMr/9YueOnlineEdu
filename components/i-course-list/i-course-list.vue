<template>
	<view class="scroll-row-item course" :class="'course-' + type" @click="handleToDetailPage">
		<view class="position-relative">
			<image :src="item.cover" mode=""></image>
			<view v-if="item.type" class="text-white font-sm position-absolute">{{item.type|formatType}}</view>
		</view>
		<view class="flex flex-column">
			<text class="text-ellipsis font-md mt-1">{{item.title}}</text>
			<slot name="desc">
				<view class="text-ellipsis my-1 font-sm text-muted" v-html="item.try" v-if="item.try && !item.price">
				</view>
			</slot>
			<view v-if="module === 'live'" class="font-sm  my-2" :class="liveStatus ? 'text-danger' : 'text-muted'">{{liveStatus ? '直播中' : '已结束'}}</view>
			<view class="flex flex-1 align-end">
				<slot>
					<text class="font-md text-danger" v-if="item.price == 0">免费</text>
					<text class="font text-danger" v-if="tag">{{tag}}:</text>
					<text class="font text-danger" v-if="item.price > 0">￥{{item.price}}</text>
					<text class="font-smaller text-light-muted" v-if="item.t_price">￥{{item.t_price}}</text>
				</slot>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "i-course-list",
		props: {
			type: {
				type: String,
				default: 'two'
			},
			item: {
				type: Object,
				default: () => ({})
			},
			module: {
				type: String,
				default: ''
			}
		},
		computed: {
			tag() {
				if (this.module === 'course' || this.module === 'column' || this.module === 'live') {
					return ""
				}
				return this.module === 'flashsale' ? '秒杀价' : '拼团价'
			},
			liveStatus() {
				const time = this.item.end_time
				const endTime = new Date(time).getTime()
				const currentTime = Date.now()
				return currentTime - endTime < 0 ? true : false
			},
		},
		filters: {
			formatType(value) {
				let type = {
					media: '图文',
					audio: '音频',
					video: '视频',
					column: '专栏'
				}

				return type[value]
			}

		},
		data() {
			return {

			};
		},
		methods: {
			handleToDetailPage() {

				let url = "/pages/course/course?id=" + this.item.id

				// 当点击图文列表时,type的值如果不存在则跳转到专栏页面
				// 否则,则跳转到course页面
				if (!this.item.type || this.item.type === 'column') {
					url = "/pages/column/column?id=" + this.item.id
				}

				this.navTo(url)

				// this.navTo("/pages/course/course?id=" + this.item.id)
			}
		}
	}
</script>

<style lang="scss">
	.course-two {
		width: 340rpx;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}

	.course-two>view:first-child,
	.course-two>view:first-child image {
		width: 340rpx;
		height: 180rpx;
	}

	.course>view:first-child>view {
		background-color: rgba(0, 0, 0, 0.4);
		padding: 5rpx 10rpx;
		right: 10rpx;
		bottom: 10rpx;
	}

	.course-one {
		display: flex !important;
		padding: 20rpx;
	}

	.course-one>view:first-child {
		margin-right: 20rpx;
	}

	.course-one>view:first-child,
	.course-one>view:first-child image {
		width: 300rpx;
		height: 170rpx;
	}

	.course-one>view:last-child {
		width: 400rpx;
	}
</style>
