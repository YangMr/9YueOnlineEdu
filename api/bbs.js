import Http from "@/utils/request.js"

// 获取社区列表
const getBbsList = (data ={}) => {
	return Http.request({url :'/mobile/bbs', method : 'GET', data})
}

export default {
	getBbsList
}