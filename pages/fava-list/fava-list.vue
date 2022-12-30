<template>
	<view>
		<uni-swipe-action>
			<view v-for="(item,index) in bookList" :key="index">
				<uni-swipe-action-item :right-options="options"  @click="onClick(item)" >
					<i-course-list type="one" :item="item.goods" ></i-course-list>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>

		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import collectApi from "@/api/collection.js"
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				bookList: [],
				loadStatus: 'loading',
				total: 0,
				options: [ {
					text: '取消收藏',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},

		onLoad() {
			this.initLoad()
		},

		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			if (this.bookList.length >= this.total) {
				return
			}

			this.page += 1
			this.loadStatus = "more"
			this.initLoad()
		},
		methods: {
			onClick(item) {
				console.log("item",item)
				this.handleUnCollect(item)
			},
			// 取消收藏
			async handleUnCollect(item){
				console.log("item.goods_id",item.goods_id)
				console.log("item.type",item.type)
				try{
					uni.showLoading({
						title: '取消收藏中...',
						mask: false
					});
					
					const data = {
						goods_id : item.goods.id,
						type : item.type
					}
					const response = await collectApi.uncollect(data)
					
					this.$utils.toast("取消收藏成功")
					
					this.initData()
					
					this.$emit("success", false)
					console.log("Res=>", response)
				}catch(e){
					//TODO handle the exception
				}finally{
					uni.hideLoading()
				}
			},
			initData() {
				this.page = 1
				this.initLoad()
			},
			async initLoad() {
				try {

					const data = {
						page: this.page,
						limit: this.limit
					}
					this.loadStatus = "loading"
					const response = await collectApi.getCollectList(data)
					this.total = response.count
					let rows = response.rows

					this.bookList = this.page === 1 ? rows : this.bookList.concat(rows)

					this.loadStatus = this.bookList.length !== response.count ? "more" : "nomore"

					console.log("response=>", this.bookList)
				} catch (e) {
					this.loadStatus = "more"
					if (this.page > 1) {
						this.page -= 1
					}
					//TODO handle the exception
					console.log("error=>", e)
				} finally {

					uni.stopPullDownRefresh()
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
