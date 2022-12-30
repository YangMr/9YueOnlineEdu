import Http from "@/utils/request.js"

// 我的收藏列表
const getCollectList = (data = {}) => {
	return Http.request({url : '/mobile/user_fava', method : 'GET', data})
}

// 收藏课程/专栏
const collect = (data = {}) => {
	return Http.request({url : '/mobile/collect', method : 'POST', data})
}
// 取消收藏课程/专栏
const uncollect = (data = {}) => {
	return Http.request({url : '/mobile/uncollect', method : 'POST', data})
}

export default {
	collect,
	uncollect,
	getCollectList
}