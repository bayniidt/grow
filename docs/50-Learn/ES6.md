### ES6

## class类

### `constructor` 方法

- 一个类中，必须有一个`constructor`方法，如果没有定义，则会默认添加一个空的`constructor`

- `constructor`方法默认返回实例对象(`this`)

- 类不存在变量提升

### `class`类的实例

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

### `class`中添加多个方法

```js
// 因为class中的方法都是定义在prototype对象上，所以可以使用Object.assign进行方法合并
class Point {
    constructor() { 
        //
    }
}

Object.assign(Point.prototype, {
    toString(){},
    toValue(){}
})
```

### 取值函数(`getter`)和存值函数(`setter`)

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

### `this`指向

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

### `static` 静态方法

> 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上`static`关键字，就表示该方法不会被实例继承，而是通过类直接调用，这就称之为 “静态方法”。

如果静态方法中包含`this`，那么`this`指向的是这个类而不是实例
父类的静态方法可以被子类继承

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