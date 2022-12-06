<template>
	<view class="tab-container">
		<view class="tab flex shadow">
			<view @click="handleToPath(item)" v-for="(item,index) in tabs" :key="index" class="tab-item flex flex-column justify-center align-center">
				<text :class="item.icon"  style=" font-size: 20px; color : #fdc207;"></text>
				<text class="font-sm mt-1 text-secondary">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import cardTab from "@/config/card-tab.js"
	export default {
		name:"i-card-tab",
		props : {
			tabs : {
				type : Array,
				default : () => {
					return cardTab()
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleToPath(item){
				this.navTo(item.path, item)
				// if(item.navigator){
				// 	console.log("123")
					
				// 	uni[item.navigator]({
				// 		url : item.path
				// 	})
				// 	return
				// }
				
				// uni.navigateTo({
				// 	url : item.path
				// })
			}
		}
	}
</script>

<style lang="scss">
.tab-container{
	padding : 30rpx 0;
	// position: absolute;
	// top : 260rpx;
	// left: 0;
	// right:0;
	
	
	
	.tab{
		height: 155rpx;
		background-color: #fff;
		border-radius: 15rpx;
		
		.tab-item{
			flex : 1;
			
			
		}
	}
}
</style>