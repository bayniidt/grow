### 面试题

## 2021-4月面试题整理记录

1. vue-router如何创建动态路由与获取动态路由传递的参数

   - 动态路径参数：以：开头 例：/:id
   - 动态参数获取：this.$route.params.id

2. vue-router如何实现懒加载

   - component: () => import('url')

3. 如何处理跨域

   1. 后端设置cors
   2. 配置vue proxyTable
   3. JSONP【只支持get】
   4. nginx反向代理

4. 闭包的优缺点与应用场景

   - 优点：变量私有化，防止变量污染
   - 缺点：变量不会被回收，会一直占据内存空间，容易造成内存泄漏

   - 使用场景：计数器，回调函数，防抖节流
   - 业务场景：sokect 回调函数 array数组回调函数[map，find，filter...]

5. computed与watch的应用场景

   - computed：依赖的属性发生变化才会变化，购物车功能
   - watch：数据发生变化时需要进行对应处理，表单校验或进行异步API请求

6. v-for为什么需要key属性

   - key一般为唯一值，在vue进行虚拟dom【ast树】diff补丁对比时可以减少性能消耗，存在唯一的key可以更快的定位到指定的dom节点，如果使用index作为key，有可能会出现重复渲染的BUG

7. 定时器与事件监听应在哪个生命周期进行销毁

   - beforeDestroy：组件销毁之前

8. promise.then的返回值

   - .then会返回一个新的promise对象

9. vuex中的辅助函数有哪些

   - mapState, mapMutations, mapActions

10. 如何提交一个actions

    - dispatch

11. vuex模块化需要开启什么

    - namespaced： 命名空间

12. 原生ajax的使用步骤

    1. new XHR对象
    2. xhr.open('url') 设置请求路径
    3. xhr.header 设置请求头
    4. xhr.send 发送请求

13. git如何取消commit

    - git reset HEAD~[n 回退的commit提交次数 1 2 3 4]
    - git reset --hard [hash commit的hash值]

14. 如何复制一个对象

    1. json.parse(json.stringify)
    2. 递归深拷贝
    3. Object.assing 浅拷贝

15. flex布局常用属性

    1. flex-direction ：定义主轴方向
    2. justify-content：定义主轴对齐方式
    3. flex-wrap：换行，默认为nowrap
    4. align-items：定义交叉轴对齐方式
    5. flex-shrink：定义缩小比例，默认为1

16. watch的API有哪些

    1. deep：深层监听
    2. immdiate：初始化时执行回调函数

17. js的事件循环

    1. js为单线程
    2. js任务分为同步任务与异步任务，同步任务优先执行，遇到异步任务会放入异步任务队列，等待同步任务执行完毕后再执行异步任务
    3. 异步任务分为微任务与宏任务
    4. 微任务优于宏任务执行
    5. 微任务：promise MutaionObsever 宏任务：定时器，用户交互

18. promise的常用api有哪些

    1. promise.then
    2. promise.reject
    3. promise.resolve
    4. promise.all
    5. promise.catch
    6. promise.finally
## HTML 

1. HTML语义化的理解

html语义化是指使用合适的标签代表指定内容，使页面结构更清晰，不再大篇幅的使用div span，利于代码阅读维护与seo。 

代表元素： 

	header 头部
	footer 底部
	nav 导航
	section 段落

2. <!DOCTYPE>的作用

doctype的作用是告知浏览器当前HTML用什么版本编写的。简单来说就是：声明文档类型

	DOCTYPE！必须位于文档第一行
	DOCTYPE！对大小写不敏感

	删除DOCTYPE有可能会出现浏览器解析不兼容的情况

3. 说一下文档流、文本流

文档流：在标准的元素布局排列中，行内元素从左到右排列，块级元素从上到下排列。 一旦设置了**定位or浮动**即脱离文档流。当元素脱离文档流之后，当前元素不再占据排列位置，后续元素会使用脱离文档流元素的位置。

	相对定位：偏离某个距离，原本所占据空间仍然保留
	绝对定位：脱离文档流，相较于父级元素进行偏移， 子绝父相规则
	固定定位：脱离文档流，相较于当前视区进行偏移

	浮动flot：脱离文档流，不占据空间

文本流：元素内部一系列的字符的排列规则

4. html5新特性

	1. 标签语义化： header footer nav section aside dialog ...
	2. 表单增强： color date email number search url ...
	3. 音频视频： audio video
	4. canvas svg
	5. 客户端存储：localStorage sessionStorage
	6. 拖拽api： dragestart drag dragend ...

5. cookies，sessionStorage 和 localStorage 的区别

[知识传送门](https://juejin.im/entry/6844903434366222350)

[知识传送门](https://zhuanlan.zhihu.com/p/21275207)


cookie：

	HTTP是无状态协议，无法分辨当前请求是哪一个身份，所以需要给每个请求都分配一个id，这个id就是cookie，
	当每次请求发生时，都要求在请求头中携带cookie，这样服务端就可以知道当前请求者的身份了。

session：

	session是另一种记录客户状态的机制，不同的是cookie保存在客户端浏览器，而session保存在服务器。
	客户端访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上（session id），
	当客户端再次访问的时候只需要从session中查找该客户端的状态即可。

区别：

	1. session在服务端，cookie在客户端（浏览器）
	2. session默认被存在服务器的一个文件中
	3. session依赖于cookie，如果cookie被禁用，session也可能无法使用
	4. session比cookie安全

6. iframe的优缺点

优点：

	1. iframe能够原封不动的把嵌入的网页展现
	2. 多个网页引用只需要维护对应的iframe即可
	3. iframe嵌套可以增加公用的结构代码复用性

缺点：

	1. 会产生很多页面，不容易管理
	2. 不利于seo
	3. 兼容性差
	3. 上下可能会出现多个滚动条，体验差
















































## JS

#### 变量`var` `let` `const`

- var 

    1. var可以重复声明 `var a = 1 ; var a = 2 `
    2. 全局作用域，函数作用域
    3. 变量提升 在var定义之前访问变量为undefined

- let

    1. 同一作用域下不可以重复声明
    2. 全局作用域，块级作用域
    3. 没有变量提升，在let未定义之前访问则会报错
    4. 存在暂时性死区

#### 暂时性死区

```js
let a = 1
let test = function () {
    console.log(a) // 访问外层作用域的a 打印结果为1
    a++
}

---------------------------------------------------

let a = 1
let test = function () {
    console.log(a) // 报错 Uncaught ReferenceError: Cannot access 'a' before initialization
    // 因为下方a存在let声明，形成了暂时性死区，在未声明之前访问则会报错，并且不会访问外层的a
    let a = 2 
    a++
}
```

#### 变量提升

```js
var a = 1

fucntion f() {
    console.log(a) // undefined
    if(false) {
        var a = 2 // 无论代码执行与否，使用var声明存在变量提升，在定义之前访问则为undefined
    }
}
```