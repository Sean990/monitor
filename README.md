# 服务器性能监控
复刻了酷安老哥 @无限远软件开发有限公司 以前做的监控台<br>

## 天气
### 和风天气API
注册一个账号登录控制台，创建应用即可拿到KEY<br>
配合文档使用【[开发文档](https://dev.qweather.com/docs/)】


## 服务器监控API
### BT宝塔
在自己的服务器安装官方都有教程的[宝塔官网](https://www.bt.cn/)<br>

```
1.登录自己的宝塔面板，打开面板设置
2.开启API接口，配置面板API，配置好以后就可以使用了

*以下是我整理的接口列表：
# 系统状态相关接口
/system?action=GetSystemTotal   //获取系统基础统计
/system?action=GetDiskInfo      //获取磁盘分区信息
/system?action=GetNetWork       //获取实时状态信息(CPU、内存、网络、负载)
/ajax?action=GetTaskCount       //检查是否有安装任务
/ajax?action=UpdatePanel        //检查面板更新

# 网站管理相关接口
/data?action=getData&table=sites    //获取网站列表
/site?action=get_site_types         //获取网站分类
/site?action=GetPHPVersion          //获取已安装的 PHP 版本列表
/site?action=GetSitePHPVersion      //获取指定网站运行的PHP版本
/site?action=SetPHPVersion          //修改指定网站的PHP版本
/site?action=SetHasPwd              //开启并设置网站密码访问
/site?action=CloseHasPwd            //关闭网站密码访问
/site?action=GetDirUserINI          //获取网站几项开关（防跨站、日志、密码访问）
/site?action=AddSite                //创建网站
/site?action=DeleteSite             //删除网站
/site?action=SiteStop               //停用网站
/site?action=SiteStart              //启用网站
/site?action=SetEdate               //设置网站有效期
/data?action=setPs&table=sites      //修改网站备注
/data?action=getData&table=backup   //获取网站备份列表
/site?action=ToBackup				//创建网站备份
/site?action=DelBackup				//删除网站备份
/data?action=getData&table=domain	//获取网站域名列表
/site?action=GetDirBinding          //获取网站域名绑定二级目录信息
/site?action=AddDirBinding          //添加网站子目录域名
/site?action=DelDirBinding          //删除网站绑定子目录
/site?action=GetDirRewrite          //获取网站子目录伪静态规则
/site?action=AddDomain				//添加网站域名
/site?action=DelDomain				//删除网站域名
/site?action=GetSiteLogs            //获取网站日志
/site?action=GetSecurity            //获取网站盗链状态及规则信息
/site?action=SetSecurity            //设置网站盗链状态及规则信息
/site?action=GetSSL                 //获取SSL状态及证书详情
/site?action=HttpToHttps            //强制HTTPS
/site?action=CloseToHttps           //关闭强制HTTPS
/site?action=SetSSL                 //设置SSL证书
/site?action=CloseSSLConf           //关闭SSL
/site?action=GetIndex               //获取网站默认文件
/site?action=SetIndex               //设置网站默认文件
/site?action=GetLimitNet            //获取网站流量限制信息
/site?action=SetLimitNet            //设置网站流量限制信息
/site?action=CloseLimitNet          //关闭网站流量限制
/site?action=Get301Status           //获取网站301重定向信息
/site?action=Set301Status           //设置网站301重定向信息
/site?action=GetRewriteList		    //获取可选的预定义伪静态列表
/files?action=GetFileBody           //获取指定预定义伪静态规则内容(获取文件内容)
/files?action=SaveFileBody	        //保存伪静态规则内容(保存文件内容)
/site?action=GetProxyList           //获取网站反代信息及状态
/site?action=CreateProxy            //添加网站反代信息
/site?action=ModifyProxy            //修改网站反代信息

# Ftp管理
/data?action=getData&table=ftps     //获取FTP信息列表
/ftp?action=SetUserPassword         //修改FTP账号密码
/ftp?action=SetStatus               //启用/禁用FTP

# Sql管理
/data?action=getData&table=databases    //获取SQL信息列表
/database?action=ResDatabasePassword    //修改SQL账号密码
/database?action=ToBackup               //创建sql备份
/database?action=DelBackup              //删除sql备份

# 插件管理
/plugin?action=a&name=deployment&s=GetList&type=0   //宝塔一键部署列表
/plugin?action=a&name=deployment&s=SetupPackage     //部署任务
```


## 使用
#### 下载
```
下载源码后使用HBuilder X导入项目
```
#### 运行
```
在项目内运行yarn或者npm install
项目安装完依赖包之后直接运行即可
```
### 如果对你有帮助，请给个Star
