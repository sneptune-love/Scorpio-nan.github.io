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

### Webpack安装与使用
> 注: 本文档中的 `webpack` 使用的是 4.40.2 的版本, 如果依赖包报错, 需要升级版本再安装使用

`webpack` 是一个现代 `javascript `应用程序的静态资源模块打包器; `webpack` 的出现, 也为大前端的概念奠定了基础, 让前端开发能够在互联网各个领域大放光彩; `webpack`的基本概念参考[webpack官网](https://www.webpackjs.com/concepts/) 还有 `Github` 上面一个优秀的 [awesome-webpack](https://github.com/webpack-china/awesome-webpack-cn) 的中文项目;

#### 项目初始化
> Node 5 以后就内置 npm 了

在命令行中输入以下命令, 然后一路回车, npm 就会为我们在文件夹里面生成一个 `package.json` 文件, 这个 json 文件主要包含了我们项目开发环境和生产环境的依赖包;文件详细说明参照 [阮一峰 JavaScript标准参考](https://javascript.ruanyifeng.com/nodejs/packagejson.html);
`````bash
npm init
`````
执行完 `init` 命令之后, 我们的目录里面会多出来一个 `package.json` 文件, 里面有包含一些默认的配置:

***package.json***
`````json
{
    "name": "webpack-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
}
`````

#### 安装 Webpack
`````bash
# npm i -D npm install webpack webpack-cli --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies
# 安装最新稳定版
npm i webpack webpack-cli -D

# 安装指定版本
npm i webpack@<version>

# 安装最新体验版本
npm i -D webpack@beta
`````
安装完成之后, 我们目录下面就会自动创建一个 `node_modules` 文件夹, 这个文件夹存放的是我们开发项目使用的一些依赖包; `npm` 会将这些依赖统一管理起来 [npm 模块安装机制](http://www.ruanyifeng.com/blog/2016/01/npm-install.html);

并且, 在 `package.json` 下面会有一个 `devDependencies` 对象, 这个是存放开发环境时候的依赖, 比如 `scss-loader` , `babel-loader` 等 [package.json](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

***package.json***
````json
...
"devDependencies": {
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9"
}
````
#### 使用 Webpack
上面, 我们用 `npm` 安装完成 `webpack` 之后, 就可以简单的使用一下; 我们通过 `wwebpack` 构建一个 `CommonJS` 模块化编写的项目, 该项目会通过 `webpack` 编译后的 `javascript` 在网页中输入内容;

首先, 我们在 `package.json` 同级目录下面新建一个 `index.html` 文件, 文件内容如下:
`````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
</head>
<body>
    <div id="app"></div>
	<script src="dist/bundle.min.js"></script>
</body>
</html>
`````
然后我们再新建一个 `src` 文件夹; 同时在 `src` 文件夹内分别创建两个 `main.js`, `utils.js`; 内容如下：

***utils.js***
`````javascript
// 通过 CommonJS 规范导出模块
module.exports = {
    innerText:function(content){
        document.getElementById('app').innerText = content;
    }
}
`````
***main.js***
`````javascript
// 通过 CommonJS 规范导入模块
const innerText = require('./utils').innerText;

innerText('Hello Webpack');
`````
这个时候, 我们的 `index.html` 文件里面引入的是 `dist` 目录下面的 `bundle,min.js` , `src` 目录下面的文件还不能被执行, 并且如果直接引入 `src` 目录下面的文件会报错; 我们就需要借用 `webpack` 来编译它;

首先, 如果我们要执行 `webpack` 的编译命令, 我们必须在根目录下面新建一个 `webpack.config.js`, 这个时候执行 `webpack` 命令的时候, `webpack` 就会自动去读取配置文件;

***webpack.config.js***
`````javascript
const path = require('path');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    }
}
`````
此时, 项目目录如下：
`````txt
|-- node_modules
|-- src
|	|-- main.js
|	|-- utils.js
|-- index.html
|-- package.json
|-- package-lock.json
|-- webpack.config.js
`````
一切准备就绪, 我们可以直接在目录下面打开命令行, 执行 `webpack` 命令:
`````bash
Hash: fec2385b4890bdc131de
Version: webpack 4.40.2
Time: 481ms
Built at: 2019-09-24 14:13:30
        Asset      Size  Chunks             Chunk Names
bundle.min.js  1.04 KiB       0  [emitted]  main
Entrypoint main = bundle.min.js
[0] ./src/main.js 117 bytes {0} [built]
[1] ./src/utils.js 162 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
`````
我们可以看到命令行里面的输出日志, 提示我们已经将 `./src/mian.js` 和 `./src/utils.js` 输出到了 `bundle.min.js` 里面, 并且下面输出了一个警告, 提醒我们运行 `webpack` 命令的时候没有给 `webpack` 设置 `mode` 环境 [webpack 模式(mode)](https://www.webpackjs.com/concepts/mode/); 

`mode` 告知 `webpack `使用相应模式的内置优化, 有两个模式可以选择 `development` 和 `production`; 我们可以将 `mode` 写进配置文件里面:
`````javascript
module.exports = {
    ...
    mode:"production"
}
`````
或者, 我们可以直接通过命令的方式设置 `mode`：
`````bash
webpack --mode=production
`````
> 配置为 `production` 的时候, `webpack` 会默认开启文件压缩, 并去掉代码里面的注释;

执行完后会发现目录下面多了一个 `dist` 文件夹, 里面有一个 `bundle.min.js` 文件, `bundle.min.js` 是一个可执行的 `javascript`文件, 它包含页面所依赖的两个模块 `main.js` 和 `utils.js` 以及内置的 `webpackBootstrap`启动函数, 这个时候我们可以用浏览器打开 `index.html` 文件, 就可以看到我们在 `main.js` 里面输入的文字被输出到了网页上;

#### 使用Loader
`loader` 是 `webpack`的核心概念之一, 它的基本工作流程是将一个文件以字符串的形式读取, 对其进行语法分析及转换, 转换成 `javascript`可以识别的代码, 从而完成模块的集成;

##### css-loader && style-loader
上面, 我们用 `webpack` 构建了一个 `CommonJS`规范的模块化项目, 下面我们将使用 `css-loader` 来处理 `css` 文件; 在`src` 目录下面新建一个文件夹 `assets` 里面新建一个 `main.css` 文件:

***./css/main.css***
`````css
#app{
    color:red;
    text-align:center;
    font-size:24px;
}
`````
`Webpack` 把一切文件看作模块, `CSS `文件也不例外, 要引入` main.css` 需要像引入 `JavaScript `文件那样, 修改入口文件 `main.js `如下：

***./js/main.js***
`````javascript
// 通过 CommonJS 规范导入css文件
require('./assets/main.css');

// 通过 CommonJS 规范导入模块
const innerText = require('./utils').innerText;

innerText('Hello Webpack');
`````
这个时候如果我们再一次去执行 `webpack`, 命令行里就会输出错误信息, 提示我们需要使用某些 `loader` 去处理 `css` 文件:
`````bash
Built at: 2019-09-24 16:11:55
        Asset      Size  Chunks             Chunk Names
bundle.min.js  5.02 KiB    main  [emitted]  main
Entrypoint main = bundle.min.js
[./src/assets/main.css] 288 bytes {main} [built] [failed] [1 error]
[./src/main.js] 192 bytes {main} [built]
[./src/utils.js] 162 bytes {main} [built]

ERROR in ./src/assets/main.css 1:0
Module parse failed: Unexpected character '#' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> #app{
|     color:red;
|     text-align:center;
 @ ./src/main.js 2:0-28
`````
因为 `webpack` 不支持解析 `css`, 如果要支持非 `javascript` 的文件, 我们就需要使用 `webpack` 的 `loader` 的机制; 

下面, 我们修改一下 `webpack.config.js`:
`````javascript
const path = require('path');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
    			// 用正则去匹配要用该 loader 转换的文件 .css 结尾的
    			test:/\.css$/,
    			use:['style-loader','css-loader?sourceMap']
    		}
    	]
    }
}
`````
>`loader` 可以看做是文件转换的翻译员, 配置规则里面的 `module.rules` 配置了一组规则, 告诉了 `webpack` 在遇到了哪些文件的时候, 需要用到哪些 `loader` 去解析和转换; 

如上配置告诉 `webpack` 在遇到 `.css` 结尾的文件的时候, 先使用 `css-loader` 读取文件, 再交给 `style-loader` 把 `css` 内容注入到 `javascript` 里面;

这里需要注意的是:
- `use` 属性的值需要是一个由 `loader` 组成的数组, `loader` 的执行顺序是从后往前的;
- 每一个 `loader` 都是可以通过 `URL queryString` 的方式传入参数; (例如 `css-loader?sourceMap `中的 `sourceMap `告诉 `css-loader` 要启用 CSS 模块及其配置)

修改完之后, 我们还需要安装 `css-loader` 和 `style-loader`这两个依赖;
`````bash
npm install css-loader style-loader -D
`````
安装完成之后, 重新执行 `webpack` 命令, 就会发现 `bundle.min.js` 文件被更新了, 里面注入了 `main.css` 文件里面写的样式, 而不是重新生成一个文件; 再一次打开 `index.html` 就会发现文字居中, 并且变成了红色;

在浏览器的控制台中, 我们就可以看到 `main.css` 里面编写的样式, 被插入到了 `<head>` 标签里;

给 `loader` 传入属性除了 `queryString` 的方式外, 还可以通过 `Object` 传入, `rules`里面我们还可以改写成这样:
`````javascript
...
rules:[
    {
        // 用正则去匹配要用该 loader 转换的文件 .css 结尾的
        test:/\.css$/,
        use:['style-loader',{
            loader:'css-loader',
            options:{
                sourceMap:true
            }
        }]
    }
]
...
`````
##### file-loader && url-loader
`css-loader` 和 `style-loader` 将 CSS 进行处理, 打包到了 `bundle.min.js` 中, 下面我们对 `main.css` 做一些修改, 我们想在网页中加入我们的 logo:

***main.css***
`````css
#app{
    color:red;
    text-align:center;
    font-size:24px;
    background: url('./logo.png') no-repeat;
    background-position: left top; 
}
`````
我们在 `assets` 文件夹下面添加了一个 `logo.png` 并且在 `main.css` 文件中引入;

在一次执行 `webpack` 命令; 可以看到命令行中的报错 `ERROR in ./src/assets/logo.png 1:0`; 并且提示我们可能需要使用某些 `loader` 来处理这类文件;

因此我们需要安装一下 `file-loader`:
`````bash
npm install file-loader -D
`````
并且, 需要修改 `webpack.config.js` 如下：

***webpack.config.js***
`````javascript
const path = require('path');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
		        // 用正则去匹配要用该 loader 转换的文件 .css 结尾的
		        test:/\.css$/,
		        use:['style-loader',{
		            loader:'css-loader',
		            options:{
		                sourceMap:true
		            }
		        }]
		    },{
                // 正则匹配只要是 png ... 等文件类型就使用 file-loader 处理
		    	test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
		    	use:[{
		    		loader:'file-loader',
		    		options:{
		    			name:'[path][name].[ext]'
		    		}
		    	}]
		    }
    	]
    }
}
`````
默认情况下, `file-loader` 处理完的生成的文件名是 MD5 哈希值, 并保留引用资源的扩展名; 这里的 `options` 传入的名称是输出到原始目录, 并保留原文件名称和扩展名; 当然我们也可以通过 `options` 配置指定输出的文件路径, 详见 [file-loader](https://webpack.docschina.org/loaders/file-loader/);

再一次运行 `webpack` 之后, 重新刷新一下浏览器就可以看到 `logo.png` 被输出到了页面中;

想象一下, 如果我们页面中的图片资源较多, 这个时候就会发生很多次 `http` 的请求, 降低了页面的性能; 这个时候我们就需要用到 `url-loader` 来处理一部分的资源了; `url-loader` 会将引入的资源生成 `base64` 的字符串; 这样就会减少部分资源的请求了; 

当然, 如果引入的资源较大, `base64` 编码也会比较消耗资源, 因此`url-loader` 提供了一个 `limit` 的参数, 如果资源小于 `limit` 的就会被转码, 否则不做转码处理;

下面我们将配置文件稍微做一些改动：

***webpack.config.js***
`````javascript
const path = require('path');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
		        // 用正则去匹配要用该 loader 转换的文件 .css 结尾的
		        test:/\.css$/,
		        use:['style-loader',{
		            loader:'css-loader',
		            options:{
		                sourceMap:true
		            }
		        }]
		    },{
                // 正则匹配只要是 png ... 等文件类型就使用 file-loader 处理
		    	test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
		    	use:[{
		    		loader:'url-loader',
		    		options:{
		    			limit:10000
		    		}
		    	}]
		    }
    	]
    }
}
`````
再一次编译, 我们就可以看到之前的背景图被转换成了一串 `base64` 编码了;

简单的说, `url-loader` 封装了 `file-loader`, 在 `file-loader` 的基础上新增了 `limit` 的参数, 会把小于 `limit` 体积的资源转换成 `base64`;

##### less-loader && sass-loader 
>`less` 是一种以编程的方式书写 `css` 的语法, 支持变量、嵌套、循环等.  为我们书写样式带来的极大的便利;

在 `assets` 文件夹下面新建一个 `style.less` 文件, 内容如下：

***style.less***
`````less
@bg-color:blue;
#app{
    background:@bg-color;
}
`````
然后在 `main.js` 里面, 我们引入一下 `style.less` 文件:

***main.js***
`````javascript
// 通过 CommonJS 规范导入css文件
require('./assets/main.css');

require('./assets/style.less');

// 通过 CommonJS 规范导入模块
const innerText = require('./utils').innerText;

innerText('Hello Webpack');
`````
接下来, 修改一下 `webpack.config.js` 的配置:

***webpack.config.js***
`````javascript
...
rules:[
    {
        // 用正则去匹配要用该 loader 转换的文件 .css 结尾的
        test:/\.css$/,
        use:['style-loader',{
            loader:'css-loader',
            options:{
                sourceMap:true
            }
        }]
    },{
        test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
        use:[{
            loader:'url-loader',
            options:{
                limit:10000
            }
        }]
    },{
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
    }
]
`````
需要注意的是, 我们上面有提到 `loader` 的书写顺序, `webpack` 是从后往前处理的, 我们需要将解析 `less` 的 `loader` 放在最后面, 处理完成之后再交由前面的 `css-loader` 和 `style-loader`来处理;

修改完配置之后, 我们再来安装一下 `less-loader`:
`````bash
npm install less less-loader -D
`````
再一次编译, 就可以看到我们前面在 `main.css` 里面为 `#app` 元素添加的背景图被覆盖掉了; 

`sass-loader` 的作用也不用在赘述了, 和 `less` 的配置基本一致;

##### postcss-loader && autoprefixer 
为了浏览器的兼容性, 有时候我们必须要为 css3 属性添加 前缀:
- Trident内核：主要代表为IE浏览器, 前缀为-ms
- Gecko内核：主要代表为Firefox, 前缀为-moz
- Presto内核：主要代表为Opera, 前缀为-o
- Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit

当然, 手动去添加前缀是一个效率非常低的方法, 所以 `webpack` 也为我们提供了 `postcss-loader`, 它会给我们写的样式自动添加前缀; 那它是根据什么依据来知道我们需要为添加哪些前缀呢? 这个时候就需要用到了 `autoprefixer` ;

严格意义上来说, `autoprefixer` 是属于插件, 这里拿出来是为了配合 `postcss-loader` 来一起使用的;

首先我们需要安装一下这两个依赖：
`````bash
npm install postcss-loader autoprefixer -D
`````
安装完成之后, 修改 `webpack.config.js` 配置如下：

***webpack.config.js***
`````javascript
const path = require('path');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    // production  development
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
    			// 用正则去匹配要用该 loader 转换的文件 .css 结尾的
    			test:/\.css$/,
    			use:['style-loader',{
		            loader:'css-loader',
		            options:{
		                sourceMap:true
		            }
		        },'postcss-loader']
            },{
		    	test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
		    	use:[{
		    		loader:'url-loader',
		    		options:{
		    			limit:10000
		    		}
		    	}]
		    },{
		    	test:/\.less$/,
		    	use:['style-loader','css-loader','less-loader']
		    }
    	]
    }
}
`````
`webpack.config.js` 的配置很简单, 我们只是在 `style-loader` 的后面添加了一个 `postcss-loader`; 

当然, 只是修改了 `webpack.config.js` 的配置是不够的, 因为 `postcss-loader` 会默认读取一个 `postcss.config.js` 的配置文件, 因此, 我们还需要在根目录下面创建一个 `postcss.config.js`:

***postcss.config.js***
`````javascript
module.exports = {
	plugins:[
		require('autoprefixer')
	]
}
`````
配置完成之后, 我们可以尝试在 `main.css` 里面添加一些 CSS3 的属性：

***main.css***
`````css
#app{
    color:red;
    text-align:center;
    font-size:24px;
    background: url('./logo.png') no-repeat;
    background-position: left top; 
    transform: translateY(30px);
    box-sizing: border-box;
}
`````
这里, 我们给元素添加了 `transform` 属性, 然后再尝试执行一下 `webpack`; 

编译完成之后, 我们在浏览器里面打开 `index.html` 文件, 并查看控制台, 可以看到我们在 css 里面写的 `transform` 并没有被添加前缀; 这是为什么呢?

`autoprefixer`是一个后处理程序, 也就意味着它不象`Sass` 或者 `Less`之类的预处理器. 它适用于普通的CSS而不使用特定的语法. 可以轻松跟`Sass` 或者 `Less`集成, 正是由于它是CSS编译后运行.

简单的来说, `autoprefixer` 每个版本都内置一个 `Can I Use`的数据表:
- 当前浏览器列表以及它们的普及度;
- 新CSS属性, 值和选择器前缀列表;

`autoprefixer` 默认支持主流浏览器的最近 2 个版本, 所以我们在 Google 浏览器中看到编译出来的 CSS 属性是没有被添加前缀的;

如果我们想要去兼容低一些的版本, 可以在 `package.json` 里面去添加过滤模式, 下面我们修改一下 `package.json` 文件:

***package.json***
`````json
{
    "name": "webpack-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "autoprefixer": "^9.6.1",
        "css-loader": "^3.2.0",
        "file-loader": "^4.2.0",
        "less": "^3.10.3",
        "less-loader": "^5.0.0",
        "postcss-loader": "^3.0.0",
        "style-loader": "^1.0.0",
        "url-loader": "^2.1.0",
        "webpack": "^4.40.2",
        "webpack-cli": "^3.3.9"
    },
    "browserslist": [
        "last 2 versions",
        "> 1%",
        "iOS >= 7",
        "Firefox >= 20",
        "Android > 4.4"
    ]
}
`````
这里, 我们为 `package.json` 添加了 `browserslist` 字段, 标识 `autoprefixer` 需要怎么去处理样式;
- `"last 2 versions"` 表示主流浏览器最近 2 个版本
- `"> 1%"` 表示全球统计 1% 以上的用户占有率的浏览器
- `"iOS >= 7"` 表示需要兼容到 IOS7 及以上

> 更多 `browserslist` 配置详见 [Browserslist](https://github.com/browserslist/browserslist), 网站 [browserl.ist](https://browserl.ist/);

再一次执行 `webpack` 命令, 就可以在浏览器里面看到CSS样式被自动添加上了浏览器前缀了;

##### babel-core babel-loader babel-preset-env
>`Babel` 是一个 `JavaScript` 编译器, 能将 ES6/ES7 代码转为 ES5 代码, 让我们使用最新的语言特性而不用担心兼容性问题，并且可以通过插件机制根据需求灵活的扩展;

开头我们有提到过, ES6/ES7 的出现, 使得 `javascript` 开发大型的应用也变的游刃有余, 但是并不是所有的浏览器都支持 `es6+` 的语法, 因此我们需要使用 `babel` 来将我们的代码转换成 ES5 的;

我们需要安装一下 `babel` 的依赖：
`````bash
npm install babel-loader @babel/core @babel/preset-env -D
`````
下面, 我们将 `main.js` 和 `utils.js` 的 `CommonJS` 规范编写的语法, 修改为 `ES`的语法：

***main.js***
`````javascript
// 通过 ES 规范导入css文件
import './assets/main.css';
import './assets/style.less';

// 通过 ES 规范导入模块
import utils from './utils';

utils.innerText('Hello Webpack');
`````
***utils.js***
`````javascript
// 通过 ES 规范导出模块
export default {
    innerText:function(content){
        document.getElementById('app').innerText = content;
    }
}
`````
然后修改一下 `webpack.config.js`, 添加一下 `babel` 依赖:

***webpack.config.js***
`````javascript
const path = require('path');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    // production  development
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
    			// 用正则去匹配要用该 loader 转换的文件 .css 结尾的
    			test:/\.css$/,
    			use:['style-loader',{
		            loader:'css-loader',
		            options:{
		                sourceMap:true
		            }
		        },'postcss-loader']
            },{
		    	test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
		    	use:[{
		    		loader:'url-loader',
		    		options:{
		    			limit:10000
		    		}
		    	}]
		    },{
		    	test:/\.less$/,
		    	use:['style-loader','css-loader','less-loader']
		    },{
                test:/\.js$/,
                //过滤掉 node_modules 文件夹, 会让 webpack 编译速度变快
		    	exclude:/node_modules/,
		    	use:{
		    		loader:'babel-loader',
		    		options:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
		    		}
		    	}
		    }
    	]
    }
}
`````
再执行一下 `webpack`, 没有任何问题, 打开 `index.html` 也能看到页面上正常输出了 `main.js` 里面插入的文本和 logo; 

`babel` 对一些公用的方法使用了非常小的辅助代码, 默认情况下会被添加到每一个需要它的文件中; 如果项目里面有多个 js 文件里面有 `Class` 语法需要转码, 那么每一个文件都会有一个重复的 `_classCallCheck` 函数定义, `@babel/plugin-transform-runtime`的一个主要作用就是从同一的地方去引用这些帮助函数, 消除代码冗余从而减小打包的文件体积;

除此之外, 他还提供了一个沙盒环境. 如果我们使用 `@babel/polyfill` 来支持使用一些 ES6+ 的新特性的话(如：Promise、Map 等), 会造成全局污染. 通过配置 `plugin-transform-runtime` 的 ` corejs` 选项可以开启沙盒环境支持, 在当前需要转码的文件中单独引入所需的新功能.

`babel` 执行编码的过程中, 会从根目录下面的 `.babelrc` 文件读取配置, `.baberc` 是一个 JSON 格式的文件, 在这里我们可以使用 `@babel/plugin-transform-runtime` 这个插件设置禁用 `babel` 自动对每个文件的 `runtime` 的注入;

当然, 首先我们还是得安装一下依赖:
`````bash
npm install @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-runtime @babel/runtime -D
`````
接下来, 我们还需要在根目录创建一个 `.babelrc` 的配置文件:
`````javascript
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime"
    ]
}
`````
`presets` 属性告诉 `babel` 要转换的源码使用了哪些新的属性, 一个 `presets` 对一组新的语法特性提供支持, 多个 `presets` 可以叠加, `presets` 是按照 `ECMAScript `草案来组织的, 可以分为三大类：

1. 已经被写入 ECMAScript 标准里的特性
 - es2015 包含在2015里加入的新特性;
 - es2016 包含在2016里加入的新特性;
 - es2017 包含在2017里加入的新特性;
 - env 包含当前所有 ECMAScript 标准里的最新特性;

2. 被社区提出来的但还未被写入 ECMAScript 标准里特性
 - stage0 只是一个美好激进的想法, 有 Babel 插件实现了对这些特性的支持, 但是不确定是否会被定为标准;
 - stage1 值得被纳入标准的特性;
 - stage2 该特性规范已经被起草, 将会被纳入标准里;
 - stage3 该特性规范已经定稿, 各大浏览器厂商和 Node.js 社区开始着手实现;
 - stage4 在接下来的一年将会加入到标准里去.

3. 为了支持一些特定应用场景下的语法, 和 `ECMAScript` 标准没有关系, 例如 `babel-preset-react` 是为了支持 React 开发中的 JSX 语法

`plugin-proposal-object-rest-spread` 是将 ES6 的对象展开操作转换成 ES5 的插件;

##### 总结
可以看到, `loader` 的本质是将所有资源转换成 js 的字符串, `loader` 为 `webpack` 增强了一些处理其他资源的功能; 合理的利用 `loader` 的特性, 会对我们使用 `webpack` 来做开发的效率事半功倍;

#### 使用plugin
`plugin` 是用来扩展 `webpack` 功能的, 通过在构建流程里面注入钩子实现, 可以理解为 `SPA` 应用中的生命周期钩子; `plugin` 系统提供给开发者监听 `webpack`生命周期并在特定事件触发时执行指定操作的能力.

在 `loader` 的使用中, 我们也接触了一些 `plugin` 例如 `autoprefixer`、`@babel/plugin-transform-runtime` 等;

##### extract-text-webpack-plugin
在 `loader` 的使用中, 我们将 `css` 作为字符串注入到了 `bundle.min.js` 中, 这样做的弊端是如果一个网站有大量的样式, 这样打包出来的 `bundle.min.js` 文件体积会非常的大; 下面我们会通过 `plugin` 把注入到 `bundle.min.js` 里面的 `css` 文件提取出来;

修改`webpack.config.js` 配置如下：
`````javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    // production  development
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
    			// 用正则去匹配要用该 loader 转换的文件 .css 结尾的
    			test:/\.css$/,
    			use:ExtractTextPlugin.extract({
    				//转换 .css 文件需要的 loader
    				use:['css-loader','postcss-loader']
    			})
            }, {
		    	test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
		    	use:[{
		    		loader:'url-loader',
		    		options:{
		    			limit:10000
		    		}
		    	}]
		    },{
		    	test:/\.less$/,
		    	use:['style-loader','css-loader','less-loader']
		    },{
                test:/\.js$/,
                //过滤掉 node_modules 文件夹, 会让 webpack 编译速度变快
		    	exclude:/node_modules/,
		    	use:{
		    		loader:'babel-loader',
		    		options:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
		    		}
		    	}
		    }
    	]
    },
    plugins:[
    	new ExtractTextPlugin({
    		// 提取出来的 .css 文件名
    		filename:`css/[name].[hash].css`
    	})
    ]
}
`````
当然, 只写好配置肯定是不能执行编译的, 我们还需要将 `extract-text-webpack-plugin` 依赖包安装一下, 这里需要注意的是该插件还是 3x 的版本, 而我们使用的 `webpack` 的版本是 4x 的版本; 所以安装的时候需要注意一下, 如果版本不对就会编译报错;
`````bash
npm install extract-text-webpack-plugin@next -D
`````
>这里的 `@next` 就是指定安装最新的版本, 安装完成之后可以查看 `package.json` 下的版本号是 `"extract-text-webpack-plugin": "^4.0.0-beta.0"`; 

再一次运行 `webpack`, 就可以看到 `dist` 目录下面多了一个 `main.47764cfe2b7eceb6ba90.css`, 我们在 `index.html` 中引入一下就可以使用了;

以上代码可以看出, `webpack` 是通过 `plugins` 属性来配置需要使用的插件列表的, `plugins` 是一个数组, 里面的每一项都是一个插件的实例, 在实例化一个插件的时候可以通过构造函数传入这个插件支持的配置属性;

##### html-webpack-plugin
在上面, 我们使用了 `extract-text-webpack-plugin` 插件将 `css` 文件从 `bundle.min.js` 中提取出来了, 但是这样有一个问题, 就是我们每一次打包完之后, 都需要手动去引入打包后的 `css` 文件, 如果 `css` 分离出多个的话, 那将是灾难性的;

所以, 这里我们需要借用另外一个插件, 来为我们自动注入打包后的 `css` 和 `js` 文件;

首先, 安装一下 `html-webpack-plugin` 这个插件, 插件介绍详见 [HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/):
`````bash
npm install html-webpack-plugin -D
`````
既然要插件为我们主动引入打包后的文件, 那 `index.html` 里面我们之前手动引入的路径就可以去掉了:

***index.html***
`````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
</head>
<body>
	<div id="app"></div>
</body>
</html>
`````
插件安装完成之后, 我们还需要去修改一下 `webpack.config.js` 的配置：

***webpack.config.js***
`````javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    // production  development
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
    	rules:[
    		{
    			// 用正则去匹配要用该 loader 转换的文件 .css 结尾的
    			test:/\.css$/,
    			use:ExtractTextPlugin.extract({
    				//转换 .css 文件需要的 loader
    				use:['css-loader','postcss-loader']
    			})
            },{
		    	test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
		    	use:[{
		    		loader:'url-loader',
		    		options:{
		    			limit:10000
		    		}
		    	}]
		    },{
		    	test:/\.less$/,
		    	use:['style-loader','css-loader','less-loader']
		    },{
                test:/\.js$/,
                //过滤掉 node_modules 文件夹, 会让 webpack 编译速度变快
		    	exclude:/node_modules/,
		    	use:{
		    		loader:'babel-loader',
		    		options:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
		    		}
		    	}
		    }
    	]
    },
    plugins:[
    	new ExtractTextPlugin({
    		// 提取出来的 .css 文件名
    		filename:'css/[name].[hash].css'
    	}),
    	new HtmlWebpackPlugin({
            //生成 html 后的文件名
            filename:'index.html',
            //选择 index.html 作为模板, 如果不传入 template 选项, webpack 会自动生成一个空的 html 文件
            template:'index.html',
            // 传入的参数为 true 或者是 body 时, 所有打包出来的 js 资源都会被插入到 body 的下面
            inject:true,
            // 生成 html 的 title
    		title:'webpack 最佳实践',
    	})
    ]
}
`````
我们为 `plugins` 添加了一个 `HtmlWebpackPlugin` 的插件, 这个插件会为我们生成一个 `.html` 文件; 

如果我们原有的 `index.html` 文件里面有引入其他的外部的资源, 那么 `template` 选项就会保留之前的引入, 并新添加打包后的资源;

下面, 我们再一次执行 `webpack` 命令, 就可以看到 `dist` 目录下面会生成一个 `.html` 文件, 并且会为我们自动引入 `css/main.ff9527568fb647be69d4.css` 和 `bundle.min.js`;

##### clean-webpack-plugin

可以看到, 我们每次修改完配置之后需要重新 `webpack` 编译一下代码, 这个时候如果是文件编译开启 `hash` 命名的话, 那么每次编译之后 `dist` 文件夹下面就会又多出来一个文件; 

我们就可以使用 `clean-webpack-plugin` 这个插件, 每次执行打包之前先清空上一次打包出来的文件;

> 如果想要在执行 `webpack` 的过程中看到执行进度, 我们还可以使用 `webpack` 内置的插件 `progress-plugin`

`````bash
npm install clean-webpack-plugin -D
`````
***webpack.config.js***
`````javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    // production  development
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                // 用正则去匹配要用该 loader 转换的文件 .css 结尾的
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    //转换 .css 文件需要的 loader
                    use:['css-loader','postcss-loader']
                })
            },{
                test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000
                    }
                }]
            },{
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },{
                test:/\.js$/,
                //过滤掉 node_modules 文件夹, 会让 webpack 编译速度变快
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins:[
    	new webpack.ProgressPlugin(),
    	new CleanWebpackPlugin(),
        new ExtractTextPlugin({
            // 提取出来的 .css 文件名
            filename:'css/[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            //生成 html 后的文件名
            filename:'index.html',
            //选择 index.html 作为模板, 如果不传入 template 选项, webpack 会自动生成一个空的 html 文件
            template:'index.html',
            // 传入的参数为 true 或者是 body 时, 所有打包出来的 js 资源都会被插入到 body 的下面
            inject:true,
            // 生成 html 的 title
            title:'webpack 最佳实践',
        })
    ]
}
`````
##### devtool
我们打包出来的代码是被 `webpack` 编译混淆过了的, 如果要在浏览器里面调试代码的话, 我们就需要开启调试模式;
***webpack.config.js***
`````javascript
...
module:{
    ...
},
plugins:[
    ...
],
devtool:'eval-source-map'
`````
devtool的参数详解:
- `source-map` 把映射文件生成到单独的文件, 最完整最慢;
- `cheap-module-source-map` 在一个单独的文件中产生一个不带列映射的Map;
- `eval-source-map` 使用eval打包源文件模块, 在同一个文件中生成完整sourcemap;
- `cheap-module-eval-source-map` `sourcemap`和打包后的JS同行显示, 没有映射列;

##### 总结
`webpack` 有着丰富的插件接口, `webpack` 自身多数的功能也都是依赖插件机制, 这个插件机制使得 `webpack` 变的及其灵活, 因此合理使用插件机制, 也是深度使用 `webpack` 的重中之重;

> 更多插件请参考 [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins);
#### 使用 DevServer
前面的章节里面, 我们只是让 `webpack` 正常运行了起来, 但是在实际开发中我们可能还会需要:
 1. 提供 HTTP 服务而不是使用本地文件预览;
 2. 监听文件的变化并自动刷新网页, 做到实时预览;
 3. 支持 Source Map, 以方便调试.

对于这些, `webpack` 其实也都是提供好了的, `webpack` 原生就支持上面 2、3 点内容, 我们再结合官方提供的开发工具 `devServer ` 也可以很方便的做到第 1 点;

`devServer` 会启动一个 HTTP 服务器用于服务网页请求, 同时会帮助启动 `webpack`, 并接收 `webpack` 发出的文件更变信号, 通过 `WebSocket` 协议自动刷新网页做到实时预览.

下面, 在之前的项目的基础上, 我们再安装一下 `devServer`工具:
`````bash
# 这里我们需要先全局安装一下, 不然执行命令的时候会报错
npm install webpack-dev-server -g
npm install webpack-dev-server -D
`````
安装成功之后, 我们再一次执行命令, 不过不是之前的 `webpack` 命令了, 我们需要执行 `webpack-dev-server` 命令, 这个时候看一下命令行, 如果上面有使用 `webpack.ProgressPlugin` 这个插件的话, 我们还可以看到命令行里面的进度;

执行完成之后, 可以看到 `i ｢wdm｣: Compiled successfully.` 这一行, 表示服务启动成功, 这个时候我们用浏览器打开 `localhost:8080` 端口就可以看到 `index.html` 里面的内容了;

`devServer` 启动后会一直驻留在后台保持运行, 访问这个网址你就能获取项目根目录下的 `index.html`, 默认启动的端口号是 `8080`; 

如果使用 `webpack 4x` 之前的版本, 可能还会报错 `bundle.min.js` 文件 404; 

这是因为 `devServer` 会把 `webpack` 构建出的文件保存在内存中, 而不是打包到 `dist` 目录下, 在要访问输出的文件时, 必须通过 HTTP 服务访问;

##### 实时预览
按照上面的步骤, 我们可以尝试着修改一下 `utils.js` 文件里面的内容:

***utils.js***
`````javascript
// 通过 ES 规范导出模块
export default {
    innerText:function(content){
    	alert('hahaha~');
        document.getElementById('app').innerText = content;
    }
}
`````
这里我们加了一行打印, `ctrl+s` 保存完之后就会发现浏览器被自动刷新, 运行出了修改后的效果;

`webpack`在启动时可以开启监听模式, 开启监听模式后 Webpack 会监听本地文件系统的变化, 发生变化时重新构建出新的结果; `webpack 4x` 的版本是默认开启的, 如果是 4x 以下的版本, 可以通过 `webpack --watch` 命令来开启监听模式;

通过 `devServer` 启动的 `webpack` 会开启监听模式, 当发生变化时重新执行完构建后通知 `devServer`.  `devServer` 会让 `webpack` 在构建出的 JavaScript 代码里注入一个代理客户端用于控制网页,网页和 `devServer` 之间通过 `webSocket` 协议通信,  以方便 `devServer` 主动向客户端发送命令;

##### devServer 配置
当然, `devServer`也是支持配置的方式去修改默认项的, 如果我们不想使用 8080 端口去启动服务, 也可以修改为其他的端口：

***webpack.config.js***
`````javascript
module.exports = {
    ...
    devServer:{
        host:'localhost',   //默认启动服务的host 是 localhost, 这里也可以替换成本机ip
        port:9000,      //服务启动的端口号
        //contentBase: path.join(__dirname,'dist')  //默认情况下，将使用当前工作目录作为提供内容的目录 不建议修改
        headers:{           //在所有的响应中添加头
            'Token':'xx'
        },
        https:{             //开启 https 服务
            key:fs.readFileSync('xx.key'),
            cert:fs.readFileSync('xx.cert'),
            ca: fs.readFileSync('xx.pem')
        },
        compress:true,       //是否开启 gzip 
        allowedHosts:[       //配置域名白名单, 只有白名单内的域名才能正常返回
            "http://www.xxx.com"
        ],
        historyApiFallback:{        //用于方便的开发使用 HTML5 History 模式开发的单页应用
            // 使用正则匹配命中路由
            rewrites:[
                {
                    from: /(.*)$/,
                    to:'/index.html'
                }
            ]
        },
        proxy:{                     //配置代理   请求到 /api/user 现在会被代理转发到 http://localhost:9000/api/users
            '/api':'http://localhost:9000'
        }
    }
}
`````
> 更多 `devServer` 配置详见 [开发中 server(devServer)](https://webpack.docschina.org/configuration/dev-server/);




