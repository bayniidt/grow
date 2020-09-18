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

> 组件文件的后缀名，可以是js，也可以是jsx，例如vue的 App.vue ，在React中，一切都是由组件来组成，一个项目中有可能有成千上万个组件，根据高内聚低耦合的思想，将功能组件化
组件可分为：
1. 根据组件定义方式：函数式组件(Functional Component)， 类组件(Class Component)
2. 根据组件内部是否有状态需要维护：无状态组件(Stateless Component)，有状态组件(Stateful Component)
3. 根据组件不同的职责： 展示型组件(Presentational Component)，容器型组件(Container Component)
    
    - 函数组件、无状态组件、展示型组件主要关注「UI的展示」
    - 类组件、有状态组件、容器型组件主要关注「数据逻辑」

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

- 函数式组件
函数式组件没有生命周期,函数式组件主要关注UI的展示

```js
function Components(prps) {
    return (
        <div>
            {props.data}
        <div>
    )
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

`shouldComponentUpdate`: 
参数1为新的props，参数2为新的state。可以根据这两个参数来判断返回的状态，来确定子组件是否随着父组件的更新而更新

```js
shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.num === this.props.num) {
            return false
        }
        return true
    }
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


##  react-router

安装命令：`npm ireact-router-dom --save`

路由的作用：
    单页面应用（SPA），路由跳转：切换视图显示

```js
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            /*
            所有需要路由跳转的页面最外层由 <Router /> 对象包裹
            path：路由跳转路径
            component：路由跳转组件
            注意： 最外层Router有r 里层Route没r
            */
            <Router>
                <Route path='/home' component={Home} />
                <Route path='/mine' component={Mine} />
            </Router>
        </div>
    );
}
```

> `BrowserRouter` & `HashRouter`

```js
// HashRouter: 使用锚点链接形式，一般情况下会自动转换为a标签。地址栏会带#号
// BrowserRouter：使用H5新特性， history.push 上线后需要后台做重定向，否则会有404BUG
import { HashRouter as Router, Route, Link } from 'react-router-dom'
```

> `Link`

```js
import React, { Component } from 'react'
import {  Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        // 要跳转的地址
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/mine'>Mine</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
```

> `exact` & `strict`

exact: 路径精准匹配，地址不匹配则不渲染

strict: 路径严格匹配，末尾添加斜杠不允许匹配

以上两个属性同时使用 否则strict不生效

```js
function App() {
    return (
        <div className="App">
            <Router>
                <Nav />
                <Route path='/home' component={Home} />
                <Route exact strict path='/mine' component={Mine} />
                <Route path='/mine/ucenter' component={UCenter} />
            </Router>
        </div>
    );
}
```

> `Switch` 匹配唯一一个页面，404页面时需要

```js
function App() {
    return (
        <div className="App">
            <Router>
                <Nav />
                // 使用Switch包裹住需要匹配的页面
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route exact strict path='/mine' component={Mine} />
                    <Route path='/mine/ucenter' component={UCenter} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}
```

> 路由跳转携带参数

1. 通过在路由地址后添加:(参数名)的方式传递，并且在组件中使用`props.match.params.参数名`接收

```js
// APP
function App() {
    return (
        <div className="App">
            <Router>
                    // 参数名后添加?号代表参数可有可无
                    <Route path='/mine/ucenter/:id?' component={UCenter} />
            </Router>
        </div>
    );
}

// UCenter
const UCenter = (props) => {
    console.log(props)
    return ( 
        <div>
            Hello UCenter : 
            <p> id: {props.match.params.id}</p>
        </div>
    )
}
```

2. 使用`new URLSearchParams(props.location.search)`读取地址栏参数

```js
// URL为：http://localhost:3000/mine/name=iwen&age=20
const Mine = (props) => {

    const params = new URLSearchParams(props.location.search)
    console.log(params.get('name'));

    return (
        <div>
            Mine
            <p>name - {params.get('name')}</p>
            <p>age - {params.get('age')}</p>
        </div>
    )
}



```

3. 使用`querystring.parse`

```js
import querystring from 'querystring'
// URL: http://localhost:3000/mine?name=iwn&age=20
const Mine = (props) => {
    const params = querystring.parse(props.location.search)
    // 注意第一个参数前的问号?
    console.log(params['?name']);
    return (
        <div>
            Mine 
        </div>
    )
}
```

> 重定向 `<Redirect from='/hellomine' to='/mine' />` 只要输入hellomine都会跳转到mine

重定向的作用：登陆判断或权限判断

```js
function App() {
    return (
        <div className="App">
            <Router>
                    <Redirect from='/hellomine' to='/mine' />
                    <Route exact strict path='/mine' component={Mine} />
            </Router>
        </div>
    );
}
```

