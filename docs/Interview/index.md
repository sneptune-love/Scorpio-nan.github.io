### html
+ 页面渲染html的过程
    + 1. 浏览器解析html源码, 然后创建一个 DOM树. 并行请求 css/image/js在DOM树中, 每一个HTML标签都有一个对应的节点, 并且每一个文本也都会有一个对应的文本节点. DOM树的根节点就是 documentElement, 对应的是html标签
    + 2. 浏览器解析CSS代码, 计算出最终的样式数据. 构建CSSOM树. 对CSS代码中非法的语法它会直接忽略掉. 解析CSS的时候会按照如下顺序来定义优先级：浏览器默认设置 < 用户设置 < 外链样式 < 内联样式 < html中的style
    + 3. DOM Tree + CSSOM --> 渲染树（rendering tree）. 渲染树和DOM树有点像, 但是是有区别的; DOM树完全和html标签一一对应, 但是渲染树会忽略掉不需要渲染的元素, 比如head、display:none的元素等. 而且一大段文本中的每一个行在渲染树中都是独立的一个节点. 渲染树中的每一个节点都存储有对应的css属性
    + 4. 一旦渲染树创建好了, 浏览器就可以根据渲染树直接把页面绘制到屏幕上
以上四个步骤并不是一次性顺序完成的. 如果DOM或者CSSOM被修改, 以上过程会被重复执行. 实际上, CSS和JavaScript往往会多次修改DOM或者CSSOM



### css
+ calc, support, media各自的含义及用法
    + @support主要是用于检测浏览器是否支持CSS的某个属性, 其实就是条件判断, 如果支持某个属性, 你可以写一套样式, 如果不支持某个属性, 你也可以提供另外一套样式作为替补. 
    + calc() 函数用于动态计算长度值.  calc()函数支持 "+", "-", "*", "/" 运算；
    + @media 查询, 你可以针对不同的媒体类型定义不同的样式. 


+ css水平、垂直居中的写法, 请至少写出4种 
    + 行内元素: text-align: center
    + 块级元素: margin: 0 auto
    + `position:absolute +left:50%+ transform:translateX(-50%)`
    + `display:flex + justify-content: center`

    - 设置line-height 等于height
    - `position：absolute +top:50%+ transform:translateY(-50%)`
    - `display:flex + align-items: center`
    - `display:table+display:table-cell + vertical-align: middle;`


+ 1rem、1em、1vh、1px各自代表的含义
    + rem 是全部的长度都相对于根元素<html>元素. 通常做法是给html元素设置一个字体大小, 然后其他元素的长度单位就为rem
    + em  子元素字体大小的em是相对于父元素字体大小; 元素的width/height/padding/margin用em的话是相对于该元素的font-size
    + vw/vh 全称是 Viewport Width 和 Viewport Height, 视窗的宽度和高度, 相当于 屏幕宽度和高度的 1%, 不过, 处理宽度的时候%单位更合适, 处理高度的 话 vh 单位更好
    + px px像素（Pixel）. 相对长度单位. 像素px是相对于显示器屏幕分辨率而言的. 一般电脑的分辨率有 `{1920*1024}` 等不同的分辨率 `1920*1024` 前者是屏幕宽度总共有1920个像素,后者则是高度为1024个像素


+ 0.5px的直线

    ```css
        height: 1px;
        transform: scale(0.5);
    ```


+ 说一下盒模型

    + 盒模型的组成, 由里向外content,padding,border,margin.
    + 在标准的盒子模型中, width指content部分的宽度
    + box-sizing的使用

    ```css
        box-sizing: content-box     //是W3C盒子模型
        box-sizing: border-box      //是IE盒子模型
    ```

+ 画一个三角形

    ```css
        {
            width: 0;
            height: 0;
            border-width: 100px;
            border-style: solid;
            border-color: transparent #0099CC transparent transparent;
            transform: rotate(90deg); /*顺时针旋转90°*/
        }
    ```
+ 清0

    + `::after / <br> / clear: both`
    + 创建父级 BFC(overflow:hidden)
    + 父级设置高度



### js 

