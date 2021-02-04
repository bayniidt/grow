### JavaSrcipt

### Array

## Array.length

> `length` 返回数组的长度，从0开始计算，可以通过length来改变数组的长度，如果大于先前长度，则新的元素为`undefined`

```js
let arr = [1,2]
arr.length = 3
// arr = [1,2,undefined]

// length属性的属性特性 MDN
Array.length = {
    writable :true, // 如果改属性设置为false ，则不允许修改length
    Configurable :false, // 如果设置该属性为false，则不允许删除或修改任何属性
    Enumerable :false // 如果设置为true 则可以进行循环迭代
}
```

## Array.from(arrObj,mapFn)

> 把伪数组转为数组，浅拷贝数组实例。`arrObj`为可迭代的集合对象，`mapFn`为处理每个数组元素的回调函数。

```js
let arr = [1,2,3]
let newArr = Array.from(arr,x=> x+x) // [2,4,6]
```

> 将字符串切割为数组，与`String.split()`功能相同，差异在于不需要`分隔符`

```JS
let str = 'foo'
let strArr = Array.from(str) // ['f','o','o']
```

> 将函数参数`arguments`伪数组转为数组

```JS
function f() {
    return Array.from(arguments)
}
```

> 合并数组并去重

```js
function combine() {
    let arr = [].concat.apply([], arguments)
    return Array.from(new Set(arr))
}
let m = [1,2,3], 
    n = [2,3,4] 
combine(m,n) // [1,2,3,4]
```

## Array.isArray(obj)

> 判断一个对象是否是数组，返回一个布尔值 `Array.prototype`也是数组

```js
Array.isArray([1,2,3]) // true
Array.isArray({foo: 123}) // false
Array.isArray('str') // false

Array.isArray(Array.prototype) // true
...
```

## Array.prototype.concat(arr)

> 合并两个或多个数组，并返回一个新的数组，不改变原数组。如果不传递参数，则会返回一个原数组的浅拷贝

```js
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const arr3 = arr1.concat(arr2) // [1,2,3,4,5,6]

// 合并多个数组
const arr4 = [7,8,9]
const arr5 = arr1.concat(arr2,arr4) // [1,2,3,4,5,6,7,8,9]
```

## Array.prototype.every(fn)

> 测试数组中的所有元素是否通过`fn函数`的测试，全部通过则返回`true`，任意一个不通过则返回`false` 若收到一个空数组，则任何`fn函数`都会返回`true`

```js
const fn = arr => arr < 40
const arr = [1,2,3]
console.log(arr.every(fn)) // true

// 使用箭头函数
arr.every(item => item < 40) // true
```

## Arrya.prototype.filter(fn)

> 测试数组中的所有元素是否通过`fn函数`的测试，并返回一个新数组，包含所有通过`fn函数`测试的元素。如果没有元素通过fn测试，则返回一个空数组

```JS
const arr = [1,2,3,4,5]
const newArr = arr.filter(item => item > 3) // [4,5]

const strArr = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
const res = strArr.filter(item => item.length > 6) // ["exuberant", "destruction", "present"]
```

## Array.prototype.find(fn)

> 返回数组中满足`fn函数`测试的第一个值(若是对象则返回这个对象)，否则返回`undefined`，当找到符合条件的元素后，会立即返回该元素，中断迭代

```js
const arr = [5,10,20,25]
const found = arr.find(item => item > 10) // 20 Number类型

const arrObj = [{value:1},{value:2},{value:3}]
const foundObj = arrObj.find(item => item.value === 3) // {value: 3} Object类型
```

## Array.prototype.findIndex(fn)

> 返回数组中满足`fn函数`测试的第一个值的`index`索引，否则返回`-1`。

```js
const arr = [1,20,30,33]
const foundIndex = arr.findIndex(item => item > 30) // 3

const arrObj = [{value:1},{value:2},{value:3}]
const foundObjIndex = arrObj.find(item => item.value === 3 ) // 2
const foundObjIndex2 = arrObj.find(item => item.value > 3 ) // -1
```

## Array.prototype.flat(depth)

> 按照参数`depth`（指定深度）递归遍历数组，并将所有元素与遍历到的子数组中的元素合并成一个新数组返回。将多维数组转为一维数组or移除数组空项

