### React

> react与vue相同，都是数据驱动视图，react适用于大型项目，vue适用于小型项目

#### Day01： JSX **最终的目的是为了封装组件**

> 类似于html标签的语法，作用于js中直接写html代码，具有js代码的全部能力，可以在jsx代码中插入变量或者表达式，用jsx语法写出来的语句是一个对象，可以存在一个变量中，然后作为render函数的第一个参数传入

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


`ReactDOM.render`

```js
    /* 
        ReactDOM: react的内置对象
        render: 接收两个参数，
            参数1: 一个jsx对象，或者是一个组件 参数2: 作为显示内容的容器
            作用就是将写好的jsx对象放到DOM容器中
     */
    ReactDOM.render(jsx, document.getElementById('root'))
```