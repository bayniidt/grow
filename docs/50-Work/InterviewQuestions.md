# 面试题

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













































