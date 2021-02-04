# 工作中的websocket使用

- 业务需求场景：大屏首页的磁贴块（在线值班人员，考勤打卡，告警监控通知，门禁通行）需要与各种设备进行实时数据传输

### 后台使用EMQ技术栈，前端使用mqtt.js进行链接 [mqtt.js使用说明](https://www.emqx.cn/blog/connect-to-mqtt-broker-with-websocket)

```js
/*
    topic: 订阅主题 
    callback： 处理消息回调函数
    options：配置项

    需要注意的是后台返回的是 （Utf8Array）格式的数据，需要进行转换
*/
export const mqttLink = (topic, callback, options = { clean: true, connectTimeout: 4000 }) => {
  
    const connectUrl = Global_Config.mqttWs;
    const client = mqtt.connect(connectUrl, options);

    client.on('connect', () => {
        client.subscribe(topic)
    })

    // 开启新告警监听回调
    client.on("message", (topic, message) => {
        var mqttMessage = JSON.parse(Utf8ArrayToStr(message));
        callback(mqttMessage)
    });

    return client
}

// 前端使用
this.mqttObj = mqttLink('alarm/alarmRecord', this.mqttCallBack)
```

### 后台使用kafka技术栈， 前端使用socket.js + stomp.js

```js
<script src="./static/plugins/ws/sockjs.min.js"></script>
<script src="./static/plugins/ws/stomp.min.js"></script>
/*
    topic: 订阅主题
    callBack： 消息处理回调
*/
export default function createSc({topic, callBack}) {
    return {
        stompClient: null,
        topic,
        callBack,

        async connect() {
            if (!this.stompClient) {
                var socket = await new SockJS('http://10.72.7.42:20821/znv-ws')
                this.stompClient = Stomp.over(socket)

                // 心跳
                this.stompClient.heartbeat.outgoing = 20000
                this.stompClient.heartbeat.incoming = 0 
            }
            // 这里注意this指向
            this.stompClient.connect({}, () => this.successConnect(), () => this.errorConnect());
        },
        successConnect() {
            this.stompClient.subscribe(this.topic, response => this.callBack(JSON.parse(response.body)))
        },
        errorConnect() {
            this.connect()
        },
        disconnect() {
            if (this.stompClient != null) {
                this.stompClient.disconnect();
            }
        },
    }
}

// 前端使用
this.socket = createSc({ topic: '/topic/ws-event-topic', callBack: this.handlerMessageCallBack })
this.$nextTick(() => {
    this.socket.connect()
})
```


