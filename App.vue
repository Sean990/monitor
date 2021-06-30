<script>
export default {
	onLaunch: function() {
		//#ifdef APP-PLUS
		plus.screen.lockOrientation('landscape-primary'); // 强制横屏
		// plus.screen.lockOrientation('portrait-primary'); // 强制竖屏
		//#endif
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
/* 样式初始化 */
page {
	font-size: 24rpx;
	color: #FFFFFF;
	background-color: #000000;
}

navigator,
view,
text {
	box-sizing: border-box;
}

swiper,
video,
map {
	width: 100%;
	height: 100%;
}

image {
	will-change: transform;
}
</style>
