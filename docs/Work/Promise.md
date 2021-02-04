# 异步请求数据返回时机不一致出现闪屏现象解决

关于在map中进行api请求，导致页面渲染出现闪屏现象的处理方法

1. 每个api请求进行.then处理之后，都会返回一个promise，即使没有对这个promise进行任何处理

2. 数组map方法的返回值是根据处理函数中的return来决定的，所以可以将.then之后的promise作为map方法的返回值

3. 多层map嵌套返回的是一个多维数组，可以使用.falt()进行数组降维。因为Promise.all只会处理一维数组

4. Promsie.all接收的是一个包含一个或多个的promise数组，当数组中的所有promise状态为成功时才会往下执行，当所有promise执行完毕就是api请求完毕的时机，这时可以进行赋值

```js
// 获取所有聊天内容
getAlarmTrendsAll() {
    alarmTrendsAll({ alarmId: this.alarmId }).then((alarmData) => {
        alarmData.sort(compare("id"));

        let promises =  alarmData.map((item) => {
            if (item.fileIds) {
                // 添加响应式属性 fileName，fileUrl
                this.$set(item, "fileName", []);
                this.$set(item, "fileUrl", []);

                // 将多个id的字符串转成数组
                let fileIdsArr = item.fileIds.split(",");

                // 根据id数组中的每个id获取文件名与文件url
                return fileIdsArr.map((ids, index) => {
                    
                    return getAdjunctName({ ids }).then((fileName) => {

                        item.fileName.push(fileName);
                        item.fileUrl.push(getPicture(ids));
                    })
                        
                })

                
            }
        });

        console.log(promises.flat(),'promises');
        
        Promise.all(promises.flat()).then((res) => {
            this.handlerTrends = alarmData
        });
    });
},
```