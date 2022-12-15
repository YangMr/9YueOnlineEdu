<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url : ''
			}
		},
		onLoad(e) {
			console.log("e=>", e)
			this.url = e.url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
