// const http = require('http')

// const childProcess = require('child_process')

// const hostname = '127.0.0.1'

// const port = 8888

// cosnt server = http.createServer((req, res) => {
// 	res.statusCode = 200
// 	res.setHeader('Content-Type', 'text/plain')
// 	res.end('Hello World')
// })

// server.listen(port, hostname, () => {
// 	console.log('服务器启动')
// 	child_process.exec(`test`)
// 

// 引入Nodejs自带的http模块
const http = require('http');
// 引入Nodejs自带的child_process模块
const childProcess = require('child_process');

const hostname = '127.0.0.1'; // 本机地址
const port = 3005; // 端口

// 创建一个服务器
const server = http.createServer((req, res) => {
	res.statusCode = 200; // 设置响应状态码
	res.setHeader('Content-Type', 'text/plain'); // 设置响应头
	res.end('Hello World\n'); // 向前台输出内容
});

// 开启监听
server.listen(port, hostname, () => {
	// 在命令行打印运行结果
	console.log('服务器启动成功')
	// 使用默认浏览器打开地址
	childProcess.exec(`start http://${hostname}:${port}/`);
});



// 需求： 定时访问告警接口，当告警接口返回数据（产生告警），提交事件到map组件，弹出告警弹框