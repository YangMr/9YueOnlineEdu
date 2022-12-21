import Http from "@/utils/request.js"

// 获取学习进度
const getStudyHistoryList = (data = {}) => {
	return Http.request({url : '/mobile/user_history/list', method : ' GET', data})
}

export default {
	getStudyHistoryList
}