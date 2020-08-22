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
# -y 参数表示初始化的时候允许默认值
npm init [-y]
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
//...
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

`webpack` 是非常灵活的, 允许我们定制打包的规范, `webpack` 运行时首先会去找项目根目录下面的 `webpack.config.js`, 这个配置文件决定了 `webpack` 以什么样的规则去打包代码;

首先, 在根目录下面新建一个 `webpack.config.js`;

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
|	└── utils.js
|-- index.html
|-- package.json
|-- package-lock.json
└── webpack.config.js
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
    //...
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

***.src/assets/main.css***
`````css
#app{
    color:red;
    text-align:center;
    font-size:24px;
}
`````
`Webpack` 把一切文件看作模块, `CSS `文件也不例外, 要引入` main.css` 需要像引入 `JavaScript `文件那样, 修改入口文件 `main.js `如下：

***./src/main.js***
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
//...
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
//...
`````
##### file-loader && url-loader
`css-loader` 和 `style-loader` 将 CSS 进行处理, 打包到了 `bundle.min.js` 中, 下面我们对 `main.css` 做一些修改, 我们想在网页中加入我们的 logo:

***./src/assets/main.css***
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

***./src/assets/style.less***
`````less
@bg-color:blue;
#app{
    background:@bg-color;
}
`````
然后在 `main.js` 里面, 我们引入一下 `style.less` 文件:

***./src/main.js***
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
//...
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

***./src/assets/main.css***
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

***./src/main.js***
`````javascript
// 通过 ES 规范导入css文件
import './assets/main.css';
import './assets/style.less';

// 通过 ES 规范导入模块
import utils from './utils';

