<template>
	<view @click="handleToPath" class="user-info flex justify-between align-center">
		<view class="left flex">
			<image class="avatar" src="/static/demo/icon/test.png" mode=""></image>
			<view class="ml-3 flex flex-column">
				<view v-if="hasLogin" class="flex align-center">
					<text class="text-white font-md mb-1">{{userInfo.username || userInfo.nickname || ""}}</text>
					<text class="ml-3 font-sm" style="color:#fec107;">永久会员</text>
				</view>
				
				<text v-if="!hasLogin" class="text-white font-md mb-1">立即登录</text>
				<text class="text-white font " >
					{{hasLogin ?  '暂无描述' : '登录解锁更多功能'}}
				</text>
			</view>
		</view>
		<view class="right">
			<text class="iconfont icon-leimupinleifenleileibie text-white"></text>
		</view>
	</view>
</template>

<script>
export default {
	props : {
		// 用户是否登录
		hasLogin : {
			type : Boolean,
			default : false
		},
		// 用户信息
		userInfo : {
			type : [Object,String],
			default : () => ({})
		}
	},
	methods : {
		handleToPath(){
			this.hasLogin ? this.navTo("/pages/user-info/user-info") : this.navTo("/pages/login/login")
		}
	}
}
</script>

<style lang="scss">
.user-info{
	height : 120rpx;
	padding: 30rpx 0;

	.left{
		
		.avatar{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
	
	}
}
</style>