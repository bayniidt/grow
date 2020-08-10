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
const arr = ['hello','world','!']
const str = arr.join('-') //hello-world-!
const str1 = arr.join('') //helloworld!
```