import Vue from 'vue';
import { formatDate, getFlatternDistance } from '@/common/js/utils.js'

// 保留2位
Vue.filter('fixed', (val,length = 2) => {
	return (+val).toFixed(length);
})

//时间格式化
Vue.filter('formatDate', (val,type, join) => {
	return formatDate(val, type, join)
})

//计算距离
Vue.filter('distance',(lat1,lng1,lat2,lng2) => {
	return (getFlatternDistance(+lat1,+lng1,+lat2,+lng2)).toFixed(2)
})

//过滤距离
Vue.filter('km',(val) => {
	val = +val;
	return val > 1000 ? (val / 1000).toFixed(2) + 'km' : val.toFixed(2) + 'm';
})