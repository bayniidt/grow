# 高德地图setLabel，继承使用DataV边框组件，无法渲染Datav边框

业务描述：使用高德地图点位弹框功能， 在产生告警的设备点位，弹出告警框

1. 使用extend继承告警内容组件（该组件中使用DataV的边框组件）

2. 使用$mount获取被继承的告警内容组件的$el HTML模板字符串

3. 将HTML模板字符串放入高德API setLabel的content中进行渲染

    - 此时出现问题： **extend继承的组件没有挂载到DOM上，导致DataV边框组件的SVG无法获取宽高，渲染不出指定的边框**

```js

// 1. 
this.getAlarmLabel(alarm) //获取告警弹框样式 传参包括{proper}
this.setLabel(alarm) //{marker,content}


// 2.
getAlarmLabel(alarmItem) {
    let alarmBox = this.getAlarmDetail(alarmItem),
        content = alarmBox.$el.innerHTML
    alarmItem.content = content
    window.clearMarker = this.clearMarker
}


// 3.
getAlarmDetail (alarm) {
    const alarmDetail = this.createAlarmDetail()
    alarmDetail.data = alarm.proper
    alarmDetail.marker = alarm.marker

    /**
     *  这一步并没有挂载到DOM上 只是生成了$el的HTML模板字符串，
     *  所以clinetWidth与clintHeight这两个属性就无法获取宽高
     *  svg的宽高也就为0
     *  解决办法： 挂载到某个DOM上 
     */
    return alarmDetail.$mount()
},

// 4.
createAlarmDetail () {
    const alarmDetail = Vue.extend(Alarm)
    return new alarmDetail()
},


```


解决方法1：

> 使用中间组件进行挂载，先在中间组件挂载DataV边框，再继承中间组件，最后将继承的中间组件放入高德setLabel中执行渲染

```vue
// 中间组件alarm
<template>
    <div>
        // 注意这里的id
        <div :id='comId'></div>
    </div>
</template>

<script>

import alarmContent from "./alarm-content";
import Vue from "vue";
export default {
    props: {
        data: {},
        marker: {},
    },
    methods: {
        getData() {
            return this.marker;
        },
        getAlarmDom() {
            this.$nextTick(()=> {

                // 获取alarmContent组件（该组件才是弹框内容）模板
                let alarmDOM = Vue.extend(alarmContent)
                let dom = new alarmDOM()

                // 将data向下传递，弹框内容所需渲染数据
                dom.data = this.data

                // 提前挂载到中间组件的div中
                dom.$mount(document.getElementById(this.comId))
            })
        }
    },
    created(){
        // 使用vue组件的唯一ID作为div的ID
        this.comId = this._uid
    },    
    mounted() {
        this.getAlarmDom()
    },
};
</script>

```