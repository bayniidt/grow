# 在递归中进行Ajax请求，并进行对应处理

> 业务场景：门禁人员授权，批量选择人员[100]个，此时如果发送100个人员id数组接口会超时。把id数组用splice进行切割，
  每次请求1个或N个，并进行loading蒙版提示（0/100）授权成功状态

```js

//1.进行人员过滤， 过滤掉为绑定员工卡的人员，否则发送请求时后台会报错
    computed: {
        list () {
            let ret = []
            if (this.dataList.length) {
                //过滤未绑卡的人员 否则后台会报错
                ret = this.dataList.filter(item => {
                    //这里处理的是已经授权过的人员不可选中
                    if (item.cardNumber && item.entranceGuardAuth) {
                        item.btnShowCon = {
                            addAuth: !item.entranceGuardAuth,
                        }
                    }
                    return item.cardNumber
                })
            }
            this.total = ret.length
            return ret 
        }
    },

//2.点击提交按钮时调用sendAdd函数，并传递id数组与接口参数

async sendAdd(arr, params) {
    //深拷贝id数组与参数对象，否则引用关系会互相影响
    let ids = JSON.parse(JSON.stringify(arr))
    let par = JSON.parse(JSON.stringify(params))

    //切割id数组，保存到参数对象中
    par.personnelIds = ids.splice(0, 1)

    //发送API请求
    //finally：无论promise状态成功或失败都会执行【接口超时或其他报错，不影响后续人员授权操作】
    await entranceAuthAdd(par).finally(() => {
        if(this.timer) clearTimeout(this.timer)

        //如果id数组中还有人员 递归调用sendAdd函数
        if(ids.length > 0) {
            this.sendDone++
            this.timer = setTimeout(() => {
                this.sendAdd(ids, par)
            }, 500)
        }else if(ids.length === 0){
            console.log('请求发送完了，关闭弹窗刷新页面');
            this.$message.success('操作成功')

            this.loading = false
            this.$emit('refresh')
            this.visible = false
            //重置发送完成计数
            this.sendDone = 0
        }
    })
},

```