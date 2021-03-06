### Webpack
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## Day01：webpack基本概念

- webpack是什么？

    - 前端资源构建工具（css/js/html/image 等等 ）

    >由于浏览器不识别less与ES6或更高级的语法，我们需要使用工具帮我转化为浏览器可以识别的代码，这样一来每个工具都要独自维护，非常不便，所以使用一个大工具包裹所有的小工具，这样一来就只需要维护大工具（webpack）即可

    <img :src="$withBase('/image/webpack-01.png')">


    - 静态模块打包器（module bundler ）

    > 入口文件往往引入了很多文件，经过打包压缩后可以减少资源加载时间提高性能

    <img :src="$withBase('/image/webpack-02.png')">


## Day02：webpack初体验与五个核心概念

> 在未使用对应的loader时，wenpack只能识别JS代码与JSON代码

- webpack安装指令

    ```js
    npm i webpack webpack-cli -g  //全局安装
    npm i webpack webpack-cli -D  //项目安装
    ```

- webpack基本运行指令

    ```js
    webpack ./scr/index.js -o ./build/index.js --mode=development
    webpack ./scr/index.js -o ./build/index.js --mode=production

    /*
        ./scr/index.js -o [指定打包入口]   
        ./build/index.js [指定打包输入文件]
        --mode [指定打包环境] development[开发环境] production[生产环境]
    */
    ```

- development与production的区别

    ```js
    development开发环境: 打包后不压缩代码，可以在本地运行调试
    production生产环境: 打包后压缩代码，部署在服务器上运行
    ```

- webpack的五个核心概念

    1. `Entry`[入口]：指定wenpack从哪个文件为入口起点开始打包，分析构建内部依赖图，例如Vue中的config.js

    2. `Output`[输出]: 指定webpack打包后输入的文件保存在哪里，文件名是什么

    3. `Loader`[编译]：webpack只能识别JS与JSON文件，需要打包.css/.vue/image等等文件就需要借助于指定的loader将资源编译成webpack能够识别的资源

    4. `Plugins`[插件]：插件可以用于执行范围更广的任务，包括从打包优化和压缩一直到重新定义环境中的变量等等

    5. `Mode`[模式]：
    <img :src="$withBase('/image/webpack-03.png')">


## Day03：webpack.config.js的基本配置

- webpack使用的是`Commonjs`模块规范，所以使用输出的语法为`module.exports={}`输出的对象则为webpack的各种配置

    - `Commonjs` 与 `ES6` 的关系待补充

    > 以下是`webpack.config.js`的基本配置，注意该文件与`src`文件夹平级，配置之后可以使用`webpack`命令直接进行打包

    ```js
    module.export = {
    // 入口文件
    entry: '' 
    // 输入文件
    output: { 
        // 输入文件名
        filename: '',
        // 输出文件储存路径 使用绝对路径,使用nodejs的path模块
        path: '' 
    },
    // loader配置，不同类型配置不同对象，重复loader不可复用，必须单独配置
    module: { 
        // loader配置规则
        reles: [ 
            {   
                // 正则匹配 文件名
                test: /\.less$/,  
                // 指定文件使用的loader 
                use: [ 
                    // 从下往上执行
                    // less-loader：将less文件转译成css文件
                    // css-loader：将css样式写入js文件
                    // style-loader：在head中创建style标签，并把js中的样式代码添加到style标签中
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]    
            }
        ]
    },
    // 插件配置
    plugins: [],  
    // 环境配置 ['development' 'production']
    mode: 'development' 
    
    }

    // 注意配置输出路径时 使用绝对路径，引入nodejs的path模块
    // resolve 拼接绝对路径  __dirname代表当前文件的目录的绝对路径
    const { resolve } = require('path')
    output: {
        path: resolve(__dirname,'打包输出保存的文件夹名')
    }
    ```

## Day04：webpack打包html&图片资源与使用插件

>   loader：1.下载 2.使用（配置loader）
>
>   plugins：1.下载 2.引入 3.使用（配置plugins）