+ call, apply, bind 区别

    + call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象, 第二个参数差别就来了
    + call 的参数是直接放进去的, 第二第三第 n 个参数全都用逗号分隔, 直接放到后面

        ```js
            var name = "小王", age = 25;
            var obj = {
                name:"小张",
                objAge:this.age,
                callFunc(from,to){
                    console.log(this.name + ' 年龄:' + this.age + ' 来自' + from + ' 去往' + to);
                }
            }
            var db = {
                name:"德玛西亚",
                age:30
            }

            obj.callFunc.call(db,'成都','上海')；　　　　 // 德玛 年龄 30  来自 成都去往上海
            obj.callFunc.apply(db,['成都','上海']);      // 德玛 年龄 30  来自 成都去往上海  
            obj.callFunc.bind(db,'成都','上海')();       // 德玛 年龄 30  来自 成都去往上海
            obj.callFunc.bind(db,['成都','上海'])();　　 // 德玛 年龄 30  来自 成都, 上海去往 undefined
        ```
    + apply 的所有参数都必须放在一个数组里面传进去
    + bind 除了返回是函数以外, 它 的参数和 call 一样



+ 手写一个 1-100 求和的递归

    ```js
        function add(num1,num2){
            var num = num1+num2;
                if(num2+1>100){
            return num;
            }else{
            return add(num,num2+1)
                }
        }
        var sum =add(1,2);  
    ```

+ 手写一个 版本号对比函数 

    ```js
        function compareVersion(ov, nv){
            if (!ov || !nv || ov == "" || nv == "") {
                return false;
            }
            var b = false,
                ova = ov.split(".", 4),
                nva = nv.split(".", 4);
            for (var i = 0; i < ova.length && i < nva.length; i++) {
                var so = ova[i],
                    no = parseInt(so),
                    sn = nva[i],
                    nn = parseInt(sn);
                if (nn > no || sn.length > so.length) {
                    return true;
                } else if (nn < no) {
                    return false;
                }
            }
            if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
                return true;
            }
        }
    ```



+ 节流和防抖的区别以及作用
    
    + 防抖  触发高频事件后 n 秒内函数只会执行一次, 如果 n 秒内高频事件再次被触发, 则重新计算时间;
        + 适用场景：
            - 1.按钮提交场景：防止多次提交按钮, 只执行最后提交的一次.
            - 2.服务端验证场景：表单验证需要服务端配合, 只执行一段连续的输入事件的最后一次, 还有搜索联想词功能等.

        ```js
            /**
            * 防抖函数, 返回函数连续调用时, 空闲时间必须大于或等于 wait, func 才会执行
            *
            * @param  {function} func        回调函数
            * @param  {number}   wait        表示时间窗口的间隔
            * @param  {boolean}  immediate   设置为ture时, 是否立即调用函数
            * @return {function}             返回客户调用函数
            */
            function debounce (func, wait = 50, immediate = true) {
                let timer, context, args;
                // 延迟执行函数
                const later = () => setTimeout(() => {
                    // 延迟函数执行完毕, 清空缓存的定时器序号
                    timer = null
                    // 延迟执行的情况下, 函数会在延迟函数中执行
                    // 使用到之前缓存的参数和上下文
                    if (!immediate) {
                        func.apply(context, args)
                        context = args = null
                    }
                }, wait)
                
                // 这里返回的函数是每次实际调用的函数
                return function(...params) {
                    // 如果没有创建延迟执行函数（later）, 就创建一个
                    if (!timer) {
                        timer = later()
                        // 如果是立即执行, 调用函数
                        // 否则缓存参数和调用上下文
                        if (immediate) {
                            func.apply(this, params)
                        } else {
                            context = this
                            args = params
                        }
                    // 如果已有延迟执行函数（later）, 调用的时候清除原来的并重新设定一个
                    // 这样做延迟函数会重新计时
                    } else {
                        clearTimeout(timer)
                        timer = later()
                    }
                }
            }
        ```
    + 节流  高频事件触发, 在 n 秒内只会执行一次, 所以节流会稀释函数的执行效率.
        + 适用场景：
            - 1.拖拽场景：固定时间内只执行一次, 防止超高频次触发位置变动
            - 2.缩放场景：监控浏览器 resize
            - 3.动画场景：避免短时间内多次触发动画引起性能问题

        ```js
            // func 是⽤户传⼊需要防抖的函数
            // delay 是等待时间
            function throottle(fn, delay = 100) {
                let timer = null
            
                return function () {
                    if (timer) {
                        return
                    }
                    timer = setTimeout(() => {
                        fn.apply(this, arguments)
                        timer = null
                    }, delay)
                }
            }
        ```
    + 区别:  防抖是将多次执行变为最后一次执行, 节流是将多次执行变成每隔一段时间执行;


