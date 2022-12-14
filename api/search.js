import Http from "@/utils/request.js"

// 搜索课程/专栏
const search = (data) => {
	return Http.request({url : '/mobile/search', method : 'GET', data})
}

// 导出搜索模块api
export default {
	search
}