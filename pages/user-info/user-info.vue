<template>
	<view>

		<i-list v-model="form" @sex="handleChangeSex" @upload="handleUpload" :userList="editProfileList"></i-list>
		
		<view class="p-3">
			<view class="bg-main btn" hover-class="bg-main-hover" @click="handleSubmit">提 交</view>
		</view>
	</view>
</template>

<script>
	import editProfileList from '@/config/edit-profile-list.js'
	import {mapGetters} from "vuex"
	import userApi from "@/api/user.js"
 	export default {
		data() {
			return {
				editProfileList : editProfileList(),
				form : {
					avatar : '',
					nickname : '',
					sex : ''
				}
			}
		},
		computed : {
			...mapGetters([
				"userInfo"
			])
		},
		onLoad() {
			this.form = {
				avatar : this.userInfo.avatar,
				nickname : this.userInfo.nickname,
				sex : this.userInfo.sex
			}
			this.editProfileList[this.editProfileList.length - 1].text = this.userInfo.phone
		},
		methods: {
			// 头像上传
			handleUpload(){
				uni.chooseImage({
					count: 1, //默认9
					success:  async (res) => {
						console.log(res.tempFilePaths[0]);
						try{
							const response = await userApi.upload(res.tempFilePaths[0])
							this.form.avatar = response.data
						}catch(e){
							//TODO handle the exception
							console.log("error=>", e)
						}
					}
				});
			},
			// 修改性别
			handleChangeSex(){
				const item = ['未知', '男', '女']
				uni.showActionSheet({
					itemList: item,
					success:  (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						this.form.sex = item[res.tapIndex]
					},
					fail: (res)=> {
						console.log(res.errMsg);
					}
				});
			},
			// 提交资料
			async handleSubmit(){
				try{
					uni.showLoading({
						title : '修改资料中...',
						mask : false
					})
					
					// 发送http请求
					const response = await userApi.updateProfile(this.form)
					console.log("response=>", response)
					
					// vuex资料进行更新
					this.$store.dispatch("updateUserInfo",this.form)
					
					uni.hideLoading()
					
					this.$utils.toast("修改资料成功")
					
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			}
		}
	}
</script>

<style>

</style>
