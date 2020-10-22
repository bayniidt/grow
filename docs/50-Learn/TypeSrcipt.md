### TypeSrcipt

> 为什么要使用TS 【在ts中 ：冒号后的代码都是类型声明，与代码逻辑无关】

1. 程序更容易理解

    - 函数或者方法输入输入的参数类型，外部条件等。
    - 动态语言的约束： 手动调试

2. 效率更高

    - 在不同的代码块之间进行跳转
    - IDE的代码补全

3. 错误更少

    - 编译期间能够发现大部分错误

4. 包容性强

    - 完全兼容JS
    - 第三方库单独编写类型文件

## 类型

> `undefined`与`null`是所有类型的`子类型`，可以直接赋值

```js
// boolean
let isDone: boolean = true

// number
let age: number = 20
let binnaryNamber: number = 0b1111

// string
let name: string = '张三'

// undefined
let u: undefined = undefined

// null
let n: null = null

let num: number = undefined // 合法

// any 未知类型->支持所有类型 可以任意调用属性/方法，尽量不适用any
let notSure: any = 4
    notSure = 'str'
    notSure = true

    notSure.myName
    notSure.getName()

// | 联合类型
let numOrStr: number | string = 123
    numOrStr = 'str'

// [] 数组指定类型
let arrOfNumbers: number[] = [1,2,3] // 合法
    arrOfNumbers.push('a') // 不合法
let arrOfString: string[] = ['a', 1, 'b'] // 不合法

// 元组: 限制数组中的数据类型，不可增加or减少元素
let user: [string, number] = ['str', 123]

```

## Assertion类型断言

> 类型断言（Type Assertion）可以用来手动指定一个值的类型。

```js

function getLength(input: string | number) : number {
    // const str = input as String
    // if(str.length) return str.length
    // const number = input as Number
    // return number.toString().length

    // return <boolean>input  // 不合法 联合类型中没有boolean类型

    if((<string>input).length) {
        return (<string>input).length
    }else {
        return input.toString().length
    }
}



```

## type 类型别名

> 类型别名用来给一个类型起个新名字

```js
type PlusType = (x: number, y: number) => number
function sum(x: number, y: number) number {
    return x + y
}
const sum2: PlusType = sum

// 联合类型，如果是字符串则直接返回，如果是函数则使用该函数的返回值作为返回值
type NameResolver = () => string
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver ): string {
    if(typeof n === 'string') return n
    return n()
}


// type与class的方式作用相同，区别在于类中要使用；结束
type Lady = { name: string, age: number }
class Lady { name: string; age: number}


const women :Lady[] = [{name: '新垣结衣', age: 28}]
```

## declare 环境声明

>declare ：环境声明允许你安全的使用现有的 JavaScript 库，并且能让你的 JavaScript、CoffeeScript 或者其他需要编译成 JavaScript 的语言逐步迁移至 TypeScript。

声明代码可以放入`.ts` 或者`.d.ts`后缀文件中
```js
// jQuery('#foo') // ts中无法识别

declere var jQuery: (selector: string) => any
```

## Interface 接口

> 更关注某个对象如何进行使用，而不是关注这个对象本身

1. 对对象的形状（shape）进行描述
2. 对类（class）进行抽象
3. Duck Typing（鸭子类型）：如果走路像鸭子、叫声像鸭子，就可以是一个鸭子
4. 对object形状进行约束，可以描述类，函数，数组等等...

```js
/*
    命名规则：首字母大写，react中要求加I IPerson，表明这是一个interface类型
    ; 变量后面加的是分号，不是逗号
    ? 可选属性
    readonly 只读
*/
interface Person {
    readonly id: number;
    name: string;
    age?: number;  // 这是一个可选属性【可有可无】
}

let person: Person = {
    id: 10,
    num: 'wiki',
    age: 20
    //gender: 'male'  // 不合法，接口未定义
}

person.id = 20 // 不合法，不允许重复赋值，id是只读属性
```

## implements 实现

> implements: 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性

```js
interface Radio {
    // void : 无返回
    switchRadio(triggerL?: boolean): void;
}

interface Battery {
    checkBatteryStatus()
}

// 接口继承 
interface RadioWithBattery extends Radio {
    checkBatteryStatus()
}

// 当两个类必须具有相同的方法时，就可以使用interface来约定必须具有的方法或属性
class Car implements Radio {
    // 必须有switchRadio这个方法
    switchRadio() {}
}

class Cellphone implements RadioWithBattery {
    // 必须有switchRadio这个方法
    switchRadio() {}
    checkBatteryStatus() {}
}
```

## Enum 枚举

> 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```js
enum Direction {Up, Down, Left, Right}
console.log(Direction.Up) // 0
console.log(Direction[0]) // Up

// 设置初始索引，后面的自增
enum Direction {Up = 10, Down, Left, Right}

// 字符串比较
enum Direction { Up = 'Up', Down = 'Down', Left = 'Left', Right = 'Right' }
const value = 'Up'
console.log(value === Direction.Up) // true

// 常量枚举 【提升性能，减少编译后的JS代码】
const enum Direction { Up = 'Up', Down = 'Down', Left = 'Left', Right = 'Right' }
```

## Generics 泛型

> 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

```js
// 传入什么类型，返回的就算什么类型
function echo<T>(arg: T): T {
    return arg
}
const res = echo(123)
const res2: string = echo(true)  // 不合法

// 类似一个占位符， 在使用的时候将传递进来的参数类型返回
function swap<T, U>(tuple: [T, U]): [T, u] {
    return [tuple[0], tuple[1]]
}
const res3 = swap(['str', 123])
```

