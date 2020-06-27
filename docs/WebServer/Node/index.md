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