- 下载插件 `npm i html-webpack-plugin -D`
- 处理图片loader 下载 `url-loader` + `file-loader` + `html-loader`
```js

// HtmlWebpackPlugin 是一个构造函数，需要使用new关键字实例化
const  HtmlWebpackPlugin  = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
    entry: 'index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            // 处理图片loader，默认无法处理html中的img标签图片
            {
                test: /\.(jpg|png|gif)$/,
                // 单个loader不需要使用use:[]数组形式，直接使用loader:'loaderName'即可
                // url-loader依赖于file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8KB，使用base64处理
                    // 优点：减轻请求数量，服务器压力
                    // 缺点：图片更大，请求速度变慢
                    limit: 8 * 1024 ,
                    // 问题：url-loader默认使用ES6模块化解析，而html-loader默认使用commonjs解析
                    // 解决：关闭url-loader的ES6模块化解析
                    esModule: false,
                    // 重命名输出文件名
                    // [hash:10]：取hash值前十位
                    // [ext]：取源文件拓展名，例如jpg
                    name: '[hash:10].[ext]'
                }
            },
            // 添加html-loader 处理html中的img标签图片(负责引入img图片，url-loader才可以处理)
            {
                test:/\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // 实例化HtmlWebpackPlugin
        // 注意⚠️ HtmlWebpackPlugin构造函数会默认创建一个空的HTML文件，自动引入打包输入的所有资源（JS/CSS）
        new HtmlWebpackPlugin({
            // 传入配置项 template，默认拷贝指定路径的html文件，不会覆盖原有的结构，也会自动引入打包输入的资源
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```





## Day05：devServer[热更新] 


> 每次更新代码之后都需要重新运行打包命令，这样就非常麻烦，所以webpack提供了热更新的配置 

下载loader `npx i webpack-dev-server -D`
启动热更新指令 `npx webpack-dev-server`

```js
module.exports = {
    entry: './src/index.js',
    output: './build/index.js',
    module: {
        rules: [  ]
    },
    plugins: [],
    mode: 'development',

    // 开发服务器： devServer 自动化编译/打开浏览器/刷新浏览器
    // 启动指令为： webpack-dev-server
    devServer : {
        contentBase : resolve(__dirname,'build'),
        // 启动gzip压缩
        conperss: true,
        // 端口号
        port : 3000,
        // 自动打开浏览器
        open : true
    }
}
```

## Day06：开发环境的基本配置

> 注意：插件是先引入后使用，使用`new`的方式创建插件对象，并且传入配置。使用`outputPath`可以定义打包后文件的保存文件夹

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit : 8 * 1024,
                    name : '[hash:10].[ext]',
                    // 关闭ES6 module
                    esModule: false
                }
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            {   
                // 处理其他资源，这里是排除掉括号里的文件，其他资源都用file-loader来处理
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                name: '[hash:10].[ext]',
                // outputPath : 打包后生成的文件夹，每个不同的资源都可以单独保存
                outputPath: 'media'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 热更新配置
    devServer: {
        contentBase: resolve(__dirname,'build'),
        compress: true,
        port: 3000,
        open: true
    },
    modu: 'development'
}
```


## Day07：生产环境的搭建

- 1. 将css样式文件抽离成单独文件与兼容css

> 在开发环境中css样式文件打包后是集成在js文件中，所以会先加载js然后在通过创建`style`标签的方式添加样式，会出现闪屏现象，并且提高了js文件的体积，这样做的目的是提高了开发环境的构建速度

`npm i mini-css-extract-plugin` 

```js
// 使用插件 mini-css-extract-plugin 分离css

const { resolve } = require('path') // 引入resolve方法
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入html插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 引入分离css插件

// 设置nodejs环境变量
process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js', // 入口
    output: { // 出口
        filename: 'js/built.js', // 打包输出文件名
        path: resolve(__dirname, 'build') // 打包输出文件保存路径
    },
    module: { // 模块
        rules: [ // 规则
            {
                test: /\.css$/, // 匹配
                user: [ // 使用的loader
                    // 'style-loader',  // 创建style标签，将样式写入，抽离css不需要style-loader
                    // 分离css插件上的loader取代style-loader，提取css成单独文件
                    MiniCssExtractPlugin.loader, 
                    'css-loader', // 将css文件集成到js文件
                    /*
                        css兼容性处理：postcss --> postcss-loader --> postcss-preset-env

                        帮postcss找到package.json文件中的browserslist里面的配置，通过配置加载指定的css兼容样式

                        "browserslist": {
                            "development": [
                                "last 1 chrome version",
                                "last 1 firefox version",
                                "last 1 safari version"
                            ],
                            // 默认是生产环境配置，如果想激活开发环境配置，必须设置process.env.NODE_ENV环境变量
                            "production": [
                                ">0.2%",
                                "not dead",
                                "not op_mini all"
                            ]
                        }
                    */
                   {
                       loader: 'postcss-loader',
                       options: {
                           ident: 'postcss',
                           plugins: ()=> [
                               require('postcss-preset-env')
                           ]
                       }
                   }
                ]
            }
        ]
    },
    plugins: [ // 插件
        new HtmlWebpackPlugin({ // 创建html插件对象
            template: './src/index.html'  // 传入模版
        }),
        new MiniCssExtractPlugin() // 创建分离css插件对象
    ],
    mode: 'development'  // 模式
}
```


- 2. 压缩css

`npm i optimize-css-assets-webpack-plugin` 

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

plugins: [
    new OptimizeCssAssetsWebpackPlugin()
]
```

