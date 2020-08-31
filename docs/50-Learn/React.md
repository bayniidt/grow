### React

> react与vue相同，都是数据驱动视图，react适用于大型项目，vue适用于小型项目

## JSX 

**JSX：JS + XML**类似于html标签的语法，作用于js中直接写html代码，具有js代码的全部能力，可以在jsx代码中插入变量或者表达式，用jsx语法写出来的语句是一个对象，可以存在一个变量中，然后作为render函数的第一个参数传入， **最终的目的是为了封装组件**

- JSX对象是一个普通的JS对象，又称之为React元素。它是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)，一旦被创建，就无法更改它的子元素或者属性，一个元素就像电影的单帧，代表了某个特定时刻的UI

```js
/*
    注意：
        1·最外层只有一个标签，可以使用小括号()包裹，也可以不用
        2·插入变量或表达式，使用{}单大括号
*/
let el = (
    
    let sTr = 'Hello world'
    let num = 10
    function fn(num) {
        return num++
    }

    <div>
        {/* jsx中的注释 */}
        <h1>jsx</h1>
        {/* 插入表达式 */}
        <h2>{ num++ }</h2>
        {/* 插入函数调用 */}
        <div>{ fn(num) }</div>
        {/* js方法反转字符串 */}
        <p>{ sTr.split('').reverse().join('') }</p>
    </div>
)
```


`ReactDOM.render` 渲染页面

```js
    /* 
        ReactDOM: react的内置对象
        render: 接收两个参数，
            参数1: 一个jsx对象，或者是一个组件 参数2:获取元素要插入的容器
            作用就是将写好的jsx对象放到DOM容器中
     */
    ReactDOM.render(jsx, document.getElementById('root'))
```

> JSX的优点

```js
1. JSX执行更快，编译为JS代码是进行优化（虚拟DOM，DIFF算法）
2. 类型安全，编译出错就不能编译，及时发现错误
3. JSX编写模板更简单便捷
4. 由HTML元素构成，可以快速插入JS变量/表达式
5. ReactDOM.render有2个参数，第一个是需要渲染的JSX对象，第二个参数是JSX挂载的跟DOM对象

注意：
1. JSX必须有根节点
2. 正常的普通HTML元素要小写，如果是大写，会默认为组件
3. HTML的样式类名要写className ，因为class在js中是关键词
4. img标签的src值不用加引号
```

## 组件

组件文件的后缀名，可以是js，也可以是jsx，例如vue的 App.vue ，在React中，一切都是由组件来组成，一个项目中有可能有成千上万个组件，根据高内聚低耦合的思想，将功能组件化

- `class` 类组件

继承`React.Component` , 渲染`render(){}` 

```js
class App extends React.Component { 
    //
}
```

- Props属性

组件复用性，Props用来传递数据， 与Vue的父子传值Props类似
Props不可以被修改，遵循数据单向流思想。

```JS
// 父组件
class App extends React.Component {
    render() {
        cosnt navList = ['JS','JAVA','C++','NODEJS']
        const date = ['周一','周二','周三','周四']
        return (
            <div>
                <MyNav navList={navList} title='课程' />
                <MyNav navList={date} title='日期' />
            </div>
        )
    }
}
// 子组件
class MyNav extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <ul>
                    { this.props.navList.map((ele,i) => <li key={i}>{ele}</li>)}
                <ul>
            </div>
        )
    }
}
```

## state

组件中的状态：state ， 不再操作DOM，页面元素的改变使用state进行处理

```js
class StateCom extends React.Component {
    constructor(props) {
        super(props)
        // state状态： 类似Vue的data
        this.state = {
            count: 10
        }
    }

    increment() {
        this.setState({
            count: this.state.count += 1
        })
    }
    // 箭头函数this自动绑定为外层上下文
    decremen =()=> {
        this.setState({
            count: this.state.count -= 1
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                {/* 此处的this为绑定当前class*/}
                <button onClick={this.increment.bind(this)}>+</button>
                {/* 使用箭头函数不需要绑定this*/}
                <button onClick={this.decrement.bind(this)}>-</button>
            <div>
        )
    }
}
```

## 生命周期函数

> 在组件被渲染完毕之前调用setState方法不会启动更新生命周期。在组件渲染完成之后调用setState方法就会启动更新生命周期。
<img :src="$withBase('/image/react-life.png')">

```js 
函数列表：
    componentWillMount: 在组件渲染之前执行    
    componentDidMount: 在组件渲染之后执行
    shouldComponentUpdate: 返回true/false，true代表允许改变，false代表不允许改变
    componentWillUpdate：数据改变之前执行
    componentDidUpdate：数据修改完成
    componentWillReveiceProps：props发生改变之前执行
    componentWillUnmount：组件卸载之前执行

数据传递：
    父传子：在子组件标签名直接以属性方式传递，子组件使用props接收
    子传父：调用父组件的回调函数
```

## setState

1. setState会引起视图重绘
2. 在可控的情况下是异步，在非可控的情况下是同步的

