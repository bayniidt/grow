# 面试记录

## 2020-06-10 

### 1. `Vue`怎么优化长列表

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

### 2. `v-if`与`v-for`的优先级与如何处理在`v-for`中使用`v-if`

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

### 3. 浏览器从输入URL到页面渲染完成的过程中都发生了写什么？

1. 浏览器会在缓存中寻找是否有该url的ip缓存，没有则会向服务端发送DNS请求查询IP地址

2. 获取IP地址后向服务器发起TCP链接，其中会经过3次握手环节

3. 建立通信后向服务器发起HTTP请求

4. 服务器收到请求后返回请求结果

5. 浏览器根据结果开始解析并渲染页面

6. 关闭链接

### 4. 如何实现用户在点击跳转文章后，返回时希望还在原来跳转前的位置

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

### 5. CSS实现垂直居中
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

### 6. new一个对象时，new做了哪些事？

```
1. 创建一个空对象

2. 将this指向这个空对象

3. 执行构造函数中的代码，为对象添加成员

4. 返回这个对象 
```

### 7. 实现一个简单的发布订阅类

```js
ing...
```

## 2020-06-15

### 1. 什么是`HTTP`**简单请求**&**非简单请求**？

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


### 2. `webpack`多入口文件页面打包

单页面应用程序入口配置一般如下

```js
entry: resolve(__dirname,'src/home/index.js')
```

多页面应用，需要配置多个入口文件，如下

```js
entry: {
    home: resolve(__dirname,'src/home/index.js'),
    about: resolve(__dirname,'src/about/index.js')
}
```

### 3. `proxy`与`defineproperty`的区别是什么

> vue2.x的双向绑定使用了`Object.defineproperty`进行数据劫持，vue3.0使用`proxy`代理

- defineproperty: 需要递归，不能劫持数组，配合发布订阅模式
```js{6,9}
//vue2.x
Object.key(data).forEach(function(key){
    Object.defineproperty(data,key,{
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('get')
        },
        set: function(newVal) {
            console.log(newVal)
        }
    })
})
```

- Proxy: 可以直接监听整个对象，不需要递归，可以监视数组，有13种拦截方法，**Proxy返回的是一个新对象，只可以操作新的对象达到目的**，**而Object.defineproperty只能遍历对象属性直接修改**，**Proxy兼容性差**
```js{9,13}
const input = document.getElementById('input')
const p = document.getElementById('p')
const obj = {}

// Reflect为 Object.defineproperty.get/set 的包装对象 ，可以将操作转发给原始对象
const newObj = new Proxy(obj, {
    get: function(target, key, receivere) {
        console.log(key)
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, value, receiver) {
        console.log(target, key, value, receiver)
        return Reflect.set(target, key, value, receiver)
    }
})
```

### 3. async await 

- `async` 函数是什么

> `async`函数与`Generator`函数一样，返回一个`Promise`对象，可以使用`then`方法添加回调函数。**当函数执行的时候，一旦遇到`await`就会先返回，等到触发的异步操作完成，再接着执行函数题内后面的语句**

- `async`函数是`Generator`函数的语法糖 ， 并且`async`函数自带执行器，不需要再手动调用`next()`

- `async`函数的实现就是将`Generator`函数和自动执行器包装在一个函数中

    ```js
    async function fn(args){
    // ...
    }

    // 等同于

    function fn(args){ 
    return spawn(function*() {
        // ...
    }); 
    }
    ```

### 4. `React`与`Vue`的异同

- 相同点：

    1. `React`与`Vue`都使用了`VDOM 虚拟DOM`
    虚拟DOM是一个映射真实DOM的JS对象，如果需要改变任何元素的状态，那么现在虚拟DOM上进行改变，而不是直接操作真实的DOM。当有变化时会进行新旧虚拟DOM的比对，把变化应用在真实DOM上

    2. 组件
    `React`与`Vue`都鼓励组件化应用。建议开发人员将应用拆分为一个个功能明确的模块，每个模块之间通过合适的方式互相联系

    3. `Props`
    两者都可以通过`Props`进行值传递

- 异同点：

    1. `React`使用`JSX` ，`Vue`使用模版
    `React`使用`JSX`，就是原生的`JavaScript`，赋予了开发者许多编程能力，但是`vue`中的`render`函数也可以使用`JSX`语法

    2. `React`的状态管理，`Vue`的对象属性
    在`React`中必须通过`setState()`方法更新状态，而在Vue中直接由`data`进行管理，在开发大型应用中，使用`Redux`或`Vuex`是必须的