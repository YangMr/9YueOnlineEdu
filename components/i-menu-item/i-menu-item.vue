<template>
	<view  @click="$emit('click')" hover-class="bg-light" class="flex p-3 align-center border-bottom" >
		<text :class="active ? 'text-main' : 'text-muted'" class="" style="width:90rpx;">
			{{(index + 1)|formatIndex}}
		</text>
		<view :class="active ? 'text-main' : 'text-muted'" class="flex flex-column align-start ">
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
			},
			active : {
				type : Boolean,
				default : false
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