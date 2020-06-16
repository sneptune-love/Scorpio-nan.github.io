#### 概述
> 这里记录的是 `react` 开发中遇到的问题, [`react-native`](docs/Web/React/react-native.md)环境;

在[`webpack`](docs/Web/Webpack/index.md) 配置里面, 我们可以通过`webpack` 来构建一个 `react` 的开发环境; 不过这里推荐使用 `Facebook` 官方推荐的脚手架工具 `create-react-app`;

Create React App 是一个官方支持的创建 React 单页应用程序的方法;

`````bash
# 全局安装脚手架工具
npm install create-react-app -g

# 用脚手架创建一个 my-project 的工程目录
create-react-app my-project
`````
#### 扩展 create-react-app

`create-react-app` 官方推荐的工具是讲一些复杂的 `webpack` 配置封装了起来, 让开发者不用再关心这些工具的具体配置, 从而降低了工具的使用难度;

但是对于熟悉`webpack` 的开发者, 并且想要定制化 `webpack` 配置, 适应自己的开发环境, 这个时候我们就需要使用一些其他的方法去修改配置了; 因为 `create-react-app` `webpack` 的配置是没有暴露在外面的;

##### 配置 alias

很多时候我们开发项目的时候都会把项目目录划分成多个文件夹, 每个文件夹下面又分为多个不同功能的模块子文件夹, 这个时候, 如果组件里面需要引入外层的公用的组件, 那我们得这么写:
`````javascript
import { Common } from '../../../src/common';
`````
而且, 目录层次越多, 后面的文件查找越复杂, 那么我们就可以通过去修改 `webpack` 的 `resolve` 里面的 `alias` 别名, 为我们制定文件目录别名;

`create-react-app`会安装一个 `react-scripts`的依赖包, 我们可以打开 `node_modules/react-scripts/config/webpack.config.js` 这里才是 `webpack` 的配置部分, `react-scripts` 里面对 `path` 进行了封装, `node_modules/react-scripts/config/paths.js`:
`````javascript
module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
};
`````
借用 `paths` 模块我们可以直接在 `node_modules/react-scripts/config/webpack.config.js` 里面添加 `alias`：
`````javascript
//...
const paths = require('./paths');
//...
module.exports = {
    //...
    resolve:{
        //...
        alias:{
            '@':path.resolve(__dirname,paths.appSrc),
            '@view':path.resolve(__dirname,paths.appSrc + '/view'),
            '@components':path.resolve(__dirname,paths.appSrc + '/components'),
            '@assets':path.resolve(__dirname,paths.appSrc + '/assets')
        }
    }
}
`````
修改完配置之后再一次运行 `npm start` 就可以直接在 `react` 组件里面写 `import { Common } from '@component/Button'` 了;

#### JSX
JSX是⼀一种JavaScript的语法扩展, 其格式⽐比较像模版语⾔言, 但事实上完全是在 JavaScript 内部实现的;

##### 表达式
`{ }` 为 jsx 的表达式;
````javascript
const name = "react";
const jsx = <h2>{name}</h2>
````

jsx 中, 函数也是合法的表达式:
````javascript
const user = {
    firstName:"Tom",
    lastName:"Jerry"
}

function GetName(user){
    return user.firstName + ' ' + user.lastName;
}

const jsx = <h2>{GetName(user)}</h2>
````

条件语句也可以基于上面的结论实现:
````javascript
const show = true;
const title = show ? <h2>这是显示的title</h2> : null;
const jsx = (
    <div>
        { title }
    </div>
)
````

数组也可以作为一组子元素, 数组中存放一组 jsx 可用于显示列表:
````javascript
const arr = [1,2,3].map(num =>{ <li key={num}>{num}</li> });
const jsx = (
    <div>
        <ul>
            { arr }
        </ul>
    </div>
)
````






















