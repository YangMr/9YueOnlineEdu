// 消息提示框
const toast = (title = '', icon = 'none', duration = 2000) => {
	uni.showToast({
		title,
		icon,
		duration
	});
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
	Object.keys(form).forEach(item=>{
		form[item] = ""
	})
}

export default {
	toast,
	resetForm,
	openLoading,
	hideLoading
}



