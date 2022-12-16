import Http from "@/utils/request.js"

// 获取首页数据
const getIndexList = (data = {}) => {
	return Http.request({url : '/mobile/index', method : 'GET', data})
}

// 获取可用优惠卷列表
const getCouponList = (data = {}) => {
	return Http.request({url : '/mobile/coupon', method : 'GET', data})
}

// 获取可用拼团列表
const getGroupList = (data = {}) => {
	return Http.request({url : '/mobile/group', method : 'GET', data})
}

// 获取可用秒杀列表
const getFlashsaleList = (data = {}) => {
	return  Http.request({url : '/mobile/flashsale', method : 'GET', data})
}

// 导出所有api
export default {
	getIndexList,
	getCouponList,
	getGroupList,
	getFlashsaleList
}