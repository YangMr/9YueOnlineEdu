<template>
	<view :class="bClass + ' ' + (disabled ? 'bg-main-disabled' : '')"  :style="bStyle" class="bg-main main-btn" @click="handleClick" hover-class="bg-main-hover">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"i-main-btn",
		props : {
			disabled :{
				type : Boolean,
				default : false
			},
			bClass : {
				type :String,
				default : ''
			},
			bStyle : {
				type : String,
				default : ''
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleClick(){
				if(this.disabled) return
				this.$emit("click")
			}
		}
	}
</script>

<style>
.main-btn{
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	border-radius: 5px;
}
</style>