utils.innerText('Hello Webpack');
`````
***./src/utils.js***
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
//...
module:{
    //...
},
plugins:[
    //...
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

***./src/utils.js***
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
    //...
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

#### 核心概念
> `webpack` 功能强大, 且配置项多, 但是我们只需要理解了其中的几个核心概念, 就能得心应手的使用它

- `Entry`: 入口, `webpack` 执行构建的第一步将从 `entry` 开始, 可理解为输入;
- `Module`: 模块, 在 `webpack` 里面, 一切都是模块, 一个模块对应的一个文件, `webpack` 会从配置的 `Entry` 开始递归找出所有依赖的模块;
- `Chunk`: 代码块, 一个 `Chunk` 由多个模块组合而成, 用于代码合并与分割;
- `Loader`: 模块转换工具, 用于把模块原内容按照需求转换成新内容;
- `Plugin`: 扩展插件, 在 `webpack` 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情;
- `Output`:输出, 在 `webpack` 经过一系列处理并得出最终想要的代码后输出结果;

`webpack` 启动后会从 `Entry` 里配置的 `Module `开始递归解析 `Entry` 依赖的所有 `Module`. 每找到一个 `Module`, 就会根据配置的 `Loader` 去找出对应的转换规则, 对 `Module` 进行转换后, 再解析出当前 `Module `依赖的 `Module`. 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 webpack 会在恰当的时机执行 Plugin 里定义的逻辑

### Webpack 配置
配置 `webpack` 有两种方式:
- 1. 通过 `javascript` 文件描述配置, 例如使用 `webpack.config.js`;
- 2. 执行 `webpack` 可执行命令时通过参数传入, 例如 `webpack --mode=production`

这两种方式可以互相搭配使用, 例如执行 `webpack` 命令时, 通过命令 `webpack --config webpack-dev.config.js` 指定配置文件, 再去 `webpack-dev.config.js` 文件里描述部分配置;

按照配置索所影响的功能来划分, 可分为:
- `Entry` 配置模块的入口;
- `Output` 配置如何输出最终想要的代码;
- `Module` 配置处理模块的规则;
- `Resolve` 配置寻找模块的规则;
- `Plugins` 配置扩展插件;
- `DevServer` 配置 DevServer;
- `其它配置项` 其它零散的配置项;
- `整体配置结构` 整体地描述各配置项的结构;
- `多种配置类型` 配置文件不止可以返回一个 Object，还有其他返回形式

#### Entry
`entry` 是配置模块的入口, 可抽象成输入, `webpack` 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块;

`entry` 类型可以是一下三种组合的任意一种:

|   类型      |       例子                                                   |               含义                 |
|   :----:   |  :-----------------------------:                             |              :----:                |
|   String   |  './src/main.js'                                             |   入口模块的文件路径，可以是相对路径  |
|   Array    |  ['./src/mian.js','./app/entry.js']                          |   入口模块的文件路径，可以是相对路径  |
|   Object   |  {a:'./src/main.js', b:['./app/entry.js','./app/entry2.js']} | 配置多个入口，每个入口生成一个 Chunk  |

> 如果是 `array `类型, 则搭配 `output.library` 配置项使用时, 只有数组里的最后一个入口文件的模块会被导出;

`webpack` 会为每个生成的 `Chunk` 取一个名称, `Chunk `的名称和 `Entry` 的配置有关:
- 如果 `entry` 是一个 `string` 或 `array`, 就只会生成一个 `Chunk`, 这时 `Chunk` 的名称是 `main`;
- 如果 `entry` 是一个 `object`, 就可能会出现多个 `Chunk`, 这时 `Chunk` 的名称是 `object` 键值对里键的名称;

##### 动态配置 Entry
假如项目里有多个页面需要为每个页面的入口配置一个 `Entry` , 但这些页面的数量可能会不断增长, 则这时 `Entry` 的配置会受到到其他因素的影响导致不能写成静态的值. 其解决方法是把 `Entry` 设置成一个函数去动态返回上面所说的配置:
`````javascript
entry: () => {
    return new Promise((resolve)=>{
        resolve({
            a:'./pages/a',
            b:'./pages/b',
        });
    });
};
`````
#### Output
`output` 配置如何输出最终想要的代码, `output` 是个 `object` , 里面包含一系列的配置项, 每一个配置都会影响最终输出的结果;

##### filename
`filename` 配置输出的最终文件的名称, `String` 类型, 如果只有一个输入文件, 则可以写成静态的：
`````javascript
module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'bundle.min.js'
    }
}
`````
但是有多个 `Chunk `要输出时, 就要借助模板和变量了; 前面有说到 `webpack` 会为每一个 `Chunk` 都取一个名称, 名称可以根据 `Chunk` 的名称来区分输出的文件名:
`````javascript
module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'[name].min.js'
    }
}
`````
代码里的 `[name]` 代表用内置的 `name` 变量去替换 `[name]`, 这时你可以把它看作一个字符串模块函数,  每个要输出的 `Chunk `都会通过这个函数去拼接出输出的文件名称; 那么这个时候的 `name` 就是上面入口处文件的 `main`了;

内置变量除了 `name` 还有：

<table>
    <thead>
        <tr>
            <th>变量名</th>
            <th>含义</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>Chunk 的唯一标识，从0开始</td>
        </tr>
        <tr>
            <td>name</td>
            <td>Chunk 的名称</td>
        </tr>
        <tr>
            <td>hash</td>
            <td>Chunk 的唯一标识的 Hash 值</td>
        </tr>
        <tr>
            <td>chunkhash</td>
            <td>Chunk 内容的 Hash 值</td>
        </tr>
    </tbody>
</table>

其中 `hash` 和 `chunkhash` 的长度是可以指定的, `[hash:8]` 代表的是取 8 位的 hash 值;

> 注意 `ExtractTextWebpackPlugin` 插件是使用 `contenthash` 来代表哈希值而不是 `chunkhash`, 原因在于` ExtractTextWebpackPlugin` 提取出来的内容是代码内容本身而不是由一组模块组成的 `Chunk`

##### chunkFilename
`chunkFilename` 配置无入口的 `Chunk` 在输出时的文件名称;

`chunkFilename` 和上面的 `filename` 非常类似, 但 `chunkFilename` 只用于指定在运行过程中生成的 `Chunk` 在输出时的文件名称.  常见的会在运行时生成` Chunk `场景有在使用 `CommonChunkPlugin`、使用 `import('path/to/module')` 动态加载等时;

##### path
`path` 配置输出文件存放在本地的目录, 必须是 `String` 类型的绝对路径, 通常我们会使用 `NodeJs` 的 `path` 模块去获取绝对路径;

`````javascript
const path = require('path');
module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'[name].min.js',
        path:path.resolve(__dirname,'dist')
    }
}
`````
##### publicPath
在复杂的项目里可能会有一些构建出的资源需要异步加载, 加载这些异步资源需要对应的 `URL` 地址;

`publicPath` 配置发布到线上资源的 URL 前缀, 为`string` 类型. 默认值是空字符串 '', 即使用相对路径; 例如:

`````javascript
const path = require('path');
module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'[name].[hash:8].js',
        publicPath:'https://cdn.example.com/assets/'
    }
}
`````
这个时候发布到线上的 `html` 模板里面的文件引入就是:
`````html
<script src='https://cdn.example.com/assets/main.12345678.js'></script>
`````
以上只是 `output` 里常用的配置项, 详细配置查看 [webpack 官网](https://webpack.docschina.org/concepts/output/)

#### Module
`Module` 配置如何处理模块;

##### loader
`module`主要用来配置不同文件的加载器. 谈到加载就离不开`loader`;

通过使用不同的`Loader`, `webpack`可以要把不同的文件都转成JS文件, 比如`CSS、ES6/7、JSX`等;

配置一项 `rules` 时大致通过以下方式:
- 1. 条件匹配：
    - `test` : 匹配处理文件的扩展名的正则表达式;
    - `use`  : `loader`名称, 就是你要使用模块的名称;
    - `include/exclude` : 手动指定必须处理的文件夹或屏蔽不需要处理的文件夹;
    - `query`: 为`loaders`提供额外的设置选项;
- 2. 应用规则: 对选中后的文件通过 `use` 配置项来应用 `Loader`, 可以只应用一个 `Loader` 或者按照从后往前的顺序应用一组 `Loader`, 同时还可以分别给 `Loader` 传入参数
- 3. 重置顺序: 一组 `Loader` 的执行顺序默认是从右到左执行, 通过 `enforce` 选项可以让其中一个 `Loader` 的执行顺序放到最前或者最后

`````javascript
module.exports = {
    //...
    module:{
        rules:[
            {
                //以 .js 结尾命名的文件
                test:/\.js$/,
                //presets[]=es2015 表示给 loader 传入参数去将 ES6 文件编译为 ES5
                use:['babel-loader?presets[]=es2015'],
                // 只处理 src 目录里面的 .js 文件
                includes: path.resolve(__dirname,'src')
            },{
                //以 .scss 结尾命名的文件
                test:/\.scss$/,
                //使用一组 Loader 去处理 SCSS 文件  处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader
                use:['style-loader', 'css-loader', 'sass-loader'],
                //排除 node_modules 文件夹下的文件
                excludes: path.resolve(__dirname,'node_modules')
            },{
                // 对非文本文件采用 file-loader 加载
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader']
            }
        ]
    }
}
`````
在 `loader` 有需要传入很多个参数的时候, 我们还可以用 `Object` 来描述, 比如上面的例子可以稍微改造一下：
`````javascript
module.exports = {
    //...
    module:{
        rules:[
            {
                //以 .js 结尾命名的文件
                test:/\.js$/,
                //presets[]=es2015 表示给 loader 传入参数去将 ES6 文件编译为 ES5
                use:{
                    loader:'bable-loader',
                    options:{
                        presets:['es2015']
                    }
                },
                // 只处理 src 目录里面的 .js 文件
                includes: path.resolve(__dirname,'src')
            }
            //...
        ]
    }
}
`````
上面的例子中, `test`,`includes`,`excludes` 这三个字段的配置只传入了一个字符串或者是正则, 其实他们都还支持数组类型：
`````javascript
module.exports = {
    //...
    module:{
        rules:[
            {
                test:[
                    /\.jsx$/,
                    /\.tsx$/
                ],
                includes: [
                    path.resolve(__dirname,'src'),
                    path.resolve(__dirname,'test')
                ],
                excludes:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'bower_modules')
                ]
            }
            //...
        ]
    }
}
`````
##### noParse
`noParse` 配置项可以让 `Webpack` 忽略对部分没采用模块化的文件的递归解析和处理, 这样做的好处是能提高构建性能.  原因是一些库例如 `jQuery` 、`ChartJS` 它们庞大又没有采用模块化标准, 让 `Webpack` 去解析这些文件耗时又没有意义;

`noParse` 是可选配置项, 类型需要是 `RegExp`、`[RegExp]`、`function` 其中一个;

例如想要忽略掉 `jQuery` 、`ChartJS`, 可以使用如下代码:
`````javascript
module.exports = {
    module:{
        noParse:/jquery|echatjs/
    }
}
`````
`````javascript
module.exports = {
    module:{
        // webpack 3.x 之后支持使用函数
        noParse:(content) => /jquery|echatjs/.test(content)
    }
}
`````
> 注意被忽略掉的文件里不应该包含 `import `、 `require` 、 `define` 等模块化语句, 不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句;
##### parser
因为 `webpack` 是以模块化的 `JavaScript` 文件为入口, 所以内置了对模块化 `JavaScript` 的解析功能, 支持 `AMD`、`CommonJS`、`SystemJS`、`ES6`;

`parser` 属性可以更细粒度的配置哪些模块语法要解析哪些不解析, 和 `noParse` 配置项的区别在于 `parse`r 可以精确到语法层面, 而 `noParse` 只能控制哪些文件不被解析; 

`parser` 使用如下:
`````javascript
module.exports = {
    module:{
        rulse:[
            {
                test:/\.js$/,
                use:['babel-loader'],
                parser:{
                    amd:false,              // 禁用 AMD
                    commonjs:false,         // 禁用 CommonJS
                    system:false,           // 禁用 SystemJS
                    harmony:false,          // 禁用 ES2015 Harmony import/export
                    requireInclude:false,   // 禁用 require.include
                    requireEnsure:false,    // 禁用 require.ensure
                    requireContext:false,   // 禁用 require.context
                    browserify:false,       // 禁用特殊处理的 browserify bundle
                    requireJs:false,        // 禁用 requirejs
                    node: false             // 禁用 __dirname, __filename, module, require.extensions, require.main 等
                }
            }
        ]
    }
}
`````
#### Resolve
`webpack `在启动后会从配置的入口模块出发找出所有依赖的模块, `resolve `配置 `webpack` 如何寻找模块所对应的文件.  `webpack` 内置 `JavaScript` 模块化语法解析功能, 默认会采用模块化标准里约定好的规则去寻找, 但你也可以根据自己的需要修改默认的规则;

##### alias
配置别名, 可以加快 `webpack` 查找模块的速度;
`````javascript
module.exports = {
    //...
    resolve:{
        alias:{
            '@components': path.resolve(__dirname,'./src/components'),
            'static': path.resolve(__dirname,'./src/assets')
        }
    }
}
`````
当我们在代码里面通过 `import Button from '@components/Button'` 导入时, 实际上被 `alias` 等价替换成了 `import Button from './src/components/Button'`;

##### extensions
在导入语句没带文件后缀时, `webpack` 会自动带上后缀后去尝试访问文件是否存在. `extensions `用于配置在尝试过程中用到的后缀列表; 默认是:
`````javascript
module.exports = {
    //...
    resolve:{
        //...
        extensions:['.wasm','.mjs','js','json']
    }
}
`````
也就是说当遇到 `import util from './src/utils'` 这样的导入语句的时候, `webpack` 会先去寻找 `utils.wasm` 文件, 如果该文件不存在就去寻找 `utils.mjs` 文件; 知道找到了正确的停止, 如果都没有找到就会报错; 

假如我们想让 `webpack` 优先使用目录下面的 `Typescript`文件, 可以这样配置:
`````javascript
module.exports = {
    //...
    resolve:{
        //...
        extensions:['.ts','js','json']
    }
}
`````
> 需要注意的是, 此配置会修改默认数组, 这就意味着 `webpack` 不会使用默认扩展名来解析模块, 想要正确的解析, 必须是在默认模块下面去添加新的后缀名;

##### modules
`modules` 配置 `webpack` 去哪些目录下寻找第三方模块, 默认是只会去 `node_modules` 目录下寻找;

有时候项目里面会有一些模块会大量被一些其他模块依赖和导入, 由于每一个模块的目录地址分布不同, 针对不同的文件都要去计算模块文件的相对地址, 这个路径有时候会是很长的; 例如：
`````javascript
import Button from '../../../src/compoents/Button';
`````
这个时候, 我们可以使用 `modules` 配置优化项, 假如那些被大量导入的模块都在 `components` 目录下面, 我们可以把 `modules` 配置成:
`````javascript 
module.exports = {
    //...
    resolve:{
        //...
        modules:[path.resolve(__dirname,'./src/components'),'node_modules']
    }
}
`````
后面我们就可以在项目里面直接使用:
`````javascript
import Button from 'Button';
`````

##### descriptionFiles
`descriptionFiles` 配置描述第三方模块的文件名称, 也就是 `package.json` 文件; 默认如下:
`````javascript
module.exports = {
    //...
    resolve:{
        //...
        descriptionFiles: ['package.json']
    }
}
`````

##### enforceExtension
`enforceExtension`如果配置为 `true`, 那么所有的导入语句都必须要带上文件后缀名; 相当于是对 `extensions` 禁用;

#### Plugins
`plugins` 选项用于以各种方式自定义 `webpack` 构建过程, `webpack` 附带了各种内置插件, 可以通过 `webpack.[plugin-name]` 访问这些插件; 详见 [webpack 内置插件文档](https://webpack.docschina.org/plugins)

##### 配置 plugin
`plugin` 的配置非常简单, `plugins`配置项接收一个数组, 数组里面每一项都是一个要使用的 `plugin` 的实例, `plugin` 需要的参数通过构造函数传入;

使用多个插件的时候就直接在数组里面接着第一个往下面写:
`````javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //...
    plugins:[
        new webpack.ProgressPlugin(),
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
    //...
}
`````
使用 `plugin` 的难点在于掌握 `plugin` 本身提供的配置项, 而不是如何在 `webpack` 中接入 `plugin`;

几乎所有 `webpack` 无法直接实现的功能都能在社区找到开源的 `plugin` 去解决;

#### DevServer
要配置 `DevServer` , 除了在配置文件里通过 `devServer` 传入参数外, 还可以通过命令行参数传入;
`````javascript
module.exports = {
    //...
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

#### 其它配置项
`webpack` 除了前面介绍到的配置外, 还提供了一些零散的配置项, 下面是一些常用的部分;

##### Target
`JavaScript` 的应用场景越来越多, 从浏览器到 `Node.js`, 这些运行在不同环境的 `JavaScript` 代码存在一些差异. `target` 配置项可以让 `webpack` 构建出针对不同运行环境的代码;
<table>
    <thead>
        <tr>
            <th>target值</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>web</code></td>
            <td>针对浏览器 <strong>(默认)</strong>，所有代码都集中在一个文件里</td>
        </tr>
        <tr>
            <td><code>node</code></td>
            <td>针对 Node.js，使用 <code>require</code> 语句加载 Chunk 代码</td>
        </tr>
        <tr>
            <td><code>async-node</code></td>
            <td>针对 Node.js，异步加载 Chunk 代码</td>
        </tr>
        <tr>
            <td><code>webworker</code></td>
            <td>针对 WebWorker</td>
        </tr>
        <tr>
            <td><code>electron-main</code></td>
            <td>针对 Electron 主线程</td>
        </tr>
        <tr>
            <td><code>electron-renderer</code></td>
            <td>针对 Electron 渲染线程</td>
        </tr>
    </tbody>
</table>

`````javascript
module.exports = {
    //...
    target:'node'
}
`````
例如当你设置 `target:'node'` 时, 源代码中导入 `Node.js` 原生模块的语句 `require('fs')` 将会被保留, `fs` 模块的内容不会打包进 `Chunk` 里;

##### Devtool
`devtool` 配置 `Webpack` 如何生成 `Source Map`, 默认值是 `false` 即不生成 `Source Map`, 想为构建出的代码生成 `Source Map` 以方便调试, 可以这样配置:
`````javascript
module.exports = {
    //...
    devtool: 'source-map'
}
`````
> `devtool` 更多选项配置详见 [webpack devtool 中文文档](https://webpack.docschina.org/configuration/devtool/)

##### Watch && WatchOptions
`webpack` 可以监听文件变化, 当它们修改后会重新编译; 当 `watch` 无法正常运行的时候你可以做的一些调整;
`````javascript
module.exports = {
    //...
    watch: true
}
`````
启用 `Watch` 模式, 这意味着在初始构建之后, `webpack` 将继续监听任何已解析文件的更改; 在使用 `DevServer` 时, 监听模式是自动开启的;

除此之外, `webpack` 还提供了 `watchOptions` 配置项去更灵活的控制监听模式:
`````javascript
module.exports = {
    //...
    watch: true,
    // 监听模式运行的参数 在监听模式的时候才有效果
    watchOptions:{
        // 不监听的文件或文件夹，支持正则匹配  默认为空
        ignored:/node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高  默认 300 毫秒
        aggregateTimeout:300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的   默认每隔1000毫秒询问一次
        poll:1000
    }
}
`````
##### Externals
`Externals` 用来告诉 `webpack` 要构建的代码中使用了哪些不用被打包的模块, 也就是说这些模版是外部环境提供的, `webpack` 在打包时可以忽略它们;

有些 `JavaScript` 运行环境可能内置了一些全局变量或者模块, 例如在我们的 `HTML HEAD` 标签里通过以下代码:
`````html
<script src="static/scripts/jquery.js"></script>
`````
引入 `jQuery` 后, 全局变量 `jQuery` 就会被注入到网页的 `JavaScript` 运行环境里;

如果我们在后面的开发中, 某个开发人员不小心又使用 `npm` 安装了一个 `jQuery`, 并在代码里面有引用过它 `import $ from 'jquery'`;

构建后你会发现输出的 `Chunk` 里包含的 `jQuery` 库的内容, 这导致 `jQuery` 库出现了2次, 浪费加载流量; `externals` 就是解决这个问题的;

`externals` 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量, 针对这些全局变量不用打包进代码中而是直接使用全局变量:
`````javascript
module.export = {
    externals: {
        // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
        jquery: 'jQuery'
    }
}
`````

##### ResolveLoader
`ResolveLoader` 用来告诉 `Webpack` 如何去寻找 `Loader`, 因为在使用 `Loader` 时是通过其包名称去引用的;

`Webpack` 需要根据配置的 `Loader` 包名去找到 `Loader `的实际代码, 以调用 `Loader` 去处理源文件;

`ResolveLoader` 的默认配置如下：
`````javascript
module.export = {
    resolveLoader:{
        // 去哪个目录下寻找 Loader
        modules: ['node_modules'],
        // 入口文件的后缀
        extensions: ['.js', '.json'],
        // 指明入口文件位置的字段
        mainFields: ['loader', 'main']
    }
}
`````
#### 多种配置类型

>除了通过导出一个 `Object` 来描述 `Webpack` 所需的配置外, 还有其它更灵活的方式, 以简化不同场景的配置;

##### 导出 Function
在大多数时候你需要从同一份源代码中构建出多份代码, 例如一份用于开发时, 一份用于发布到线上; 如果采用导出一个 `Object` 来描述 `Webpack` 所需的配置的方法, 需要写两个文件. 一个用于开发环境, 一个用于线上环境. 再在启动时通过 `webpack --config webpack.config.js` 指定使用哪个配置文件;

采用导出一个 `Function` 的方式, 能通过 `JavaScript` 灵活的控制配置, 做到只用写一个配置文件就能完成以上要求:
`````javascript
const UglifyJsPlugin = require('uglify-js-plugin');

module.exports = function(env,argv){
    const plugin = [];
    if(env.production){
        // 如果传入的环境是 production
        plugin.push(
            // 压缩输出的 js 代码
            new UglifyJsPlugin();
        )
    }
    return {
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-maps' : 'eval',
        plugin
    }
}
`````
在运行 `webpack` 的时候会传入两个参数:
- `env` : 当前运行 `webpack` 的环境变量, 设置它时需要在启动 `webpack` 时候带上参数, 例如: `webpack --env.production`;
- `argv`: 代表在 `webpack` 启动时候通过命令行传入的所有参数; 例如: `--config --env --devtool` 等;

就以上配置文件而言, 在开发时执行命令 `webpack` 构建出方便调试的代码, 在需要构建出发布到线上的代码时执行 `webpack --env.production` 构建出压缩的代码;

##### 导出 Promise
在有些情况下你不能以同步的方式返回一个描述配置的 `Object`, `Webpack` 还支持导出一个返回 `Promise` 的函数, 使用如下:
`````javascript
module.exports = function(env = {}, argv) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                // ...
            })
        }, 5000)
    })
}
`````
##### 导出多份配置
> 注: 导出多份配置是从 `webpack 3.1.0` 以后的版本才开始支持的;

除了只导出一份配置外, `Webpack` 还支持导出一个数组, 数组中可以包含每份配置, 并且每份配置都会执行一遍构建;
`````javascript
module.exports = [
    {
        entry:'./app.js',
        name:'amd',
        mode:'production',
        output:{
            filename:'dist-amd.js',
            path:path.resolve(__dirname,'dist'),
            libraryTarget: 'amd'
        }
    },{
        entry:'./app.js',
        name:'commonjs',
        mode:'production',
        output:{
            filename:'dist-commonjs.js',
            path:path.resolve(__dirname,'dist'),
            libraryTarget: 'commonjs'
        }
    }
]
`````
以上配置会导致 `Webpack` 针对这几个配置执行几次不同的构建; 这特别适合于用 `Webpack` 构建一个要上传到 `Npm` 仓库的库, 因为库中可能需要包含多种模块化格式的代码;

### Webpack 配置实战
`webpack` 从 `4.x` 版本之后, 可以不再使用任何配置文件来打包项目, 这也是为什么 `webpack` 能够成为前端工程化使用最多的工具, 虽然不需要任何配置, 但它任然有着高度可配置性, 可以很好的满足我们的需求;

下面我们通过一些实战项目来重新认识一下 `webpack`; 

> 接下来的所有的实战目录结构如下

`````txt
|-- node_modules
|-- src
|-- └── assets          //assets文件夹存放静态资源
|-- index.html
|-- package.json
|-- package-lock.json
└── webpack.config.js
`````
并且是都有初始化和安装了 `webpack` 的;

`````bash
npm init 

npm install webpack webpack-cli -D
`````
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
#### Typescript 配置
> `TypeScript` 是 `JavaScript` 的一个超集, 主要提供了类型检查系统和对 `ES6` 语法的支持, 但不支持新的 API;

目前没有任何环境支持运行原生的 `TypeScript` 代码, 必须通过构建把它转换成 `JavaScript` 代码后才能运行;

下面我们在 `src` 文件夹下面分别新建 `main.ts`, `show.ts` 内容如下:

***./src/main.ts***
`````typescript
import show from './show.ts';
`````

***./src/show.ts***
`````typescript
export function show(content:string){
    document.getElementById('app').innerText = 'Hello' + content;
}
`````
`typescript` 官方提供了能把 `typescript` 编译成 ES5 的编译器, 我们需要在当前项目里面新建一个用于编译选项的 `tsconfig.json` 的文件, 编译器默认会读取这个文件, 内容如下:
`````json
{
    "compilerOptions": {
        "module": "commonjs",       // 编译出的代码采用的模块规范
        "target": "es5",            // 编译出的代码采用 ES 的哪个版本
        "sourceMap": true           // 输出 Source Map 方便调试
    },
    "exclude": [                    // 不编译这些目录里的文件
        "node_modules"
    ]
}
`````
通过 `npm install typescript -g` 将编译器安装到全局之后, 就可以通过 `tsc main.ts` 命令编译出 `main.js`了;

##### 减少代码冗余
`TypeScript` 编译器会有`Babel` 一样的问题：在把 `ES6` 语法转换成 `ES5` 语法时需要注入辅助函数, 为了不让同样的辅助函数重复的出现在多个文件中, 可以开启 `TypeScript` 编译器的 `importHelpers` 选项, 修改 `tsconfig.json` 文件如下：
`````json
{
    "compilerOptions": {
        "module": "commonjs",       // 编译出的代码采用的模块规范
        "target": "es5",            // 编译出的代码采用 ES 的哪个版本
        "sourceMap": true,          // 输出 Source Map 方便调试
        "importHelpers": true
    },
    "exclude": [                    // 不编译这些目录里的文件
        "node_modules"
    ]
}
`````
##### 集成 webpack
要让 `webpack` 支持 `TypeScript`, 需要解决以下2个问题:
- 1. 通过 `Loader` 把 `TypeScript` 转换成 `JavaScript`;
- 2. `webpack` 在寻找模块对应的文件时需要尝试 `ts` 后缀;

这里推荐使用速度更快的 `awesome-typescript-loader`; `webpack` 查找 `.ts` 后缀的我们可以修改 `resolve` 的 `extensions ` 配置项;
`````bash
npm install typescript awesome-typescript-loader -D
`````
***webpack.config.js***
`````javascript
const path = require('path');
module.exports = {
	entry:'./src/main',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	resolve:{
        // 先查找 .ts 结尾的文件名;
		extensions:['.ts','.js','.json']
	},
	module:{
		rules:[
			{
				test:/\.ts$/,
				loader:'awesome-typescript-loader'
			}
		]
	},
	devtool:'source-map'
}
`````
修改完配置之后执行 `webpack` 命令, 就可以看到 `dist` 目录下面生成了 `bundle.min.js` 和 `bundle.min.js.map` 我们在 `index.html` 引入一下编译后的文件就可以看到正常输出了;

#### SCSS 配置
> `SCSS` 是一种 `CSS` 预处理器, 它与 `Less` 有写相同点, 可以让我们用编程的方式去编写 `css`;

`SCSS` 又叫 `SASS`, 区别在于 `SASS` 语法类似 `Ruby`, 而 `SCSS` 语法类似 `CSS`; 

采用 `SCSS` 去写 `CSS` 的好处在于可以方便地管理代码, 抽离公共的部分, 通过逻辑写出更灵活的代码; `Vue` 项目里面动态换肤的功能也是使用 `SCSS` 实现的;

`node-sass` 核心模块是由 C++ 编写, 再用 `Node.js` 封装了一层, 以供给其它 `Node.js` 调用.  `node-sass` 还支持通过命令行调用, 先安装它到全局:
`````bash
npm install node-sass -g
`````
再执行编译命令:
`````bash
# 把 main.scss 源文件编译成 main.css
node-sass main.scss main.css
`````
在 `webpack` 里面使用 `scss` 需要安装依赖：
`````bash
npm install node-sass sass-loader css-loader style-loader -D
`````
***./src/main.scss***
`````css
$blue: #2856ff;
#app{
	height: 30px;
	background: $blue;
}
`````
***./src/mian.js***
`````javascript
import './main.scss';
`````
***webpack.config.js***
`````javascript
const path = require('path');
module.exports = {
	entry:'./src/main',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.scss$/,
				// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
				use:['style-loader','css-loader','sass-loader']
			}
		]
	},
	devtool:'source-map'
}
`````
#### Vue 配置
`Vue` 是个渐进式的 `MVVM` 框架, 相比于 `React`、`Angular` 它更灵活轻量; 虽然 `Vue` 的项目能用可直接运行在浏览器环境的代码编写, 但为了方便编码大多数项目都会采用 `Vue `官方的单文件组件的写法去编写项目;

安装依赖:
`````bash
npm install node-sass sass-loader css-loader style-loader -D
# Vue 是运行时需要的依赖, 所以这里是  -S 
npm install vue -S
npm install vue-loader vue-style-loader vue-template-compiler -D

`````
下面, 我们可以看一下 `webpack` 配置 `Vue` 运行环境; 在 `src` 下面新建一个 `App.vue` 文件:

***./src/App.vue***
`````html
<template>
	<div>
		<h1>{{message}}</h1>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				message:'Hello Vue'
			}
		}
	}
</script>
<style scoped lang="scss">
    /* 
     *  这里的 @ 是在 webpack reslove.alias 里面配置的快捷地址
     */
	@import '~@/assets/main.scss';
	h1{
		color: red;
		text-align: center;
	}
</style>
`````
***./src/main.js***
`````javascript
import Vue from 'vue';
import App from './App';

new Vue({
	el:'#app',
	render: h => h(App)
})
`````
***./src/main.scss***
`````css
$blue: #2856ff;
#app{
	height: 30px;
	background: $blue;
}
`````
***webpack.config.js***
`````javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
	entry:'./src/main.js',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	resolve:{
		alias:{
            // 配置别名, 在引入组件的时候可以直接使用 @ 代替 src
			'@':path.resolve(__dirname,'src')
        },
        // import 组件的时候不写后缀名, 默认先查找 .vue 结尾的文件
		extensions:['.vue','.js','.json']
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				use:['vue-loader']
			},{
				test:/\.scss$/,
				// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
				use:['style-loader','css-loader','sass-loader']
			}
		]
	},
	plugins:[
        // webpack 4.x 之后使用 vue-loader 需要 new VueLoaderPlugin()
        new VueLoaderPlugin(),
        // webpack 内置的进度条
		new webpack.ProgressPlugin(),
	],
	devtool:'source-map'
}
`````
这样, 一个简单的 `vue` 开发环境就搭建好了; 有兴趣可以研究一下 `vue-cli` 官方搭建的脚手架工具;

##### Typescript in Vue
从 `Vue 2.5.0+` 版本开始, 提供了对 `TypeScript` 的良好支持, 使用 `TypeScript` 编写 `Vue` 是一个很好的选择, 因为 `TypeScript` 能检查出一些潜在的错误;

尝试修改一下 `webpack` 配置, 使其支持 `Typescript` 开发, 安装依赖:
`````bash
npm install ts-loader typescript -D
`````
首先, 在根目录下面新建 `tsconfig.json` 文件:

***tsconfig.json***
`````json
{
    "compilerOptions": {
        // 构建出 ES5 版本的 JavaScript，与 Vue 的浏览器支持保持一致
        "target": "es5",
        // 开启严格模式，这可以对 `this` 上的数据属性进行更严格的推断
        "strict": true,
        // TypeScript 编译器输出的 JavaScript 采用 es2015 模块化, 使 Tree Shaking 生效
        "module": "es2015",
        "moduleResolution": "node",
        "sourceMap": true 
    }
}
`````
修改 `App.vue` 内容如下:

***./src/App.vue***
`````html
<template>
	<div>
		<h1>{{message}}</h1>
	</div>
</template>

<!--  lang = ts 是为了指明代码是 Typescript 语法  -->
<script lang="ts">
	import Vue from 'vue';
	// 通过 Vue.extend 启用 TypeScript 类型推断
	export default Vue.extend({
		data(){
			return{
				message:'Hello Typescript In Vue'
			}
		}
	})
</script>
<style scoped lang="scss">
	@import '~@/assets/main.scss';
	h1{
		color: red;
		text-align: center;
	}
</style>
`````
之前的 `main.js` 这里可以直接修改为 `main.ts`:

***./src/mian.ts***
`````typescript
import Vue from 'vue';
import App from './App.vue';

new Vue({
	el:'#app',
	render: h => h(App)
})
`````
由于 `typescript` 不认识 `.vue` 结尾的文件, 为了能让其支持 `import App from './App.vue'` 这样的语法, 我们还需要在 `src` 下面新建一个 `vue-shims.d.ts` 文件去定义 `.vue` 类型:

***./src/vue-shims.d.ts***
`````typescript
// 告诉 TypeScript 编译器 .vue 文件其实是一个 Vue  
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
`````
`webpack` 需要修改一些配置:

***webpack.config.js***
`````javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
	entry:'./src/main.ts',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'src')
		},
		// 增加对 TypeScript 的 .ts 和 .vue 文件的支持
		extensions:['.ts','.vue','.js','.json']
	},
	module:{
		rules:[
			{
				test:/\.ts$/,
				loader:'ts-loader',
				exclude:/node_modules/,
				options:{
					// 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
					appendTsSuffixTo:[/\.vue$/]
				}
			},{
				test:/\.vue$/,
				use:['vue-loader']
			},{
				test:/\.scss$/,
				// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
				use:['style-loader','css-loader','sass-loader']
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new webpack.ProgressPlugin(),
	],
	devtool:'source-map'
}
`````
至此, 一个简单的 `vue` 的 `Typescript` 单页开发环境就搭建好了, 有兴趣的可以看一下 `Vue` 官方提供的脚手架 `vue-cli` 工具搭建的流程;

#### 生成 HTML
在 `Vue` 的环境搭建中, 只用了一个简单的 `App.vue` 来作为演示, 这个里面只输出了一个 `bundle.min.js` 文件, 所以就手写了一个 `index.html` 文件去引入这个 `bundle.min.js`; 

在实际项目中, 一个页面常常有很多资源要加载, 并且都是需要放在不同的位置的 , `head`, `body` 或者是其他地方;

并且打包后的文件, 如果开启了 `hash` 命名的话, 这个时候我们还手动去引入文件, 这会使工作变得复杂、易错, 比较难以维护;

这里我们是直接使用上面已经搭建好的 `vue` 的开发环境来做, 首先我们在原来的基础上新增一些插件 :
`````bash
npm install web-webpack-plugin  extract-text-webpack-plugin@next uglifyjs-webpack-plugin -D
`````
***webpack.config.js***
`````javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	entry:'./src/main.ts',
	mode:'production',
	output:{
		filename:'[name].[hash].js',
		path:path.resolve(__dirname,'dist')
	},
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'src')
		},
		// 增加对 TypeScript 的 .ts 和 .vue 文件的支持
		extensions:['.ts','.vue','.js','.json']
	},
	module:{
		rules:[
			{
				test:/\.ts$/,
				loader:'ts-loader',
				exclude:/node_modules/,
				options:{
					// 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
					appendTsSuffixTo:[/\.vue$/]
				}
			},{
				test:/\.vue$/,
				use:['vue-loader']
			},{
				test:/\.scss$/,
				// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:['css-loader','sass-loader']
				})
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new webpack.ProgressPlugin(),
		new WebPlugin({
			// 模板选择为当前目录下的  index.html
			template:'./index.html',
			// 输出的文件名为  index.html
			filename:'index.html'
		}),
		new ExtractTextPlugin({
			// 给输出的 CSS 文件名称加上 Hash 值
			filename:'[name].[hash].css'
		}),
		new webpack.DefinePlugin({
			// 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
			'process.env':{
				NODE_ENV:JSON.stringify('production')
			}
		})
	],
	// 压缩输出的 JavaScript 代码
	optimization:{
		minimizer:[
			new UglifyJsPlugin()
		]
	},
	devtool:'source-map'
}
`````
***index.html***
`````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="stylesheet" type="text/css" href="https://cdn.staticfile.org/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <!--注入 Chunk main 中的 main[hash].css CSS-->
	<link rel="stylesheet" type="text/css" href="main?_inline">
	<title></title>
</head>
<body>
	<div id="app"></div>
	<script src="https://cdn.staticfile.org/jquery/3.1.0/jquery.min.js" type="text/javascript"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/4.1.3/js/bootstrap.min.js" type="text/javascript"></script>
    <!--导入 Chunk main 中的  main[hash].js JS-->
	<script src="main" type="text/javascript" charset="utf-8"></script>
</body>
</html>
`````
`index` 模板文件描述了哪些资源以什么方式引入到输出的 `html` 中, 以 `<link rel="stylesheet" type="text/css" href="main?_inline">` 为例, `href` 属性中的 `main?_inline` ,`?` 前面的部分表示 css 文件来自哪个 `Chunk` 中, 后面的 `_inline` 表示代码将被内嵌在这个标签的位置;

同样, `<script src="main" type="text/javascript" charset="utf-8"></script>` 表示输出后的 `main.[hash].js` 会被输出到这里; 

也就是说资源链接 `URL` 字符串里问号前面的部分表示资源内容来自哪里, 后面的 `querystring` 表示这些资源注入的方式;

除了 `_inline` 表示内嵌外, 还支持以下属性:
- `_dist`: 只有在生产环境下才引入该资源;
- `_dev` : 只有在开发环境才引入改资源;

这些属性之间可以搭配使用, 互不冲突. 例如 `app?_inline&_dist` 表示只在生产环境下才引入该资源, 并且需要内嵌到 HTML 里去;

以上配置, 输出到 `dist` 目录下面的 `index.html` 内容如下:

***./dist/index.html***
`````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="stylesheet" type="text/css" href="https://cdn.staticfile.org/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
	<style rel="stylesheet" type="text/css">
        #app[data-v-7ba5bd90]{height:30px;background:#2856ff}
        h1[data-v-7ba5bd90]{color:red;text-align:center}
        /*# sourceMappingURL=main.a7254fcf029f29653c66.css.map*/
    </style>
	<title></title>
</head>
<body>
	<div id="app"></div>
	<script src="https://cdn.staticfile.org/jquery/3.1.0/jquery.min.js" type="text/javascript"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/4.1.3/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="main.a7254fcf029f29653c66.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
`````
> 插件更多其他的用法, 可以查看 [web-webpack-plugin](https://github.com/gwuhaolin/web-webpack-plugin);

### 扩展

#### npm scripts 钩子

`npm run script`  的时候可以自定义钩子函数, `pre` 为前置钩子, `post` 为后置钩子; 例如:

```json
// package.json
"scripts":{
    "clean":"rm -f ./dist",
    "dev":"webpack",
    "predev":"npm run clean",
    "postdev":"cd dist && echo index.html"
}
```
上面的 `package.json` 文件里面, 当运行 `npm run dev` 的时候, 会先去执行前置钩子 `predev` 脚本, 然后 `dev` 执行完成之后再去执行 `postdev` 后置脚本;
