import { showToast } from "@/common/js/utils.js";

export default function (res) {
	if (res.errMsg.indexOf("request:fail ") === 0) {
		showToast("网络错误", {
			image: "/static/images/wifi_error.png",
			duration: 2000,
		});
		return Promise.reject(res.data);
	} else if (res.statusCode > 200) {
		//请求失败
		showToast(res.statusCode, {
			image: "/static/wifi_error.png",
		});
		return Promise.reject(res.data);
	}
	if (res.data.code != 200 && Object.keys(res.data).length < 3) {
		return showToast(res.msg || "发生错误了，请联系工程师").then(() => {
			return Promise.reject(res.data);
		});
	} else {
		return res.data;
	}
}
