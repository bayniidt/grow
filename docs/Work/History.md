
# 解决Mac上无法使用phpstudy启动项目问题

> 前言：在学node.js阶段需要使用phpstudy搭建环境接口，使用ajax请求测试。无奈一直没有找到在Mac上使用phpstudy的方法，只能使用VirtualBox搭建了win10虚拟机进行学习。


**解决办法 ： 在虚拟机中使用phpstudy搭建环境，Mac编写代码，测试接口调用虚拟机的ip地址请求**

## 1. 切换虚拟机的网络使用方式为：`仅主机(Host-Only)网络`


<img :src="$withBase('/image/work-01.png')">

## 2. 点击创建网卡 ，切换回虚拟机管理界面，再创建`Host-Only网络`


<img :src="$withBase('/image/work-02.png')">

> 注意：只启用一个网卡，我的目的就只是在虚拟机启用服务器环境，Mac写代码时可以访问调用接口


<img :src="$withBase('/image/work-03.png')">

## 3. 启动虚拟机，在开启`phpstudy`


<img :src="$withBase('/image/work-04.png')">

## 4. 确定`phpstudy`的`Apache`与`MySQL`都处于启动状态后，在`Mac浏览器`或`Postman`中测试接口


<img :src="$withBase('/image/work-05.png')">

服务器正常返回请求结果，可以愉快的在`Mac`上撸代码了

END


