<template>
	<view class="monitor-wrapper">
		<view class="monitor-left">
			<view class="date-box">
				<view class="time">{{ time }}</view>
				<view class="date">{{ date }}</view>
			</view>
			<view class="weather-box">
				<view class="info">
					<image class="icon" :src="`/static/icons/${weatherInfo.icon}.png`" mode=""></image>
					<view class="temp">{{ weatherInfo.temp }}℃ {{ weatherInfo.text }}</view>
				</view>
				<view class="other">{{ cityName }} 湿度{{ weatherInfo.humidity }}% {{ weatherInfo.windDir }}{{ weatherInfo.windScale }}级</view>
			</view>
			<view class="device-info">
				<text class="info">电量：{{ power }}%</text>
				<text class="info">{{ netWorkName }}</text>
			</view>
		</view>

		<view class="monitor-right">
			<view class="title">服务器性能监控</view>
			<view class="info">
				<view class="name">服务器名称：Sean</view>
				<view class="ip">IP地址：192.168.0.1</view>
			</view>
			<view class="server-box">
				<view class="bar-item">
					<text>负载：</text>
					<view class="progress"><view class="active" style="width: 50%;"></view></view>
					<text class="occupy">50%</text>
				</view>
				<view class="bar-item">
					<text>CPU：</text>
					<view class="progress"><view class="active" style="width: 30%;"></view></view>
					<text class="occupy">30%</text>
				</view>
				<view class="bar-item">
					<text>RAM：</text>
					<view class="progress"><view class="active" style="width: 10%;"></view></view>
					<text class="occupy">10%</text>
				</view>
				<view class="bar-item">
					<text>ROM：</text>
					<view class="progress"><view class="active" style="width: 20%;"></view></view>
					<text class="occupy">20%</text>
				</view>
			</view>

			<view class="network">
				<view class="item">上行：1MB/S</view>
				<view class="item">下行：10MB/S</view>
				<view class="item">运行时间10天</view>
			</view>

			<view class="card">
				<view class="item">
					<text class="name">WEB</text>
					<text>2</text>
				</view>
				<view class="item">
					<text class="name">SQL</text>
					<text>3</text>
				</view>
				<view class="item">
					<text class="name">FTP</text>
					<text>3</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Request from '@/plugins/request/pocky-request_v.2.0.4/index.js';
