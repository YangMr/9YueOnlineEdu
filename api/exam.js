import Http from "@/utils/request.js"

// 获取考场列表
const getExamList = (data = {}) => {
	return Http.request({url : '/mobile/testpaper/list', method : 'GET', data})
}

export default {
	getExamList
}