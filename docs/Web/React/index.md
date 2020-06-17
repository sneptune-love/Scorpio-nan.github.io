### 概述
> 这里记录的是 `react` 开发中遇到的问题, [`react-native`](docs/Web/React/react-native.md)环境;

在[`webpack`](docs/Web/Webpack/index.md) 配置里面, 我们可以通过`webpack` 来构建一个 `react` 的开发环境; 不过这里推荐使用 `Facebook` 官方推荐的脚手架工具 `create-react-app`;

Create React App 是一个官方支持的创建 React 单页应用程序的方法;

`````bash
# 全局安装脚手架工具
npm install create-react-app -g

# 用脚手架创建一个 my-project 的工程目录
create-react-app my-project
`````
### 扩展 create-react-app

`create-react-app` 官方推荐的工具是讲一些复杂的 `webpack` 配置封装了起来, 让开发者不用再关心这些工具的具体配置, 从而降低了工具的使用难度;

但是对于熟悉`webpack` 的开发者, 并且想要定制化 `webpack` 配置, 适应自己的开发环境, 这个时候我们就需要使用一些其他的方法去修改配置了; 因为 `create-react-app` `webpack` 的配置是没有暴露在外面的;

#### 配置 alias

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

### JSX
JSX是⼀一种JavaScript的语法扩展, 其格式⽐比较像模版语⾔言, 但事实上完全是在 JavaScript 内部实现的;

#### 表达式
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

### 组件
组件是抽象的独⽴立功能模块, react应⽤用程序由组件构建⽽而成; 组件有两种形式, `class` 组件和  `function ` 组件;

#### 生命周期

![组件生命周期](./res/react-live.webp)

````javascript
import React, { Component } from "react";

export default class LifeCyclePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }
    // 组件即将挂载的时候执行
    componentWillMount() {
      console.log("componentWillMount", this.state);
    }
    // 组件挂载完成之后执行
    componentDidMount() {
        console.log("componentDidMount", this.state);
    }
    // 组件更新之前执行
    componentWillUpdate(nextProps, nextState) {
      console.log("componentWillUpdate", this.state, nextState);
    }
    // 组件更新之后执行
    componentDidUpdate() {
        console.log("componentDidUpdate", arguments);
    }
    // 组件更新之前先判断一下, 如果返回值时 false , 则后面的 render 不再执行; 常用于页面优化
    shouldComponentUpdate() {
        const { counter } = this.state;
        console.log("shouldComponentUpdate", this.state);
        return counter !== 3;
    }
    setCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    };
    render() {
        const { counter } = this.state;
        return (
            <div>
                <button onClick={this.setCounter}>{counter}</button>
                {!!(counter % 2) && <Foo counter={counter} />}
            </div>
        );
    }
}

class Foo extends Component {
    // 组件即将卸载之前执行
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    render() {
        const { counter } = this.props;
        return (
            <div>
                <p>{ counter }</p>
            </div>
        );
    }
}
````
以上是 v17 版本之前的生命周期, v17 版本之后又引入了两个新的生命周期: `static getDerivedStateFromProps`, `getSnapshotBeforeUpdate`;

![v17 版本新的生命周期](./res/liveCycle.png)

原来( React v16.0前) 的生命周期在 React v16 推出的 `Fiber`之后就不不合适了, 因为如果要开启 `async rendering`, 在 `render` 函数之前的所有函数, 都有可能被执行多次;

如果开发者开了`async rendering`, 而且又在以上这些 `render` 前执行的生命周期方法做 `AJAX` 请求的话, 那 `AJAX` 将被无谓地多次调用. 明显不是我们期望的结果, 而且在   `componentWillMount` 里发起 `AJAX`, 不管多快得到结果也赶不不上首次 `render`, 而且 `componentWillMount` 在服务器端渲染也会被调用到, 这样的 IO 操作放在  `componentDidMount` 里更合适;

所以除了 `shouldComponentUpdate`, 其他在 `render` 函数之前的所有函数 ( `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate` ) 都被`getDerivedStateFromProps` 替代;

````javascript
import React, { Component } from "react";

export default class LifeCyclePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps", state);
        return state.counter < 6 ? null : { counter: 0 };
    }

    // return 回去的参数将传递给 componentDidUpdate 函数;
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate", prevState);
        return { ...prevState, omg: "omg" };
    }

    // 这里的 arguments 就是  getSnapshotBeforeUpdate 的返回值;
    componentDidUpdate() {
        console.log("componentDidUpdate", arguments);
    }

    setCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    };
    render() {
        const { counter } = this.state;
        return (
            <div>
                <button onClick={this.setCounter}>{counter}</button>
            </div>
        );
    }
}
````
> `getDerivedStateFromProps` 会在调用 `render` 方法之前调用, 并且在初始挂载及后续更新时都会被调用. 它返回⼀个对象来更新state, 如果返回 null 则不更新任何内容;