+ 宏任务和微任务

    + 宏任务：当前调用栈中执行的任务称为宏任务. （主代码快, 定时器等等）. 
    + 微任务： 当前（此次事件循环中）宏任务执行完, 在下一个宏任务开始之前需要执行的任务为微任务. （可以理解为回调事件, promise.then, proness.nextTick等等）
    + 宏任务中的事件放在callback queue中, 由事件触发线程维护；微任务的事件放在微任务队列中, 由js引擎线程维护



+ get, post 请求的区别

    + get传参方式是通过地址栏URL传递, 是可以直接看到get传递的参数, post传参方式参数URL不可见, get把请求的数据在URL后通过？连接, 通过&进行参数分割. psot将参数存放在HTTP的包体内
    + get传递数据是通过URL进行传递, 对传递的数据长度是受到URL大小的限制, URL最大长度是2048个字符. post没有长度限制
    + get后退不会有影响, post后退会重新进行提交
    + get请求可以被缓存, post不可以被缓存
    + get请求只URL编码, post支持多种编码方式
    + get请求的记录会留在历史记录中, post请求不会留在历史记录
    + get只支持ASCII字符, post没有字符类型限制


### Typescript

+ interface 和 type 的区别

    + 相同点: 
        - 都可以描述一个对象或者是一个函数;

        ```js
            // interface
            interface User {
                name: string
                age: number
            }

            interface SetUser {
                (name: string, age: number): void;
            }

            // type
            type User = {
                name: string
                age: number
            };

            type SetUser = (name: string, age: number)=> void;
        ```
        - 都允许拓展(extends)

        ```js
            // interface extends interface
            interface Name { 
                name: string; 
            }
            interface User extends Name { 
                age: number; 
            }

            // type extends type
            type Name = { 
                name: string; 
            }
            type User = Name & { age: number  };

            // interface extends type
            type Name = { 
                name: string; 
            }
            interface User extends Name { 
                age: number; 
            }

            // type extends interface
            interface Name { 
                name: string; 
            }
            type User = Name & { 
                age: number; 
            }
        ```
    + 不同点:
        - type 可以声明基本类型别名, 联合类型, 元组等类型; interface 不行

        ```js
            // 基本类型别名
            type Name = string

            // 联合类型
            interface Dog {
                wong();
            }
            interface Cat {
                miao();
            }

            type Pet = Dog | Cat

            // 具体定义数组每个位置的类型
            type PetList = [Dog, Pet]
        ```
        - interface 能够声明合并, type 不行

        ```js
            interface User {
                name: string
                age: number
            }

            interface User {
                sex: string
            }

            /*
            User 接口为 {
                name: string
                age: number
                sex: string 
            }
            */
        ```

+ Typescript `/// ＜reference types=“...“ /＞` 指令和模块 `import` 区别

    ```js
        (1)依赖全局库

            1、如果你的库依赖于某个全局库，使用/// <reference types="..." />指令：
            
            /// <reference types="someLib" />
            function getThing(): someLib.thing;

        (2)依赖模块
            
            1、如果你的库依赖于模块，使用import语句：
            
            import * as moment from "moment";
            function getThing(): moment;

        (3)依赖UMD库
            1、从全局库
                如果你的全局库依赖于某个UMD模块，使用/// <reference types指令：
                
                /// <reference types="moment" />
                function getThing(): moment;
            
            2、从一个模块或UMD库
            
                如果你的模块或UMD库依赖于一个UMD库，使用import语句：
                
                import * as someLib from 'someLib';
                
                不要使用/// <reference指令去声明UMD库的依赖！
    ```


### web安全

+ XSS 跨站脚本攻击

    + 利利⽤用虚假输⼊入表单骗取⽤用户个⼈人信息. 
    + 利⽤用脚本窃取⽤用户的Cookie值, 被害者在不不知情的情况下, 帮助攻击者发送恶意请求. 
    + 显示伪造的文章或图⽚
    + 防御手段
        - `ctx.set('X-XSS-Protection', 0)` // 禁⽌止XSS过滤
        - `ctx.set('Content-Security-Policy', "default-src 'self'")` 简称 CSP 内容安全策略
        - `response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")` 这是预防XSS攻击窃取⽤用户cookie最有效的防御⼿手段. Web应 ⽤用程序在设置cookie时, 将其
            属性设为HttpOnly, 就可以避免该⽹网⻚页的cookie被客户端恶意JavaScript窃取, 保护⽤用户cookie信息


