import config from "@/config/config.js"
import utils from "@/common/js/utils.js"
import store from "@/store/index.js"
const Http = {
	
	// 请求配置
	config : {
		// 请求的公共接口地址
		baseUrl : config.baseUrl,
		// 网校id
		appid : config.appid,
		// 请求拦截器
		beforRequest(options){
			return new Promise((resolve,reject)=>{
				options.url = this.baseUrl + options.url
				options.method = options.method || 'GET'
				options.header = {
					appid : this.appid,
					token : store.state.token || ""
				}
				
				resolve(options)
			})
		},
		// 响应拦截器
		afterResponse(data){
			return new Promise((resolve,reject)=>{
				
				const response = data[1]

				// 请求失败
				if(response.statusCode !== 200 || response.data.msg === 'fail'){
					const msg = response.data.data || '请求失败'
					utils.toast(msg)
					
					// TOKEN 过期处理
					if(response.data.data == 'Token 令牌不合法，请重新登录' || response.data.data == '您没有权限访问该接口!'){
						// 退出登录
						// store.dispatch('logout')
						
						// 跳转到登陆页
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/login/login',
							});
						},500)
					}
					
					return reject(msg)
				}
				
				// 请求成功
				resolve(response.data.data)
			})
		},
		// 错误消息提示
		showErrorMessage(response,reject){
			
		}
	},
	
	// http请求
	async request(options = {}){
		try{
			const config = await this.config.beforRequest(options)
			const data = await uni.request(config)
			const response = await this.config.afterResponse(data)
			return response
		}catch(e){
			//TODO handle the exception
			console.log("error=>", e)
		}
	},
	
	// 文件上传请求
	upload(){
		
	}
}

export default Http

