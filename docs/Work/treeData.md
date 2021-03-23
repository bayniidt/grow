# 树形数据处理

> 业务场景：树形数据下，根据所有子节点中的设备树，给每个父节点添加上设备总数与在线数

<img :src="$withBase('/image/tree.png')">

```JSON
//数据结构
[
    {
        "id":0,
        "position":null,
        "children":[
            {
                "id":1,
                "createdBy":"admin",
                "createdTime":"2021-03-09 13:13:36",
                "updatedBy":null,
                "updatedTime":null,
                "tenantId":1000,
                "areaCode":"AR000000000000000180",
                "areaName":"总降（中心站）(6/6)",
                "_level":2,
                "children":[
                    {
                        "_level":3,
                        "children":[
                            {
                                "deviceCode":"DV000000000000001271",
                                "deviceCategory":"DT00010001",
                                "proper":{
                                    "position":"{"plan":{"lng":113.002388,"lat":22.000647}}",
                                    "icon":""
                                },
                                "streamType":0,
                                "_level":4
                            },

                ],
                "camearsNum":{
                    "count":0,
                    "online":0
                }
            }
        ],
        "_level":1,
        "camearsNum":{
            "count":10,
            "online":10
        }
    },
    {
        "position":null,
        "children":[
            {
                "id":190,
                "_level":2
            },
            {
                "id":191,
                "_level":2
            },
            {
                "id":192,
                "_level":2
            }
        ],
        "_level":1,
        "camearsNum":{
            "count":0,
            "online":0
        }
    }
]
```

处理函数

```js
/*
    获取摄像头数量
    data：数据数组，包括起始数组与children数组
    parentNode：父节点引用
*/
function getCameraCount(data, parentNode = {}) {
    var camearsNum = undefined

    for (let i = 0; i < data.length; i++) {
        //如果当前项存在children，说明不是设备节点，递归调用getCameraCount，传递当前children数组与当前项
        if (data[i].children) {
            //初始化每一项的camearsNum对象
            data[i].camearsNum = { count: 0, online: 0 }
            camearsNum = getCameraCount(data[i].children, data[i])
        }
        //如果当前项不存在children，说明是设备节点，调用handlerCameraNum处理设备数量
        else {
            //获得摄像头计数，保存到父节点
            camearsNum = parentNode.camearsNum = handlerCameraNum(data)

            //如果父节点存在父节点 调用handlerParentCount，传递源数据areaCameras
            //parentNode.parentAreaCode 父节点id
            //camearsNum 当前摄像头计数
            if(parentNode.parentAreaCode) {
                handlerParentCount(areaCameras, parentNode.parentAreaCode, camearsNum)
            }

            //这里reutrn是因为只需要处理一次摄像头计数即可 ，结束本次循环
            return
        }
    }

    return camearsNum
}


/*
    handlerCameraNum：处理摄像头计数
    cameras: 摄像头数组
    return：camearsNum ，将当前children数组中的摄像头总数与在线树统计并返回

*/
function handlerCameraNum(cameras) {
    var camearsNum = { count: 0, online: 0 }
    cameras.forEach(camera => {
        if (camera.proper) {
            camearsNum.count += 1
            camearsNum.online += 1
        }
    })

    return camearsNum
}


/*
    handlerParentCount: 处理父节点计数
    sourceData：数据源
    parentCode: 父节点id
    counts：摄像头计数
*/
function handlerParentCount(sourceData, parentCode, counts) {
    sourceData.forEach(item => {
        if (item.areaCode === parentCode && item.camearsNum) {
            item.camearsNum.count += counts.count
            item.camearsNum.online += counts.online

            //如果父节点还存在父节点，递归调用 handlerParentCount
            if (item.parentAreaCode) handlerParentCount(areaCameras, item.parentAreaCode, counts)
        }
        //如果存在chindren，并且当前节点无法匹配，递归调用 handlerParentCount
        else if (item.children) {
            handlerParentCount(item.children, parentCode, counts)
        }
    })
}




```