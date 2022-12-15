<template>

		<swiper class="banner" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item @click="handleToWebView(item)" class="flex align-center justify-center" v-for="(item,index) in list" :key="index">
				<image class="img shadow rounded" :src="item.src" mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
	
</template>

<script>
	export default {
		name:"i-banner",
		props : {
			list : {
				type : Array,
				default : () => ([])
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleToWebView(item){
				console.log("item=>", item)
				if(item.url && item.type === 'webview'){
					this.navTo("/pages/webview/webview?url=" + item.url)
					return 
				}
				
				this.navTo("/pages/course/course?id=" + item.course_id)
				
			}
		}
	}
</script>

<style lang="scss">
.banner{
	height : 310rpx !important;
	
	.img{
		width: 710rpx;
		height: 310rpx;
	}
}
</style>