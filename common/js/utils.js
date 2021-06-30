//格式时间的样式
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const EARTH_RADIUS = 6378137.0; //单位M
function getRad(d) {
	return d * Math.PI / 180.0;
}

// 提示框
export const showToast = (title, options = {}) => {
	return new Promise((res, rej) => {
		//默认配置
		let config = {
			icon: 'none',
			image: '',
			mask: true,
			duration: 1500
		}

		//对象合并 新旧配置合并
		Object.assign(config, options);

		uni.showToast({
			title: String(title),
			...config
		}).then(() => {

			setTimeout(() => {
				res()
			}, config.duration)

		})
	})
}

//时间格式
export const formatDate = (time, type = 1, join = '-') => {
	const twentyFourHours = 24 * 60 * 60 * 1000;
	const fortyEightHours = 24 * 60 * 60 * 1000 * 2;
	const date = new Date(time);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
	const ptime = new Date(`${year}-${month}-${day}`).getTime()
	const todayTime = new Date(today).getTime()
	const yesterdayTime = new Date(todayTime - twentyFourHours).getTime();
	const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime()

	if (type === 1) {
		return [year, month, day].map(formatNumber).join(join) + ' ' + [hour, minute, second].map(formatNumber)
			.join(':')
	} else if (type === 2) {
		if (ptime === todayTime) {
			return '今日 ' + [hour, minute].map(formatNumber).join(':')
		} else if (ptime > todayTime) {
			return '明日 ' + [hour, minute].map(formatNumber).join(':')
		} else if (ptime < todayTime) {
			return '昨日 ' + [hour, minute].map(formatNumber).join(':')
		} else {
			return [month, day].map(formatNumber).join(join) + ' ' + [hour, minute].map(formatNumber)
				.join(':');
		}
	} else if (type === 3) {
		return [year, month, day].map(formatNumber).join(join) + ' ' + [hour, minute].map(formatNumber).join(':')
	} else if (type === 4) {
		return [year, month, day].map(formatNumber).join(join)
	} else {
		return [month, day].map(formatNumber).join(join)
	}
}

//获取浏览器url params
export const getUrlParams = variable => {
	const query = window.location.search.substring(1);
	const vars = query.split("&");
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

//判断是否是微信浏览器
export const isWeChat = () => {
	return /micromessenger/.test(navigator.userAgent.toLowerCase());
}
