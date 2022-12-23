// 消息提示框
const toast = (title = '', icon = 'none', duration = 2000) => {
	uni.showToast({
		title,
		icon,
		duration
	});
}

// 补零函数
const addZero = (n) => {
	if (n < 10) {
		return "0" + n
	}
	return n
}

// 模态弹窗
const modal = (title = "", content = "") => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			content,
			success: function(res) {
				if (res.confirm) {
					resolve(true)
				}
			}
		});
	})

}

// l开启oading加载
const openLoading = (title = "加载中...", mask = false) => {
	uni.showLoading({
		title,
		mask
	})
}

// 关闭loading
const hideLoading = () => {
	uni.hideLoading()
}

// 设置对象里面所有属性的值为空
const resetForm = (form) => {
	Object.keys(form).forEach(item => {
		form[item] = ""
	})
}

// 正则校验
const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'weixin': //微信号
			return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
				/^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}



export default {
	toast,
	resetForm,
	openLoading,
	hideLoading,
	checkStr,
	modal,
	addZero
}
