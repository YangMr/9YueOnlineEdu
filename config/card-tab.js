export default () => {
	return [
		{
			id : 1,
			icon : 'iconfont icon-OrderHistory',
			title : '订单',
			path : '/pages/order-list/order-list',
			isLogin : true
		},
		{
			id : 2,
			icon : 'iconfont icon-pinglun2',
			title : '消息',
			path : '/pages/msg-list/msg-list'
		},
		{
			id : 3,
			icon : 'iconfont icon-shoucang1',
			title : '收藏',
			path : '/pages/fava-list/fava-list'
		},
		{
			id : 4,
			icon : 'iconfont icon-e-learning-monitor',
			title : '在学',
			path : '/pages/tabbar/study/study',
			navigator : 'switchTab'
		}
	]
}