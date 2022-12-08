// 引入http请求
import Http from "@/utils/request.js"

// 注册接口
const register = (data) => {
	return Http.request({url : '/mobile/reg', method : 'POST', data })
}
// 登录接口
const login = (data) => {
	return Http.request({url : '/mobile/login', method : 'POST', data })
}

// 发送验证码
const sendSmsCode = (data) => {
	return Http.request({url : '/mobile/get_captcha', method : 'POST', data})
}

// 绑定手机号
const bindPhone = (data) => {
	return Http.request({url : '/mobile/bind_mobile', method : 'POST', data})
}

// 导出所有接口
export default {
	register,
	login,
	sendSmsCode,
	bindPhone
}