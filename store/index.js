import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
		// token 
		token :"",
		// userInfo
		userInfo : ""
	},
	getters : {
		// 检测用户是否登录
		hasLogin(state){
			return !!state.token
		},
		// 获取用户信息
		userInfo(state){
			return state.userInfo
		}
	},
	mutations : {
		// 解决浏览器刷新,vuex数据丢失问题
		initData(state){
			const token = uni.getStorageSync("token")
			const userInfo = uni.getStorageSync("userInfo")
			if(token && userInfo){
				state.token = token
				state.userInfo = userInfo
			}
		},
		// 存储token
		setToken(state,token){
			state.token = token
			uni.setStorageSync("token", token)
		},
		//  存储用户信息
		setUserInfo(state, userInfo){
			state.userInfo = userInfo
			uni.setStorageSync("userInfo", userInfo)
		}
	},
	actions : {
		logout({state}){
			// 清空vuex token
			state.token = ""
			// 清空vuex userinfo
			state.userInfo = {}
			// 清除本地
			uni.removeStorageSync("token")
			uni.removeStorageSync("userInfo")
		}
	},
	modules : {
		
	}
})

export default store