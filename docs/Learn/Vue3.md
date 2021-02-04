### Vue3.0

## setup()

> setup最主要的作用是将代码逻辑抽离，不同的数据处理可以单独放在不同的函数中，不用再watch ，data，method中上下横跳


```html
<template>
    <div>
        {{count}}---{{dbCount}}---{{msg}}

        <p ref='pTag'><p>
    </div>
</template>
```

```js
import { reactive, computed, onMounted, ref, toRefs, watch } from 'vue'
/**
* reactive 类似react hook中的useState
* computed 计算属性
* onMounted setup中最早的生命钩子
* ref 添加单个响应式数据, 获取指定的DOM元素，初始值为null
* toRefs 将reactive中的响应式数据对象展开， 在模板中使用时就不用再加上data.xxx
* watch 监听某个值的变化，如果已经使用toRefs展开则直接监听，否则需要传入回调函数
*/
setup() {
    // const data = reactive({
    //     counter: 1,
    //     dbCounter: compouted(() => data.couter * 2)
    // })

    // let timer

    // // setup中最早的生命钩子
    // onMounted(() => {
    //     setInterval(() => {
    //         data.counter ++
    //     }, 1000)
    // })

    // const data = useCount()
    const { count, dbCount } = useCount()

    // 获取DOM引用
    const pTag = ref(null)

    watch(count, (value, oldValue) => {
        let p = pTag.value
        p.textContent = `新值-${value}  老值-${oldValue}`
    })  

    return { count, dbCount, pTag }
}

// 抽离count相关逻辑
function useCount() {
    const data = reactive({
        counter: 1,
        dbCounter: compouted(() => data.couter * 2)
    })

    let timer

    // setup中最早的生命钩子
    onMounted(() => {
        setInterval(() => {
            data.counter ++
        }, 1000)
    })

    return toRefs(data)
}
```

## teleport 内置组件

> 将某个组件内部的DOM元素挂载到这个组件之外。例如点击弹框，点击后弹框挂载到body下并展示

```html
<template>
    <div>
        <!-- body为挂载的dom元素 -->
        <teleport to='body'>
            <div>弹框内容</div>
        </teleport>
    <div>
</template>
```

## 自定义渲染器 custom renderer

##

##

##

##

##