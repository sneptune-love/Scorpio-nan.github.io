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
                var stats = fs.statSync(filepath);
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

#### Koa 跨域解决方案

***CORS***
````javascript
app.use(async (ctx, next) => {
    //  允许所有源来请求资源
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    //  允许跨域携带凭证(cookie等信息)
    ctx.set('Access-Control-Allow-Credentials',true);
    //  允许在http请求的头部中添加以下字段
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    //  允许请求资源的方式
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //  设置不缓存
    ctx.set('Cache-Control', 'no-cache');
    //  快速返回 OPTIONS 预检请求
    if(ctx.method == "OPTIONS"){
        ctx.status = 200;
    }
    await next();
})
````

***Proxy***
````bash
npm install http-proxy-middleware
````
````javascript
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/'));
const proxy = require("http-proxy-middleware");

app.use('/api',proxy({
    target:'http://localhost:4000'
}));

app.listen(3000);
````

### 网络编程

#### 网络协议

![network](/res/network.png)

#### TCP协议
用 TCP 协议实现一个即时通讯 IM;

原理:Net 模块提供一个异步 API 能够创建基于流的 TCP 服务器, 客户端与服务器建立连接后, 服务器可以获得一个全双工 Socket 对象, 服务器可以保存 Socket 对象列表, 在接收某客户端消息时, 推送给其他客户端.

***socket.js***
````js
const net = require("net");
const chartServer = net.createServer();
const clientList = [];

chartServer.on('connection', client=>{
    client.write('建立连接~');
    clientList.push(client);
    client.on("data",data=>{
        // data是一个二进制流数据
        console.log("resolve:",data.toString());
        clientList.forEach(v =>{
            v.write(data);
        })
    })
})
````
#### 文件上传
````javascript
const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const chunk = []
let size = 0

router.post('/upload',async (ctx,next)=>{
    const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png'
    const outputFile = path.resolve(__dirname, fileName)
    const fis = fs.createWriteStream(outputFile)

    // 1. Buffer connect
    // request.on('data',data => {
    //     chunk.push(data)
    //     size += data.length
    //     console.log('data:',data ,size)
    // })
    // request.on('end',() => {
    //     console.log('end...')
    //     const buffer = Buffer.concat(chunk,size)
    //     size = 0
    //     fs.writeFileSync(outputFile,buffer)
    //     response.end()
    // })

    // 2. 流事件写入
    // request.on('data', data => {
    //     console.log('data:',data)
    //     fis.write(data)
    // })
    // request.on('end', () => {
    //     fis.end()
    //     response.end()
    // })

    // 3. 管道
    request.pipe(fis)
    response.end()
})

````
#### 网络爬虫
````javascript
const originRequest = require("request");
// 服务端的 jquery 库
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
function request(url, callback) {
    const options = {
        url: url,
        encoding: null
    };
    originRequest(url, options,callback);
}

for (let i = 100553; i < 100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url, function(err, res, body) {
        const html = iconv.decode(body, "gb2312");
        const $ = cheerio.load(html);
        console.log($(".title_all h1").text());
    });
}
````

### Mysql 数据持久化
NodeJS 中实现数据持久化的多种方法:
+ 文件系统 fs
+ 数据库
    + 关系型数据库 mysql
    + 文档型数据库 MongoDB
    + 键值对数据库 redis

#### 文件型数据库实现:

***index.js***
````javascript
const fs = require('fs');

function get(key){
    fs.readFile('./db.json',(err,data)=>{
        if(err) console.log(err);
        const json = JSON.parse(data);
        console.log(json[key]);
    })
}

function set(key,value){
    fs.readFile(__dirname + '/db.json',(err,data)=>{
        if(err) console.log(err);
        // 如果读取出来的是个空文件就设置一个对象;
        const json = data ? JSON.parse(data) : {}
        json[key] = value;
        
        fs.writeFile('./db.json',JSON.stringify(json),error=>{
            if(error) console.log(error);
            console.log("写入成功~");
        })
    })
}

// 命令行接口(用命令行测试程序)
const readline = require('readline');
// 创建一个交互界面
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.on("line",function(input){
    const [op,key,value] = input.split(' ');
    if(op == 'get'){
        get(key);
    }else if(op == 'set'){
        set(key,value);
    }else{
        rl.close();
    }
})

rl.on("close",function(){
    console.log("程序结束~");
    process.exit(0);
})
````
````bash
npm install readline
node index.js

set user {name:"test"}
get user
````
#### Mysql数据库
ORM - Sequelize : 基于Promise的ORM(Object Relation Mapping), 是一种数据库中间件 支持多种数据库、事务、关联等;

简化 sql 操作, 让操作 sql 像操作普通的对象一样, 可以使用 `.` 来操作 mysql;