> `props.history.push('/')` 跳转指定路由

history对象中的方法：

- `push()` : 叠加，可以后退
- `go()`  
- `goBack()` 
- `replace()`： 退换，不可后退

```JS 
const Mine = (props) => {

    const handlerClick = () => {
        props.history.push('/home')
    }

    return (
        <div>
            Mine
            <button onClick={handlerClick}>black</button> 
        </div>
    )
}
```

> `Prompt`：类似于离开弹框提示是否确定要离开

```js
class Shop extends Component {
    state = {
        name: ''
    }
    render() {
        return (
            <div>
                // when属性只支持布尔值类型数据，所以使用双感叹号获取布尔值
                <Prompt when={!!this.state.name} message={'确定离开？'}/>
                <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
            </div>
        );
    }
}
```

## Redux

- React中的数据传递： props，回传时间，共同的父元素或子元素中间传递。在多个文件需要互相传递数据时，就可以使用Redux来管理传递的数据（状态）。与vuex功能相似

安装命令： `npm i --save-dev redux`

> 创建Store:  `createStore`

```js
import { createStore } from 'redux'
// 引入reducer （修改state的唯一方法）
import reducer from './reducers/counter'

// 创建仓库
const store = createStore(reducer)


const render = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App
                {/* 传递事件dispatch类型 */}
                onIncrement={() => store.dispatch({ type: 'INC' })}
                onDecrement={() => store.dispatch({ type: 'DEC' })}
                {/* 获取数据 并传到子组件 */}
                value={store.getState()}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// 首次渲染DOM
render()

// 监听数据变化
store.subscribe(render)
```

> `Action` 
Action是把数据从应用传到store的唯一来源，本质上是一个js对象，再action内必须使用一个字符串类型的type属性来表示将要执行的动作。

```JS
// 这是一个基本的action num为Action创建函数接收的参数，type为即将要执行的动作
{
    type: "INC",
    num
}

// 这是一个基本的Action创建函数，它将一个基本的action作为结果返回，一般情况下只需要将改函数传递给store.dispatch即可
function INC(num) {
    return {
        type: "INC",
        num
    }
}
```

> `Reducer`
Reducer指定了应用状态的变化如何响应actions并发送到store的，actions只是描述了有事情发生了这个事实，并没有描述应用如何更新state。

reducer就是一个纯函数，接收旧的state和action，并返回新的state。**注意：**保持reducer函数的纯净，不允许修改传入的参数，API请求，路由跳转，调用非纯函数等操作

**state:是只读的，唯一改变state的方法就是触发action，action是一个用于描述已经发生事件的普通对象**

```js
// 接受两个参数，根据action的type来进行判断，并把最新的state返回
const reducer = (state = 0, action) => {
    switch (action.type) {
        case actions.INC:
            return state + action.num
        case actions.DEC:
            return state - action.num
        default:
            return state
    }

}
```


> `npm --save-dev react-redux` 将react与redux关联

- `Provider` & `connect`
store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下你会使用 react-redux 提供的 connect() 帮助器来调用

```js
// index.js
import { Provider } from 'react-redux'
ReactDOM.render(
    <React.StrictMode>
        // 使用Provider包裹组件
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')

)

// App.js
import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="App">
                <p>{this.props.value}</p>
                <button >increment</button>
                <button >decrement</button>
            </div>
        );
    }
}
// 状态处理方法
const mapStateToProps = state => {
    return {
        counter: state
    }
}
// 使用connect将状态处理函数与App组件关联
export default connect(mapStateToProps)(App)
```

> `bindActionCreators` 
把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。

```js
// 引入所有的dispatch
import * as counterActions from './actions/counter'
// 引入bindActionCreators
import { bindActionCreators } from 'redux'

class App extends React.Component {
    render() {

        console.log(this.props)
        // 打印结果 { counter: 0, increment: ƒ, decrement: ƒ }

        return (
            <div className="App">
                <p>{this.props.counter}</p>
                <button onClick={() => this.props.counterActions.increment()}>increment</button>
                <button onClick={() => this.props.counterActions.decrement()}>decrement</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state
    }
}


const mapDispatchToProps = dispatch => {
    return {
        // 将所有的dispatch与组件连接？
        counterActions: bindActionCreators(counterActions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

> `combineReducers` 
合并reducer









## Fragment
类似与Vue的template，在结构中不会渲染，只做容器用
```js
import React, { Component, Fragment } from 'react';

class Demo1 extends Component {
    render() {
        return (
            <Fragment>
                <li>Hello</li>
                <li>Hello</li>
            </Fragment>
        );
    }
}

class Demo extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Demo1 />
                </ul>
            </div>
        );
    }
}

