import Http from "@/utils/request.js"

// 获取优惠卷
const getCouponList = (data) => {
	return Http.request({url : '/mobile/user_coupon', method : 'GET', data})
}

export default {
	getCouponList
}