```js
export default class SetStateDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    increment = () => {
        this.setState({ count: this.state.count + 1})
        // 此处打印是异步的
        console.log(this.state.count)

        this.setState({count: this.state.count +1},
        // 此处打印是同步的
        ()=>console.log(this.state.count))

        this.setStateAsync({ count: this.state.count + 1 })
        // 此处打印是同步的
        console.log(this.state.count)
    }

    // 使用Promise封装setState为同步执行函数, 配合async await
    setStateAsync = (state) => new Promise(resolve) => this.setState(state,resolve))

    render() {
        return (
            <div>
                setState同步还是异步？
                <p>{ this.state.count}</p>
                <button onClick={this.increment}>修改</button>
            </div>
        )
    }
}
```

## 条件渲染

常用的应用场景：
1. 对视图条件进行切换（登陆界面切换）
2. 做缺省值（ajax请求没有数据返回时渲染的结果）

```js
export default class IfDemo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }

    handlerLogin = () => this.setState({ isLogin: !this.state.isLogin })

    render() {
        const { isLogin } = this.state
        const login = <h1>已登录</h1>
        const logOut = <h1>未登录</h1>

        return (
            <div>
                {isLogin ? login : logOut}
                <button onClick={this.handlerLogin}>{isLogin ? '登出' : '登陆'}</button>
            </div>
        )
    }
}
```

## 列表渲染

主要问题是Key, 与Vue的v-for相同，key增加虚拟DOM的对比，提高DIFF算法的性能

```js
export default class KeyDemo extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [
                { name: 'Joe', age: 20, job: 'milkMan' },
                { name: 'Emi', age: 18, job: 'teacher' },
                { name: 'jony', age: 30, job: 'dustWoman' },
            ]
        }
    }

    handlAddPerson = () => {
        const person = { name:'Swit', age: 22, job: 'engineer'}
        this.setState({
            list: this.state.list.concat(person)
        })
    }

    render() {
        const { list } = this.state
        return (
            <div>
                <ul>
                    {list.map((item, i) => {
                        return (
                            <li key={i}>
                                <span>name: {item.name}</span>
                                <br />
                                <span>age: {item.age}</span> 
                                <br />
                                <span>job: {item.job}</span> 
                            </li>
                        )
                    })}
                </ul>
                <button onClick={this.handlAddPerson}>AddPerson</button>
            </div>
        )
    }
}
```

## 表单

1. 受控组件：表单中的value值通过state管理
    - 每个表单都需要绑定指定的change事件，在少量表单的情况下可以使用受控组件
2. 非受控组件：表单中的value值通过操作DOM的方式处理，不通过state管理
    - 如果同事需要多个表单，例如input select ... 可以使用非受控组件处理，要了解非受控组件，需要先了解Refs与DOM

```js
// 受控组件
export default class FormDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange = e => this.setState({ value: e.target.value })
    
    hanldeSubmit = e => {
        e.preventDefault()
        console.log(this.state.value);
    }
    render() {
        return (
            <div>
                {/* form表单中的onSubmit事件要写在form标签上*/}
                {/* 阻止默认提交跳转事件也在onSubmit处理函数中显式阻止 */}
                <form action="" onSubmit={this.hanldeSubmit}>
                    <input type="type" value={this.state.value} onChange={this.handleChange}/>-
                    <input type="submit" value='submit'/>
                </form>
            </div>
        )
    }
}
```

## Refs & DOM

> React.createRef对象创建一个ref对象

- Ref使用场景：
    1. 管理焦点，文本选择或媒体播放
    2. 触发强制动画
    3. 集成第三方 DOM 库
```js
// ref使用方式
export default class RefAndDomDemo extends React.Component {
    constructor() {
        super()
        // 调用createRef函数创建一个Ref对象
        this.RefDiv = React.createRef()
    }
    // DOM渲染完成
    componentDidMount = () => {
        /*
           绑定ref之前：{current: null}
           绑定ref之后：{current: div}
           current指向为当前绑定的DOM节点
        */
        console.log(this.RefDiv);
        // 通过current可以直接进行DOM节点操作
        this.RefDiv.current.style.color = 'red'
    }
    render() {
        return (
            <div ref={this.RefDiv}>
                Ref And DOM
            </div>
        )
    }
}
```

```js
// 非受控组件
export default class RefFormDemo extends React.Component {
    constructor() {
        super()
        // 通过ref的形式可以直接获取指定的表单value，而不用每个表单都添加onchange事件，并且value不由state管理
        this.userName = React.createRef()
        this.password = React.createRef()
    }

    handleClick = () => {
        console.log(this.userName.current.value);
        console.log(this.password.current.value);
    }

    render() {
        return (
            <div>
                非受控组件
                <br /><br />
                <input type="text" ref={this.userName} />
                <br /><br />
                <input type="password" ref={this.password} />
                <br /><br />
                <button onClick={ this.handleClick}>submit</button>
            </div>
        )
    }
}
```





## 状态提升

> 组件之间的数据交互，将多个子组件交互的状态提升到父组件，再通过父组件传值的方式传递到子组件中

```js

```


##

##