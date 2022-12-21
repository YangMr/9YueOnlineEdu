<template>
	<view>
		<!-- 图片 -->
		<view v-if="!detail.isbuy" class="position-relative">
			<image :src="detail.cover || ''" style="width: 100%; height : 420rpx;" class="bg-light"></image>
			<view class="position-absolute text-white font-sm px-2 py-1 rounded" style="bottom:20rpx; right:20rpx; background-color: rgba(0,0,0,0.4);">
				{{detail.type | formatType}}
			</view>
		</view>
		
		<!-- 音频播放器 -->
		<i-audio v-else-if="detail.type === 'audio'" :poster='detail.cover' src="http://music.163.com/song/media/outer/url?id=31877549.mp3"></i-audio>
		
		<!-- 视频播放 -->
		<video v-else-if="detail.type === 'video'" :src="detail.content" :poster="detail.cover" controls  style="width: 100%; height:420rpx;"></video>
		
		<!-- 描述 -->
		<view class="flex flex-column p-3">
			<text class="mb-1" style="font-size:38rpx;">{{detail.title}}</text>
			<text class="font-sm text-light-muted">{{detail.sub_count}}人学过</text>
			<view v-if="!detail.isbuy" class="flex align-end mt-2">
				<text class="text-danger font-lg">¥{{detail.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">¥{{detail.t_price}}</text>
			</view>
		</view>
		
		<view class="divider"></view>
		
		<!-- 简介 -->
		<uni-card :title="(detail.isbuy && detail.type === 'media') ? '课程内容' : '课程简介'" isFull >
			<mp-html :content="(detail.isbuy && detail.type === 'media') ? detail.content : detail.try" />
		</uni-card>
		
		<view style="height: 140rpx;"></view>
		
		<!-- 按钮订购 -->
		<view v-if="!detail.isbuy" class="fixed-bottom p-2 bg-white border-top">
			<view class="bg-main main-btn">立即订购 ¥{{detail.price}}</view>
		</view>
	</view>
</template>

<script>
	import detailApi from "@/api/detail.js"
	export default {
		data() {
			return {
				detail: {
					"id": "",
					"title":"",
					"cover":"",
					"try":"",
					"price":"",
					"t_price":"",
					"type":"",
					"sub_count":0,
					"isbuy":false,
					"isfava":false
				},
				column_id : 0
			}
		},
		filters : {
			formatType(value){
				const type = {
					media:"图文",
					audio:"音频",
					video:"视频",
					column : '图文'
				}
				return type[value]
			}
		},
		onLoad(e) {
			this.detail.id = e.id
			this.column_id = e.column_id
			
			this.initLoad()
		},
		methods: {
			async initLoad(){
				try{
					
					const data = {
						id : this.detail.id, 
						column_id: this.column_id || null,
						group_id: null,
						flashsale_id: null,
					}
					const response = await detailApi.getCourseDetail(data)
					if(response){
						this.detail = response
					}

					
					uni.setNavigationBarTitle({
						title : this.detail.title
					})
				}catch(e){
				}finally{
					
				}
			}
		}
	}
</script>

<style lang="scss">
.main-btn {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 5px;
}
</style>
