# CSS选择器复习

- `*通配符` `#ID` `.类` ` (空格)后代` `ul标签` `:伪类` `+相邻` `>子代` `~包含` `[title]属性` `::伪元素` `:nth-child(n)选择指定子代` `:nth-last-child(n)选择指定子代，从后往前` `:nth-of-type(n)选择指定类型`

> 注意`:nth-child(n)` `:nth-of-type(n)` 的使用方式

```CSS
a:link { color: red}  // 锚点伪类link：在链接中设置链接没有被访问前的颜色为red

a:visited { color: red} // 锚点伪类visited：在链接中设置链接没有被访问前的颜色为red

a:hover { color: red } // 行为伪类hover：在用户把鼠标悬浮在元素上的样式

a:active { color : red } // 行为伪类active：在用户把鼠标左键点击在元素上的样式
```

- `>` (大于号)

> 大于号代表选择子元素，注意 `大于号 >` 与 `空格 ` 的区别

```CSS
h1>strong{ }  // 选择某个元素下的第一个子元素，只选中第一个
h1 strong{ }  // 选择某个元素下的所有子元素 这里是空格
```

- `+` (+号)

> 加号代表选择相邻兄弟元素

```CSS
h1+p{ } // 选择某个元素相邻的第一个兄弟元素
```

- 属性选择器[必须严格选中所有属性]

```CSS
*[title] { color: red}  // 选中所有包含title属性的元素
a[href][title] { color: red}    // 选中拥有 href + title 属性的 a标签
a[href="http://www.baidu.com"]  // 选中指定href连接的a标签
```

- `~` (波浪号选择器) 包含
```CSS
p[class~='test'] { color: red}  // 选中包含class为test的元素，只要有就可以被选中
p~ul { color :red }  // 选中相同父级元素下 p 之后的 ul元素 
```