- `depth`: 指定要提取嵌套数组（二维，三维数组）的结构深度，默认为1

```js
const arr = [1,[2,3],[4,5,[6,7,[8,9]]]]
const newArr = arr.flat(5) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const arr2 = [1,2,,4,5]
const newArr2 = arr2.flat() // [1,2,4,5]
```

- 使用`reduce`与`concat`+`...`替代方案

```js
const arr = [1,2,[3,4]]
arr.reduce((acc,val) => acc.concat(val),[]) // [1,2,3,4]

const flattened = arr => [].concat(...arr)
console.log(flattened(arr)) // [1,2,3,4]
```

## Array.prototype.forEach(fn)

> 对数组的每个元素执行一次`fn`函数，**该方法没有返回值**，**并且会自动跳过空元素**，**无法终止循环迭代**

```JS
let arr = [1,2,3]
arr.forEach(item => console.log(item * 2)) // 2 // 4 // 6
```

## Array.prototype.includes(Any)

> 判断数组中是否包含某一个值，包含则返回`true`，否则返回`false`

```js
const arr = [1,2,3]
console.log(arr.includes(2)) // true
```

## Array.prototype.idnexOf(Any)

> 查找数组中是否包含某一个值，包含则返回该值（第一个符合条件）的索引，否则返回-1

```js
const arr = [1,2,3]
console.log(arr.indexOf(2)) // 1
console.log(arr.indexOf(4)) // -1
```

## Array.prototype.join(separator)

> 将数组中所有的元素拼接成一个字符串（根据`separator 分隔符参数`），并返回这个字符串。如果`数组为空`，则返回`空字符串`。如果元素为`undefined`或`null`也会转换成`空字符串`

```js
                { name: 'name', placeholder: '监控量ID' }
const arr = ['hello','world','!']
const str = arr.join('-') //hello-world-!
const str1 = arr.join('') //helloworld!
```

## Array.prototype.map(fn)

> 返回一个新数组，结果为数组中每个元素调用一次`fn`函数后返回，`map()`不修改原数组，但可以再`fn回调函数`中修改

```JS
const arr = [1,2,3]
const newArr = arr.map(item => item * 2) // [2,4,6]

// 获取String中每个字符串对应的ASCII码
const map = Array.prototype.map
let a = map.call('Hello world', x => x.charCodeAt(0)) // [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
```

## Array.prototype.pop()

> 删除数组中最后一个元素，并返回这个元素的值。此方法改变原数组。`pop`方法根据`length`属性来判断最后一个元素的位置，如果不包含`length`或`length`不为`Number`则会将`length`置为`0`并返回`undefined`

```JS
const arr = [1,2,3]
const pop = arr.pop() // 3
console.log(arr)  // [1,2]
```

## Array.prototype.push(elm)

> 将一个或多个元素添加到数组末尾，并返回数组的新长度

```js
const arr = [1,2,3]
const length = arr.push(4,5,6) // 6
console.log(arr) //[1,2,3,4,5,6]
```

## Array.prototype.reduce(fn)

> `reduce`方法对数组中每个元素执行`fn函数`（升序执行），将最后的结果返回

- [1,2,3].reduce((prev,curr) => prev+ curr) === 1 + 2 + 3  

    1. prev: 第一个元素 
    2. curr：第二个元素

    下一轮循环

    1. prev：第一个元素与第二个元素求得的值
    2. curr：第三个元素

- `fn回调`函数接收`4`个参数

    1. acc - 累计器【累计器回调的值】
    2. cur - 当前值【数组正在处理的元素】
    3. idx - 当前索引【数组正在处理的元素的索引】
    4. src - 源数组【调用reduce的数组】
    5. initialValue - 额外参数，回调开始的初始值，提供初始值则从下标`0`开始，如果不提供则从下标`1`开始，

```js
const sum = [1,2,3,4].reduce((prev,curr) => prev + curr) // 10

/*
    回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。
*/

```

## Array.prototype.reverse()

> 将数组中的元素位置颠倒，并返回该数组，此方法会改变原数组。

```js
const arr = [1,2,3,4]
arr.reverse() // [4,3,2,1]
```

## Array.prototype.shift()

> 将数组中第一个元素删除，并返回该元素，此方法会改变原数组。

