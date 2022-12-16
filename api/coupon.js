import Http from "@/utils/request.js"

// 获取优惠卷
const getCouponList = (data = {}) => {
	return Http.request({url : '/mobile/user_coupon', method : 'GET', data})
}

// 领取优惠卷接口
const userCouponReceive = (data = {}) => {
	return Http.request({url : '/mobile/user_coupon/receive', method : 'POST', data})
}

export default {
	getCouponList,
	userCouponReceive
}