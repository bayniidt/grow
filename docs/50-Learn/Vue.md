
# Vue

## 基础
**多看文档，每看一次就进步一次**

官方文档 [传送门](https://cn.vuejs.org/v2/guide/)

自己写的脑图 [传送门](https://www.processon.com/mindmap/5e5f837ce4b097b727507936)

> 熟记 `生命周期`，`watch`，`computed`，`filter`，`v-xxx指令`，`事件修饰符` 等等  



## watch

- 业务场景：在多层Tabs嵌套时，每当Tabs切换就渲染不同的组件、不同的数据表格，这时就可以使用watch来监听Tabs切换时的ID变化，根据ID变化来请求不同的数据。


>   `immediate`: 即使监视的对象`id`没有变化也会触发回调函数`handler` 
>
>   `deep`：深度监听，监听的是一个对象，即使是对象中深层嵌套的数据发生变化也会触发回调处理
>   
>   `handler(newVla,oldVla)`：新值：`newVal` 旧值：`oldVla` 根据业务逻辑来对比处理
 

```js {4,5}
  watch: {
    // id变化 说明tabs被切换了
    id: {
      immediate: true,
      deep: true
      handler(newVla,oldVla) {
          // 监听id发生变化的回调函数，处理事件请求新数据
      }
    }
```


## computed

## 组件传值

1. 父传子 `v-bind:` +  `props`

  ```js
  // 父组件引用子组件，在子组件标签上使用:属性绑定
  <son :data='data'>

  // 子组件使用props接收父组件传递的数据，注意props与data评级，在页面中通过this.data引用，注意数据不可重复命名
  props: ['data'],
  // 上下两种写法都可以
  props: {
    type: Array,  // 指定数据类型
    default: [],  // 默认值
    required: true  // 是否毕传
  }
  ```

2. 父传子 `$ref` + `$refs` 引用

  ```js
  // 子组件标签上添加ref属性
  <son ref='son'>

  // 父组件通过$refs获取子组件引用可以直接调用子组件数据与方法，但是官方不建议这么使用
  this.$refs.son.$parent === this  // true
  ```

3. 父子引用 `$parent` `$children`
    
  ```js
  // 父组件通过$children可以获取子组件实例
  this.$children // 返回一个数组

  // 子组件通过$parent可以获取父组件实例
  this.$parent.data... 
  ```

4. 发布订阅通信 `$emit` + `@eventName`

  ```js
  // 子组件派发事件，父组件监听事件，当派发事件触发时传递数据并且执行父组件监听回调
  <input @change='sonEvent'>

  methods: {
    sonEvent(data){
      this.$emit('inputChange',data)
    }
  }

  // 父组件监听事件并且处理事件传递的数据
  <son @inputChange='inputChange'>

  methods: {
    inputChange(data) {
      this.data = data
    }
  }
  ```
## 自定义指令

## 插槽

## 动态组件

## 混入