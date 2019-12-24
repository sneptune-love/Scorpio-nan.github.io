### 简述
现在, 越来越多的科技公司和开发者在使用 `NodeJS`开发各种应用, `NodeJS` 除了能够辅助大前端开发之外, 还可以编写 `web` 应用, 封装 `api` , 组装 `RPC` 服务等; 甚至还可以开发 `VScode` 编辑器一样的客户端应用; 

与传统的服务端语言相比, `NodeJS` 简单易学, 性能好, 部署容易, 能够轻松处理高并发场景下的大量服务器请求; `NodeJS` 周边的生态也非常强大, `NPM`(Node包管理)上有几十万个模块; 

目前 `NodeJS` 在大部分领域都占有一席之地, 尤其是 I/O 密集型的, 比如 `Web` 开发, 微服务, 前端构建等.不少大型网站都是使用 `NodeJS` 作为后台开发语言的, 用的最多的就是使用 `NodeJS` 做前端渲染和架构优化, 比如淘宝双十一, 去哪儿网 的 PC 端核心业务等. 另外, 有不少知名的前端库也是使用 `NodeJS` 开发的, 比如 `Webpack` 是一个强大的打包器, `React/Vue` 是成熟的前端组件化框架.

>这里不对 NodeJS 的基础概念和用法做阐述, 具体概念和 API 详见 [NodeJS 中文官网](http://nodejs.cn/api/);



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