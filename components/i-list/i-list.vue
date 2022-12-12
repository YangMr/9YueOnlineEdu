<template>
	<view class="list">
		<uni-list :border="false">
			<uni-list-item :border="border"  clickable @click="handleToPath(item)" v-for="(item,index) in userList" :key="index" :title="item.title" :showArrow="item.showArrow">
				<text v-if="item.icon" slot="header" style="font-size: 20px;color: #4396ec;" :class="[item.icon]" class="mr-2"></text>
				<text v-if="item.text || item.other" slot="footer">{{item.text || value[item.props] || ""}}</text>
				<text v-if="item.form" slot="footer">
					<input class="ipt" v-model.trim="value[item.props]" :type="item.type" :placeholder="item.placeholder" />
				</text>
				<image  v-if="item.avatar" slot="footer" style="width:80rpx; height:80rpx; border-radius: 50%;;" :src="value.avatar" ></image>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import userList from "@/config/user-list.js"
	export default {
		name:"i-list",
		props : {
			value : {
				type : Object,
				default : () => ({})
			},
			userList : {
				type : Array,
				default : ()=> {
					return userList()
				}
			},
			border : Boolean
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

<style lang="scss">
.list .ipt{
	height : 100%;
	border : none;
	outline: none;
	font-size :32rpx;
	text-align: right;
}
</style>