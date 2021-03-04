# Vue Proxy代理解决跨域的使用记录



> 因为封装处理了请求axios，每个请求都会添加上当前的代理ip

- 最初想要请求的外部地址为：http://test.tbeayun.comtbea_be/kickout

***/proxyApi${ip}***  ：注意这个就是代理字段
```js
//httpRequest.js

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    
    //给sys的系统已有接口加上user-service
    if (/^\/sys/.test(actionName) && ! /user-service/.test(actionName)) {
        actionName = '/user-service/' + actionName
    }
    const ip = Global_Config.devIp

    // 这里判断是否为生产环境，不是生产环境的话每个请求url之前都要加上 /proxyApi${ip} 代理字段
    let ret = (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? `/proxyApi${ip}` : window.SITE_CONFIG.baseUrl) + actionName
    return ret
}

// axios请求
 this.$http({
    url: '/proxyApi42tbeayun/tbea_be/kickout',
    method: 'post',
    data:{ username : assAcc}
}).then(res => {
    this.$message.error('关联用户已退出')
})

```

```js
// index.js  代理配置文件
module.exports = {
    dev: {
        proxyTable:  {
            //匹配相同url地址（axios中的url参数需要加上/proxyApi42tbeayun），然后webpack回将请求转发到target: http://test.tbeayun.com
            '/proxyApi42tbeayun': {
                //需要转发的外部跨域请求地址
                target: 'http://test.tbeayun.com',
                //是否跨域
                changeOrigin: true,
                //这里是要将匹配到的（/proxyApi42tbeayun）url请求路径替换为/
                pathRewrite: {
                    '^/proxyApi42tbeayun': '/'
                }
            }
        },
}
```

```js
//axios请求
 this.$http({
    url: '/proxyApi42tbeayun/tbea_be/kickout',
    method: 'post',
    data:{ username : assAcc}
}).then(res => {
    this.$message.error('关联用户已退出')
})
```
