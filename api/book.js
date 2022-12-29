import Http from "@/utils/request.js"

// 电子书列表
const getBookList = (data = {}) => {
	return Http.request({url : '/mobile/book/list', method : 'GET', data})
}

// 查看电子书详情
const getBookDetail = (data = {}) => {
	return Http.request({url : '/mobile/book/read', method : 'GET', data})
}

// 查看电子书章节和内容

// 我购买的电子书列表

export default {
	getBookList,
	getBookDetail
}