export default {
	data() {
		return {
			power: 0,
			netWorkName: '未知网络',
			cityName: '北京',
			time: '',
			date: '',
			weatherInfo: {
				obsTime: '2021-06-30T14:55+08:00',
				temp: '29',
				feelsLike: '32',
				icon: '104',
				text: '阴',
				wind360: '180',
				windDir: '南风',
				windScale: '2',
				windSpeed: '11',
				humidity: '79',
				precip: '0.0',
				pressure: '999',
				vis: '17',
				cloud: '99',
				dew: '26'
			}
		};
	},
	onLoad() {
		// 初始化数据
		let initID = setInterval(this.appInit, 3000);
		this.appInit();

		// 当前时间
		let timerID = setInterval(this.updateTime, 1000);
		this.updateTime();

		// 获取天气信息
		let weatherID = setInterval(this.queryWeather, 5000 * 60);
		this.queryWeather();
	},
	methods: {
		appInit() {
			//注意，安卓需要配置下manifest.json文件，打开后，进入模块权限配置，在右侧的Android权限设置里勾选上android.permission.BATTERY_STATS
			let main = plus.android.runtimeMainActivity();
			let Intent = plus.android.importClass('android.content.Intent');
			let recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
				onReceive: (context, intent) => {
					let action = intent.getAction();
					if (action == Intent.ACTION_BATTERY_CHANGED) {
						this.power = intent.getIntExtra('level', 0); //电量
					}
				}
			});
			let IntentFilter = plus.android.importClass('android.content.IntentFilter');
			let filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
			main.registerReceiver(recevier, filter);

			let wifiManager, wifiInfo;
			let Context = plus.android.importClass('android.content.Context');
			let WifiManager = plus.android.importClass('android.net.wifi.WifiManager');
			let WifiInfo = plus.android.importClass('android.net.wifi.WifiInfo');
			wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
			wifiInfo = wifiManager.getConnectionInfo();
			let ssid = wifiInfo.getSSID() || '';
			if (ssid.length == 0) {
				this.netWorkName = '未知网络';
			}
			//一些手机上获取SSID是有值的，但是实际IP为空，真实为未连接
			let i = parseInt(wifiInfo.getIpAddress());
			let ipStr = (i & 0xff) + '.' + ((i >> 8) & 0xff) + '.' + ((i >> 16) & 0xff) + '.' + ((i >> 24) & 0xff);
			if (ipStr == '0.0.0.0') {
				this.netWorkName = '未知网络';
			}

			if (ssid != '<unknown ssid>' && ssid.toUpperCase() != '0X') {
				this.netWorkName = `WIFI：${ssid.replace(/\"/g, '')}`;
			}
		},
		updateTime() {
			const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			let date = new Date();
			this.time = this.zeroPadding(date.getHours(), 2) + ':' + this.zeroPadding(date.getMinutes(), 2) + ':' + this.zeroPadding(date.getSeconds(), 2);
			this.date =
				this.zeroPadding(date.getFullYear(), 4) + '-' + this.zeroPadding(date.getMonth() + 1, 2) + '-' + this.zeroPadding(date.getDate(), 2) + ' ' + week[date.getDay()];
		},
		zeroPadding(num, digit) {
			var zero = '';
			for (var i = 0; i < digit; i++) {
				zero += '0';
			}
			return (zero + num).slice(-digit);
		},
		queryNetWork() {},
		queryWeather() {
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: location => {
					this.cityName = `${location.address.district} ${location.address.street}`;
					Request()
						.get('https://devapi.qweather.com/v7/weather/now', {
							params: {
								key: 'c8307c35355446eea59e8166ff8219dc',
								location: `${location.longitude},${location.latitude}`
							}
						})
						.then(res => {
							this.weatherInfo = res.now;
						});
				},
				fail: err => {
					console.log(err);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.monitor-wrapper {
	padding-top: var(--status-bar-height);
	line-height: 1;
	display: flex;
}
.monitor-left {
	width: 40%;
	border-right: 2rpx solid #444444;
	.date-box {
		text-align: center;
		.time {
			font-size: 50rpx;
			font-weight: bold;
		}
		.date {
			margin-top: 20rpx;
			font-size: 20rpx;
		}
	}
	.weather-box {
		text-align: center;
		margin: 40rpx auto 52rpx;
		.info {
			font-size: 24rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon {
				width: 68rpx;
				height: 68rpx;
				margin-right: 10rpx;
			}
			.temp {
				font-size: 28rpx;
				font-weight: bold;
			}
		}
		.other {
			margin-top: 4rpx;
			font-size: 14rpx;
		}
	}
	.device-info {
		margin: 0 auto;
		border-radius: 10rpx;
		width: 80%;
		font-size: 16rpx;
		text-align: center;
		padding: 12rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #444444;
		.info {
			margin: 0 8rpx;
		}
	}
}
.monitor-right {
	flex: 1;
	padding: 0 20rpx;
	.title {
		text-align: center;
		font-size: 24rpx;
		margin-bottom: 26rpx;
	}
	.info {
		display: flex;
		padding: 0 20rpx;
		justify-content: space-between;
		.name {
			font-size: 16rpx;
		}
		.ip {
			font-size: 16rpx;
		}
	}
	.server-box {
		margin-top: 20rpx;
		.bar-item {
			display: flex;
			align-items: center;
			margin-top: 12rpx;
			font-size: 16rpx;
			.progress {
				flex: 1;
				overflow: hidden;
				border-radius: 20rpx;
				height: 16rpx;
				background-color: #444444;
				display: inline-flex;
				align-items: center;
				margin-right: 6rpx;
				.active {
					height: 100%;
					background-color: #fff;
					transition: all 0.4s ease;
				}
				.occupy {
					font-size: 12rpx;
				}
			}
		}
	}
	.network {
		font-size: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 20rpx 0;
	}
	.card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item {
			position: relative;
			border-radius: 10rpx;
			text-align: center;
			background-color: #444444;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30%;
			height: 70rpx;
			font-size: 20rpx;
			.name {
				position: absolute;
				left: 8rpx;
				top: 8rpx;
				font-size: 12rpx;
			}
		}
	}
}
</style>
