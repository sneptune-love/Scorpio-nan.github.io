### 简述

`ECMAScript 6.0` (以下简称 ES6 )是 `JavaScript` 语言的下一代标准，已经在 2015 年 6 月正式发布了. 它的目标, 是使得 JavaScript 语言可以用来编写复杂的大型应用程序, 成为企业级开发语言.
回顾近两年的前端开发, 复杂度确实在快速增加, 近期不论从系统复杂度还是到前端开发人员数量应该达到了一个饱和值, 换个方式说, 没有ES6我们的前端代码依旧可以写很多复杂的应用, 而ES6的提出更好的帮我们解决了很多历史遗留问题, 另一个角度ES6让JS更适合开发大型应用, 而不用引用太多的库了;

#### ES6 简述
这篇笔记里面不是要说 ES6 ,具体 ES6 里面新增了哪些特性参考 [`阮一峰老师ES6入门`](http://es6.ruanyifeng.com/); 

ES6 的出现为我们开发大型的应用程序带来了极大的便利, 但是并不是所有的主流浏览器都支持 ES6 的新特性; 试想一下, 我们如果用到 ES6 里面的一些新的特性编写的程序, 发布上线的时候发现它并不兼容市面上的主流浏览器, 那就坑爹了; 所以就有了 `babel` 这样的预编译工具, 它能够将我们的 `javascript ` 脚本里面的 js 代码提前编译成 ES5 的代码;

#### babel 预编译器
`babel`的使用方法也是比较简单的, 直接从 npm 上下载下来就可以在浏览器里面直接使用了; 详见- [babel入门教程](https://www.kancloud.cn/digest/babel/217104);
`````bash
npm install babel-core@5
`````
运行上面的命令之后, 就可以在当前目录的 `node_modules/babel-core/` 子目录里面, 找到 `babel` 的浏览器版本 `browser.js`;
> 这里需要注意的是 `babel` 官方从 6.0 版本之后, 就不再直接提供浏览器版本, 而是要使用构建工具构建出来; 所以我们上面 npm 安装的时候安装的是 5x 的版本;

然后, 将下面的代码插入网页:
`````html
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
    //ES6 code
</script>
`````
上面代码中, `browser.js` 是 `Babel` 提供的转换器脚本, 可以在浏览器运行. 用户的 ES6 脚本放在 script 标签之中, 但是要注明 `type="text/babel"`;

但是, 这样做有一个问题就是用户体验比较差; `babel` 单文件体积就有 700k +; 并且, 预编译也是需要时间的, 这样就导致每次打开页面的时候会白屏一段时间; 所以我们就需要使用构建工具来构建我们的项目;

### Webpack 开发环境搭建
`webpack` 是一个现代 `javascript `应用程序的静态资源模块打包器; `webpack` 的出现, 也为大前端的概念奠定了基础, 让前端开发能够在互联网各个领域大放光彩; `webpack`的基本概念参考[webpack官网](https://www.webpackjs.com/concepts/)

#### 项目初始化
在命令行中输入以下命令, 然后一路回车, npm 就会为我们在文件夹里面生成一个 `package.json` 文件, 这个 json 文件主要包含了我们项目开发环境和生产环境的依赖包;文件详细说明参照 [阮一峰 JavaScript标准参考](https://javascript.ruanyifeng.com/nodejs/packagejson.html);
`````bash
npm init
`````
![Alt text](/img/init.png)

#### 安装 Webpack
`````bash
npm install webpack webpack-cli -D
`````







