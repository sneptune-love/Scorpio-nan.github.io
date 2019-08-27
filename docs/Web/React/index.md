#### 概述(原生开发与跨平台技术)

##### 原生开发
原生应用程序是指某一个移动平台 (比如iOS或安卓) 所特有的应用, 使用相应平台支持的开发工具和语言, 并直接调用系统提供的SDK API. 比如 `Android` 原生应用就是指使用 `Java` 或 `Kotlin` 语言直接调用 `Android SDK`开发的应用程序; 而 `iOS` 原生应用就是指通过 `Objective-C` 或 `Swift` 语言直接调用 `iOS SDK `开发的应用程序. 原生开发有以下;

主要优势:
- 可访问平台全部功能 (GPS、摄像头) 
- 速度快、性能高、可以实现复杂动画及绘制, 整体用户体验好; 

主要缺点：
- 平台特定, 开发成本高; 不同平台必须维护不同代码, 人力成本随之变大;
- 内容固定, 动态化弱, 大多数情况下, 有新功能更新时只能发版; 

##### 跨平台技术
针对原生开发面临问题, 人们一直都在努力寻找好的解决方案, 而时至今日, 已经有很多跨平台框架(注意, 本书中所指的"跨平台"若无特殊说明, 即特指 `Android` 和 `iOS` 两个平台), 根据其原理, 主要分为三类:
- H5+原生 ( `Cordova` 、 `Ionic `、微信小程序)
- JavaScript开发+原生渲染 ( `React Native` 、` Weex `、快应用)
- 自绘UI+原生(`QT for mobile `、 `Flutter `)

###### H5+原生混合开发
这类框架主要原理就是将APP的一部分需要动态变动的内容通过H5来实现, 通过原生的网页加载控件 `WebView (Android)` 或 `WKWebView(iOS)` 来加载(以后若无特殊说明, 我们用 `WebView` 来统一指代 `android` 和 `iOS` 中的网页加载控件). 这样一来, H5部分是可以随时改变而不用发版, 动态化需求能满足；同时, 由于h5代码只需要一次开发, 就能同时在 ` Android `和 `iOS` 两个平台运行, 这也可以减小开发成本, 也就是说, H5部分功能越多, 开发成本就越小. 我们称这种h5+原生的开发模式为混合开发, 采用混合模式开发的APP我们称之为混合应用或 `Hybrid APP` , 如果一个应用的大多数功能都是H5实现的话, 我们称其为Web APP. 

目前混合开发框架的典型代表有：`Cordova、Ionic ` 和微信小程序, 值得一提的是微信小程序目前是在 `webview` 中渲染的, 并非原生渲染, 但将来有可能会采用原生渲染. 

###### 混合开发技术点
如之前所述, 原生开发可以访问平台所有功能, 而混合开发中, H5代码是运行在 `WebView` 中, 而 `WebView` 实质上就是一个浏览器内核, 其 `JavaScript` 依然运行在一个权限受限的沙箱中, 所以对于大多数系统能力都没有访问权限, 如无法访问文件系统、不能使用蓝牙等. 所以, 对于H5不能实现的功能, 都需要原生去做. 而混合框架一般都会在原生代码中预先实现一些访问系统能力的API,  然后暴露给 `WebView `以供 `JavaScript` 调用, 这样一来,  `WebView` 就成为了 `JavaScript` 与原生API之间通信的桥梁, 主要负责 `JavaScript` 与原生之间传递调用消息, 而消息的传递必须遵守一个标准的协议, 它规定了消息的格式与含义, 我们把依赖于 `WebView` 的用于在 `JavaScript` 与原生之间通信并实现了某种消息传输协议的工具称之为 `WebView JavaScript Bridge` , 简称 `JsBridge` , 它也是混合开发框架的核心. 

#### React-Native

上文已经提到 `React Native ` 是 `React ` 在原生移动应用平台的衍生产物, 那两者主要的区别是什么呢? 其实, 主要的区别在于虚拟 DOM 映射的对象是什么? React中虚拟 DOM 最终会映射为浏览器 DOM 树, 而RN中虚拟 DOM 会通过 `JavaScriptCore ` 映射为原生控件树.

`JavaScriptCore`  是一个 `JavaScript` 解释器，它在 `React Native` 中主要有两个作用：
- 为 JavaScript 提供运行环境.
- 是 JavaScript 与原生应用之间通信的桥梁, 作用和 `JsBridge` 一样, 事实上, 在iOS中, 很多 `JsBridge` 的实现都是基于 `JavaScriptCore `.

而RN中将虚拟DOM映射为原生控件的过程中分两步：
- 布局消息传递; 将虚拟DOM布局信息传递给原生;
- 原生根据布局信息通过对应的原生控件渲染控件树;

至此; `React Native` 便实现了跨平台. 相对于混合应用; 由于 ` React Native`是原生控件渲染, 所以性能会比混合应用中H5好很多, 同时 `React Native`是Web开发技术栈, 也只需维护一份代码, 同样是跨平台框架.

#### React-Native 环境搭建
> 大前端 Node 是必不可少的; 具体环境搭建参考 [`react-native 中文网`](https://reactnative.cn/docs/getting-started/);

##### Android 开发
react-native 搭建 Android 环境的时候, 还是比较繁琐的; 具体安装流程还是按照官网提供的流程进行; 这里列举一下安装到项目运行中间的一些问题(我们平常使用的开发环境是 Windows , 所以这里只记录了 Windows 平台下的开发环境搭建);

###### 1.Android Studio
这个 `Android ` 安卓开发工具是必须要的, 不管我们是后面做 [`Flutter`](https://book.flutterchina.club/chapter1/mobile_development_intro.html)开发, 还是 `Cococscreator` ; 都是需要借用这款开发工具去打包我们的 `Android ` 应用; 安装过程也是比较简单的, 只需要一直 next 就可以了; 

###### 2.Android SDK 和虚拟机
安装完 `Android Studio` 之后, 我们还需要下载安装 Android 的 SDK 和启动虚拟机; 

在开发工具的工具栏里面有一个 `Tools` 选项, 下面有一个 `SDK Manager` 和 `AVD Manager`; 这两个就是我们开发 RN 的依赖; 当然如果需要开发 `Flutter` 那还可以安装 `Flutter` 的插件; 这里我们安装的 SDK 的版本号是9.0+; 需要注意的是安装完 SDK 之后, 我们还需要去开启 Windows 上虚拟机权限; 不然虚拟机调试的时候会报错;

###### 3.






























