
# Vue

## 基础
**多看文档，每看一次就进步一次**

官方文档 [传送门](https://cn.vuejs.org/v2/guide/)

自己写的脑图 [传送门](https://www.processon.com/mindmap/5e5f837ce4b097b727507936)

> 熟记 `生命周期`，`watch`，`computed`，`filter`，`v-xxx指令`，`事件修饰符` 等等  



## watch

- 应用场景：在多层Tabs嵌套时，每当Tabs切换就渲染不同的组件、不同的数据表格，这时就可以使用watch来监听Tabs切换时的ID变化，根据ID变化来请求不同的数据。


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

  ```js
  building ing ...
  ```

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

4. 子父事件通信 `$emit` + `@eventName`

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

5. 事件总线 `$bus` 

  ```js
  // 注意要将bus.js文件导出与引入
  // 导入vue 在vue的原型上再实例化一个vue
  import Vue from 'vue'
  Vue.prototype.$bus = new Vue()

  // 使用$bus派发事件与传递数据
  $bus.$emit('eventName',data)

  // 使用$bus监听事件与接收数据
  $bus.$on('eventName',({data}) =>{ '事件处理'...})
  ```

## 自定义指令

  ```js
  building ing ...
  ```

## 插槽 `slot`

> 应用场景：在构建可复用组件时，往往预想不到未来的业务需求如何变更，这时候就可以使用`slot`插槽，给未来可能需要做的事保留一个位置，即便这件事未来没有发生也不影响。
>
> 简单来说：挖一个坑，等着东西往里填

  ```HTML
  <!-- 例如：多个表共用的添加按钮，根据不同的表，渲染不同的按钮文本 【添加一级】【添加二级】 ... -->
  <!-- 添加name属性为具名插槽 ，插槽内有内容为默认内容，如果插槽未激活则显示默认内容 -->
  <!-- user.name变量为button组件中的原始变量 -->
  <button type='add'>
    <slot name='addBtn'>
      添加一级{{user.name}} 
    </slot>
  </button>

  <!-- 使用 -->
  <!-- # 为缩写，必须为具名插槽，也推荐使用具名插槽，提高代码阅读性 ，注意 # 缩写语法必须有name属性时才可以使用-->
  <add-button>
    <template #addBtn>
      添加二级
    </template>
  </add-button>
  ```
> 作用域插槽 

  ```HTML
  <add-button>
    <!-- 此时想在父组件中通过插槽直接修改<add-button>子组件中的数据是无法修改的，因为此时的作用域为父级组件，无法访问到{{user}}变量 -->
    <template #addBtn>
      添加二级{{user.age}}
    </template>
  </add-button>

  <!-- 想要实现上面的效果，我们可以这样写：在预留插槽位置的时候将数据传递到父作用，类似于props传值 :user='user' -->
  <button type='add'>
    <slot  :user='user' name='addBtn'>
       添加一级{{user.name}}
    <slot>
  </button>

  <!-- 使用 -->
  <!-- 注意：{user}使用的是解构赋值，本质上传递的是一个对象 -->
  <add-button>
    <template  #addBtn='{user}'>
      添加二级{{user.age}}
    </template>
  </add-button>

  ```

## 动态组件

> 应用场景：Tabs切换，不同的tabs代表不同的数据，这时就可以使用`动态组件 :is`配合`keep-alive`
> 注意：`components` 为一个对象， 当 `:is='pic_banner'` 时 ，实际上是执行了 `() => import("./components/pic_banner")` 导入`pic_banner`组件

  ```HTML
  <!-- 被keep-alive包裹的组件不会被销毁，而是会被缓存，当重复切换tabs时就不会重复的渲染 -->
    <keep-alive>
      <component :is='current'></component>
    </keep-alive>
  ```

  ```js
  // 上方的 is 为vue的保留字 ，个人理解为 是否:   [是否:组件A] [是否:组件B] 根据current的值来渲染对应的组件
  // 配合ES6语法 导入组件
  components: {
    pic_banner: ,
    txt_banner: () => import("./components/txt_banner")
  },
  data (){
    return {
      current: '',  // 可以设置默认组件 也可以不设置，一般情况下是根据tabs的id或类型来赋值切换
    }
  }

  // 在 watch 或 methods 中监听id 根据id变化来渲染pic_banenr 还是txt_banenr
  watch: {
    id: {
      this.current = id === 3 ? 'pic_banner' : 'txt_banner'
    }
  }

  ```

## 混入`mixin`

> 将通用的属性(分页的page，total等等)，方法(切换分页，切换分页数据显示数量等等)，抽离成一个单独的JS文件，在需要复用的组件中直接混入。混入的最主要作用是：提高代码/组件的复用性

**无论是`data`，`methods`，`生命周期钩子`都可以进行混入操作。注意：数据与方法出现命名冲突以组件中为准，生命周期钩子都会执行**

```js
// page.js 暴露
export default {
  data() {
    return {
      page: 1,
      total: 0,
    }
  },
  methods: {
    handlerPageChange(page) {
      this.page = page
    }
  }
}
```

```js{6}
// 在组件中使用混入
// 导入
import pageMixins from './page.js'

// 混入，注意mixins与data平级
mixins: [pageMixins]

```

> 应用场景：获取七牛云token 。 将获取七牛云token的方法混入到全局`created`中，这样就不用每次都重写了
  ```js
  // 1. 创建一个混入对象 mixinQN.js
  import getQiniu from '@/api/data.js'
  export const qiniuToken = {
    async created() {
      let { data } = await getQiniu()
      this.qiniuToken = data.token
    }
  }

  // 2. 使用混入对象 qiniuToken  组件会自动执行混入的created生命周期钩子， 如果命名冲突由组件的优先执行
  //    执行created钩子后， 会自动将token保存到data中的qiniuToken
  import { qiniuToken } from 'mixinQn.js'
  export default {
    mixins:[qiniuToken],
    data() {
      return {
        qiniuToken: ''
      }
    }
  }

  ```


## 函数式组件

123123