+ CSRF 即跨站请求伪造, 是一种常见的Web攻击, 它利利⽤用户已登录的身份, 在⽤用户毫不知情的情况下, 以用户的名义完成非法操作

    + 用户已经登录了站点 A, 并在本地记录了 cookie
    + 在⽤用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下）, 访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点A)
    + 站点 A 没有做任何 CSRF 防御
    + CSRF攻击危害
        + 利⽤用户登录态
        + 用户不知情
        + 完成业务请求
        + 盗取用户资金（转账, 消费）
        + 冒充⽤户发帖背锅
        + 损害网站声誉
    + 防御手段
        + 禁止第三方网站带Cookie 
        + 验证码



+ SQL 注入

     + 所有的查询语句建议使用数据库提供的参数化查询接口**, 参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中, 即不要直接拼接 SQL 语句句. 例例如 Node.js 中的 mysqljs 库的 query方法中的 ? 占位参数



+ 请求劫持

    + 顾名思义, DNS服务器器(DNS解析各个步骤)被篡改, 修改了了域名解析的结果, 使得访问到的不不是预期的ip
    + HTTP劫持 运营商劫持, 此时⼤大概只能升级HTTPS了了


### Vue 常见面试题

+ `v-if`  `v-for` 哪个优先级更高, 如果两个同时出现, 会不会有什么问题

    + v-for 的优先级是高于 v-if 的; 从编译出来的源码可以看到, for 循环是在最外层的;
    + 如果同时出现, 每次渲染都会先执行循环再执行判断条件, 无论如何循环都不可避免, 浪费了性能;
    + 要解决这个问题, 就需要在最外层嵌套一层  template , 在这一层进行 v-if 判断, 然后在内部进行 for 循环;

    ```html
    <html>
        <head>
            <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.5/vue.min.js"></script>
        </head>

        <body>
            <div id="intro" style="text-align:center;">
                <template v-if="isFolder">
                    <p v-for="item in children">{{item.title}}</p>
                </template>
            </div>
            <script type="text/javascript">
                var vue_det = new Vue({
                    el: '#intro',
                    data: {
                        children:[
                            {title: 'foo'},
                            {title: 'bar'}
                        ]
                    },
                    computed:{
                        isFolder(){
                            return this.children && this.children.length > 0;
                        }
                    }
                });
            </script>
        </body>
    </html>
    ```


+ `Vue` 的 `data` 实例为什么必须是个函数, 而 `Vue` 的根实例没有限制;

    + 函数每次执行都会返回全新的 `data` 对象实例;
    + Vue 组件可能存在多个实例, 如果使用对象的形式定义 data, 则会导致多个组件公用一个 data 的值, 那么状态变化会影响所有的组件
    + 采用函数的形式定义, 在 initData 时会将其作为工厂函数返回全新的 data; 有效的避免了多组件实例之间的状态污染;
    + 而在Vue根实例上则不存在这个问题, 每一次 new Vue 都会返回一个新的对象;



+ `key` 的作用和原理;

    + key 的主要作用是为了更高效的更新虚拟 DOM , 其原理是 Vue 在 patch 的时候通过 key 可以精准的判断两个节点是否是同一个, 从而避免频繁的更新不同的元素, 使整个 patch 过程更加高效, 减少 dom 操作;
    + 另外, 如果不设置 key 可能在列表更新的时候引发一些 bug;
    + vue 中在使用相同的标签名元素的过渡切换的时候, 也会用到 key 属性, 目的也是为了让 vue 可以区分它们, 否则 vue 只会替换其内部属性, 而不会触发过渡效果;



+ 怎么理解 Vue 中的 diff 算法

    + diff 算法是虚拟 DOM 技术的必然产物, 通过新旧的虚拟 dom 做对比, 将变化的地方更新在真实的 dom 上, 另外也需要 diff 执行高效的对比过程, 从而降低时间复杂度;
    + vue 2.x 中为了降低 watcher 的粒度, 每个组件只有一个 watcher 与之对应, 只有引入 diff 才能精确的找到变化的地方;
    + vue 中的 diff 执行的时刻其实就是组件实例执行更新函数的时候, 它会比对上一次渲染的结果和新的结果, 此过程成为 patch;
    + diff 过程整体遵循深度优先, 同层比较策略, 两个节点之间比较会根据它们是否拥有子节点或者是文本节点做不同的操作, 比较两组节点是算法的重点, 假设收尾节点可以做相同的4次的比对尝试, 如果没有找到相同节点才按照通用方式查找, 查找完再按照情况处理剩下的节点, 借助 key 是可以非常精确的找到相同的节点, 因此整个 patch 过程效率非常高;



