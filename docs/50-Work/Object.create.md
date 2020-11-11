## Object.create()

在javascript中没有类的概念，继承是使用原型来实现的，Object.create可以创造一个继承自某个对象的实例，这个实例的Object.prototype指向被继承的对象。

```js
var mother = {
	a: 1,
	b: 2
}

var daughter = Object.create(mother)

daughter.b += 2

console.log(mother.b)  // 2
console.log(daughter.b) // 4

/*
	mother作为原型对象，可以存放程序所使用的方法，状态，作为可复用代码的存储容器
	daughter作为实例，可以存放任何与mother无关的方法或状态
*/

var inNull = Object.create(null)
console.log(inNull) // {}

// 传递null作为参数，则会创建一个没有任何属性的空容器，甚至连原型都没有
````