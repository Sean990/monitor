
//接口地址
export const ApiUrl = () => {
	if (process.env.NODE_ENV === 'development') {
		return 'http://api.94rr.cn/' // http://api.94rr.cn/
	} else {
		return 'http://api.punkyx.com/' // http://api.punkyx.com/
	}
}