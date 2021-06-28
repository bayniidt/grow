### ES6

### class

### `constructor` 方法

- 一个类中，必须有一个`constructor`方法，如果没有定义，则会默认添加一个空的`constructor`

- `constructor`方法默认返回实例对象(`this`)

- 类不存在变量提升

## `class`类的实例

> 与ES5一样，实例的属性除非显示的定义在原型(`this`)上，否则都是定义在原型(`class`)上。
与ES5一样，类的所有实例共享一个原型对象

```js
// ES5
function Point(x, y) {
    this.x = x 
    this.y =y
}

Point.prototype.toString = function() {
    return x + y
}

// ES6 
// constructor : 构造方法
// this : 实例对象
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {
        return x + y
    }
}

let b = new Point(1, 2)
let c = new Point(3, 4)
b.__proto__ === c.__proto__ // true
```

## `class`中添加多个方法，使用`Object.assign`

```js
// 因为class中的方法都是定义在prototype对象上，所以可以使用Object.assign进行方法合并
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y

    }


    res() {
        return this.x + this.y
    }
}

function cut() {
    return this.x - this.y
}

function div() {
    return this.x / this.y
}

Object.assign(Point.prototype, {
    cut,
    div
})

const point = new Point(6, 3)
console.log(point.res()) // 9
console.log(point.cut()) // 3
console.log(point.div()) // 2
```

## 取值函数(`getter`)和存值函数(`setter`)

> 类似`Object.defineProperty`的get/set

```js
class MyClass { 
    constructor(){
        //
    }
    get prop() {
        return 'getter'
    }
    set prop(value) {
        console.log('setter' + value)
    }
}

let inst = new MyCalss()
inst.prop = 123 // 'setter 123'
inst.prop // 'getter'
```

## `this`指向

> 类的方法内部如果含有`this`，它默认指向类的实例，但是如果将这个方法单独抽离则会指向当前执行这个方法的环境

```js
class Logger {
    printName( name = 'there') {
        this.print(`Hello ${name}`)
    }

    print(text) {
        console.log(text)
    }
}

let logger = new Logger()
const { printName } = logger
// this指向undefined 所以找不到print方法 报错
printName() // TypeError: Cannot read property 'print' of undefined

// 解决办法
// 1. 在构造方法中绑定this
class Logger {
    constructor() {
        this.printName = this.printName.bind(this)
    }
}

// 2. 使用箭头函数
class Logger {
    constructor() {
        this.printName = () => this
    }
}

```

## `static` 静态方法

> 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上`static`关键字，就表示该方法不会被实例继承，而是通过类直接调用，这就称之为 “静态方法”。

```js
class Foo {
    static classMethod() {
        return 'Hello'
    }
}

Foo.classMethod() // 'Hello'

let foo = new Foo()
foo.classMethod() // TypeError: foo.classMethod is not a function
```

> 如果静态方法中包含`this`，那么`this`指向的是这个类而不是实例

```js
class Foo {
    static bar() {
        this.baz()
    }
    // 类中的静态方法baz
    static baz() {
        console.log('Hello')
    }
    // 实例中的方法baz
    baz() {
        console.log('world')
    }
}

Foo.bar() // 'Hello'
```

> 父类的静态方法可以被子类继承

```js
class Foo {
    static calssMethod() {
        return 'Hello'
    }
}

class Bar extends Foo {
    //
}

Bar.calssMethod() // 'Hello'

/*
    静态方法也可以通过super对象调用
*/

class Bar extends Foo {
    static calssMethod() {
        return super.classMethod() + 'too'
    }
}

Bar.classMethod() // 'Hello too'
```

## 实例属性的新写法(这种写法的好处是所有的实例对象属性都定义在类的头部，一眼就能看出这个类有哪些实例属性)

```js
class Person {
    constructor() {
        this.type = 'human'
    }
    get value() {
        return this.type
    }
}

// 可以将实例属性定义在类的最顶层
class Person {
    type = 'human'
    get value() {
        return this.type
    }
}
```

