# UEditor富文本编辑器与嵌入秀米

>需求：添加评论内容时使用UEditor富文本编辑器，然后在编辑器中嵌入秀米，通过在秀米处理图片上传到服务器并且在UEditor中显示

[秀米官方示例](https://xiumi.us/connect/ue/)

## UEditor的安装步骤

1. [到UEditor官网下载需要的版本](http://ueditor.baidu.com/website/download.html)

    > 注意：这里要根据使用的语言下载正确的版本，我是使用`Vue-cli3`开发，下载的是`PHP`版本

    ```js
    - PHP版本: JS
    - ASP版本：C#
    - JSP版本：JAVA
    ```

    <img :src="$withBase('/image/UEditor-03.png')">

2. 将下载好的压缩包解压，复制一份到 `public` 文件夹，注意这个文件夹与`src`平级

    <img :src="$withBase('/image/UEditor-01.png')">

3. 安装`vue-ueditor-wrap `
    
    ```js
    // 安装这个依赖是为了使用vue的双向绑定v-model快速获取UEditor编辑器里的内容
    npm i vue-ueditor-wrap
    ```

4. 导入，注册，使用 `vue-ueditor-wrap`

    > `UEditor`上的功能非常丰富，具体要根据产品需求，并且`上传图片`、`视频`等功能需要`后端大佬`配合

    ```js{11,13}
    import VueUeditorWrap from "vue-ueditor-wrap"; // 导入

    components: {
        VueUeditorWrap // 注册
    },
    
    // 使用 content：双向绑定 myConfig：配置选项
    <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>

   
    // UEDITOR_HOME_URL: "/UEditor/" 这一行代码非常重要，UEditor的资源路径
    myConfig: {
            UEDITOR_HOME_URL: "/UEditor/", // 你的UEditor资源存放的路径,相对于打包后的index.html
            serverUrl: `http://localhost:8000/`, // 上传功能的后端服务器接口地址
            autoHeightEnabled: true, // 编辑器是否自动被内容撑高
            autoFloatEnabled: false, // 工具栏是否可以浮动
            initialFrameHeight: 340, // 初始容器高度
            initialFrameWidth: "100%", // 初始容器高度
            enableAutoSave: true // 关闭自动保存
        },

    ```

    **经过上面👆配置好之后就可以在页面上看到富文本编辑器了，接下来把秀米嵌入进去**

    <img :src="$withBase('/image/UEditor-02.png')">

## 嵌入秀米

1. 第一步先下载秀米的资源文件`点击下方链接右键另存为即可`

    [HTML文件](http://xiumi.us/connect/ue/xiumi-ue-dialog-v5.html)

    [JS文件](http://hgs.xiumi.us/uedit/dialogs/internal.js)

2. 下载html与js文件下来之后，将这两个文件保存到UEditor的根目录下

    <img :src="$withBase('/image/UEditor-04.png')">

3. 修改 `ueditor.config.js` 文件中的`section:['class', 'style']`,

    <img :src="$withBase('/image/UEditor-05.png')">

    > 按照步骤修改之后在UEditor编辑器上还看不到秀米的按钮，接下来是很重要一步

4. 引入`UEditor`与秀米的资源文件到使用的`.vue`页面文件中(引入到使用的要使用编辑器的组件)

    ```js
    /* 
        这里的路径太长了，可以在vue.config.js里自行添加路径
        类似@符代表src文件夹，还要注意引入路径
        还要注意引入顺序
    */
    // ueditor
    import '../../../../../../public/UEditor/ueditor.config'
    import '../../../../../../public/UEditor/ueditor.all.js'
    import '../../../../../../public/UEditor/lang/zh-cn/zh-cn.js'
    // import '@/static/UEditor/ueditor.parse.min.js' //注释的这条没什么意义，但是不注释会报错

    // 秀米
    import "../../../../../plugin/xiumi/xiumi-ue-dialog-v5.js";
    import "../../../../../plugin/xiumi/xiumi-ue-v5.css";

    ```

    > 接下来就可以看到按钮并且弹窗可以弹出秀米的界面了，如果可以弹出界面但是访问不到秀米，找到`xiumi-ue-dialog-v5.js`文件中的`iframeUrl`

    ```js
    // 修改为xiumi-ue-dialog-v5.html的相对路径： 
    // 保存在UEditor编辑器里的xiumi-ue-dialog-v5.html文件路径
    iframeUrl: '../xxx/xxx/xiumi-ue-dialog-v5.html',
    ```

## 配置UEditor，秀米上传图片功能

> 做到这一步的时候还无法将图片上传到服务器，如果需要这个功能的话【找后端配合写服务器的请求接口】，当在秀米中处理好图片，点勾子按钮时会自动将图片发送到指定的服务器保存

<img :src="$withBase('/image/UEditor-06.png')">

### 开始配置UEditor

1. 在使用`UEditor`的`test.vue`文件的`data`中 配置`myCofig`

    ```js
    // UEdiotr v-model绑定的是传递给服务器的数据 :config="myConfig"为编辑器配置
    <vue-ueditor-wrap v-model="contentFormData.content" :config="myConfig"></vue-ueditor-wrap>
    
     myConfig: {
        // 编辑器是否自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 380,
        // 初始容器高度
        initialFrameWidth: "100%",
        // 上传功能的后端服务器接口地址
        serverUrl: `${server.BASE_URL}Ueditor/doAction`,
        // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
        // 这里对应的是不同环境的不同路径地址
        UEDITOR_HOME_URL:
          process.env.NODE_ENV == "development"
            ? "/xxx/dist/ueditor/"
            : "/ueditor/"
      }

    ```

2. 在`test.vue`文件中引入`UEditor`与`秀米`相关的`JS`与`CSS`文件【_p为`public`文件夹】，注意引入顺序

    ```js
     // ueditor
    import "_p/ueditor/ueditor.config";
    import "_p/ueditor/ueditor.all.js";
    import "_p/ueditor/lang/zh-cn/zh-cn.js";
    // 秀米
    import "_p/xiumi/xiumi-ue-v5.css";
    import "_p/xiumi/xiumi-ue-dialog-v5.js";

    ```

3. 在`public`文件夹中找到`ueditor.config.js`

    ```js
    //替换section选项 具体是为了让UEditor不影响秀米的排版 改为 ：
    section:['class', 'style'], 

    // 设置远程图片是否抓取到本地保存
    catchRemoteImageEnable: true, 
    ```
4. 走到这一步基本上功能应该可以使用了，如果还是无法正常展示可以尝试下面的方法

    ```js
    //找到 xiumi-ue-dialog-v5.html  文件 修改第五行中的路径
    <script type="text/javascript" src="./internal.js"></script>
    ```
5. 如果当UEditor编辑器获得焦点时出现很多报错，那有可能是webpack打包引起的问题，可以尝试使用.bebal 过滤的方法解决

## 总结
- 遇到的问题：

    1. 秀米处理后的图片不适配UEditor编辑器，不适配移动端

    ```js
    // 样式问题 ，具体怎么解决的记不住了...
    ```
    2. 图片上传、视频上传、超链接功能

    ```js
    // 需要后端大佬配合出接口， 配置 myConfig 中的 serverUrl
    myConfig: {
        serverUrl: `${server.BASE_URL}Ueditor/doAction`,
    }
    ```
    3. UEditor编辑器使用HTML源码模式的字数限制

    ```js
    // 配置ueditor.config.js 中的 maximumWords
    maximumWords: 999999999
    ```
    4. UEditor静态资源路径

     ```js
    // 根据当前环境，配置 myconfig 中的 UEDITOR_HOME_URL
    myConfig: {
        // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
        UEDITOR_HOME_URL:
          process.env.NODE_ENV !== "development"
            ? "/wanpai_h5_package/dist/ueditor/"
            : "/ueditor/"
    }
    ```

