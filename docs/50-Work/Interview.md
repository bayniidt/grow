# 面试记录

## 2020-06-10 

### `Vue`怎么优化长列表

`vue`中的每个数据，都会自动使用`object.definProperty`做数据劫持来实现视图响应数据，当某些数据只需要展示不会有任何改变的时候，就不需要被劫持，可以使用`object.freeze`来冻结该数据，在长列表数据下执行，可以减少组件的初始化时间。

```js
export default {
    data (){
        return {
            list : []
        }
    },
    async created() {
        const { data } = await getList()
        // 使用Object.freeze冻结服务器返回的数据
        // 需要注意的是，这里只是冻结了结构的data，引用this.list不会被冻结，还是可以重新赋值的
        this.list = Object.freeze(data)  

    }
}
```

### `v-if`与`v-for`的优先级与如何处理在`v-for`中使用`v-if`

在`vue`的`compile`指令解析时，`v-for`的优先级是高于`v-if`的

```js{9,10}
// 从编译好的AST树来看 _l代表v-for 而v-if被编译成一个三元表达式当做参数传给_l，根据判断的结果来进行渲染
 ƒ anonymous() {
    with (this) {
        return _c('div', {
            attrs: {
                "id": "demo"
            }
        },
            _l((children), function (child) {
                return (isFolder) ? _c('p', [_v(_s(child.title))]) : _e()
            }), 0)
    }
}

```

> `v-for`与`v-if`同时使用的解决方案，将`v-if`写在`tempalte`标签上

```html
<template v-if='isList'>
<li v-for="item in list" :key=item.id></li>
</template>
```

### 浏览器从输入URL到页面渲染完成的过程中都发生了写什么？

1. 浏览器会在缓存中寻找是否有该url的ip缓存，没有则会向服务端发送DNS请求查询IP地址

2. 获取IP地址后向服务器发起TCP链接，其中会经过3次握手环节

3. 建立通信后向服务器发起HTTP请求

4. 服务器收到请求后返回请求结果

5. 浏览器根据结果开始解析并渲染页面

6. 关闭链接

### 如何实现用户在点击跳转文章后，返回时希望还在原来跳转前的位置

> 使用`keep-alive`缓存组件

```HTML
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
     <component :is="currentComponent"></component>
</keep-alive>

<!-- OR -->

<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
    <router-view></router-view>
</keep-alive>
```

### CSS实现垂直居中
```css
/* 知道居中元素宽高 */
.father{
    width: 300px;
    height: 300px;
    border:1px solid red;
    position: relative;  // 父盒子设置相对定位
}
.son{
    width: 100px;
    height: 50px;
    position: absolute;  // 居中盒子设置绝对定位
    background: yellow;
    top: 50%;   // 距离上50%
    left: 50%;   // 距离左50%
    margin-top: -25px;  // 上外边距 减去自身高度50%
    margin-left: -50px;  // 左外边距 减去自身高度50%
}
/* or */
.son{
    width: 100px;
    height: 50px;
    position: absolute;  // 居中盒子设置绝对定位
    background: yellow;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto; // 上右下左全部设置为0 外边距为auto
}

/* 居中元素的宽高未知 */
.father{
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;  // 父盒子相对定位
}
.son{
    width: 100px;
    height: 50px;
    background: green;
    position: absolute; // 居中元素绝对定位
    top: 50%; 
    left: 50%;
    transform: translate(-50% , -50%); // 平移自身的宽高50%
}

/* flex布局 */
.father{
    width: 300px;
    height: 300px;
    background: blue;
    display: flex; // 设置父盒子为弹性盒子
    justify-content: center; // 主轴居中
    align-items: center; // 交叉轴居中
}
/*注意：即使不设置子元素为行块元素也不会独占一层*/
.son{
    width: 100px;
    height: 50px;
    background:green;
}

```

### new一个对象时，new做了哪些事？

```
1. 创建一个空对象

2. 将this指向这个空对象

3. 执行构造函数中的代码，为对象添加成员

4. 返回这个对象 
```

### 实现一个简单的发布订阅类

```js
ing...
```

## 2020-06-15

### 什么是`HTTP`**简单请求**&**非简单请求**？

- 简单请求：浏览器直接发出`CORS`请求。具体来说，就是在请求头中，增加一个`Origin`字段。 `Origin`字段用来说明本次请求是来自哪个源

```js{2}
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

// 符合下列两种条件的就属于简单请求

// 请求方法是以下三种方法
HEAD
GET
POST

// 请求头信息不超出以下几种字段
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

- 非简单请求：非简单请求是那种对服务器有特殊要求的请求，比如请求方式为`PUT`或`DELETE`，或`Content-Type`字段的类型是`application/json`。

> 非简单请求的`CORS`请求，会在正式通信之前，增加一次`HTTP`查询请求，称之为`“预检”`请求。浏览器会先咨询服务器，当前网页所在的域名是否在服务器的许可名单之中


```JS{3,4}
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```
上面代码中，`HTTP`请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。


- `CORS`与`JSONP`的比较

    - `CORS`与`JSONP`的使用目的相同，但是比`JSONP`更强大。

    - `JSONP`只支持`GET`请求，`CORS`支持所有类型的`HTTP`请求。`JSONP`的优势在于支持老式浏览器，以及可以向不支持`CORS`的网站请求数据。

