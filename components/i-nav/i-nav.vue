<template>
	<view class="nav flex flex-wrap py-2">
		<view @click="handleToPath(item)" v-for="(item,index) in list" :key="index" class="nav-item py-1 flex flex-column align-center justify-center">
			<image class="icon" :src="item.src" mode="widthFix"></image>
			<text class="title mt-1 font-sm text-muted">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-nav",
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
			handleToPath(item){
				// 先判断跳转的页面有没有webview页面
				console.log("item=>", item)
				if(item.type === 'webview' && item.url){
					this.navTo("/pages/webview/webview?url=" + item.url)
					return
				}
				
				switch(item.module){
					case  'test' : 
						//考试页面
						this.navTo("/pages/test-list/test-list")
						break;
					case "bbs" :
						// 社区
						this.navTo("/pages/bbs/bbs")
						break;
					case "book" :
						// 电子书
						this.navTo("/pages/book-list/book-list")
						break;
					default : 	
						this.navTo("/pages/list/list?module=" + item.module)
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
.nav{
	
	.nav-item{
		width: 25%;
		
		.icon{
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
		
	}
}
</style>