> 生产环境基本配置，Loader复用与同时使用2个Loader处理的文件执行顺序 *use数组的执行顺序是从下往上的*

```js

const { resolve } = require('path')
// MiniCssExtractPlugin 兼容css 提取css成单独文件不集成在js中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// OptimizeCssAssetsWebpackPlugin 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// HtmlWebpackPlugin 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 这里配置的是 postcss-loader 的 browserslist 执行环境 默认prodoction 开发环境配置为development
process.env.NODE_ENV = 'prodoction'

// 复用css与less通用的loader配置
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要在package.json中配置browserslist兼容的浏览器版本
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()  // 注意这里的重复调用
            ]
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            // 处理css与压缩
            {
                test: /\.css$/,
                use: [ ...commonCssLoader ]
            },
            // 处理less与压缩
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    'less-loader'  // less-loader需要放在css-loader下面 否则解析会报错
                ]
            },
            // 处理js语法规范
            {
                // 需要在package.json中配置eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules
                enforce: 'pre', // 优先执行此loader
                loader: 'eslint-loader',
                options: {
                    fix: true  // 自动修复语法错误
                }
            },
            // 兼容js
            // 这里js会被两个loader处理，注意eslint-loader与babel-loader的执行顺序
            // 优先执行eslint-loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 设置babel/preset-env的按需加载
                                useBuiliIns: 'usage',
                                corejs: { version: 3 },
                                targets: {
                                    chrome: '60',
                                    firefix: '50'
                                }
                            }
                        ]                        
                    ]
                }
            },
            // 处理图片
            {
                test: /\.(jpg|png|gif)/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'image',
                    esModule: false // 关闭es模块化
                }
            },
            // 处理html
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 处理其他文件
            {
                exclude: /\.(js|css|less|html|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',  // 指定HTML模版
            minify: {
                collapseWhitespace: true, // 去除空格
                removeComments: true // 去除注释
            }
        })
    ],
    mode: 'production' // 生产环境会自动压缩js
}
```

## Day08：优化配置

### 开发环境性能优化

* 优化打包构建速度 
* 优化代码调试

> 修改项目中任何一个模块，都会导致其他模块重新打包编译，如果模块过多，会占用过多的打包编译时间。

`HMR：hot module replacement   热模块替换 / 模块热替换`

**实现功能：有变化的地方才重新编译，提升构建速度**

```js{8,11,14}
/*
    CSS文件：可以使用HMR功能，因为style-loader内部实现了
    JS文件：默认不能使用HMR功能
    HTML文件：默认不能使用HMR功能（单页面文件不需要HMR），同时会导致HTML文件不会热更新
        解决：修改entry入口为数组，添加index.html
*/
module.exports = {
    entry: ['./src/js/index.js','./src/index.html']
    deveServer: {
        // 开启HMR功能
        hot: true
    },
    // 使用source-map 映射构建后代码
    devtool: 'source-map'
}
```
### 生产环境性能优化

* 优化打包构建速度
* 优化代码运行性能

- `oneOf` 
    
在wepack的loader规则中，有很多不同的loader，这样每个文件都会被rules中所有的loader扫描一遍，浪费性能，所以使用 `oneOf` 设置每个文件只匹配一个loader，提升构建速度

> 注意：不能有两个loader配置处理同一种文件，例如eslint-loader与bable-loader

```js{15}
module.exports = {
    module: {
        rules: [
            // 将eslint-loader从oneOf数组中抽离，将babel-loader放在oneOf数组中
            {
                test: /\.js$/,
                exclude: /node_modules/,
                exforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    }

                ]
            }
        ]
    }
}
```


- `babel缓存`

类似HMR功能，在babel编译js文件时，只编译改动的模块，不编译没有变化的模块，生产环境不能使用HMR功能

```js{11,12}
// 开启babel缓存
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [...],
                    // 开启babel缓存，第二次构建
                    cacheDirectory: true
                }
            }
        ]
    }
}
```
- 静态资源缓存`contenthash`

