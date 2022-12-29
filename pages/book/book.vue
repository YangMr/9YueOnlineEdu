<template>
	<view>

		<uni-card isFull>
			<mp-html :content="content || '暂无数据'">
				<view class="flex justify-center py-3 text-muted">
					加载中...
				</view>
			</mp-html>
		</uni-card>

		<!-- 底部tab -->
		<i-test-actions @open="handleOpenDrawer" :showSubmit="false" @on-page="handlePage" :current="current"
			:total="total"></i-test-actions>

		<uni-drawer ref="showLeft" mode="left" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<i-menu-item :active="item.id == id"  @click="changeChapter(index)" v-for="(item,index) in menus" :key="index"
					:index="index" :title="item.title">
					<view class='flex'>
						<text v-if="item.isfree" class="border border-danger text-danger rounded font-sm px-1 mt-1">
							免费试看 
						</text>
					</view>
				</i-menu-item>
			</scroll-view>
		</uni-drawer>

	</view>
</template>

<script>
	import bookApi from "@/api/book.js"
	export default {
		data() {
			return {
				// 电子书内容ID
				id: '',
				// 电子书ID
				book_id: '',
				// 电子书内容的数据
				content: '',
				// 章节数据
				menus: [],
				current: 0,
				total: 0,
				drawer : false
			}
		},
		onLoad(e) {
			if (!e.book_id || !e.id) {
				this.$utils.toast("参数缺失")
				this.back()
				return
			}

			this.id = e.id
			this.book_id = e.book_id

			this.initLoadBook()
		},
		methods: {
			changeChapter(index){
				console.log("index=>", index)
				this.current = index + 1
				this.handleGetContent()
				this.closeDrawer()
			},
			// 打开窗口
			showDrawer() {
				this.$refs['showLeft'].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs['showLeft'].close()
			},
			// 点击中间按钮触发的方法的, 打开抽屉
			handleOpenDrawer() {
				this.showDrawer() 
			},
			handlePage(e) {
				console.log("页码", e)
				this.current = e
				this.handleGetContent()
			},
			handleGetContent() {
				const item = this.menus[this.current - 1]
				console.log("item=>", item)
				this.id = item.id
				this.content = ""
				this.initLoadBook()
			},
			back() {
				setTimeout(() => {
					this.navBack()
				}, 600)
			},
			async initLoadBook() {
				try {
					const data = {
						book_id: this.book_id,
						id: this.id
					}
					const response = await bookApi.getBookChapterContent(data)
					console.log("response=>", response)
					this.content = response.content
					this.menus = response.menus

					let index = this.menus.findIndex(item => item.id == this.id)
					console.log("index=>", index)

					this.current = index + 1
					this.total = this.menus.length

					uni.setNavigationBarTitle({
						title: response.title
					})
				} catch (e) {
					//TODO handle the exception
					console.log("error=>", e)
				}
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .uni-card .uni-card__content {
		color: #333 !important;
		font-size: 32rpx !important;
	}

	/deep/ .uni-card--border {
		border: 1rpx solid #e5e5e5 !important;
	}
</style>
