<template>
	<view>
		<uni-popup ref="popup" type="bottom">
			<view style="width:750rpx; height:400rpx;" class="bg-white">
				<view class="flex align-center justify-between px-3 border-bottom" style="height:100rpx; width: 100%; box-sizing: border-box;">
					<text class="flex-1">发表</text>
					<button :disabled="content === ''" type="primary" size="mini" @click="send">发送</button>
				</view>
				<textarea v-model="content"  placeholder="发表评论..." style="box-sizing: border-box;" class="bg-white p-2 w-100" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"i-comment-popup",
		data() {
			return {
				content : ''
			};
		},
		methods : {
			open(){
				 this.$refs.popup.open('bottom')
			},
			send(){
				this.$emit("send",this.content)
				this.$refs.popup.close()
				this.content = ""
			}
		}
	}
</script>

<style>

</style>