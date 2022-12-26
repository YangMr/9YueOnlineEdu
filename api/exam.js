import Http from "@/utils/request.js"

// 获取考场列表
const getExamList = (data = {}) => {
	return Http.request({url : '/mobile/testpaper/list', method : 'GET', data})
}

// 开始考试
const startExam = (data = {}) => {
	return Http.request({ url : '/mobile/testpaper/read', method : 'GET', data})
}

// 考试交卷
const endExam = (data = {}) => {
	return Http.request({url : '/mobile/user_test/save', method : 'POST', data})
}

// 获取考试记录
const getExamRecordList = (data = {}) => {
	return Http.request({url : '/mobile/user_test/list', method : 'GET', data })
}

export default {
	getExamList,
	startExam,
	endExam,
	getExamRecordList
}