```js
const arr = [1,2,3,4]
const shift = arr.shift()
console.log(arr,shift) // [2,3,4] 1 

// 在while循环中使用shift()
let arr = [1,2,3,4]
while((i = arr.shift()) !== undefined) {
    console.log(i,arr) // 1 [2,3,4] -- 2 [3,4] -- 3 [4] -- 4 [] 
}
```

## Array.prototype.slice(begin,end)

> 返回一个新的数组对象，这个对象是由`begin`与`end`觉得的原数组的**浅拷贝**（包括`begin`，不包括`end`），此方法不会改变原数组

```js
const arr = [1,2,3,4,5]
const slice = arr.slice(2) // [3,4,5]
const slice2 = arr.slice(2,4) // [3,4] 不包含下标为4（end）的元素5
```

## Array.prototype.some(fn)

> 测试数组中是否至少有一个元素通过`fn函数`的测试，返回一个布尔值。如果使用空数组进行测试，任何情况下返回的都是`false`，一旦找到符合条件的元素，立刻返回`true`

```js
const arr = [1,2,3,4,5]
const even = arr.some(item => item % 2 === 0)  // true
```

## Array.prototype.sort(fn)

> 根据`fn`函数对数组的元素进行排序，并返回数组。此方法会改变原数组。

```js
// 不传递比较函数的情况下，使用默认比较，将元素转为字符串，然后比较UTF-16代码单元值
const arr = [1, 30, 4, 21, 100000]
arr.sort() //  [1, 100000, 21, 30, 4]

const str = ['b','p','i','t']
str.sort() // ["b", "i", "p", "t"]

// 传入比较函数 a-b 升序 b-a 降序
const arr = [1, 30, 4, 21, 100000]
arr.sort((a,b) => a - b) //  [1, 4, 21, 30, 100000]
```

## Array.prototype.splice(...)

> `splice()`方法通过删除或替换现有元素或者原地添加新的元素来修改数组，**并以数组的形式返回被修改的内容**，此方法会**修改原数组**。

`start`: 指定修改的开始位置，从0开始
`deleteCount`: 要移除的数组元素的个数
`item1`, `item2` ... : 要添加到数组的元素，从start开始，如果不指定，`splice()`将只删除数组元素

- `splice()`的返回值：返回的是被删除的元素组成的数组，如果没有删除则返回一个空数组

```js
const arr = [1,2,3,4,5]
/* 
    1: 从下标为1的元素开始 
    0：删除0个元素
    6：添加的元素
*/
let splice = arr.splice(1,0,6) // []
console.log(arr)  // [1, 6, 2, 3, 4, 5]

/*
    在不指定删除元素个数的情况下，默认从开始元素起，全部删除
    3: 从下标为3的元素开始 ，往后的全部删除
*/
let del = arr.splice(3) //  [3, 4, 5]
console.log(arr)  // [1,6,2]

```

## Array.prototype.toLocaleString()

> 返回一个字符串表示数组中的元素。数组中的元素将使用各自的`toLocaleString()`方法转成字符串。此方法不会改变原数组。

```js
const arr = [1,'a',new Date()]
const localeString = arr.toLocaleString() // 1,a,8/11/2020, 2:29:34 PM
```

## Array.prototype.toString()

> 返回一个字符串，表示其指定的数组及其元素

```js
const arr = [1,2,'a',{value:1},function(){return 1+1},null]
arr.toString() // 1,2,a,[object Object],function(){return 1+1},
```

## Array.prototype.unshift()

> 将一个或者多个元素添加到数组的开头，并返回该数组的新长度。此方法改变原数组。

```js
const arr = [1,2,3]
let len = arr.unshift(0,1,2) // 6
console.log(arr) //[0, 1, 2, 1, 2, 3]

arr.unshift([0,1,2]) // [[0,1,2],1,2,3]

```

## Array.prototype.values()

> 返回一个新的Array Iterator 对象，该对象包含数组每个索引的值

```js
const arr = ['a','b','c']
let val = arr.values() // Array Iterator {}

for (const values of val) {
    console.log(values) // a b c
}

```

## Function.prototype.apply()

> 调用一个具有给定`this`值的函数，以及作为一个数组提供的参数。**`call()`与`apply()`方法类似，区别在于`call()`接受参数列表，而`apply()`接受参数数组**

