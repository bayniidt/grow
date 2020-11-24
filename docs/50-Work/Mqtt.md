# mqtt前端链接与使用方式

业务： 
告警模块需要不断的请求接口查询是否有新的告警产生，使用了定时器按时请求接口，
出现的问题是浪费性能并且与告警产生的时间不匹配。如果设备越多，请求的接口就越多，显然是不合适的。

最后使用websokect，只需要建立一次链接，一旦产生新的告警，服务端就会将新的告警信息推送到前端进行渲染。

> `npm i mqtt` 安装mqtt库 
```js
 mqttConnect() {
    // mqtt配置选项
    const options = { 
        clean: true,  //保留会话
        connectTimeout: 4000 //超时时间
    }

    // websokect服务地址
    const connectUrl = 'ws://10.72.7.42:8083/mqtt'

    // 建立链接
    const client = mqtt.connect(connectUrl, options)

    // 订阅主题
    client.subscribe('testtopic')

    // 监听收到服务端消息的回调函数 ，监听函数必须保留两个形参， 第一个是主题，第二个是数据消息
    client.on('message', (topic, message) => {

        var dataString = "";
        // 将返回的数据转成字符串
        for (var i = 0; i < message.length; i++) {
            dataString += String.fromCharCode(message[i]);
        }
        
        console.log(dataString, 'dataString');
    })
}

```