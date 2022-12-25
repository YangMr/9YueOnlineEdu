<template>
	<view @click="$emit('click', index)" :class="checked ? 'border-main text-main' : ''" class=" border rounded px-2 py-2 flex align-center justify-start mb-2 ">
		<text class="mr-2">{{index|formatIndex}}</text>
		<mp-html :content="label"></mp-html>
	</view>
</template>

<script>
	export default {
		name:"i-test-question",
		props : {
			checked : {
				type : Boolean,
				default : false
			},
			index : {
				type : Number,
				default : 0
			},
			label : {
				type : String,
				default : ""
			}
		},
		filters : {
			formatIndex(index){
				const en = {
					0 : "A",
					1 : "B",
					2 : "C",
					3 : "D",
					4 : "E",
					5 : "F",
				}
				return en[index]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.text-black{
	color : #000;
}
</style>