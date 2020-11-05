## vue单页面中需要注册多个组件的优化方法

> 需求场景： 大屏首页上需要注册多个磁贴，每个磁贴都是独立的功能组件，使用import导入后再在components中注册会出现代码冗余，如果有N个组件就需要导入N次并注册N次

<img :src="$withBase('/image/importCom.png')">

<img :src="$withBase('/image/components.png')">

解决方法：

1. 将左右磁贴数组合并成一个数组并把对应的组件名与组件路径抽成对象

```js
const magetInfo = [...MagnetDeploy.rightMagnetList, ...MagnetDeploy.leftMagnetList].map(item => {
	return {
		url: item.url,
		comName: item.comName
	}
})
```

2. 使用`Object.fromEntries`将`magetInfo`转成key为组件名，value为import懒加载的对象

```js
/**
 * 
 * 获取磁贴组件
 * 使用import()懒加载的方式
 * 返回一个格式为： {组件名：import(组件路径)} 的对象
 * 在components中展开
 * 这里要注意import(`${item.url}`)中的参数是使用反引号包裹的字符串型路径地址
 */
const getMagetComponents = () => {
    return Object.fromEntries(magetInfo.map(item => 
    		[item.comName,  ()=>import(`${item.url}`)]));
}
````

3. 在components中展开`getMagetComponents`方法返回的对象

```js
components: {
	...getMagetComponents()
}
````

### Object.fromEntries() 

> Object.fromEntries() 方法把键值对列表转换为一个对象。 返回一个由该迭代对象条目提供对应属性的新对象。

Object.fromEntries() 方法接收一个键值对的列表参数，并返回一个带有这些键值对的新对象。这个迭代参数应该是一个能够实现@@iterator方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类数组的对象，第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。