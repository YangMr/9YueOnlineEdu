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
		<i-audio @onProgress="handleAudioProgress" v-else-if="detail.type === 'audio'" :poster='detail.cover' src="http://music.163.com/song/media/outer/url?id=31877549.mp3"></i-audio>
		
		<!-- 视频播放 -->
		<video @timeupdate="handleVideoProgress" v-else-if="detail.type === 'video'" :src="detail.content" :poster="detail.cover" controls  style="width: 100%; height:420rpx;"></video>
		
		<!-- 描述 -->
		<view class="flex flex-column p-3">
			<text class="mb-1" style="font-size:38rpx;">{{detail.title}}</text>
			<view class="flex align-center justify-between">
				<text class="font-sm text-light-muted">{{detail.sub_count}}人学过</text>
				<i-collection-btn @success="detail.isfava = $event" :isfava="detail.isfava" :goods_id="detail.id" ></i-collection-btn>
			</view>
			<view v-if="!detail.isbuy" class="flex align-end mt-2">
				<text class="text-danger font-lg">¥{{detail.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">¥{{detail.t_price}}</text>
			</view>
		</view>
		
		<view class="divider"></view>
		
		<!-- 简介 -->
		<uni-card :title="(detail.isbuy && detail.type === 'media') ? '课程内容' : '课程简介'" isFull >
			<view id="media">
				<mp-html @load="handleOnMediaReady" :content="(detail.isbuy && detail.type === 'media') ? detail.content : detail.try" >
					<view class="flex justify-center py-3 text-muted">
						加载中...
					</view>
				</mp-html>
			</view>
		</uni-card>
		
		
		
		<!-- 按钮订购 -->
		<view v-if="!detail.isbuy" class="fixed-bottom p-2 bg-white border-top">
			<view  style="height: 140rpx;"></view>
			<view class="bg-main main-btn">立即订购 ¥{{detail.price}}</view>
		</view>
	</view>
</template>

<script>
	import detailApi from "@/api/detail.js"
	import studyApi from "@/api/study.js"
	let windowHeight = uni.getSystemInfoSync().windowHeight
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
				column_id : 0,
				scrollTop : 0,
				mediaHeight : 0,
				progress : 0
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
		onPageScroll(e) {
			if(this.detail.isbuy && this.detail.type === "media" && e.scrollTop  > this.scrollTop){
				this.scrollTop = e.scrollTop
			}
			this.handleMediaProgress()
			console.log("scrollTop=>", this.scrollTop)
		},
		onLoad(e) {
			this.detail.id = e.id
			this.column_id = e.column_id
			
			this.initLoad()
		},
		beforeDestroy() {
			this.handleUpdateStudyProgress()
		},
		methods: {
			// 音频的学习进度
			handleAudioProgress(e){
				console.log("e=>", e)
				this.progress = e
			},
			// 视频的学习进度
			handleVideoProgress(event){
				console.log("event=>", event)
				const {currentTime, duration} = event.detail
				
				if(duration > 0){
					this.progress = ((currentTime / duration) * 100).toFixed(2)
				}
			},
			// 将学习进度提交到后台
			async handleUpdateStudyProgress(){
				try{
					let data 
					if(this.column_id === 0){
						data = {
							id : this.detail.id,
							type : "course",
							progress : this.progress
						}
					}else{
						data = {
							detail_id : this.detail.id,
							id : this.column_id,
							type : 'column'
						}
					}
					
					const response = await studyApi.setStudyUserHistory(data)
					
					uni.$emit("progress")
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			// 课程内容图片资源加载完毕之后会触发
			handleOnMediaReady(){
				// console.log("123")
				// 获取课程内容的高度
				const Query = uni.createSelectorQuery().in(this)
				Query.select("#media").boundingClientRect((data)=>{
					// console.log("data=>", data)
					this.mediaHeight = parseInt(data.height)
					this.handleMediaProgress()
				}).exec()
			},
			// 计算学习的进度
			handleMediaProgress(){
				// console.log("w=>", windowHeight)
				if(this.mediaHeight > 0){
					// this.progress = (((this.scrollTop + windowHeight)/this.mediaHeight)*100).toFixed(2)
					this.progress = (((this.scrollTop + windowHeight) / this.mediaHeight)  * 100).toFixed(2)
					
					this.progress = this.progress > 100 ? 100 : this.progress 
				}
			},
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
