export default {
	methods : {
		// 返回
		navBack(delta = 1){
			console.log("back")
			uni.navigateBack({
				delta
			})
		},
		
		// 跳转
		navTo(path, options = {}){
			// 如果没有输入要跳转的地址,则不继续往下执行
			if(!path){
				console.log("请输入要跳转的路径")
				return 
			}
			
			// 如果islogin: true,则表要跳转的地址必须登录之后才可以访问
			if(options.isLogin && !this.$store?.getters.hasLogin){
				uni.navigateTo({
					url : "/pages/login/login"
				})
				return
			}
			
			// 如果options.navigator值为true则需要指定对应的跳转方式
			if(options.navigator){
				uni[options.navigator]({
					url : path
				})
			}
			
			uni.navigateTo({
				url : path
			})
			
		}
	}
}