export default Demo;
```

## 高阶组件
1. 高阶组件必须是一个函数
2. 参数是一个组件
3. 返回值也是一个组件

```js
import React from 'react'

// Components形参为一个组件
// 该函数返回一个组件 可以在这个函数中做各种业务处理
const withFetch = Components => {
    return class extends React.Component {
        render() {
            return (
                /* 展开props */
                <Components { ...this.props}/>
            )
        }
    }
}

// 这里的高阶组件意义：  让MyData在被渲染之前经过withFetch的一层处理，再进行渲染
class MyData extends React.Component {
    render() {
        return (
            <div>
                MyData: { this.props.data}
            </div>
        )
    }
}

// WithFetch 为 经过withFetch处理过返回的组件
const WithFetch = withFetch(MyData)

export default class Demo3 extends React.Component {
    render() {
        return (
            <div>
                <WithFetch data={'Hello WithFetch'} />
            </div>
        )
    }
}
```

高阶组件实际应用： 提高代码复用性

- 两个相似的组件，只有API请求的URL不同和渲染数据不同，就可以使用高阶组件来提出重复代码

<img :src="$withBase('/image/react-components.png')">

```js
// withFetch.jsx
import React, { Component } from 'react';
// 注意这里的函数写法，2个箭头函数
const withFetch = url => View => {
    return class extends Component {
        constructor() {
            super()
            // 状态
            this.state = {
                loading: true,
                data: null
            }
        }

        // 处理API网络请求
        componentDidMount() {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        loading: false,
                        data
                    })
                })
        }

        render() {
            // 渲染页面
            if (this.state.loading) {
                return ( 
                    <div>loading...</div>
                )
            }
            return (
                <View data={ this.state.data } />
            )
        }
    }

}

export default withFetch
```

```js
// NewBanenr.jsx
import withFetch from '../weithFetch'

const NewBanenr = withFetch('http://iwenwiki.com/api/blueberrypai/getIndexBanner.php')(props => {
    return (
        <div>
            <ul>
                {
                    props.data.banner.map((item, index) => {
                        return (
                            <li key={index} >
                                {item.title}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
})

export default NewBanenr

// NewChengpin.jsx
import weithFetch from '../weithFetch'

const NewChengpin = weithFetch('http://iwenwiki.com/api/blueberrypai/getChengpinInfo.php')(props => {
    return (
        <div>
            <ul>
                {
                    props.data.chengpinInfo.map((item, index) => {
                        return (
                            <li key={index}>
                                {item.title}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
})

export default NewChengpin
```

## Hook

hook: 钩子 。在react函数式组件中，无法使用state、生命周期等功能，hook提供了这些功能，并且让组件之间复用状态逻辑变得更加容易，也不用再去编写难懂的class类组件，生命周期函数，让组件编写与复用变得更容易。

### `useState`

创建一个state状态，并赋予初始值，react在更新时会保留这个state，并且会返回一个与this.setState函数功能一致的更新操作函数

```js
import React, { useState } from 'react'

function Example() {
    /*
        使用数组解构，将调用useState函数返回的值解构出来，传递的参数为state初始值
    **/
    const [count,setCount] = useState(0)

    return (
        <div>
            {/* 点击事件触发调用setCount函数并更改count的值 */}
            <button onClick={() => setCount(count + 1)}>CLICKME</button>
        </div>
    )
}
```

### `useEffect`

useEffect === componentDidMount、componentDidUpdate、componentWillUnMount 

react将这三个生命周期函数合并成一个useEffect Hook ，可以在useEffect中发送API网络请求或者进行DOM更新等等操作，也可以清除事件监听、定时器等等。 **React会在每次寻然后调用useEffect传入的函数**

- useEffect 参数1：更新后执行的函数（可以是API网络请求 或者 DOM操作）

    - 如果在参数1的函数中返回的也是一个函数，那么这个函数相当于在componentWillUnMount生命周期时执行的销毁函数（关闭定时器、取消事件监听等等）

- useEffect 参数2： `[stateName]` 监听指定的state，当该state发生变化时才会重新更新useEffect Hook

```js
import React, { useState, useEffect } from 'react'
function Example() {
    const [count, setCount] = useState(0) // 初始化state
    const [money, setMoney] = useState(0)
    // 等同于 componentDidMount + componentDidUpdate
    useEffect(()=>{
        // 更新浏览器title
        document.title = `You clicked ${count} times`
        
        // 组件销毁时调用，重置count
        return () => {
            setCount(0)
        }
    })

    // 与useState一样 可以多次重复使用，将不同的业务逻辑代码抽离，不用将他们写在同一个生命周期函数中
    useEffect(()=>{
        console.log(money)
        // 参数2为state监听，当指定的state发生变化时，才会重新更新useEffect Hook
    },[money])


}

```






##

##

##

##

##

##