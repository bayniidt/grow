# 单击复制

```html
<body>
    <div id="root">
        <p class="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, tenetur?</p>
    </div>

    <script>

        function copy(url) {
            let oInput = document.createElement('input')
            oInput.value = url
            document.body.appendChild(oInput)
            oInput.select()

            document.execCommand('Copy')
            alert('COPY SUCCESS')
            oInput.remove()
        }

        document.getElementById('root').onclick = function(){
            const value = document.querySelector('.lorem').innerText
            copy(value)
        }
    </script>
</body>
```


# 选中弹框复制选中内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .btn {
            display: none;
            position: absolute;
        }
    </style>
</head>
<body>
    <div id="root">
        <p class="lorem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, tenetur?</p>
    </div>
    <button onclick=copy() class="btn">COPY</button>

    <script>

        let text = ''
        const root = document.getElementById('root')
        const btn = document.querySelector('.btn')

        function copy() {
            console.log(111);
            document.execCommand('Copy')
            alert('COPY SUCCESS')
            btn.style.display = 'none'
        }

        root.onclick = function(e){
            text = window.getSelection().toString()
            btn.style.display = 'block'
            btn.style.left = e.pageX - btn.offsetWidth / 2 + 25 + 'px'
            btn.style.top = e.pageY - btn.offsetHeight / 2 + 25 + 'px'
        }

    </script>
</body>
</html>
```

