<template>
	<view>
		<block v-for="(item,index) in formList" :key="index">
			<view v-if="item.type === 'input' || item.type === 'password'" class="form-group flex align-center">
				<uni-icons :type="item.icon" size="18"></uni-icons>
				<input class="input" v-model.trim="value[item.props]" :type="item.type"  :placeholder="item.placeholder" />
			</view>
			
			<view v-if="item.type === 'code'" class="form-group flex align-center">
				<view class="flex align-center">
					<uni-icons type="locked" size="18"></uni-icons>
					<input v-model.trim="value.code" class="input" placeholder="验证码"/>
				</view>
				<i-code :mobile="value.phone"></i-code>
			</view>
			
		</block>
		
		<view class="bg-main btn" hover-class="bg-main-hover" @click="handleSubmit">{{text}}</view>
	</view>
</template>

<script>
	export default {
		name:"i-form",
		props : {
			value : {
				type : Object,
				default : () => ({})
			},
			text : {
				type :String,
				default : '登录'
			},
			formList : {
				type : Array,
				default : () => ([])
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleSubmit(){
				this.$emit('submit')
			}
		}
	}
</script>

<style lang="scss">
.form-group{
	background-color: #f5f5f5;
	height: 100rpx;
	width : 100%;
	margin-bottom: 50rpx;
	
	.uni-icons{
		color: #272727;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.input{
		width: 100% ;
		height : 100%;
		box-sizing: border-box;
		border: none;
		background: transparent;
		outline: none;
		font-size: 32rpx;
	}
}


</style>