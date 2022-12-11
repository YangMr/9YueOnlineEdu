export default () => {
	return [
		{
			form : true,
			title : '原密码',
			placeholder : '请输入原密码',
			props : 'opassword',
			type : 'password'
		},
		{
			form : true,
			title : '新密码',
			placeholder : '请输入新密码',
			props : 'password',
			type : 'password'
		},
		{
			form : true,
			title : '确认密码',
			placeholder : '请输入确认密码',
			props : 'repassword',
			type : 'password'
		}
	]
}