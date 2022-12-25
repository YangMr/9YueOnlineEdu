import Http from "@/utils/request.js"

// 获取考场列表
const getExamList = (data = {}) => {
	return Http.request({url : '/mobile/testpaper/list', method : 'GET', data})
}

// 开始考试
const startExam = (data = {}) => {
	return Http.request({ url : '/mobile/testpaper/read', method : 'GET', data})
}

export default {
	getExamList,
	startExam
}