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

### `class`中添加多个方法，使用`Object.assign`

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

### 实例属性的新写法(这种写法的好处是所有的实例对象属性都定义在类的头部，一眼就能看出这个类有哪些实例属性)

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

### `extends` 继承

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

### `super`

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