- 当在没有固定的`thisArg`参数时，传递`null`或`undefined`，`this`则会指向`window`全局对象

    `thisArg`: 必选参数，在函数执行时的`this`指向

    `argsArray`: 可选参数，一个数组或伪数组

```js
const num = [5,6,1,2]
const max = Math.max.apply(null, num) // 6

// 使用apply 合并两个数组
const arr1 = [1,2,3]
const arr2 = ['a','b','c']
// 将this指向为arr1
arr1.push.apply(arr1,arr2) 
console.log(arr1) // [1,2,3,'a','b','c']
```

## Function.prototype.bind()

> `bind()`创建一个新的函数，在`bind()`被调用时，这个新函数的`this`被指向为`band()`的第一个参数，而其余参数作为这个新函数的参数，供调用时使用。注意：**这个新函数不会自动调用，需要再次手动调用**

- thisArg: 调用新函数绑定的this值

- arg1, arg2 ... : 新函数调用时使用的参数

- 返回值：返回一个原函数的拷贝，并拥有指定的this指向和初始参数


```JS
const module = {
    x: 42,
    getX() {
        return this.x
    }
}

const unboundGetX = module.getx
// 此时的unboundGetX调用this指向window
console.log(unboundGetX()) // undefined 

const boundGetX = unboundGetX.bind(module) // 将this指向module
console.log(boundGetX()) // 42

```

## Function.prototype.call()

> `call()`使用一个指定的`this`和单独给出的一个或多个参数来调用一个函数。该方法与`apply()`相似，区别在于`call()`接受一个参数列表，而`apply()`接受一个参数数组

```js
function Product(name, price) {
    this.name = name
    this.price = price
}

function Foo(name, price) {
    // 传入当前this 与参数name price 等同于调用Product(name, price)
    Product.call(this, name, price)
    this.category = 'food'
}

console.log(new Food('cheese', 5).name) // cheese
console.log(new Food('cheese', 5)) // Food {name: "cheese", price: 5, category: "food"}
```

## 纯函数

不可变性，函数不改变接收的参数也不影响外部任何环境

> 纯函数是函数式编程中的核心概念： 

- 1· 函数至少接收一个参数

- 2· 函数至少返回一个值或其他函数

- 3· 函数不应该修改或影响任何传给它的参数

```js
let colorObj = {
    title: 'lawn',
    color: '#0094ff',
    rating: 0
}
// 非纯函数 修改了参数color
function rateColor(color, rating) {
    color.rating = rating
    return color
}
// 纯函数 利用对象拓展浅拷贝了一份color的副本 并返回这个副本
const rateColor = (color, rating) => ({ ...color, rating})
```

## 高阶函数

可以操作其他函数的函数，可以将函数作为参数传递，也可以返回一个函数

- 将其他函数作为参数传递的函数：`Array.map` `Array.filter` `Array.reduce`

```js
// 接收一个布尔与两个函数， 并根据布尔变量执行参数中的函数
const invokeIf = (condition, fnTrue, fnFalse) => condition ? fnTrue() : fnFalse()

const showWelcome = () => console.log('Welcome!')
const showUnauthorized = () => console.log('Unauthorized!')

invokeif(true, showWelcome, showUnauthorized)
invokeif(false, showWelcome, showUnauthorized)
```

## 函数柯里化 

概念：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数，可以一次性调用柯里化函数，也可以每次只传一个参数分多次调用。

> 将函数中某个操作的结果保留，直到其余部分后续也完成后可以一并提供的机制。通过在一个函数中返回另一个函数实现。

```js

const userLogs = userName => message => console.log(`${userName} -> ${message}`)

const log = userlog('grandpa23')

log('attempted to load 20 fake members')
```

```js

var add = fucntion(x) {
    return function(y) {
        return x + y
    }
}

// 第一次调用 add函数返回的函数指针保存在新的变量中
var increment = add(1)
var addTem = add(10)

// 第二次调用
increment(1) // 2
addTem(2) // 12




```

## 递归

> 函数本身调用自己，递归必须有出口（停止判断）

```js
const countdown = value => {
    console.log(value)
    // 如果value大于0 ， 调用countdown 并传入value -1
    return value > 0 ? countdown(value -1 ) : value
}
countdown(10)
```