> 泛型约束: 约束函数只允许传入包含`length`属性的参数

```js
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
// 只能传入array 传入string则报错
const arrs = echoWithArr([1, 2, 3])


interface IWithLength { length: number }
// 使用extends继承了IWithLength接口的约束条件
function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}
const str = echoWithLength('str') // 合法 string
const obj = echoWithLength({length: 10}) // 合法 object
const arr = echoWithLength([1, 2, 3]) // 合法 array
```

> 泛型在类中的使用

```js
class Queue<T> {
    private data = []
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T {
        return this.data.shift()
    }
}

const queue = new Queue<number>()
queue.push(1)
// queue.push('str')
console.log(queue.pop().toFixed()) // 合法
// console.log(queue.pop().toFixed()) // 报错， string类型没有toFixed方法

const queue2 = new Queue<string>()
queue2.push('str')
console.log(queue2.pop()) // 合法

interface KeyPair<T, U> {
    key: T;
    value: U;
}

let kp1: KeyPair<number, string> = { key: 12, value: 'str'}
let kp2: KeyPair<string, number> = { key: 'str', value: 12}

let arr2: Array<number> = [1, 2, 3]
let arr: number[] = [1, 2, 3]


interface IPlus<T> { (a: T, b:T) :T }
function plus(a: number, b:number): number {
    return a + b
}
// 使用泛型定义函数类型
const a: IPlus<number> = plus // const a: (a: number, b: number) => number
```

## function

> 对函数的输入（形参）输出（结果）进行约定

```js
/* 
    第三个number约定的是返回值
    ? 可选形参 【注意： 可选参数只允许放在形参最后】
    = 默认参数
*/
function increase(x: number, y: number, z: number = 10): number {
   if(typeof z === 'number') {
       return x + y + z
   }
   return x + y
}

let res = increase(1, 2)

// 函数表达式也需要声明类型
// 这里有ts的类型推断，会自动给increase2自动推断参数类型
const increase2 = function(x: number, y: number, z: number = 10): number {
   if(typeof z === 'number') {
       return x + y + z
   }
   return x + y
}

// 声明参数与返回值 【注意】 ：=> 这里不是es6的箭头函数 而是ts中的函数返回值声明
const add: (x: number, y: number, z?: number) => number = increase2
```

## class

1. class： 定义了一切事物的抽象特点
2. object： class类的实例，通过new关键字实例化
3. 面向对象三大特性： 封装、继承、多态

```js
class Animal {
    name: string;
    // 静态属性 ： 只在当前类中使用的属性被称作静态属性，并且它是可以被子类继承的
    static categoies: string[] = ['mammal', 'bird']
    // 静态方法: 不需要实例化，直接通过类来调用
    static isAnimal(params) {
        return params instanceof Animal
    }

    constructor(name: string) {
        this.name = name
    }

    run() {
        return `${this.name} is rinning`
    }
}

const snake = new Animal('lily')
console.log(snake.run()) // lily is rinning
console.log(Animal.isAnimal(snake)) // true

// 继承
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}

const ami = new Dog('ami')
console.log(ami.bark())  // ami is braking

// 方法重写
class Cat extends Animal {
    constructor(name) {
        super(name) // 重写构造函数 必须在子类的构造函数中调用super调用父类的方法
    }

    run() {
        return 'Meow,' + super.run()
    }
}

const tom = new Cat('tom')
console.log(tom.run()) // Meow, tom is running 
```

### `public` 公用 ： 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public的

```js
class Animal {
    // public 公共属性修饰符
    public name: string;
    constructor(name: string) {
        this.name = name
    }
}

const snake = new Animal('lily')
console.log(snake.name) // lily
snake.name = 'lucy'  // 允许修改
console.log(snake.name) // lucy
```

### `private` 私有：修饰的属性或方法是私有的，不能在声明它的类的外部访问，子类也无法访问

```js
class Animal {
    // private 私有属性修饰符
    private name: string;
    constructor(name: string) {
        this.name = name
    }
}

const snake = new Animal('lily')
console.log(snake.name) // 不允许访问 ， 报错
snake.name = 'lucy'  // 不允许修改， 报错
```

### `protected` 保护：修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

```js
class Animal {
    // protected 保护属性修饰符
    protected name: string;
    constructor(name: string) {
        this.name = name
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name)
        console.log(this.name) // 允许访问父类的保护属性
    }
}
```

### `readonly` 只读: 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。注意：【如果readonly与public或其他修饰符同时存在，readonly必须在最后】

```js
class Animal {
    // readonly 只读属性修饰符
    protected name: string;
    constructor(name: string) {
        this.name = name
    }
}

const snake = new Animal('lily')
console.log(snake.name) // lily 允许访问
snake.name = 'lucy' // 不合法，只读属性不允许修改
```




## vodi 函数无返回，函数体中有任意的return都会报错

```js
const sayHi = () => :void {
    console.log('只执行函数体内容，没有返回值，否则报错')
}
```

## never 函数执行错误，无法跳出该函数，永远死循环

```js
const errFn () => :never {
    new Error()
    console.log('永远不会执行到这一句代码')
}
````

## 函数参数为一个对象的类型推断

```js

const add = ({one, two}: {one: number, two: number}) => one + two   

const res = add({one: 1, two: 2})  // 正确
const res = add({one: '1', two: 2}) // 错误

````

##

##

##