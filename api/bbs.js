import Http from "@/utils/request.js"

// 获取社区列表
const getBbsList = (data ={}) => {
	return Http.request({url :'/mobile/bbs', method : 'GET', data})
}

// 获取帖子列表
const getPostList = (data = {}) => {
	return Http.request({url : '/mobile/post/list', method : 'GET', data })
}

// 点赞帖子
const supportPostList = (data = {}) => {
	return Http.request({url : '/mobile/post/support', method : 'POST', data})
}

// 取消点赞帖子
const unsupportPostList = (data = {}) => {
	return Http.request({url : '/mobile/post/unsupport', method : 'POST', data})
}

// 查看帖子(帖子详情)
const readPostDetail = (data = {}) => {
	return Http.request({url : '/mobile/post/read', method : 'GET', data})
}

// 查看帖子评论列表
const readPostCommentList = (data = {}) => {
	return Http.request({url : '/mobile/post_comment', method : 'GET', data})
}

export default {
	getBbsList,
	getPostList,
	supportPostList,
	unsupportPostList,
	readPostDetail,
	readPostCommentList
}