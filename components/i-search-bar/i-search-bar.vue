<template>
	<view class="p-2">
		<view @click="handleSearch" class="search py-2 flex justify-center align-center rounded">
			<uni-icons v-if="showIcon" :type="icon" size="20" color="928E8A"></uni-icons>
			<text class="ml-2">{{placeholder}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-search-bar",
		props : {
			showIcon : {
				type : Boolean,
				default : false
			},
			icon : {
				type : String,
				default : 'search'
			},
			placeholder : {
				type : String,
				default : ""
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleSearch(){
				this.$emit("search")
			}
		}
	}
</script>

<style lang="scss">
.search{
	background-color: #F5F5F1;
	color: #928E8A;
}
</style>