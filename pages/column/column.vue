<template>
	<view>
		<!-- 图片 -->
		<view class="position-relative">
			<image :src="detail.cover || ''" style="width: 100%; height : 420rpx;" class="bg-light"></image>
			<view class="position-absolute text-white font-sm px-2 py-1 rounded" style="bottom:20rpx; right:20rpx; background-color: rgba(0,0,0,0.4);">
				专栏
			</view>
		</view>
		
		<!-- tab -->
		<i-tab @tab="handleTab" :current="current" :tabs="tabs"></i-tab>
		
		<!-- 简介 -->
		<view v-if="current === 0">
			<!-- 描述 -->
			<view class="flex flex-column p-3">
				<text class="mb-1" style="font-size:38rpx;">{{detail.title}}</text>
				<view class="flex align-center justify-between">
					<text class="font-sm text-light-muted">{{detail.sub_count}}人学过</text>
					<i-collection-btn type="column" @success="detail.isfava = $event" :isfava="detail.isfava" :goods_id="detail.id" ></i-collection-btn>
				</view>
				<view v-if="!detail.isbuy" class="flex align-end mt-2">
					<text class="text-danger font-lg">¥{{detail.price}}</text>
					<text class="font-sm text-light-muted ml-1 text-through">¥{{detail.t_price}}</text>
				</view>
			</view>
			
			<view class="divider"></view>
			
			<!-- 专栏简介 -->
			<uni-card title="专栏简介" isFull >
				<mp-html :content="detail.content" />
			</uni-card>
		</view>
		
		<view v-else>
			<!-- 共多少节 -->
			<view class="p-3">
				<view class="bg-light border p-2 text-muted rounded">
					共 {{columnList.length}} 节
				</view>
			</view>
			
			<!-- 专栏列表 -->
			<i-menu-item @click="handleOpenDetail(item)" v-for="(item,index) in columnList" :key="index" :index="index" :title="item.title">
				<view class='flex'>
					<text class="border border-danger text-danger rounded font-sm px-1 mt-1 mr-2">
						{{item.type | formatType}}
					</text>
					<text v-if="item.price == 0" class="border border-danger text-danger rounded font-sm px-1 mt-1">
						免费试看
					</text>
				</view>
				
			</i-menu-item>
		</view>
		
		<view v-if="!detail.isbuy" style="height: 140rpx;"></view>
		
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
				columnList : [],
				current : 0,
				tabs : [
					{
						title : '简介',
					},
					{
						title : '目录'
					}
				],
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
			
			
			this.initLoad()
		},
		methods: {
			handleOpenDetail(item){
				console.log("item=>", item)
				if(item.price != 0 && !this.detail.isbuy){
					this.$utils.toast("请先购买该专栏")
					return
				}
				
				this.navTo("/pages/course/course?id=" + item.id + "&column_id=" + this.detail.id, {isLogin : true})
			},
			// tab切换方法
			handleTab(index){
				this.current = index
			},
			async initLoad(){
				try{
					
					const data = {
						id : this.detail.id, 
					}
					const response = await detailApi.getColumnDetail(data)
					if(response){
						this.detail = response
						this.columnList = response.column_courses
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