+ 对 Vue 组件化的理解

    + 组件化的定义, 优点, 使用场景, 使用技巧, 同时要强调 Vue 中组件化的特点;
    + 组件是独立和可复用的代码组织单元, 组件系统是 Vue 核心特性之一, 它使开发者使用小型、独立和通常可复用的组件构建成大型应用;
    + 组件化开发能大幅提升应用开发效率、测试性、复用性;
    + 组件使用按类分: 页面组件、业务组件、通用组件;
    + vue 的组件是基于配置的, 我们通常编写的组件配置而非组件, 框架后续会生成其构造函数, 它们基于 VueComponent, 扩展于 Vue;
    + vue 中常见的组件化技术: 属性 prop, 自定义事件, 插槽等, 它们主要用于组件通信, 扩展等;
    + 合理的划分组件有助于提升应用性能;
    + 组件应该是高内聚低耦合的;
    + 遵循单向数据流;



+ MVC MVP  MVVM 的认识

    + 这三者都是框架模式, 它们的设计目标都是为了解决 Model 和 View 耦合的问题;
    + MVC 最早是应用在后端, 如 Spring MVC, 它的优点是分层清晰, 缺点是数据流混乱, 灵活性带来的维护性问题;
    + MVP 模式是在 MVC 的形式上进化来的, Presenter 作为中间层负责 MV 通信, 解决了两者耦合的问题, 但是 p 层过于臃肿会导致维护问题;
    + MVVM 模式在前端领域有广泛的应用, 它不仅解决 MV 耦合问题, 还同时解决了维护两者映射关系的大量繁杂代码和 DOM 操作代码, 在提高开发效率的同时还保持了优越的性能;



+ Vue 组件通信的方式

    + props
    + $emit/$on
    + vuex
    + $parent/$children
    + $attrs/$listeners
    + provide/inject



+ vue 性能优化方法

    + 路由懒加载
    + keep-alive 缓存页面
    + 使用 v-show 复用 DOM
    + v-for 避免使用 v-if
    + 长列表性能优化 (如果数据纯粹是展示, 不会变化, 就可以使用 Object.freeze([]));
    + 事件销毁
    + 图片懒加载
    + 第三方插件按需引入
    + 无状态组件标记为函数组件 ( <template functional></template> )
    + 子组件分割
    + ssr 服务端渲染



+ Vue 3.x 特性

    + 更快
        + 虚拟 DOM 重写
        + 优化 slots 生成
        + 静态树提升
        + 静态属性提升
        + 基于 Proxy 响应式系统
    + 更小  通过摇树优化核心库体积
    + 更容易维护    Typescript + 模块化
    + 更加友好  编辑器核心和运行平台无关, 使 Vue 更容易与任何平台一起使用;
    + 更容易使用
        + 改进 Typescript 支持, 编辑器提供强类型检查和错误警告
        + 更好的调试支持
        + 独立的响应化模块
        + Composition Api



+ Vue 扩展现有的组件

    + 使用 Vue.mixin 全局混入
    + 加 slot 扩展 默认插槽和 具名插槽
    



+ Watch 和 Computed 区别

    + 语义区别
    + 功能区别: watch 更加通用, computed 派生功能都能实现, 计算属性底层来自于 watch, 但做了更多, 例如缓存
    + 用法区别: computed 更简单/高效; 优先使用;
    + 使用场景: watch 需要在数据变化时执行异步操作或者是开销较大的操作的时候使用, computed 是对于一个逻辑或者是一个数据属性变化的时候发生变化;




+ Vuex 的理解

    + 核心概念
        + state
        + mutation
        + action
        + getter
        + model
    + vuex 实现了一个简单的单向数据流, 在全局拥有一个 state 存放数据, 当组件要更改 state 中的数据时, 必须通过 mutation 提交修改信息, mutation 同时提供了订阅者模式, 供外部插件调用获取 state 的值, 而当所有的异步操作或者是批量的同步操作需要走 action , 但 action 也是无法直接修改 state 的值, 需要通过 mutation 来修改 state 的数据;
    + state : 数据源, 同时获取多个 state 可以用 ...mapState;
    + getter: 可以将 getter 理解为计算属性, getter 返回的值根据它的依赖缓存起来, 依赖发生变化才会被重新计算;
    + mutation: 更改 state 的唯一办法, 回调函数就是修改 state 的地方, 并且会接受 state 作为第一个参数 payload 为自定义函数, mutation 必须是同步的;



