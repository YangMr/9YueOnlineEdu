export default () => {
	return [
		{
			title : '头像',
			avatar : true,
			event : 'upload'
		},
		{
			title : '昵称',
			form : true,
			props : 'nickname',
			type : 'input',
		},
		{
			title : '性别',
			props : 'sex',
			other : true,
			event : 'sex'
		},
		{
			title : '手机号',
			text : 17802901987,
			path : "/pages/bind-phone/bind-phone"
		}
	]
}