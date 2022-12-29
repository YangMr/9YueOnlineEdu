<template>
	<view>
		<!-- 图片 -->
		<view class="scroll-row-item course course-one">
			<view class="position-relative">
				<image class="rounded" :src="detail.cover" mode=""></image>
			</view>
			<view class="flex flex-column justify-between">
				<text class=" text-ellipsis font-lg">{{detail.title}}</text>
				
				<view class="flex flex-1 align-end">
					<view class="border  rounded p-2" style="border-color: rgb(255, 227, 203); background-color: rgb(255, 247, 240);">
						<text class="font-lg text-danger">¥{{detail.price}}</text>
						<text class="font text-light-muted ml-1">¥{{detail.t_price}}</text>
						<text class="text-danger mx-2">|</text>
						<text class="font text-danger ">
							{{detail.sub_count}}人
						</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="divider"></view>

		<!-- tab -->
		<i-tab @tab="handleTab" :current="current" :tabs="tabs"></i-tab>

		<!-- 简介 -->
		<view v-if="current === 0">
			<!-- 描述 -->
			<view class="flex flex-column p-3">
				<text class="mb-1" style="font-size:38rpx;">{{detail.title}}</text>
				<text class="font-sm text-light-muted">{{detail.sub_count}}人学过</text>
				<view v-if="!detail.isbuy" class="flex align-end mt-2">
					<text class="text-danger font-lg">¥{{detail.price}}</text>
					<text class="font-sm text-light-muted ml-1 text-through">¥{{detail.t_price}}</text>
				</view>
			</view>

			<view class="divider"></view>

			<!-- 专栏简介 -->
			<uni-card :is-shadow="false" title="电子书简介" isFull>
				<mp-html :content="detail.try" />
			</uni-card>
		</view>

		<view v-else>
			<!-- 共多少节 -->
			<view class="p-3">
				<view class="bg-light border p-2 text-muted rounded">
					共 {{boolDetailList.length}} 节
				</view>
			</view>

			<!-- 专栏列表 -->
			<i-menu-item @click="handleOpenDetail(item)" v-for="(item,index) in boolDetailList" :key="index"
				:index="index" :title="item.title">
				<view class='flex'>
					<text v-if="item.isfree" class="border border-danger text-danger rounded font-sm px-1 mt-1">
						免费试看
					</text>
				</view>
			</i-menu-item>
		</view>

		<view v-if="!detail.isbuy" style="height: 140rpx;"></view>

		<!-- 按钮订购 -->
		<view v-if="!detail.isbuy" class="fixed-bottom p-2 bg-white border-top">
			<view class="bg-main main-btn">立即订购 ¥{{detail.price}}</view>
		</view>
	</view>
</template>

<script>
	import bookApi from "@/api/book.js"
	export default {
		data() {
			return {
				detail: {
					"id": "",
					"title": "",
					"cover": "",
					"try": "",
					"price": "",
					"t_price": "",
					"type": "",
					"sub_count": 0,
					"isbuy": false,
					"isfava": false
				},
				boolDetailList: [],
				current: 0,
				tabs: [{
						title: '简介',
					},
					{
						title: '目录'
					}
				],
			}
		},
		onLoad(e) {
			this.detail.id = e.id


			this.initLoad()
		},
		methods: {
			handleOpenDetail(item) {
				console.log("item=>", item)
				if (item.price != 0 && !this.detail.isbuy) {
					this.$utils.toast("请先购买该专栏")
					return
				}

				this.navTo("/pages/book/book?id=" + item.id + "&book_id=" + this.detail.id, {
					isLogin: true
				})
			},
			// tab切换方法
			handleTab(index) {
				this.current = index
			},
			async initLoad() {
				try {

					const data = {
						id: this.detail.id,
					}
					const response = await bookApi.getBookDetail(data)
					if (response) {
						this.detail = response
						this.boolDetailList = response.book_details
					}


					uni.setNavigationBarTitle({
						title: this.detail.title
					})
				} catch (e) {} finally {

				}
			}
		}
	}
</script>

<style lang="scss">
	.main-btn {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 5px;
	}
	
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
		width: 258rpx;
		height: 380rpx;
	}
	.course-one > view:last-child{
		width : 505rpx;
	}
</style>