`getSnapshotBeforeUpdate(prevProps, prevState)` 在 `render`之后, 在 `componentDidUpdate` 之前执行; 要和 `componentDidUpdate` 配合使用; 此生命周期的任何返回值都会作为参数传递给 `componentDidUpdate`;

#### class 组件
class 组件通常拥有状态和⽣生命周期, 继承于 Component, 实现 render ⽅方法;
````javascript
import React , {Component} from "react";

export default class ClassComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date()
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        const { date } = this.state;
        return(
            <div>
                { date.toLocaleTimeString() }
            </div>
        )
    }
}
````
#### setState 特性
+ 用 setState 设置状态, 而不能直接改变状态; 
````javascript
this.state.counter += 1;   // 错误的
````
+ setState 是批量执行的, 因此对同一状态执行多次只有一次起作用, 多个状态更新可以放在同一个 setState 中进行;
````javascript
// 假如couter初始值为0，执⾏行行多次以后其结果是多少？
this.setState({counter: this.state.counter + 1});
this.setState({counter: this.state.counter + 2});
````
+ setState 通常是异步的, 因此如果要获得到最新的状态值有以下三种方法:

 1. 传递函数给 setState 方法:

    ````javascript
    this.setState(nextState => ({
        counter:nextState.counter + 1
    }));// 1
    this.setState(nextState => ({
        counter:nextState.counter + 1
    }));// 2
    this.setState(nextState => ({
        counter:nextState.counter + 1
    }));// 3
    ````
 2. 使用定时器

    ````javascript
    componentDidMount(){
        setTimeout(()=>{
            this.changeValue();
        },0)
    }
    changeValue = () => {
        this.setState({
            counter: this.state.counter + 1
        })
        console.log(this.state.counter)
    }
    ````

 3. 原生事件中修改
    ````javascript
    componentDidMount(){
        document.body.addEventListener('click',this.changeValue, false);
    }
    changeValue = () => {
        this.setState({
            counter: this.state.counter + 1
        })
        console.log(this.state.counter)
    }
    ````
> setState 只有在合成事件和生命周期函数中是异步的, 在原生事件和setTimeout中都是同步的, 这里的异步其实是批量更新;


#### function 组件
函数组件通常无状态, 仅关注内容展示, 返回渲染结果即可;

````javascript
import React from 'react';

function App() {
    return (
        <div className="App">
            <ClassComponent/>
        </div>
    );
}
export default App;
````
#### 函数组件中的状态处理
函数组件通过 `hooks api `维护状态;

````javascript
import React, {useState,useEffect} from 'react';

export default function (props){
    const [date,setDate] = useState(new Date());
    const [counter,setCounter] = useState(0);

    // 第二个参数 [] 代表不需要重复执行; 不写就相当于 update 函数, 每次组件更新都执行; 
    useEffect(()=>{
        const timer = setInterval(()=>{
            setDate(new Date());
        },1000) 
        // 组件卸载的时候执行 return;
        return ()=> clearInterval(timer);
    },[])

    return(
        <div>
            { date.toLocaleTimeString() }
            <button onClick={()=>{ setCounter(counter + 1) }}> { counter }</button>
        </div>
    )
}
````
`useState` 函数返回两个变量, 第一个变量是 `state` 状态, 第二个是修改 `state` 状态的方法;