+ nextTick 原理

    + 尽管 MVVM 框架并不推荐访问 DOM, 但有时候确实也会有这样的需求, 尤其是和第三方插件进行配合的时候, 免不了要进行 dom 操作, 而 nextTick 就提供了一个桥梁, 确保我们操作的是更新之后的DOM
    + MutacionObserver 是 H5 新增的特性, 用于监听 Dom 修改的事件, 能够监听到节点的属性, 文本内容, 子节点的改动等;

    ```js
    var observe = new MutationObserver(function(){
        console.log("DOM被修改了");
    })

    ```


+ Vue 组件生命周期的执行顺序

    + 单组件生命周期执行顺序
    
        > activated, deactivated 是组件keep-alive时独有的钩子

            - beforeCreate
            - created
            - beforeMount
            - mounted
            - beforeUpdate
            - updated
            - activated
            - deactivated
            - beforeDestroy
            - destroyed
            - errorCaptured
    
    + 父子组件生命周期执行顺序

        + 加载渲染过程: 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted;
        + 更新过程: 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated;
        + 销毁过程: 父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed;
        + 常用钩子: 父create -> 子created -> 子mounted -> 父mounted;

    + 总结
        - beforeCreate执行时：data和el均未初始化, 值为undefined
        - created执行时：Vue 实例观察的数据对象data已经配置好, 已经可以得到data的值, 但Vue 实例使用的根 DOM 元素el还未初始化
        - beforeMount执行时：data和el均已经初始化, 但此时el并没有渲染进数据, el的值为“虚拟”的元素节点
        - mounted执行时：此时el已经渲染完成并挂载到实例上
        - beforeUpdate和updated触发时, el中的数据都已经渲染完成, 但只有updated钩子被调用时候, 组件dom才被更新. 
        - 在created钩子中可以对data数据进行操作, 这个时候可以进行数据请求将返回的数据赋给data
        - 在mounted钩子对挂载的dom进行操作, 此时, DOM已经被渲染到页面上. 
        - 虽然updated函数会在数据变化时被触发, 但却不能准确的判断是那个属性值被改变, 所以在实际情况中用computed或watch函数来监听属性的变化, 并做一些其他的操作. 
        - 所有的生命周期钩子自动绑定 this 上下文到实例中, 所以不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos()),会导致this指向父级. 
        - 在使用vue-router时有时需要使用来缓存组件状态, 这个时候created钩子就不会被重复调用了, 如果我们的子组件需要在每次加载或切换状态的时候进行某些操作, 可以使用activated钩子触发. 
        - 父子组件的钩子并不会等待请求返回, 请求是异步的, VUE设计也不能因为请求没有响应而不执行后面的钩子. 所以, 我们必须通过v-if来控制子组件钩子的执行时机




+ Vue 双向数据绑定的原理

    + 数据劫持结合 发布订阅的 方式通过 `Object.defineProperty ` 的  get 和  set 在数据变动的时候发布消息给订阅者接收;

    ```js
    function defineReactive(obj, key, value) {
        var dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                if (Dep.target) {
                    dep.depend()
                }
                return value
            },
            set: function reactiveSetter(newVal) {
                if (value === newVal) {
                    return
                } else {
                    value = newVal
                    dep.notify()
                }
            }
        })
    }
    ```


+ Vue router 中导航的钩子函数

    + 全局导航钩子
        + beforeEach(to,from,next) 路由改变之前调用, 常用于验证用户权限
        + afterEach(to,from) 路由改变之后的钩子,常用于自动让页面返回顶端;
            + to  即将要进入的目标路由页面
            + from 当前正要离开的路由对象
            + next 路由控制参数
                + next() 如果一切正常, 则调用这个方法进入下一个钩子
                + next(false) 取消导航, 即路由不发生变化
                + next('/login') 当前导航中断, 进行一个新的导航
                + next(error) 如果是一个 Error 实例, 则导航终止且错误会被传递给 router.onError();
    + 路由配置中的导航钩子
        + beforeEnter(to,from,next)
    + 组件内部导航钩子
        + beforeRouterEnter(to,from,next) 该组件对应的路由被 confirm 前调用, 实例还未创建, 不能调用 this
        + beforeRouterUpdate(to,from,next) 当前路由发生变化, 组件被复用时调用, 可以调用 this
        + beforeRouterLeave(to,from,next) 当导航离开组件的时候调用 可以访问 this
    + 路由检测变化
        + 监听路由变化从而做出响应
        ```js
        watch:{
            '$route'(to,from){

            }
        }
        ```


