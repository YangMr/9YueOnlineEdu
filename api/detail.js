import Http from "@/utils/request.js"

// 查看课程详情
const getCourseDetail = (data = {}) => {
	return Http.request({url : '/mobile/course/read', method : 'GET', data})
}

export default {
	getCourseDetail
}