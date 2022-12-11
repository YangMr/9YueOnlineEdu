export default () => {
	return [
		{
			// 左侧的文字
			title : '账户安全',
			// 跳转的路径
			path : '/pages/user-safe/user-safe',
			// 左侧文字旁边的图标
			// icon : 'iconfont icon-9',
			// 右侧的箭头
			showArrow : true, 
		},
		{
			// 左侧的文字
			title : '清除缓存',
			// 跳转的路径
			// path : '/pages/user-safe/user-safe',
			// 左侧文字旁边的图标
			// icon : 'iconfont icon-9',
			// 右侧的箭头
			// showArrow : true, 
			// 右侧文本
			text : uni.getStorageInfoSync().currentSize < 1024 ? uni.getStorageInfoSync().currentSize + "KB" : (uni.getStorageInfoSync().currentSize / 1024).tofixed(2) + 'MB' ,
			// 绑定的事件
			event : 'clear'
		},
		{
			// 左侧的文字
			title : '检查更新',
			// 跳转的路径
			// path : '/pages/user-safe/user-safe',
			// 左侧文字旁边的图标
			// icon : 'iconfont icon-9',
			// 右侧的箭头
			showArrow : true, 
			event : 'update'
		},
		{
			// 左侧的文字
			title : '当前版本',
			// 跳转的路径
			// path : '/pages/user-safe/user-safe',
			// 左侧文字旁边的图标
			// icon : 'iconfont icon-9',
			// 右侧的箭头
			// showArrow : true, 
			// 右侧文本
			text : '1.0.0',
			event : 'version'
		}
	]
}