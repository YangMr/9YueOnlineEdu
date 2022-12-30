import Http from "@/utils/request.js"

// 直播列表
const getLiveList = (data = {}) => {
	return Http.request({url : '/mobile/live/list', method :'GET', data })
} 

// 查看直播详情

// 发表弹幕

// 查看弹幕列表

export default {
	getLiveList
}