> 在代码放到服务器上之后，静态资源(CSS，HTML，JS，图片等)可能会被设置为`强缓存`，在修改代码之后被缓存的资源并不会重新访问服务器，而是直接读取缓存。此时可以在构建的文件名后添加HASH值，每次构建修改后的文件都会有不同的HASH值，这样文件名不同就会重新访问服务器



```js{14,15}
module.exports = {
    output: {
        // 这里的index.js 就是一个chunk[代码块]，所有的资源都从这里引入打包
        entry: './src/js/index.js',  

        // 在输出文件名中添加hash值
        // 问题：资源使用的是同一个hash值，如果重新打包构建所有的缓存文件都会失效
        // filename: 'js/built.[hash:10].js'

        // 使用chunkhash值：打包时来源于同一个chunk，hash值就一样
        // 问题： js于css的hash还是一样，因为css是在js中引入，属于同一个chunk
        // filename: 'js/built.[chunkhash:10].js'

        // 使用contenthash：根据文件的内容来生成hash，并且是单独管理的
        filename: 'js/built.[contenthash:10].js'
    }
}
```



## Day09：生产环境的优化

- `tree shaking` 摇树

> 当webpack从入口文件开始出发扫描所有引入的模块依赖(子依赖)，然后将它们链接起来形成一颗`抽象语法树(AST)`。在运行代码时检查使用过的依赖，打上标记，最后将`抽象语法树(AST)`中没有用到的代码`摇落(优化)`。目的：优化没用的代码

```js
/*
    tree shaking : 去除无用代码
    前提：1· 必须使用ES6模块化 2· 开启production生产环境
    作用：减少打包提及，提升加载速度

    在package.json中配置 
        "sideEffects": false  所有代码都没有副作用（可以进行tree shaking）
        问题：会把直接引入的css或其他资源直接消除，打包后就没有了
        "sideEffects": ["*.css","*.less"] 标记.css文件 不作用 tree shaking
*/
module.exports = {

}
```
#### 多入口打包

- `code split` 代码分割(并行加载，按需加载) 

```js{7}
const { resolve } = require('path')

module.exports = {
    //单入口 ： 单页面程序应用 
    // entry: './src/js/index.js',
    //多入口 ：多页面程序应用
    entry: {
        // 多入口打包 多个入口，输出有多个bundle
        main: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        // filename: 'js/built.[contenthash:10].js',
        // [name] 取入口的文件名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    }
}
```

```js{14}
const { resolve } = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    /*
        optimization: 
            将node_modules中代码单独打包成一个chunk
            在多入口打包模式下，将公共模块(多次引用的jQuery)打包成一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```

- `lazy loading` 懒加载

> 懒加载的前提条件： 代码分割

```js
// 场景一
// 使用import语法将方法变为异步方法，当按钮点击时才执行
document.getElementById('btn').onclick = function () {
    // /* webpackChunakName: 'test'*/  修改打包后的chunak名称， 当JS文件需要使用时才会加载
    // webpackPrefetch: true 预加载 ，将JS文件提前加载，使用时读取缓存
    import(/* webpackChunakName: 'test', webpackPrefetch: true */ './test').then(({ mul })=>{
        console.log(4, 5)
    })
}
```

## Day10：PWA（渐进式网络开发应用程序）

> 离线可访问页面 `workbox` `workbox-webpack-plugin` ，serviceWorker代码必须运行在服务器上

`npm i workbox-webpack-plugin`
```js
// webpack.config.js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            // 1.快速启动serviceworker 2.删除久的serviceworker
            // 3.生成serviceworker配置文件
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}

// 入口文件 index.js
// 注册serviceworker 处理兼容性问题
if('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceworker.register('/service-worker.js')
        .then(()=>{ console.log('注册成功')})
        .catch(()=>{ console.log('注册失败')})
    })
}

/*
    eslint不识别浏览器全局变量
    解决: 配置package.json
    "eslintConfig": {
        "evn": {
            "browser": true
        }
    }
*/
```

- 多进程打包 `thread-loader`

> `npm i thread-loader -D`进程启动也需要时间，只用工作消耗时间较长才需要多进程打包

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // loader: 'babel-loader',
                // 使用多个louader ，则使用use字段传递一个数组
                use: [
                    // 开启多进程打包
                    'thread-loader',
                ]
            }
        ]
    }
}
```

- `externals` 构建打包时忽略指定依赖包

> 忽略某个包后注意手动引入对应的CDN库链接

```js
module.exports = {
    entry: '',
    output: {},
    plugins: [],
    mode: '',
    externals: {
        // 忽略jQuery打包
        jquery: 'jQuery'
    }
}
```