## `extends` 继承

> 被继承的为【父类】，继承父类的为【子类】，如果子类中存在与父类相同的方法，则不会继承父类的方法

```js
class Father {
    constructor(name) {
        this.name = name
    }
    sayName() {
        console.log(this.name + 'father')
    }
}

class Son extends Father {
    // 不写constructor 引擎会自动生成一个空的constructor

    // 不会继承father类的sanName方法 
    sayName() {
        console.log(this.name + 'son')
    }
}

```

## `super`

`super`关键字用来访问父类的`constructor`或者其他方法使用。子类使用构造器时必须使用`super`关键字来拓展构造器。
如果子类覆盖了父类同名的方法，使用`super`关键字同样可以调用父类的方法，可以理解为`super`即为父类的一个实例对象

> 注意：`super`虽然代表了`Father`类的构造函数，但是在`Son`类中返回的是子类`Son`的实例，所以`super`内部的`this`指向的是`Son`，因此`super()`在这里相当于`Father.prototype.constructor.call(this)`

```js
class Father {
    constructor(name) {
        this.name = name
    }
    sayHi() {
        console.log('Hi,' + this.name)
    }
}

class Son extends Father {
    constructor(name, age, sex) {
        // 这里使用super 拿到了this
        // Father.prototype.constructor.call(this)
        super(name)
        // 拓展了两个变量 age sex
        this.age = age
        this.sex = sex
    }

    sayHi() {
        // 调用父类的sayHi方法
        super.sayHi()
        console.log('age' + this.age )
        console.log('sex' + this.sex )
        console.log('name' + this.name )
    }
}

const son = new Son('son',16,'man')
```

## 私有属性#

在类中封装某些内部细节，只暴露需要暴露的接口，减少耦合，就可以使用私有属性，这些属性只能在类的范围内读取/更改。外部不能直接读取/更改

```js
class User {
    #name;

    constructor(name) {
        this.#name = name
    }

    getName() {
        return this.#name
    }
}

const user = new User('张三')
user.getName() // 张三
user.#name  // 报错
```

## promise

> promise是什么？
  
  promise是一种编程模式，解决了js单线程无法进行多任务处理的难题与回调地狱

- promise的三种状态

    1. pending[待定]：初始状态，既没有被兑现，也没有被拒绝
    2. fulfilled[已兑现]：异步操作(API请求或其他)操作成功完成
    3. rejected[已拒绝]: 异步操作(API请求或其他)操作失败

    > 需要注意的是pending初始状态一旦往下执行后，只有成功or失败，并且执行后的状态不会再进行改变
    并且`.then`或者`.catch`都会返回一个新的promise，所以可以进行链式调用

    ```js
    /**
     * .then的两个参数必须是function，否则会被忽略，并且只调用一次，.then返回一个新的promsie
     * resolve：成功回调函数 
     * reject：失败回调函数
    **//
    Promise.prototype.then((resolve, reject) => { ...})

    //此处只传递了第一个参数resolve 成功回调
    ajax(...).then(res => {
        data = res
    })

    //.catch接收的是.reject失败处理函数
    ajax(...).catch(e => {
        console.log(e, "promise失败")
    })

    //链式调用
    ajax('请求最新的图片url').then('处理图片url拼接处理').then('讲处理好的图片再次上传服务器')
    ```

> promise的常用API

  1. Promise.all ：**该方法返回一个新的promise，需要所有的异步请求(Promise)执行成功后才会触发成功，一旦任意一个失败都会触发失败**
  2. Promise.any ：**接收一个promise集合，当其中任意一个成功后触发，就返回成功的那个值**
  3. Promise.reject ：**返回一个状态为失败的Promise对象**
  4. Promise.resolve ：**返回一个状态为成功的Promise对象**
  5. Promise.catch ：**接收Promise的错误结果，并进行处理**
  6. Promise.then ：**获取Promise的结果，并进行对应的处理**




## async awiat

## 箭头函数

## 解构赋值

## 展开运算符

## set

## map

## symbol

## proxy

