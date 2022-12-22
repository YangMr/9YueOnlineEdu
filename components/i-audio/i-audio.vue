<template>
	<view class="bg-light">
		<view class="px-5 pt-5">
			<image style="width:100%; height:400rpx; border-radius: 20rpx;" :src="poster" mode="aspectFill"></image>
		</view>
		
		<view class="mb-5 audio-slider">
			<slider @changing="handleChanging" @change="handleChange" :max="duration" :value="position" activeColor="#5ccc84" block-color="#5ccc84" block-size="15" />
			<text class="current-time">{{currentTime|formatTime}}</text>
			<text class="duration">{{duration|formatTime}}</text>
		</view>
		
		<view class="audio-btn flex align-center justify-center pb-5">
			<text class="iconfont icon-ziyuan11 " :style="loopStatus ? 'color : rgb(92, 204, 132);' : ''" @click="handleLoop"></text>
			<text class="iconfont  mx-3" :class="isPlaying ? 'icon-tianchongxing-' : 'icon-bofang2'" @click="handlePlay"></text>
			<text class="iconfont icon-shoucang1 "></text>
		</view>
	</view>
</template>

<script>
	import tool from "@/common/js/tool.js"
	export default {
		name:"i-audio",
		props : {
			poster : {
				type : String,
				default : ''
			},
			src : {
				type :String,
				default : ''
			}
		},
		data() {
			return {
				// 播放的状态
				isPlaying : false,
				// 音频播放的实例对象
				_audioContext : null,
				// 播放结束的状态
				isPlayEnd : false,
				// 当前音频的总时长
				duration : 1,
				// 当前播放的时间
				currentTime : 0,
				// 当前是否正在进度拖动中
				_isChanging : false,
				// 是否开启循环播放
				loopStatus : false
				
			};
		},
		computed : {
			position(){
				return this.isPlayEnd ? 0 : this.currentTime
			}
		},
		filters : {
			formatTime(s){
				if(s === 0){
					return '00:00:00'
				}
				
				return tool.formatSeconds(s)
			}
		},
		created() {
			// 初始化音频播放的实例对象
			this.createAudio()
		},
		beforeDestroy() {
			if(this._audioContext !== null && this.isPlaying){
				this.stop()
			}
		},
		methods : {
			createAudio(){
				// 创建音频播放的实例对象
				this._audioContext = uni.createInnerAudioContext()
				// 设置音频不进行自动播放
				this._audioContext.autoplay = false
				// 设置音频播放的音频地址
				this._audioContext.src = this.src
				
				// 使用事件监听音频是否开始播放
				this._audioContext.onPlay(()=>{
					console.log("开始播放")
				})
				// 使用事件监听音频音频进入可以播放状态
				this._audioContext.onCanplay(()=>{
					console.log("音频进入可以播放状态")
					this.duration = this._audioContext.duration
					
				})
				// 使用事件监听音频正在播放的进度
				this._audioContext.onTimeUpdate(()=>{
					// 获取当前播放的音频的总时间
					this.duration = this._audioContext.duration
					// 获取当前正在播放的进度时间
					this.currentTime = this._audioContext.currentTime
					
					if(this.duration > 0){
						let progress = ((this.currentTime / this.duration)*100).toFixed(2)
						this.$emit("onProgress", progress)
					}
				})
				// 使用事件监听音频是否播放结束
				this._audioContext.onEnded(()=>{
					console.log("播放结束")
					this.currentTime = 0
					this.isPlaying = false
					this.isPlayEnd = false
					
					this.stop()
				})
			},
			// 播放
			handlePlay(){
				
				// 如果是正在播放,则进行暂停
				if(this.isPlaying){
					return this.handlePause()
				}
				
				this.isPlaying = true
				this._audioContext.play()
				this.isPlayEnd = false
			},
			// 暂停
			handlePause(){
				this._audioContext.pause()
				this.isPlaying = false
			},
			// slider 完成一次拖动后触发的事件
			handleChange(e){
				console.log("e=>", e)
				this._audioContext.seek(e.detail.value)
				this._isChanging = false
			},
			// slider 拖动过程中触发的事件
			handleChanging(e){
				this._isChanging = true
				this._audioContext.seek(e.detail.value)
				console.log("eee=>", e)
				this.currentTime = e.detail.value
			},
			// 停止
			stop(){
				this._audioContext.stop()
				this.isPlaying = false
			},
			// 开启或者关闭循环播放
			handleLoop(){
				this.loopStatus = !this.loopStatus
				this._audioContext.loop = this.loopStatus
				this.$utils.toast(this.loopStatus ? '开启循环' : '关闭循环')
			}
		}
	}
</script>

<style lang="scss">
.audio-slider{
	position: relative;
}
.audio-slider text{
	position: absolute;
	top:35rpx;
	font-size: 25rpx;
}
.audio-slider .current-time{
	left: 30rpx;
}
.audio-slider .duration{
	right: 30rpx;
}
.audio-btn text:first-child, .audio-btn text:last-child{
	font-size: 60rpx;
	color: #bbb;
}
.audio-btn text:nth-child(2){
	font-size: 100rpx;
	color:rgb(92, 204, 132);
}
</style>