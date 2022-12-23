<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onBackPress() {
			uni.showModal({
				content: '是否要放弃这场考试？',
				cancelText: '继续做题',
				confirmText: '放弃',
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.navTo("/pages/test-list/test-list")
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				},

			});
			return true
		},
		methods: {

		}
	}
</script>

<style>

</style>
