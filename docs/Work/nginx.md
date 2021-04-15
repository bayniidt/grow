# nginx 反向代理基础使用

<img :src="$withBase('/image/nginx.png')">

## 项目使用场景

1. 在需要进行外部请求时，发生跨域错误，此时用到nginx反向代理，在http/server/location中添加指定url匹配，
并把匹配到的请求转发到实际需要请求的外部地址，解决跨域问题。

2. 在服务器挂掉时可以用作本地服务器，将build好的前端代码路径添加到http/server/location/root项中，
添加监听的端口与本地ip，就可以作为本地服务器进行访问。

Nginx在做反向代理时，提供性能稳定，并且能够提供配置灵活的转发功能。Nginx可以根据不同的正则匹配，
采取不同的转发策略，比如图片文件结尾的走文件服务器，动态页面走web服务器，只要你正则写的没问题，
又有相对应的服务器解决方案，你就可以随心所欲的玩。并且Nginx对返回结果进行错误页跳转，异常判断等。
如果被分发的服务器存在异常，他可以将请求重新转发给另外一台服务器，然后自动去除异常服务器。

```js
//基础命令
//启动：
    start nginx

//重启
    nginx -s reload

//关闭
    nginx -s stop
    
```

> nginx.conf文件配置

```conf
#nginx.conf
#句尾分号不可缺少
#http块：可以嵌套多个server，配置代理，缓存
http {
    include         mime.types; #文件拓展名与文件类型映射表
    default_type    application/octet-stream; #默认文件类型，默认为text/plain

    #access_log  logs/access.log  main; #取消日志服务

    sendfile        on; #允许sendfile方式传输文件，默认为off
    #tcp_nopush     on;

    keepalive_timeout  65; #连接超时时间，默认为75s

    gzip  on; #开启gzip
    gzip_vary on;
    gzip_min_length 1k; #不压缩临界值,大于1k的才压缩,一般不用改
    gzip_buffers 4 16k;
    gzip_comp_level 8; #压缩级别,数字越大压缩的越好
    gzip_types  text/plain application/javascript 
                application/x-javascript text/css application/xml 
                text/javascript application/x-httpd-php image/jpeg 
                image/gif image/png image/x-icon; #压缩文件类型,缺啥补啥

	client_max_body_size 5m;

    #server块，配置虚拟主机相关参数，一个http中可以有多个server
    server {
        listen       80; #监听端口
        server_name  localhost; #监听地址
        
        #配置请求的路由， 一个server中可以有多个location
        location / { #请求的url匹配，使用正则
            root   D:/isafety-portal/docker/42/dist; #文件根目录
            index  index.html index.htm; #默认页
        }

        location ~* \.(eot|otf|ttf|woff|svg)$ { 
            root /opt/znv/isafety-portal;
            add_header Access-Control-Allow-Origin *; #添加请求头
        }

        location ^~/api/ { #匹配/api/开头的请求
            proxy_pass  http://10.72.74.73:20800/; #转发到指定地址
            proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection 'upgrade';
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
			add_header Access-Control-Allow-Credentials true;
			add_header Access-Control-Allow-Origin *;			
			add_header Access-Control-Allow-Methods 'POST,GET,OPTIONS,PUT,DELETE';
        }

    }
}

```