+ [Sequelize 中文文档](https://github.com/demopark/sequelize-docs-Zh-CN)

````bash
npm install mysql2 sequelize -S
````
````javascript
(async ()=>{
    const {Sequelize,Model,DataTypes} = require('sequelize');

    // 建立连接
    const sequelize = new Sequelize("test","root","root",{
        host:"localhost",
        // 一个中间件系统对应多种数据库的实现, 这里使用的是 mysql
        dialect:"mysql"
    })
    
    class Furit extends Model{}

    // 定义模型
    Furit.init({
        name:{type:DataTypes.STRING(20),allowNull:false},
        price:{type:DataTypes.FLOAT,allowNull:false},
        stock:{type:DataTypes.INTEGER,defaultValue:0}
    },{
        sequelize,
        modleName:"Furit"
    });

    let ret = await Furit.sync();


    console.log(ret);
    /**
     *   Executing (default): CREATE TABLE IF NOT EXISTS `Furits` (`id` INTEGER NOT NULL
     *   auto_increment , `name` VARCHAR(20) NOT NULL, `price` FLOAT NOT NULL, `stock` IN
     *   TEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, P
     *   RIMARY KEY (`id`)) ENGINE=InnoDB;
     *
     */

    // 插入数据
    ret = await Furit.create({
        name:"苹果",
        price:10
    })

    // 读取数据
    ret = await Furit.findAll();
    console.log("data:",JSON.stringify(ret));

    // 修改数据
    await Furit.update(
        { price:15 },
        { where: {name : "苹果"}}
    )

    // 操作符条件查询
    const OP = Sequelize.Op;

    ret = await Furit.findAll({
        where:{
            price:{
                [OP.lt]:30,      // 小于30
                [OP.gt]:10      // 大于10
            }
        }
    })

    console.log("条件查询",ret);

})()
````
### Mongodb 数据持久化


#### Mongodb 安装配置
+ [下载安装](https://www.runoob.com/mongodb/mongodb-window-install.html);
+ 配置环境变量; 我的电脑 --> 属性 --> 高级系统设置 --> 环境变量 --> 将 MongoDB 的安装目录下面的 bin 添加到 path
+ 创建 dbpath:

    在命令行中输入:
    ````bash
    mongod.exe --dbpath E:\MongoDB\data\db;  
    ````
    `E:\MongoDB\data\db` 代表的是存放数据的位置, 需要先进行这一步操作之后才能运行 mongod;
+ 在终端中执行 mongod 并保持终端是运行状态;
    ```bash
    mongod
    ```
+ 再新打开一个终端执行 mongo
    ```bash
    mongo

    # 测试
    show dbs
    # admin   0.000GB
    # config  0.000GB
    # local   0.000GB
    ```

#### Mongodb 原生驱动

安装 MongoDB:

```bash
npm install mongodb --save
```
node 连接 mongodb:
```javascript
(async ()=>{
    const { MongoClient:MongoDB } = require('mongodb');

    // 初始化客户端
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            // 这个属性会在 url 里面识别验证用户所需要的db;
            userNewUrlParser: true
        }
    )

    // 创建连接
    let ret = await client.connect()

    // 创建数据库
    const db = client.db("test");
    
    // 创建表(添加文档) 创建一个 fruits 的集合
    const fruits = db.collection('fruits');

    // 插入一条数据
    ret = await fruits.insertOne({
        name:"芒果",
        price:10.87
    })
    console.log("插入成功~",JSON.stringify(ret));

    // 查询数据
    ret = await fruits.findOne();           // 默认查询第一条
    ret = await fruits.find().toArray();    // 查询所有;
    console.log("查询成功~",JSON.stringify(ret));

    
    // 修改数据  默认只修改第一条  $set 操作符
    ret = await fruits.updateOne({name:"apple"},{
        $set:{
            price:12.76
        }
    })
    console.log("修改成功~",JSON.stringify(ret));

    // 删除数据 (删除所有数据)
    await fruits.deleteMany();

    // 关闭连接
    client.close();
})()
```
##### Mongodb 异步编程
用事件发布订阅的方式实现一个异步操作 Mongodb 的案例;

新建一个 `db.js` 封装 db 操作, 当连接成功的时候发布一个消息;

***db.js***
```javascript
const conf = {
    url:"mongodb://localhost:27017",
    dbName:"test"
}
// 用事件发布订阅实现异步编程;
const Eventemiter = require("events").EventEmitter;

// Mongo 客户端
const { MongoClient } = require("mongodb");

class Mongodb{
    constructor(conf){
        this.conf = conf;
        this.emiter = new Eventemiter();
        // 连接 mongodb
        this.client = new MongoClient(conf.url,{
            userNewUrlParser: true
        })
        this.client.connect(err =>{
            if(err) throw err;
            console.log("连接成功~");
            this.emiter.emit("connect");
        })
    }

    once(event,cb){
        this.emiter.once(event,cb);
    }

    // collection 连接成功
    col(colName,dbName = conf.dbName){
        return this.client.db(dbName).collection(colName);
    }
}

module.exports = new Mongodb(conf);
```
***initDB.js***
```javascript
const mongodb = require('./db');

// 订阅一个 connect 消息, 当建立连接成功的时候, 就往数据库里面插入 100 条数据;
mongodb.once("connect", async ()=>{
    const col = mongodb.col("fruits");
    // 删除所有数据
    await col.deleteMany();

    // 生成100条水果数据
    const data = new Array(100).fill().map((v,i)=>{
        return {
            name:["banner","apple","vegetable","watermelon"][Math.floor(Math.random() * (3 + 1))],
            price:i,
            category:Math.random() > 0.5 ? "蔬菜" : "水果"
        }
    })

    await col.insertMany(data);
    console.log("插入成功~");
})
```
#### ODM - Mongoose
[Mongoose 在线文档](https://mongoosejs.com/docs/guide.html)

[Mongoose 中文文档](http://www.mongoosejs.net/docs/guide.html)

`Mongoose` 是在 `node.js` 异步环境下对 `mongodb` 进行便捷操作的对象模型工具;

安装:
```bash
npm install mongoose -S
```

##### 基本使用

```javascript
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser: true,useUnifiedTopology: true})

const conn = mongoose.connection;

conn.on("error",()=> console.log("连接失败~"));
// 连接成功时，回调函数会被调用
conn.once("open",async ()=>{
    console.log("连接成功~");
    // 定义模型(定义表结构)
    const Schema = mongoose.Schema({
        category:String,
        name:String
    })

    // 建立模型  它对应数据库中复数、小写的Collection
    const Model = mongoose.model("fruits",Schema);

    // create 返回 Promise 创建模型并插入数据
    let ret = await Model.create({
        category:"温带水果",
        name:"苹果",
        price:10
    })

    // 查询数据 find 返回 Query, 它实现了then 和 catch 可以当Promise使用  如果需要返回Promise, 调⽤用其exec();
    ret = await Model.find({name:"苹果"})

    // 更新, updateOne 返回 Query
    ret = await Model.updateOne({name:"苹果"},{
        $set:{
            name:"芒果~"
        }
    })

    // 删除数据  deleteOne 返回 Query
    ret = await Model.deleteOne({name:"苹果"});
    console.log(ret);
})
```
> [零编码实现 `restful` 系统](/res/Mongodb数据持久化/restful);

### 鉴权

#### session-cookie 
`cookie` 原理:
+ Header Set-cookie 负责设置 cookie;
+ 请求头里面携带 cookie

````javascript
const http = require('http');

http.createServer((req,res)=>{
    if(req.url == '/favicon.ico') {
        res.end('');
        return;
    }
    // 查看 cookie 是否存在
    console.log("cookie",req.headers.cookie);
    res.setHeader("Set-Cookie","cookie1=abc");
    res.end('');
    
}).listen(3001)
````
通过 `response` 的 `setHeader` 方法, 在 http 的请求头里面设置 `cookie`; 但是这种方法有一个弊端就是, 如果我们将铭文存储在 `cookie` 里面, 就会被直接暴露在浏览器里面, 任何人都是可见的, 为了避免这种情况, 通常我们只需要在浏览器的 `cookie` 中存一个键, 而服务器端存储这个键的值, 鉴权的时候只需要拿 `cookie` 里面键, 去查找服务端存储的对应的值; 这也就是 `session` 与 `cookie` 的关系;

`session` 原理:
````javascript
const http = require('http');
const session = {};

http.createServer((req,res)=>{
    if(req.url == '/favicon.ico') {
        res.end('');
        return;
    }
    // 查看 cookie 是否存在
    console.log("cookie",req.headers.cookie);
    const sessionKey = 'sid';
    const cookie = req.headers.cookie;

    if(cookie && cookie.indexOf(sessionKey) > -1){
        res.end("欢迎回来~");

        const parten = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = parten.exec(cookie)[1];

        console.log("session:",sid,session,session[sid]);
    }else{
        const sid = (Math.random()* 999999).toFixed();
        
        res.setHeader("Set-Cookie",`${sessionKey}=${sid}`);
        session[sid] = {
            name:"laowang"
        }
        res.end('Hello');
    }

}).listen(3001)
````
可以看到 `session` 的原理:
+ 1. 服务端在接受客户端首次访问的时候在服务端创建 `session`, 然后保存 `session`(通常都是存在 redis 里面), 然后给 `session` 生成一个唯一的标识字符串, 在响应头中写下字符串;
+ 2. 签名, 这一步通过秘钥对 sid 进行签名处理, 避免客户端修改 sid(非必须);
+ 3. 浏览器中收到请求响应的时候, 会解析响应头, 然后将 sid 存储在 cookie 中, 浏览器在下次 http 请求的请求头中会带上 cookie 信息;
+ 4. 服务器在接受客户端请求时会去解析请求头 cookie 中的 sid, 然后根据 sid 去找服务器中保存该客户端的 session, 从而判断请求是否合法;

#### Koa-session
koa 中的 session 使用:
````bash
npm install koa-session
````
````javascript
const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');

// 加密算法的秘钥, 存储在后端, 只有后端才能鉴别 session 的签名是否和铭文是否是一组;
app.keys = ['setting secrect']

// 配置项
const SESS_CONFIG = {
    key:"hope:sess",        // cookie 的键名
    maxAge:86400000,        // 有效期, 默认为一天
    httpOnly:true,          // 仅服务器才能修改
    signed:false            // 签名(hash 算法)
}

// 注册session
app.use(session(SESS_CONFIG,app));

app.use(async (ctx,next)=>{
    if(ctx.path == '/favicon.ico') return;

    // 获取
    let n = ctx.session.count || 0;

    // 设置
    ctx.session.count = ++n;
    ctx.body = "第" + n + '次访问~';
})

app.listen(3001);
````
这种方式有效的防止了客户端对 cookie 的篡改, 但是有一点弊端是通常 node 服务可能会有多个, 这种做法是没办法在多个服务中共享 session; 所有通常情况下, 会将 session 存储在 radis 里面;

#### redis 存储 session
[redis 安装](https://github.com/tporadowski/redis/releases)

node 驱动安装:
````bash
# 将 redis 操作变成 promise 的方式调用
npm install co-redis

npm install redis
npm install koa-redis
````
普通使用:
````javascript
const redis = require('redis');
const client = redis.createClient(6379,"localhost");

// 设置
client.set("hello","This is a value");

// 读取
client.get("hello",function(err,res){
    if(err){
        console.log("error");
    }else{
        console.log(res);
    }
})
````
Koa-redis 使用:
````javascript
const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');

const redisStore = require('koa-redis');
const redis = require('redis');
const redisClient = redis.createClient(6379,"localhost");

// redis promise 库
const warpper = require('co-redis');
const client = warpper(redisClient);

// 加密算法的秘钥, 存储在后端, 只有后端才能鉴别 session 的签名是否和铭文是一组;
app.keys = ['setting secrect']

// 配置项
const SESS_CONFIG = {
    key:"hope:sess",        // cookie 的键名
    maxAge:86400000,        // 有效期, 默认为一天
    httpOnly:true,          // 仅服务器才能修改
    signed:false,           // 签名(hash 算法)
    store:redisStore({
        client:client
    })
}

// 注册session
app.use(session(SESS_CONFIG,app));

// 观察 redis 的状态
app.use(async (ctx,next)=>{
    const keys = await client.keys("*");
    keys.forEach(async key => {
        console.log(await client.get(key));
    });
    await next();
})

app.use(async (ctx,next)=>{
    if(ctx.path == '/favicon.ico') return;

    // 获取
    let n = ctx.session.count || 0;

    // 设置
    ctx.session.count = ++n;
    ctx.body = "第" + n + '次访问~';
})

app.listen(3001);
````
#### Token 验证
session 的不足: 
+ 服务器有状态, 需要将 session 记录到服务端, 不利于分布式部署; 
+ session 依赖于浏览器, 如果应用是 app 就会有一些问题;

Token 原理:
+ 1. 客户端使⽤用户名跟密码请求登录;
+ 2. 服务端收到请求, 去验证用户名和密码;
+ 3. 验证成功之后, 服务端会签发一个令牌(Token), 再把这个 Token 发送给客户端;
+ 4. 客户端收到 Token 之后可以把它缓存起来(放在 cookie 或者是 localStorage 里面);
+ 5. 客户端每次向服务器发送请求的时候, 都需要带着服务端签发的 Token;
+ 6. 服务端收到请求之后, 去验证客户端里面携带的 Token, 验证成功之后就向客户端返回信息;

安装依赖:
````bash
npm install koa-router jsonwebtoken koa-jwt koa2-cors koa-bodyparser koa-static
````
***server.js***
````javascript
const Koa = require('koa');
const router = require('koa-router')();

// 生成 token 用的
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
// 密钥, 即使前台的用户信息被篡改的话, 没有这个密钥是解不出来加密铭文的;
const secret = "this is a secret";
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();
app.keys = ['some secret'];

app.use(static(__dirname + '/'));
app.use(bodyparser());

router.post('/users/login-token',async ctx =>{
    const { body } = ctx.request;
    //... 数据库操作 这里的 userId 是模拟数据库查出来的, 真实情况下 userId 应该是存放在数据库里;
    const userId = body.username;
    // 设置token
    ctx.body = {
        message:"登录成功~",
        user:userId,
        token:jwt.sign({
            data:userId,
            // 设置有效期 一小时之后
            exp:Math.floor(Date.now() / 1000) + 60 * 60,
        // 生成token的密钥
        },secret)
    }
})

// jwtAuth 中间件先鉴权之后再走到下一个模块, 如果鉴权不通过, 就会直接向前台返回一个 401 Unauthorized;
router.get('/users/getuser-token',jwtAuth({
    secret
}), async ctx =>{
    console.log(ctx.state);
    ctx.body = {
        message:"获取数据成功~",
        userinfo: ctx.state.user.data
    }
})

app.use(router.routes());
app.listen(3002);
````
***client.html***
````html
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <div id="app">
        <div>
            <input v-model="username" />
            <input v-model="password" />
        </div>
        <div>
            <button v-on:click="login">Login</button>
            <button v-on:click="logout">Logout</button>
            <button v-on:click="getUser">GetUser</button>
        </div>
        <div>
            <button @click="logs=[]">Clear Log</button>
        </div>
        <!-- ⽇日志 -->
        <ul>
            <li v-for="(log,idx) in logs" :key="idx">
                {{ log }}
            </li>
        </ul>
    </div>
    <script>
        axios.interceptors.request.use(
            config => {
                const token = window.localStorage.getItem("token");
                if (token) {
                    // 判断是否存在token，如果存在的话，则每个http header都加上token
                    // Bearer是JWT的认证头部信息
                    config.headers.common["Authorization"] = "Bearer " + token;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        axios.interceptors.response.use(
            response => {
                app.logs.push(JSON.stringify(response.data));
                return response;
            },
            err => {
                app.logs.push(JSON.stringify(response.data));
                return Promise.reject(err);
            }
        );
        var app = new Vue({
            el: "#app",
            data: {
                username: "test",
                password: "test",
                logs: []
            },
            methods: {
                login: async function () {
                    const res = await axios.post("/users/login-token", {
                        username: this.username,
                        password: this.password
                    });
                    localStorage.setItem("token", res.data.token);
                },
                logout: async function () {
                    localStorage.removeItem("token");
                },
                getUser: async function () {
                    await axios.get("/users/getuser-token");
                }
            }
        });
    </script>
</body>
</html>
````
#### JWT (json web token) 原理
[JSON Web Token 中文文档](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

1. Bearer Token 包含三个组成部分: 令牌头、payload、哈希;

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJkYXRhIjoidGVzdCIsImV4cCI6MTU5MzIzNzEyMSwiaWF0IjoxNTkzMjMzNTIxfQ.
iELaYYzMLZDYq-lPRErNQwd6Ri-ElO-tYLsNSeZOn44
```

```javascript
// jsonwebtoken.js
const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const opt = {
    secret: 'jwt_secret',
    key: 'user'
}
const user = {
    username: 'abc',
    password: '111111'
}
const token = jsonwebtoken.sign({
    data: user,
    // 设置 token 过期时间
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secret)

console.log('⽣生成token:' + token)
// ⽣生成 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTQ2OTQyMzk1LCJpYXQiOjE1NDY5Mzg3OTV9.VPBCQgLB7XPBq3RdHK9WQMkPp3dw65JzEKm_LZZjP9Y

console.log('解码:', jsonwebtoken.verify(token, secret, opt))
// 解码: { data: { username: 'abc', password: '111111' },exp: 1546942395,iat: 1546938795 }
```
#### OAuth (开放授权)

三方登入主要基于 `OAuth 2.0` OAuth 协议为用户资源的授权提供了一个安全的、开放而又简易的标准. 与以往的授权方式不同之处是 `OAUTH` 的授权不会使第三方触及到用户的帐号信息
(如用户名与密码) , 即第三方无需使⽤用户的用户名与密码就可以申请获得该用户资源的授权, 因此 `OAUTH` 是安全的;

开放授权实现第三方登录:github 提供授权登录的服务, 这里我们可以做一个第三方登录测试;

打开 github 的 setting:

![打开 setting](/res/auth01.png)

![OAuth apps](/res/auth02.png)

![OAuth apps](/res/auth03.png)

创建完成之后进入页面可以拿到 `Client ID` 和 `Client Secret` 两个参数, 我们可以本地测试一下 github 的第三方登录;

[OAuth github 登录客户端](docs/WebServer/Node/res/鉴权/oauth/index-html.md)

[OAuth github 登录服务端](docs/WebServer/Node/res/鉴权/oauth/index-js.md)

后面就可以直接在软件里面使用 github 登录了;

### Egg.js MVC 分层

Egg.js 三层结构:
+ 信息资源层, 就是 action, 或者是 servlet, 用来处理上下游数据结构;
+ 业务逻辑层一般应用中会有一层 service 抽象, 实现核心业务逻辑, 事务控制也在这一层完成;
+ 数据访问, 也就是 dao 层, 重点负责数据库访问, 完成持久化功能;

创建项目:
````bash
npm install egg-init -g

#  egg 是创建的文件夹名称
egg-init egg --type=simple

cd egg
npm install
npm run dev
````
`Egg.js` 遵循约定优于配置 (convention over configuration), 也称为按照约定编程, 是一种软件范式, 意在减少软件开发人员需做决定的数量, 简单而又不失灵活;

+ 1. 创建一个控制器:

***app/controller/user.js***
````javascript
'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
    async index() {
        this.ctx.body = await this.ctx.service.user.getAll();
    }
}
module.exports = UserController;
````
+ 2. 创建一个服务:

***app/service/user.js***
````javascript
'use strict';
const Service = require('egg').Service;

class UserService extends Service {
    async getAll() {
        return [
            { name: 'tom' }, { name: 'jerry' }
        ]
    }
}
module.exports = UserService;
````

+ 3. 新增一个路由:

***app/routes.js***
````javascript
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/user', controller.user.index);
};
````
创建一个模型: 以 `mysql` + `sequelize` 为例演示数据持久化;

安装:
````bash
npm install egg-sequelize mysql2
````
+ 4. 在 `config/plugin.js` 中引入 `egg-sequelize` 插件:

***config/plugin.js***
````javascript
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    }
};
````
+ 5. 在 `config/config.default.js` 中编写 `sequelize` 配置:

***config/config.default.js***
````javascript
//...
// add your user config here
const userConfig = {
    sequelize: {
        dialect: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "root",
        database: "test"
    }
};
//...
````
+ 6. 编写 User 模型:

***app/model/user.js***
````javascript
module.exports = app =>{
    const { STRING } = app.Sequelize;

    const User = app.model.define(
        "user",
        { name:STRING(30) },
        { timestamps:false }
    )
    
    // 同步数据
    User.sync({force:true})
    
    return User;
}
````
+ 7. 在 service 或者是 controller 中调用

````javascript
// service
class UserService extends Service {
    async getAll() {
        return await this.ctx.model.User.findAll();
    }
}

// 或者是在控制器中
class UserController extends Controller {
    async index() {
        this.ctx.body = await this.ctx.model.User.findAll();
    }
}
````
[MVC分层架构实现](docs/WebServer/Node/res/Egg分层原理/kgg/index.md)

### Egg 最佳实践
[Egg 中文网](https://eggjs.org/zh-cn/)

创建项目:
````bash
npm install egg-init -g

egg-init egg-server --type=simple
cd egg-server
npm install

npm run dev
````

#### Swagger-doc 接口定义
[egg-swagger-doc-feat 文档](https://www.npmjs.com/package/egg-swagger-doc-feat)

通常, 我们在写 api 接口的时候, 还需要额外的提供接口文档, 我们可以使用 `Swagger-doc` 来代替人工手写接口文档;

+ 1. 添加 controller 方法;

***app/controller/user.js***
````javascript
const Controller = require('egg').Controller;

/**
 * @Controller 用户管理
 */
class UserController extends Controller{
    constructor(ctx){
        super(ctx);
    }

    /**
     * @summary 创建用户
     * @description 创建用户，记录用户账户/密码/类型
     * @router post /api/user
     * @request body createUserRequest *body
     * @response 200 baseResponse 创建成功
     */
    async create(){
        const { ctx } = this;
        ctx.body = "user controller"
    }
}

module.exports = UserController;
````
+ 2. 创建生成 doc 文档的依赖, 在 app 目录下新建一个 contract 目录 (这个目录名是基于后面使用的插件的名称), 创建 `index.js `, 这个文件是所有接口使用的通用接口规范：

***app/contract/index.js***
````javascript
module.exports = {
    baseRequest: {
        id: { 
            type: 'string', 
            description: 'id 唯一键', 
            required: true, 
            example: '1' 
        },
    },
    baseResponse: {
        code: { 
            type: 'integer', 
            required: true, 
            example: 0 
        },
        data: { 
            type: 'string', 
            example: '请求成功' 
        },
        errorMessage: { 
            type: 'string', 
            example: '请求成功' 
        },
    },
};
````
定义接口规范, 对应 controller 里面的注释方法;

***app/contract/user.js***
````javascript
module.exports = {
    createUserRequest: {
        mobile: {
            type: 'string', 
            required: true, 
            description: '手机号', 
            example:'18801731528', 
            format: /^1[34578]\d{9}$/,
        },
        password: {
            type: 'string', 
            required: true, 
            description: '密码', 
            example:'111111',
        },
        realName: {
            type: 'string', 
            required: true, 
            description: '姓名', 
            example: 'Tom'
        },
    },
}
````
截止到这一步, 这个 doc 文档是一个很完整的文档了, 但是, 有一个问题就是我们每次需要加一个接口的时候, 都需要在 `router.js` 里面添加一个路由, 这一步其实是有点多余, 且繁琐;

`egg-swagger-doc-feat` 同时也提供了自动注册路由的功能;

+ 3. 添加 `SwaggerDoc` 功能

````bash
# 插件功能
# 1. 自动生成 doc 接口文档
# 2. 自动注册路由
npm install egg-swagger-doc-feat -s
````

安装完成之后修改 `config` 配置, 同时, 还需要在插件里面去添加 `Swagger` 的文档输出的配置

***config/plugin.js***
````javascript
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    swaggerdoc : {
        enable: true,
        package: 'egg-swagger-doc-feat',
    }
};
````

***config/config.default.js***
````javascript
//...
config.swaggerdoc = {
    // 指定插件去扫描哪个目录产生文档
    dirScanner: './app/controller',
    // api 接口信息
    apiInfo: {
        title: '管理后台 api 接口',
        description: '管理后台 swagger-ui for egg',
        version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,        // 作者目前没有实现这个功能
    // 自动生成 router 路由
    routerMap: true,
    enable: true,
}
//...
````
到此一个完整的 `swagger` api 文档就创建好了;

````bash
npm run dev
# Server on http://127.0.0.1:7001
# http://127.0.0.1:7001/swagger-ui.html
# http://127.0.0.1:7001/swagger-doc
````

#### 统一异常处理
当接口遇到异常的时候, 异常结果会一层一层的抛出, 所以最好的做法就是给 api 添加中间件, 专门来处理异常;

+ 1. app 目录下面新建一个 `middleware` 文件夹, 用来存放中间件:
    + 增加异常处理的中间件;
    + 异常统一处理;
    + 开发环境返回详细的异常信息;
    + 生产环境不返回详细信息;

***app/middleware/error_handler.js***
````javascript
module.exports = (option,app) =>{
    return async function(ctx,next){
        try {
            await next();
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            app.emit("error",err,this);

            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const status = err.status || 500
            const error = status == 500 && app.config.env == 'prod' ? "Internal Server Error" : err.message;

            // 返回给前端错误信息
            ctx.body = {
                status: status,
                error:error
            }
            if (status === 422) {
                ctx.body.detail = err.errors
            }
            ctx.status = 200;
        }
    }
}
````
创建完成之后需要在 `config` 里面配置一下 `error` 中间件:

***config/config.default.js***
````javascript
//...
// add your middleware config here
config.middleware = [
    "errorHandler"
];
//...
````
#### 扩展 Helper 响应统一处理
通常我们在写 api 接口的时候, 需要做到一个统一的返回处理: 例如 
```javascript
{
    state:"success",
    message:"请求成功~",
    data:[]
}
```

`helper` 方法实现统一响应格式: 
+ `Helper` 函数用来提供一些实用的 `util` 函数;
+ 它的作用在于我们可以将一些常用的动作抽离在 `helper.j`s 里面成为一个独立的函数, 这样可以用 `JavaScript` 来写复杂的逻辑, 避免逻辑分散各处. 另外还有一个好处是 `Helper` 这样一个简单的函数, 可以让我们更容易编写测试用例;
+ 框架内置了一些常用的 `Helper` 函数, 我们也可以编写自定义的 `Helper` 函数;


在 app 文件夹里面创建 `extend` 文件夹(egg 约定名称), 创建 `helper`:

***app/extend/helper.js***
````javascript
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format("YYYY-MM-DD HH:mm:ss");

// 处理成功响应
exports.success = ({ctx,res = null,message = "请求成功~"}) =>{
    ctx.body = {
        state:"success",
        message:message,
        data:res
    }
    ctx.status = 200;
}
````
完成之后直接在 `controller` 里面调用了:

***app/controller/user.js***
````javascript
//...
async create(){
    const { ctx } = this;
    const res = {
        name:"zhangsan",
        age:24
    }
    ctx.helper.success({ctx,res});
}
//...
````

#### Validate 接口格式检查
接口校验, 例如我们在 `contract` 里面定义的传参规范, 而前端没有按照接口的规范来, 这个时候就需要对输入做一些校验了;

安装:
````bash
npm i egg-validate -s
````
修改 `config` 配置:
````javascript
// config/plugin.js
validate: {
    enable: true,
    package: 'egg-validate',
},
````
完成之后, 我们就可以直接在 `controller` 里面使用 `contract` 里定义的规则了, 如果前端没有按照规则传入参数, 会抛出一个 `422` 错误;

***app/controller/user.js***
````javascript
//...
async create(){
    const { ctx } = this;
    
    // 参数校验
    ctx.validate(ctx.rule.createUserRequest);

    const res = {
        name:"zhangsan",
        age:24
    }
    ctx.helper.success({ctx,res});
}
//...
````
#### MVC 三层结构
+ 1. 添加 `Model` 层, 用于和处理数据或和数据库交互, 这里使用的是 `mongoodb`;

```bash
npm install egg-mongoose -s
```
```javascript
// config/plugin.js
mongoose : {
    enable: true,
    package: 'egg-mongoose',
},
```
```javascript
// config/config.default.js
//...
config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/test',
    options: {
        // useMongoClient: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
    },
}
//...
```
+ 2. 注册模型, app 目录下面添加 model 目录, 新建用户模型

***app/model/user.js***
````javascript
module.exports = app => {
    const mongoose = app.mongoose
    const UserSchema = new mongoose.Schema({
        mobile: { 
            type: String, 
            unique: true, 
            required: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        realName: { 
            type: String, 
            required: true 
        },
        avatar: {
            type: String, 
            default:'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'
        },
        extra: { 
            type: mongoose.Schema.Types.Mixed 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    })
    return mongoose.model('User', UserSchema)
}
````

+ 3. 添加 `Service` 层;

创建用户的时候, 我们的密码不能以铭文的形式存在数据库里面, 可以使用 hash 模式; 安装 hash 依赖库;
````bash
npm install egg-bcrypt -s
````
````javascript
// config/plugin.js
//...
bcrypt : {
    enable: true,
    package: 'egg-bcrypt'
}
````
在 app 目录下面新建 `service`(egg 约定目录) 目录, 新建一个 `user.js`:

***app/service/user.js***
````javascript
const Service = require('egg').Service
class UserService extends Service {
    /**
    * 创建用户
    * @param {*} payload
    */
    async create(payload) {
        const { ctx } = this
        // genHash 是 egg-bcrypt 插件的功能;
        payload.password = await this.ctx.genHash(payload.password)
        return ctx.model.User.create(payload)
    }
}
module.exports = UserService
````
`Controller `调用:

***app/controller/user.js***
````javascript
//...
async create(){
    const { ctx } = this;
    
    // 调用 service , 组装参数
    const payload = ctx.request.body || {};
    const res = await this.service.user.create(payload);

    ctx.helper.success({ctx,res});
}
//...
````
到此, 一个完整的 egg 创建用户的功能就完成了, 我们可以打开 swagger 文档测试一下, 调用完接口之后会返回调用结果, 数据库里面也会多一条 user 的数据;

#### 生命周期初始化
正常情况下, 我们在开发过程中反复调试, 会对开发造成一定的困扰, 这个时候我们就需要在程序启动的时候就帮我们把依赖的一些服务做好, 包括 mongoodb 的初始化, 或者是测试数据自动做好;

默认情况下, egg 创建的项目是没有程序入口的, 但实际上我们可以在项目里面定制项目启动的主程序; 在根目录下面新建一个 `app.js` 文件:

````javascript
// app.js
/**
* 全局定义
* @param app
*/
class AppBootHook {
    constructor(app) {
        this.app = app;
        app.root_path = __dirname;
    }
    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }
    configDidLoad() {
        // Config, plugin files have been loaded.
    }
    async didLoad() {
        // All files have loaded, start plugin here.
    }
    async willReady() {
        // All plugins have started, can do some thing before app ready
    }
    async didReady() {
        // Worker is ready, can do some things 
        // don't need to block the app boot.
        console.log('========Init Data=========')
        const ctx = await this.app.createAnonymousContext();
        // 操作数据模型和 service 层, 对数据做一些初始化的工作;
        await ctx.model.User.remove();
        await ctx.service.user.create({
            mobile: '13611388415',
            password: '111111',
            realName: 'hope',
        })
    }
    async serverDidReady() {

    }
    async beforeClose() {
        // Do some thing before app close.
    }
}
````
每次程序启动的时候都会执行这一个文件;

#### JWT 统一鉴权
用户鉴权模块, 这里使用 egg-jwt 模块;
````bash
npm install egg-jwt -s
````
````javascript
// config/plugin.js
//...
jwt:{
    enable: true,
    package: 'egg-jwt',
}
````
````javascript
// config/config.default.js
//...
config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    // 以 api 开头的接口都需要鉴权;
    match: /^\/api/, // optional
}
// 这里我们可以将接口设计为 /api 为通用接口, 其他不需要鉴权的接口可以单独路由;
````
+ 1. 发放 token 的逻辑单独提取出来, `service ` 层新建一个 `actionToken.js`:

***app/service/actionToken.js***
````javascript
const Service = require('egg').Service;

class ActionToken extends Service{
    async apply(_id){
        const { ctx } = this;
        // sign 是 egg-jwt 插件扩展的方法
        return ctx.app.jwt.sign({
            data:{
                _id:_id
            },
            exp:Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        },ctx.app.config.jwt.secret)
    }
}

module.exports = ActionToken;
````
+ 2. 用来处理 Login 发放令牌, 校验用户名和密码是否正确, 正确就发放令牌; `service ` 层新建一个 `userAccess.js`:

***app/service/userAccess.js***
````javascript
const Service = require('egg').Service;

class UserAccessService extends Service{
    async login(payload){
        const { ctx,service } = this;
        // 用传入的手机号去查找 user 是否存在
        const user = await service.user.findByMobile(payload.mobile);
        if(!user) ctx.throw(404,"user not found");

        // compare 函数是 egg-bcrypt 插件提供的方法; 用传入的密码和数据库里面查询出来的密码进行对比
        let verifyPsw = await ctx.compare(payload.password,user.password);
        if(!verifyPsw) ctx.throw(404,"user password is error");

        return {
            token:await service.actionToken.apply(user._id)
        }
    }

    // 返回当前用户信息
    async current(){
        const { ctx,service } = this;
        const _id = ctx.state.user.data._id;
        const user = await service.user.find(_id);
        if(!user) ctx.throw(404,'user not found');

        return user;
    }
}

module.exports = UserAccessService;
````
+ 3. Controller 里面新建 `userAccess.js` 来处理用户登录; 

***app/controller/userAccess.js***
````javascript
'use strict'
const Controller = require('egg').Controller
/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
    /**
     * @summary 用户登入
     * @description 用户登入
     * @router post /auth/jwt/login
     * @request body loginRequest *body
     * @response 200 baseResponse 创建成功
     */
    async login() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(ctx.rule.loginRequest);
        // 组装参数
        const payload = ctx.request.body || {}

        // 调用 Service 进行业务处理
        const res = await service.userAccess.login(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }
}

module.exports = UserAccessController
````
当然, 用户登录也是需要对登录的参数进行校验的, 所以在 `contract` 里面需要增加 `userAccess.js`;

***app/contract/userAccess.js***
````javascript
module.exports = {
    loginRequest: {
        mobile: {
            type: 'string', 
            required: true, 
            description: '手机号', 
            example: '18801731528', 
            format: /^1[34578]\d{9}$/,
        },
        password: {
            type: 'string', 
            required: true, 
            description: '密码', 
            example:'111111',
        },
    },
}
````
#### 文件上传
安装依赖:
````bash
npm i await-stream-ready stream-wormhole image-downloader -s
````
***app/controller/upload.js***
````javascript
const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const download = require('image-downloader')
/**
 * @Controller 上传
 */
class UploadController extends Controller {
    constructor(ctx) {
        super(ctx)
    }

    /**
     * @summary 上传单个文件
     * @description 上传单个文件
     * @router post /upload/single
     */
    async create() {
        const { ctx } = this
        // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
        // 只支持上传一个文件。
        // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
        const stream = await ctx.getFileStream()
        // 所有表单字段都能通过 `stream.fields` 获取到
        const filename = path.basename(stream.filename) // 文件名称
        const extname = path.extname(stream.filename).toLowerCase() // 文件扩展名称
        const uuid = (Math.random() * 999999).toFixed()

        // 组装参数 stream
        const target = path.join(this.config.baseDir, 'app/public/uploads', `${uuid}${extname}`)
        const writeStream = fs.createWriteStream(target)
        // 文件处理，上传到云存储等等
        try {
            await awaitWriteStream(stream.pipe(writeStream))
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream)
            throw err
        }
        // 调用 Service 进行业务处理
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}

module.exports = UploadController
````

### 部署 Nginx & pm2 & Docker

#### 构建一个高可用的 Node 环境

由于 Node 是单线程的, 当我们使用 Node 作为服务端开发语言的时候, 如果 Node 的程序出错了, 整个服务都会停止; 

主要解决问题：
- 故障恢复
- 多核利用
- 多进程共享端口

````javascript
// app.js
const http = require("http");
const server = http.createServer((request,response)=>{
    Math.random() > 0.3 ? abc() : '';
    response.end("Hello Node");
})

if(!module.parent){
    server.listen(3001,()=>{
        console.log("http server listen on localhost:3001");
    })
}else{
    module.exports = server;
}


// cluster.js
const cluster = require('cluster');
const os = require('os');
const process = require('process');

const cupNums = os.cpus().length;

const workers = {};
// 是否运行在主进程上
if(cluster.isMaster){
    // 重启进程之前先看一下, 是否有进程处于退出状态(程序报错);
    cluster.on('exit',(worker,code,signal)=>{
        console.log("工作进程 %d 重启中~",worker.process.pid);
        // 删除掉退出的进程
        delete workers[worker.process.pid];
        // 启动一个新的进程
        worker = cluster.fork();
        workers[worker.process.pid] = worker;
    })

    console.log("cupNums",cupNums);
    for(var i = 0; i < cupNums; i++){
        var worker = cluster.fork();
        workers[worker.process.pid] = worker;
    }
}else{
    var app = require("./app");
    app.listen(3001,()=>{ console.log("http server listen on localhost:3001") });
}

// 当主进程被关闭的时候(ctrl + c), 停止所有的子进程
process.on('SIGTERM',()=>{
    for(var pid in workers){
        process.kill(pid);
    }
    process.exit(0);
})

// node cluster.js   http://localhost:3001  当程序发生错误的时候, cluster 会自动重新启动子进程来拉起服务;
````

#### pm2 的应用

`cluster` 模块可以让我们充分利用计算机的核心, 来开启多进程运行程序, 一旦其中一个进程挂掉, 会马上重新启动一个新的进程; 而实际工作中, 通常都会使用 `pm2` 这样的工具来进行进程守护;

`pm2` 应用的特点:
- 内建负载均衡 (使用 Node cluster 集群模块、子进程, 可以参考朴灵 <深入浅出 Node.js> 第九章);
- 线程守护, keep-alive;
- 0 秒停机重载, 维护升级的时候不需要停机;
- Linux (stable) & MacOSx (stable) & Windows (stable).多平台支持;
- 停止不稳定的进程( 避免无限循环 );
- 控制台检测 (https://app.pm2.io/bucket/5f1c01e20a96997208c56a0b/backend/overview/servers);
- 提供 http api;

[pm2 官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/)

安装:

```bash
npm install pm2 -g

# 直接启动
pm2 start app.js

# 查看 log
pm2 logs

# 启动多核 watch 会监听程序变化自动重启, 通常用于自动化部署   i 2 表示启动两个进程  max 为最大核心数
pm2 start app.js --watch -i 2
pm2 start app.js --watch -i max

# 杀掉所有进程
pm2 kill
```
在生产环境下面, 如果要每次都这样使用命令行来启动 `pm2` 有些繁琐, 可以使用 `process.yml` 来对 `pm2` 进行配置; 直接在程序运行的根目录下面新建 `process.yml`:

```bash
apps:
    - script: app.js
      instances: 2
      watch: true
      env: 
        NODE_ENV: production

# pm2 start process.yml
```
##### pm2 在线监控

[pm2 在线监控](https://app.pm2.io/bucket/5f1c01e20a96997208c56a0b/backend/overview/servers)

在网站上创建一个新的 `bucket`, 创建好之后会自动生成两个随机字符, 然后执行:

```bash
pm2 link ibt2pe6ax8yetiz vawrb0621ly52v3
```
执行完成, 重新 `pm2 start process.yml` 就可以在网站上看到实时监控了;