可以把 `useEffect` `Hook` 看做 `componentDidMount` , `componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合;

第二个参数的数组里面可以添加依赖项, 表示依赖的变量变化的时候需要重新执行一次
````javascript
...
useEffect(()=>{
    const timer = setInterval(()=>{
        setDate(new Date());
    },1000) 
    // 组件卸载的时候执行 return;
    return ()=> clearInterval(timer);
},[counter])
...
````

#### 事件处理
react 中使用 onXXX 写法来监听事件; 例如用户输入事件;

````javascript
import React, {Component} from 'react';

export default class Serch extends Component{
    constructor(args){
        super(args);
        this.state = {
            name:""
        }
    }

    submit = ()=>{
        console.log(this.state.name)
    }

    onChange(e){
        this.setState({
            name:e.target.value
        })
    }

    render(){
        return(
            <div>
                <input value={this.state.name} onChange={(e)=>{this.onChange(e)}}/>
                <button onClick={ this.submit }>按钮</button>
            </div>
        )
    }
}
````
react里遵循单向数据流, 没有双向绑定, 输⼊入框要设置 `value` 和 `onChange`, 称为受控组件;

>受控组件绑定 `value` 的方式和 `vue` 不一样, 如果要给受控组件绑定 `value` , 就需要添加一个 `onChange` 事件

事件回调函数注意绑定 `this` 指向, 常⻅见三种⽅方法:
+ 1. 构造函数中绑定并覆盖:
    ````javascript
    ...
    constructor(args){
        super(args);
        this.state = {
            name:""
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        this.setState({
            name:e.target.value
        })
    }
    ...
    ````
    或 `apply` 和 `bind`;
    ````javascript
    <button onClick={() => this.submit.apply(this)}>提交</button>
    <button onClick={() => this.submit.call(this)}>提交</button>
    ````
+ 2. 将方法定义为箭头函数:
    ````javascript
    submit = ()=>{
        console.log(this.state.name)
    }
    ...
    <button onClick={ this.submit }>按钮</button>
    ...
    ````
+ 3. 事件中定义直接写表达式:
    ````javascript
    <input value={this.state.name} onChange={(e)=>{this.onChange(e)}}/>
    ````
### 组件通信

#### Props 属性传递
Props 属性传递可⽤用于⽗父⼦子组件相互通信;

````javascript
// index.js
ReactDOM.render(<App title="这是组件传递的数据" />,
document.querySelector('#root'));

// App.js
<h2>{this.props.title}</h2>
````
如果⽗父组件传递的是函数, 则可以把子组件信息传入父组件, 这个常称为状态提升;

***app.js***
````javascript
import React from 'react';
import Serch from './components/serch';

function call(args){
    console.log(args);
}

function App() {
    return (
        <div className="App">
            <Serch Func={ call }/>
        </div>
    );
}

export default App;
````

***serch.js***
````javascript
import React, {Component} from 'react';

export default class Serch extends Component{
    submit = ()=>{
        this.props.Func("这是子组件内调用的");
    }

    render(){
        return(
            <div>
                <button onClick={ this.submit }>按钮</button>
            </div>
        )
    }
}
````
#### 组件跨层级通信 Context

`React` 中使用 `Context` 实现祖代组件向后代组件跨层级传值. `Vue` 中的 `provide & inject` 来源于 `Context`

在 `Context` 模式下有两个角色:
+ Provider: 外层提供数据的组件;
+ Consumer: 内层获取数据的组件;

***App.js***
````javascript
import React from 'react';
import HomePage from './pages/HomePage';

const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

const store = {
    user:{
        name:"小明"
    }
}

function App() {
    return (
        <div className="App">
            <Provider value = { store }>
                <Consumer>
                    {
                        ctx => (
                            <>
                                <div>{ store.user.name }</div>
                                <HomePage { ...ctx }/>
                            </>
                        )
                    }
                </Consumer>
            </Provider>
        </div>
    );
}
export default App;
````

***HomePage.js***
````javascript
import React, { Component } from 'react';

export default  class extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() { 
        return ( 
            <div>
                HomePage
            </div>
        )
    }
}
````
在 `React` 的官方文档中, `Context` 被归类为高级部分 `(Advanced)`, 属于 `React` 的高级 `API`, 但官方并不建议在稳定版的 App 中使用 `Context`;

不过, 这并非意味着我们不需要关注 `Context`. 事实上, 很多优秀的 `React ` 组件都通过 `Context` 来完成自己的功能, 比如 `react-redux` 的 `<Provider />` , 就是通过 `Context`  提供一个全局态的 `store` , 路由组件 `react-router` 通过 `Context`  管理路由状态等等. 在 `React` 组件开发中, 如果用好 `Context`, 可以让你的组件变得强大, 而且灵活;

范例: 模拟 `redux` 存放全局状态, 在组件间共享:

***AppContext.js***
````javascript
import React, { Component } from 'react'

export const Context = React.createContext()
export const Provider = Context.Provider
export const Consumer = Context.Consumer
````

***App.js***
````javascript
import React from 'react';
import Home from './pages/Home'
import User from './pages/User'
import { Provider } from './AppContext' //引入Context的Provider

const store = {
    home: {
        imgs: [
            {
                "src": "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/49973/2/8672/125419/5d679259Ecd46f8e7/ 0669f8801dff67e8.jpg!cr_1125x445_0_171!q70.jpg.dpg"
            }
        ]
    },
    user: {
        isLogin: true,
        userName: "Rabbit"
    }
}
function App() {
    return (
        <div className="app">
            <Provider value={ store }>
                <Home />
            </Provider>
        </div>
    );
}
export default App;
````

***Home.js***
````javascript
import React, { Component } from 'react'
import { Consumer } from '../AppContext';

export default class Home extends Component {
    render() {
        return (
            <Consumer>
                {
                    ctx => <HomeCmp {...ctx} />
                }
            </Consumer>
        )
    }
}
function HomeCmp(props) {
    const { home, user } = props
    const { isLogin, userName } = user
    return (
        <div>
            {
                isLogin ? userName : '登录'
            }
        </div>
    )
}
````

***User.js***
````javascript
import React, { Component } from 'react'
import { Consumer } from '../AppContext';
import TabBar from '../components/TabBar';

export default class User extends Component {
    render() {
        return (
            <>
                <Consumer>
                    {
                        ctx => <UserCmp {...ctx} />
                    }
                </Consumer>
                <TabBar />
            </>
        )
    }
}
function UserCmp(props) {
    const { home, user } = props
    const { isLogin, userName } = user
    return (
        <div>
            {
                isLogin ? userName : '登录'
            }
        </div>
    )
}
````

***TabBar.js***
````javascript
import React from 'react'
import { Consumer } from '../AppContext';

export default function TabBar() {
    return (
        <div>
            <Consumer>
                {
                    ctx => <TabBarCmp {...ctx} />
                }
            </Consumer>
        </div>
    )
}
function TabBarCmp(props) {
    const { home, user } = props
    const { isLogin, userName } = user
    return (
        <div>
            {
                isLogin ? userName : '登录'
            }
        </div>
    )
}
````

### 高阶组件
为了提高组件复用率, 可测试性, 就要保证组件功能单一性; 但是若要满足复杂需求就要扩展功能单一的组件, 在 `React` 里就有了 `HOC(Higher-Order Components)`的概念;

>定义: 是一个函数, 它接收一个组件并返回另一个组件;

````javascript
import React, { Component } from 'react';

// 高阶组件就是一个函数, 接收一个组件并返回一个组件
function Child(props){
    return <div>Child + { props.name }</div>
}

/*const foo = Cmp =>{
    return props =>{
        return(
            <div>
                <Cmp { ...props }/>
            </div>
        )
    }
}*/

// 上面的函数可以简写为
const foo = Cmp => props =>{
    return(
        <div>
            <Cmp { ...props }/>
        </div>
    )
}

export default class HocPage extends Component{
    
    render(){
        const Comp = foo(Child);
        return(
            <div>
                <h1>HocComponent</h1>
                <Comp name="高阶组件"/>
            </div>
        )
    }
}
````
#### 链式调用
链式调用的好处是可以将组件进行颗粒化, 可以给基础组件增强功能; 
````javascript
import React from 'react'
function Child(props) {
    return <div>Child</div>
}
const foo = Cmp => props => {
    return (
        <div style={{ background: 'red' }}>
            <Cmp {...props} />
        </div>
    )
}
const foo2 = Cmp => props => {
    return (
        <div style={{ border: 'solid 1px green' }}>
            <Cmp {...props} />
        </div>
    )
}
// 将 foo 组件再进行包装一次;
const Foo = foo2(foo(Child))
export default function HocPage() {
    return (
        <div>
            HocPage
            <Foo />
        </div>
    )
}
````
> 链式调用的弊端是如果层级太多, 对后面的代码比较难维护; 所以就有了装饰器的写法;
#### 装饰器
装饰器只能用于 Class 组件, 不能在函数组件上使用;

高阶组件本身是对装饰器模式的应用, 自然可以利用 `ES7` 中出现的装饰器语法来更优雅的书写代码; 但是我们需要先修改项目配置:

1. 弹出 webpack 配置
````bash
yarn eject
# 这一步如果报错的话, 就看以下我们本地的文件里面有一个 .gitignore , 我们需要将本地的文件添加到版本控制再执行这个命令
# git add --all
# git commit -m "..."
# yarn eject
````
2. 在 `package.json` 里面添加以下代码:
````json
"babel":{
    "presets":[
        "react-app"
    ],
    "plugins":[
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ]
}
````
3. 安装装饰器插件
````bash
yarn add @babel/plugin-proposal-decorators
````
4. 如果介意`vscode`的 `warning`, vscode设置里加上:
````json
"javascript.implicitProjectConfig.experimentalDecorators": true
````
> `create-react-app` 项目中默认不支持 js 代码使用装饰器语法, 可以修改后缀名为 tsx 则可以直接支持;

上面的高阶组件可以修改为:
````javascript
import React, { Component } from 'react';

const foo = Cmp => props =>{
    return(
        <div>
            <Cmp { ...props }/>
        </div>
    )
}

@foo
class Child extends Component{
    render(){
        return (
            <div>Child + { this.props.name }</div>
        )
    }
}

export default class HocPage extends Component{
    
    render(){
        return(
            <div>
                <h1>HocComponent</h1>
                <Child name="message"/>
            </div>
        )
    }
}
````

