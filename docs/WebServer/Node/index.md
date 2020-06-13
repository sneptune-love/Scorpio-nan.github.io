### 简述

Node 的目标: 优秀的前端, 可以有效的和后端沟通; 敏捷的全栈, 快速开发全栈应用; 架构师, 践行工程化思想;

WebApplication 的阶段: 
+ 后端模板 `JSP` `ASP` `PHP`;
+ 前后端分离 `Jquery`;
+ 工程化 `angular` `webpack` `glup`;
+ 全栈时代 + 大前端;
+ 云 + 端时代, 微信云开发, `flutter` + `serverless` 小程序, 云平台;

现在, 越来越多的科技公司和开发者在使用 `NodeJS`开发各种应用, `NodeJS` 除了能够辅助大前端开发之外, 还可以编写 `web` 应用, 封装 `api` , 组装 `RPC` 服务等; 甚至还可以开发 `VScode` 编辑器一样的客户端应用; 

与传统的服务端语言相比, `NodeJS` 简单易学, 性能好, 部署容易, 能够轻松处理高并发场景下的大量服务器请求; `NodeJS` 周边的生态也非常强大, `NPM`(Node包管理)上有几十万个模块; 

目前 `NodeJS` 在大部分领域都占有一席之地, 尤其是 I/O 密集型的, 比如 `Web` 开发, 微服务, 前端构建等.不少大型网站都是使用 `NodeJS` 作为后台开发语言的, 用的最多的就是使用 `NodeJS` 做前端渲染和架构优化, 比如淘宝双十一, 去哪儿网 的 PC 端核心业务等. 另外, 有不少知名的前端库也是使用 `NodeJS` 开发的, 比如 `Webpack` 是一个强大的打包器, `React/Vue` 是成熟的前端组件化框架.

