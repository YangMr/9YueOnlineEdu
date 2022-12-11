<template>
	<view class="list">
		
		<uni-list :border="false">
			<uni-list-item  clickable @click="handleToPath(item)" v-for="(item,index) in userList" :key="index" :title="item.title" :showArrow="item.showArrow">
				<text v-if="item.icon" slot="header" style="font-size: 20px;color: #4396ec;" :class="[item.icon]" class="mr-2"></text>
				<text v-if="item.text" slot="footer">{{item.text}}</text>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import userList from "@/config/user-list.js"
	export default {
		name:"i-list",
		props : {
			userList : {
				type : Array,
				default : ()=> {
					return userList()
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleToPath(item){
				if(!item) return
				
				if(item.path){
					this.navTo(item.path, item)
					return
				}
				
				if(item.event){
					this.$emit(item.event,item)
				}
				
			}
		}
	}
</script>

<style>

</style>