+ Vue router 传参的几种形式

    + params 
    + query




### React 面试题

+ react key 的作用

    + 和 Vue 的 key 的作用基本一样, react 的 diff 算法是把 key 当成唯一 id 然后比对组件的 value 来确定是否需要更新的, 所以如果没有key, react将不会知道该如何更新组件



+ refs 是什么, 使用时需要注意什么

    + React 提供了 Refs 帮助开发者可以直接操作 DOM 节点, 就像 jquery 时代一样, 直接操作DOM;
    + React.createRef()
        ```js
        class TestComp extends React.Component {
            constructor(props) {
                super(props);
                this.tRef = React.createRef();
            }
            render() {
                return (
                    <div ref={ this.tRef }></div>
                )
            }
        }
        ```
    + 回调函数
        ```js
            class TestComp extends React.Component {
                constructor(props) {
                    super(props);
                    this.textInput = null;
                    // 使用'ref'的回调函数将 text输入框DOM节点的引用绑定到 React实例 this.textInput上
                    this.inputRef = element => {
                        this.textInput = element;
                    }
                    this.focus = () => {
                        if (this.textInput) {
                            this.textInput.focus();
                        }
                    }
                }
                componentDidMount() {
                    this.focus();
                }
                render() {
                    return (
                        <div>
                            <input type='text' ref={ this.inputRef } />
                        </div>
                    );
                }
            }
        ```


+ React 生命周期

    + 组件挂载过程
        + constructor()
            + 完成 React 数据初始化, 继承自 React.Component
        + componentWillMount()
            + 组件已经经历了 constructor() 初始化数据后, 但是还未渲染DOM时;
        + componentDidMount()
            + 组件第一次渲染完成, 此时dom节点已经生成, 可以在这里调用ajax请求, 返回数据setState后组件会重新渲染;
    + 组件更新过程
        + componentWillReceiveProps(nextProps)
            + 在接受父组件改变后的 props 需要重新渲染组件时用到的比较多
            + 接受一个参数 nextProps
            + 通过对比 nextProps 和 this.props, 将 nextProps 的 state 为当前组件的 state, 从而重新渲染组件
        + shouldComponentUpdate(nextProps,nextState)
            + 主要用于性能优化
            + 唯一用于控制组件重新渲染的生命周期, 由于在 react 中, setState 以后, state发生变化, 组件会进入重新渲染的流程, 在这里return false可以阻止组件的更新;
            + 因为 react 父组件的重新渲染会导致其所有子组件的重新渲染, 这个时候其实我们是不需要所有子组件都跟着重新渲染的, 因此需要在子组件的该生命周期中做判断
        + componentWillUpdate(nextProps,nextState)
            + shouldComponentUpdate 返回 true 以后, 组件进入重新渲染的流程, 进入componentWillUpdate;
        + componentDidUpdate(prevProps,prevState)
            + 组件更新完毕后, react 只会在第一次初始化成功会进入 componentDidmount, 之后每次重新渲染后都会进入这个生命周期;
        + render()
            + render 函数会插入 jsx 生成的dom结构, react会生成一份虚拟dom树, 在每一次组件更新时, 在此react会通过其diff算法比较更新前后的新旧DOM树
    + 组件卸载 过程
        + componentWillUnmount() 组件的卸载和数据的销毁
    + React新增的生命周期
        + getDerivedStateFromProps(nextProps, prevState)
            + 代替componentWillReceiveProps() 老版本中的 componentWillReceiveProps() 方法判断前后两个 props 是否相同, 如果不同再将新的 props 更新到相应的 state 上去. 这样做一来会破坏 state 数据的单一数据源, 导致组件状态变得不可预测, 另一方面也会增加组件的重绘次数;
        + getSnapshotBeforeUpdate(prevProps, prevState)
            + 代替componentWillUpdate() 在 React 开启异步渲染模式后, 在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同, 这就导致在componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的, 因为这时的值很有可能已经失效了;