>这里不对 NodeJS 的基础概念和用法做阐述, 具体概念和 API 详见 [NodeJS 中文官网](http://nodejs.cn/api/);

### NodeJs 模块

#### 核心模块
`buffer` , `module` , `process` 等, 不需要使用 `require` 关键字来加载的模块;

````js
//  创建⼀个⻓度为10字节以0填充的Buffer
const buffer = Buffer.alloc(10);
console.log(buffer);
//  <Buffer 00 00 00 00 00 00 00 00 00 00>

//把一个字符串转换成二进制   创建⼀个Buffer包含ascii.
const buf1 = Buffer.from("a");
console.log(buf1);
//  <Buffer 61>

const buf2 = Buffer.from("中文");
console.log(buf2);
//  <Buffer e4 b8 ad e6 96 87>

const buf3 = Buffer.concat([buf1,buf2]);
console.log(buf3,buf3.toString());
//  <Buffer 61 e4 b8 ad e6 96 87> a中文
````

#### 内置模块
`os`, `fs`, `path`, `http`, `event` 等, 不用 `install` 需要 `require` 来加载使用的模块;

````js
// 查看内存占用率
const os = require("os");
const me = os.freemem() / os.totalmem() * 100;

console.log("内存占用率为:" + me.toFixed(2) + "%");
````
````js
//  启动一个 http 服务;
const http = require("http");

const server = http.createServer((request,response)=>{
    console.log(request);
    response.end("Hello Node");
})

server.listen(3001);
````
````js
//  复制文件
const fs = require("fs");
const rs = fs.createReadStream('./01.js');
const ws = fs.createWriteStream('./copy.js');
rs.pipe(ws);
````

#### 第三方模块
`mysql`, `git` 等;

````bash
# 安装 git 下载需要的依赖库
$ npm install download-git-repo -s

# 为了让下载过程看起来平滑一点, 使用进度条库
$ npm install ora -s
````

````js
//  从 git 上下载一个工程
const repo = "github:Scorpio-nan/vConsole";
const desc = "test";
clone (repo,desc);
async function clone (repo,desc){
    const { promisify } = require("util");
    const download = promisify(require("download-git-repo"));
    const ora = require("ora");
    const precess = ora("下载中...");

    precess.start();
    try {
        await download(repo,desc);
        precess.succeed();
    } catch (error) {
        precess.fail();
    }
}
````


### Express
> Express 是一种保持最低程度规模的灵活 `NodeJS Web` 应用程序框架, 为 `Web` 和移动应用程序提供一组强大的功能. [Express 中文网](https://expressjs.com/zh-cn/4x/api.html)

#### 设置 ejs 为模板引擎
> `ejs` 是一套简单高效的模板语言, 可以利用普通的 `javascript` 代码生成 `html` 页面;  [ejs 中文网](https://ejs.bootcss.com/)

`````bash
# 全局安装 express 和 express 生成器
npm install express express-generator -g

# 使用 express 框架并将 ejs 作为模板引擎
express --view=ejs dirName
`````
#### 跨域访问

什么时域? 为什么会跨域? 跨域怎么解决? 如果真的要把这些写全面的话, 估计还得再弄一个专题来写这些;  这里就不对跨域过多的阐述, 只写一下 `NodeJS` 开发项目的时候, 跨域请求是怎么解决的; 

域: 协议 + 主机名 + 端口号;  三者任一一个不相同就是不同的两个域;

在实际项目中, 我们通常会将项目的前后端分离出来, 独立开发, 假如前端的端口号是 `8080`, 而 `Node` 的服务端口是 `8001`, 那么就会出现访问接口跨域, 而现在的主流的解决跨域的方案就是 `CORS`; [Cors 跨域共享](http://www.ruanyifeng.com/blog/2016/04/cors.html);

拿 `Express` 初始化的项目, 我们只需要在 `app.js` 文件里面添加如下内容:
`````javascript
//...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res, next) => {
    //如果下面的Access-Control-Allow-Credentials 设置为true的话，这里的url就不能指定为 * 号;
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:9000");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    //res.header("Access-Control-Max-Age", "100");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
})

app.use('/', indexRouter);
//...
`````
`Access-Control-Allow-Origin` 字段设置允许访问的源;



### koa

概述: Koa 是一个新的 web 框架,  致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石; koa是Express的下一代基于 Node.js 的 web 框架

koa2 完全使用 Promise 并配合 async 来实现异步;

特点: 
+ 轻量, 无捆绑
+ 中间件架构
+ 优雅的API设计
+ 增强的错误处理

````bash
npm install koa -S
````
#### 中间件机制、请求、响应处理

Koa中间件机制: Koa中间件机制就是函数式组合概念 `Compose` 的概念, 将一组需要顺序执行的函数复合为一个函数, 外层函数的参数实际是内层函数的返回值. 洋葱圈模型可以形象表示这种机制

![articlex](/res/articlex.png)

![articlex](/res/_articlex.png)

````javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next)=>{
    console.log(1)
    await next();
    console.log(1)
});

app.use(async (ctx, next) => {
    console.log(2)
    await next();
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
})

app.listen(3000);

/**
 *  1
 *  2
 *  3
 *  2
 *  1
 * /
````
Koa 的实现原理就是将 NodeJs 原生的 http 对象进行了一个封装, 让我们在使用的时候更为优雅, 简单易用;

#### 静态服务:
````javascript
app.use(require('koa-static')(__dirname + '/'))
````

#### context(ctx)
koa为了能够简化API, 引入上下文context概念, 将原始请求对象req和响应对象res封装并挂载到context上, 并且在context上设置getter和setter, 从而简化操作.

***ctx 实现原理***
````javascript
const req = {
    get url(){
        return this.req.url;
    },
    get method(){
        return this.req.method.toLowerCase();
    }
}

const res = {
    get body(){
        return this._body;
    },
    set body(val){
        this._body = val;
    }
}

const context = {
    get url() {
        return this.request.url;
    },
    get body() {
        return this.response.body;
    },
    set body(val) {
        this.response.body = val;
    },
    get method() {
        return this.request.method
    }
}

const ctx = {
    request:req,
    response:res,
    req:req,
    res:res
}
````

#### 路由

````bash
npm install koa-router -S
````

````javascript
const router = require('koa-router')()

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

app.use(router.routes())
````
#### Koa 实现一个 phpStudy 静态服务中间件
如果 url 访问的是目录, 就读取目录里面所有的文件, 展示在浏览器, 如果是 html 文件, 就直接打开;

***static.js***
````javascript
const fs = require('fs');
const path = require('path');

module.exports = (dirPath = "./public") => {
    return async (ctx, next) => {
        if (ctx.url.indexOf("/public") === 0) {
            // public开头 读取文件
            const url = path.resolve(__dirname, dirPath);
            const fileBaseName = path.basename(url);
            const filepath = url + ctx.url.replace("/public", "");
            try {
                stats = fs.statSync(filepath);
                if (stats.isDirectory()) {
                    const dir = fs.readdirSync(filepath);
                    // const
                    const ret = ['<div style="padding-left:20px">'];
                    dir.forEach(filename => {
                        console.log(filename);
                        // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
                        if (filename.indexOf(".") > -1) {
                            ret.push(
                                `<p><a style="color:black" href="${
                                ctx.url
                                }/${filename}">${filename}</a></p>`
                            );
                        } else {
                            // 文件
                            ret.push(
                                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
                            );
                        }
                    });
                    ret.push("</div>");
                    ctx.body = ret.join("");
                } else {
                    console.log("文件");
                    const content = fs.readFileSync(filepath);
                    ctx.body = content;
                }
            } catch (e) {
                // 报错了 文件不存在
                ctx.body = "404, not found";
            }
        } else {
            // 否则不是静态资源，直接去下一个中间件
            await next();
        }
    };
};
````
使用:

````javascript
const static = require("./static");
app.use(static(__dirname + '/public'));

````
#### Koa 实现一个请求拦截中间件
请求拦截: 在黑名单中存在的 ip 访问, 将会被拒绝;

***interceptor.js***
````js
module.exports = async function (ctx, next) {
    const { res, req } = ctx;
    const blackList = ['127.0.0.1'];
    const ip = getClientIP(req);
    if (blackList.includes(ip)) {//出现在黑名单中将被拒绝
        ctx.body = "not allowed";
    } else {
        await next();
    }
};
function getClientIP(req) {
    return (
        req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress
    );
}
````
使用:

````javascript
app.use(require("./interceptor"));
````

### 网络编程

#### 网络协议

![network](/res/network.png)

#### TCP协议
用 TCP 协议实现一个即时通讯 IM;

原理:Net 模块提供一个异步 API 能够创建基于流的 TCP 服务器, 客户端与服务器建立连接后, 服务器可以获得一个全双工 Socket 对象, 服务器可以保存 Socket 对象列表, 在接收某客户端消息时, 推送给其他客户端.




