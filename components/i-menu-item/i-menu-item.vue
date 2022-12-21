<template>
	<view hover-class="bg-light" class="flex p-3 align-center border-bottom" >
		<text class="text-muted" style="width:90rpx;">
			{{(index + 1)|formatIndex}}
		</text>
		<view class="flex flex-column text-muted align-start ">
			{{title}}
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-menu-item",
		props : {
			title : {
				type : String,
				default : ""
			},
			index : {
				type : Number,
				default : 0
			}
		},
		data() {
			return {
				
			};
		},
		filters : {
			formatIndex(value){
				console.log("value=>", value)
				if(value < 10){
					return "00" + value
				}
				if(value >= 10 && value < 100){
					return "0" + value
				}
				return value
			}
		}
	}
</script>

<style>

</style>