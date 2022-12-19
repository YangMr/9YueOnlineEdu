<template>
	<view :style="getStyle" :class="getClass" style="background-color: rgb(245, 245, 241);"></view>
</template>

<script>
	export default {
		name:"i-skeleton",
		props : {
			width : {
				type : [String, Number],
				defalut : ""
			},
			height : {
				type : [String, Number],
				defalut : ""
			},
			circle : {
				type : Boolean,
				default : false
			},
			oClass : {
				type : String,
				default : ""
			}
		},
		computed : {
			getStyle(){
				return `width : ${this.width}; height : ${this.height};`
			},
			getClass(){
				let c = ""
				if(this.circle){
					c += 'rounded-circle'
				}
				return `${c} ${this.oClass}`
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>