+ React 中的 setState

    + setState 本质是通过一个队列机制实现 state 更新的;
    + 执行 setState 时, 会将需要更新的 state 合并后放入状态队列, 而不会立刻更新state, 队列机制可以批量更新state;
    + 如果不通过 setState 而直接修改this.state, 那么这个state不会放入状态队列中, 下次调用setState时对状态队列进行合并时, 会忽略之前直接被修改的state, 这样我们就无法合并了, 而且实际也没有把你想要的state更新上去



+ React 中的组件通信

    + props
    + refs
    + context
    + 事件订阅发布
    + redux


+ Redux 工作原理

    + createStore
    + reducer
    + getState
    + dispatch
    + subscribe



### http 缓存

 浏览器发送请求前, 根据请求头的expires和cache-control判断是否命中(包括是否过期) 强缓存策略, 如果命中, 直接从缓存获取资源, 并不会发送请求. 如果没有命中, 则进入下一步.  2. 没有命中强缓存规则, 浏览器会发送请求, 根据请求头的last-modified和etag判断是否命中协商缓存, 如果命中, 直接从缓存获取资源. 如果没有命中, 则进入下一步.  3. 如果前两步都没有命中, 则直接从服务端获取资源. 

+ 强缓存
    + 不会向服务器发送请求, 直接从缓存中读取资源, 在chrome控制台的Network选项中可以看到该请求返回200的状态码, 并且size显示from disk cache或from memory cache两种
    + Expires response header里的过期时间, 浏览器再次加载资源时, 如果在这个过期时间内, 则命中强缓存
    + Cache-Control 当值设为max-age=300时, 则代表在这个请求正确返回时间( 浏览器也会记录下来) 的5分钟内再次加载资源, 就会命中强缓存
    + 区别：Expires 是http1.0的产物, Cache-Control是http1.1的产物两者同时存在的话, Cache-Control优先级高于Expires Expires其实是过时的产物, 现阶段它的存在只是一种兼容性的写法
+ 协商缓存
    + 向服务器发送请求, 服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存, 如果命中, 则返回 304 状态码并带上新的response header通知浏览器从缓存中读取资源
    + ETag和If-None-Match Etag是上一次加载资源时, 服务器返回的response header, 是对该资源的一种唯一标识只要资源有变化, Etag就会重新生成  服务器接受到If-None-Match的值后, 会拿来跟该资源文件的Etag值做比较, 如果相同, 则表示资源文件没有发生改变, 命中协商缓存
    + Last-Modified和If-Modified-Since Last-Modified是该资源文件最后一次更改时间,服务器会在response header里返回
+ 共同点：都是从客户端缓存中读取资源; 区别是强缓存不会发请求, 协商缓存会发请求. 
+ 浏览器缓存过程
    + 浏览器第一次加载资源, 服务器返回200, 浏览器将资源文件从服务器上请求下载下来, 并把response header及该请求的返回时间(要与Cache-Control和Expires对比)一并缓存
    + 下一次加载资源时, 先比较当前时间和上一次返回200时的时间差, 如果没有超过Cache-Control设置的max-age, 则没有过期, 命中强缓存, 不发请求直接从本地缓存读取该文件( 如果浏览器不支持HTTP1.1, 则用Expires判断是否过期) 
    + 如果时间过期, 则向服务器发送header带有If-None-Match和If-Modified-Since 的请求; 
    + 服务器收到请求后, 优先根据Etag的值判断被请求的文件有没有做修改, Etag值一致则没有修改, 命中协商缓存, 返回304; 如果不一致则有改动, 直接返回新的资源文件带上新的Etag值并返回 200; 
    + 如果服务器收到的请求没有Etag值, 则将If-Modified-Since和被请求文件的最后修改时间做比对, 一致则命中协商缓存, 返回304; 不一致则返回新的last-modified和文件并返回 200; 
+ 前端开发设置不缓存
    + js, css 等资源后加随机数
    ```html
        <script type=“text/javascript” src=“/js/test.js?+Math.random()”></script> 
    ```
    + 设置html页面不让浏览器缓存的方法  
    ```html
        <meta http-equiv="pragma" content="no-cache"> 
        <meta http-equiv="Cache-Control" content="no-cache, must-revalidate"> 
        <meta http-equiv="expires" content="Wed, 26 Feb 1997 00:00:00 GMT">
    ```
![Material](/res/cache.png)




