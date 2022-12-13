<template>
	<view>
		<i-search-bar @search="handleSearch" showIcon placeholder="请输入搜索关键词"></i-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 点击搜索框触发的方法
			handleSearch(){
				this.navTo("/pages/search/search")
			}
		}
	}
</script>

<style>

</style>
