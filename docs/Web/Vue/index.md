#### 简述

> 这里就不对 ` Vue ` 做详细的介绍了, 具体可以参考 [Vue](https://cn.vuejs.org/index.html) 官方网站;

这里只对 ` Vue ` 项目开发中遇到的一些问题做一个记录, 以免再次遇到的时候踩到同样的坑;


### 初始化项目

` Vue ` 官方网站为我们提供了一个 ` Vue-cli ` [Vue-cli 中文文档](https://cli.vuejs.org/zh/) 脚手架工具;

不过, 这里需要注意的是 ` vue-cli@3x ` 和 ` vue-cli@2x ` 的安装使用方法是不一样的 ; 

> 安装和创建项目:

`````bash
npm install vue-cli -g

vue create my-project               // `vue-cli@3x `

vue init webpack my-project         // `vue-cli@2x `

`````
安装的时候, ` bash ` 终端会有提示是否要使用 ` vuex ` , ` e2e ` , ` Eslint ` 等插件工具, 这里我们可以通过项目的复杂程度判断是否需要安装 ; 

### 路由配置

` vue ` 官方有为我们提供了一个强大易用的路由库 ` vue-router `[vue-router 官方文档](https://router.vuejs.org/zh/) ;

- 支持路由嵌套
- 支持模块化的, 基于组件的路由配置
- 支持路由参数, 查询, 通配
- 支持H5 history 模式和 hash 模式
- 支持自定义滚动行为

#### 路由懒加载

初始化项目的时候, ` vue-cli ` 会为我们创建一个 router 的文件夹, 并会生成 index.js 文件, 配置如下:

`````javascript
import Home from '@/components/Home'
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
})
`````
当我们打包构建应用时候, js 包会变的非常大, 影响页面的首次加载速度, 如果我们能够把不同的路由对应的页面拆分成不同的代码块;

然后, 当每一个路由被访问时候才加载对应的组件, 这样就很大程度上提高了加载效率;

可以看到, 这里的路由并有没使用懒加载的模式, 我们可以对路由文件稍作修改;

`````javascript
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {
                title: "首页"
            },
            component: resolve => require(["@/components/Home"], resolve)
        }
    ]
})
`````
上面 , 我们把路由更换成了懒加载模式, 并且, 还给路由添加了一个 ` meta ` 属性, 将页面的 title 通过 ` meta ` 属性传递到组件内;

在 ` Home ` 这个组件内我们就可以通过 ` $route.meta.title ` 来使用页面的 ` title ` 字段值了;

#### 路由嵌套

在大型的项目中, 路由嵌套也是很常用的功能 ;

` vue ` 的路由嵌套, 有了 ` vue-router `这个路由库, 实现起来也是非常简单的, 就拿上面的 ` Home ` 来说, 如果我们想在 Home 页里面嵌套一个子路由;

要在 ` Home `组件中添加一个 `<router-view> `, 然后在 ` Router ` 中使用 `children ` 参数:

`````html
<div class="Home">
    <router-view></router-view>
</div>
`````
`````javascript
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {
                title: "首页"
            },
            component: resolve => require(["@/components/Home"], resolve),
            children:[{
                path: '/Profile',
                name: 'Profile',
                component: resolve => require(["@/components/Profile"], resolve),
            }]
        }
    ]
})   
`````
#### 过渡动画

> 让 webapp 拥有类似 iOS 页面切换左右滑动的动画, 用到的是 ` vue ` 自带的过渡动画 ` <transition></transition> `; 

##### 实现方式

`````javascript
//修改router/index.js文件,并在Router的原型链上扩展一个方法
Router.prototype.goBack = function () {
    this.isBack = true
    this.go(-1)
}
`````
`````javascript
//在带有<router-view/>的页面内监听路由的update钩子函数做相应的操作
beforeRouteUpdate (to, from, next) {
    // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
    let isBack = this.$router.isBack
    if (isBack) {
        this.transitionName = 'slide-right'
    } else {
        this.transitionName = 'slide-left'
    }
    // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
    this.$router.isBack = false
    next()
}
`````
`````html
<!-- 通过vue自带的 transition 做过渡动画  -->
<transition :name="transitionName">
    <router-view class="child-view"></router-view>
</transition>
`````
`````css
/* 
* css transition 进入和移出的动画
*/
.child-view {
    position: absolute;
    width: 100%;
    transition: all .45s cubic-bezier(.55, 0, .1, 1);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f1f1f1;
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    z-index: 10;
}
.slide-left-enter,
.slide-right-leave-active {
    opacity: 1;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    z-index: 1000;
}
.slide-left-leave-active,
.slide-right-enter {
    opacity: 1;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
`````
### 多语言

>由于项目需要, 会接触到一些外资项目; 因此, 我们需要在项目里面添加多语言;

#### 实现方式

` vue ` 项目里面使用多语言也是比较方便的, , 只需要安装 `vue-i18n` 这个插件就可以实现网站多语言;
`````bash
npm install vue-i18n --save
`````
然后在我们的项目的 ` src/assets ` 文件夹下面新建一个 ` i18n.js ` 文件, 和 ` lang/index.js `文件夹, 以便于我们来管理好语言包;

*i18n.js*
`````javascript
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Language from './lang';
Vue.use(VueI18n);

export default new VueI18n({
	locale:'zh',
	messages:Language
})
`````
*lang/index.js*
`````javascript
import zh from './zh-CN';
import en from './en-US';
import ja from './ja-JP';
export default{
	zh,
	en,
	ja
}
`````
这样我们就通过 ` Vue.use() `方法将语言插件添加到 ` Vue.prototype `上了; ([Vue.use() 实现方式](https://cn.vuejs.org/v2/guide/plugins.html));

然后我们需要在 ` src/main.js `文件里面引用一下, 将插件挂载到 `vue` 实例下面;

`````javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './assets/i18n'
import store from './store';
Vue.config.productionTip = false
FastClick.attach(document.body);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	i18n,
	store,
	template: '<App/>'
})
`````
通过修改 ` VueI18n `的 ` locale `参数就可以替换语言包了; 我们可以在每一个组件里面调用 ` this.$i18n.locale = 'en' `,来动态切换语言了;
`````javascript
<template>
	<ul class="dropdown-menu">
        <li>
            <a href="javascript:;" @click="ChangeLanguage('zh')">简体中文</a>
        </li>
        <li>
            <a href="javascript:;" @click="ChangeLanguage('en')">English</a>
        </li>
        <li>
            <a href="javascript:;" @click="ChangeLanguage('ja')">セーター</a>
        </li>
    </ul>
</template>
<script>
    export default {
        data(){
            return{}
        },
        methods:{
            ChangeLanguage(param){
                this.$i18n.locale = param;
            }
        }
    }
</script>
`````
#### 多语言使用

上面我们将 `i18n` 挂在到了 `vue`的实例上, 这样我们就可以在每一个 ` vue `组件内通过 ` $t` 来调用语言包了;[`i18n 源码`](https://github.com/kazupon/vue-i18n/blob/7c5fd95805dbcc6620cccf5343040f2cc515756c/dist/vue-i18n.js)

`````html
<template>
    <div class="Home">
        {{$t('nav.item-1')}}
    </div>
</template>
`````

#### 多语言持久化

上面的代码实现了页面切换多语言的功能, 但是这样有一个问题就是, 每次用户刷新浏览器之后页面上又恢复了 ` i18n.js `里面默认的 ` locale` 值;

所以我们需要将用户切换语言之后的 `locale` 值存到页面 `cookie`里面, 然后在网站入口去读取 `cookie` 里面的值, 这样就达到了持久化的目的;

*template*
`````javascript
<script>
    export default {
        data(){
            return{}
        },
        methods:{
            ChangeLanguage(param){
                this.$i18n.locale = param;
                var date = new Date();
                date.setDate(date.getDate() + 365);
                //设置一个过期时间为 365 天的 cookie;
                document.cookie = 'locale=' + param + ';expires=' + date;
            }
        }
    }
</script>
`````
*App.vue*
`````javascript
<script>
    export default {
        data(){
            return{}
        },
        beforeCreate(){
            this.$nextTick(() => {
                var arr = document.cookie.replace(/\s/g, "").split(';');
                var Language = null;
                for (var i = 0; i < arr.length; i++) {
                    var tempArr = arr[i].split('=');
                    if (tempArr[0] == name) {
                        Language = decodeURIComponent(tempArr[1]);
                    }
                }
                if (Language && Language != null && Language != "null") {
                    this.$i18n.locale = Language;
                } else {
                    this.$i18n.locale = "zh";
                }
            });
        }
    }
</script>
`````

### 组件封装

`vue` 开发项目中, 我们会使用到第三方的 UI 库, PC端当前比较流行的主流 UI 有 [`ElementUI`](https://element.eleme.cn/#/zh-CN), [`Iview`](https://iview.github.io/), 移动端也有一些比较常用的 UI 库[`vux`](https://doc.vux.li/zh-CN/), [`Mint-UI`](http://mint-ui.github.io/#!/zh-cn)等;

由于我们有一个移动端的项目, 需要打包成APP, 并且需要使用到IOS和Android的一些原生的功能, 所以选用的UI库是 [`MUI`](http://dev.dcloud.net.cn/mui/ui/),配合 `Dcloud`提供的 H5+方法使用;
但是 `MUI`里面提供的一些组件并不能满足我们的开发需求, 所以这时候就需要自己去开发一些组件了;

#### 键盘组件

由于项目里面有输入银行卡, 用户密码等敏感操作; 使用系统的键盘会有一定的安全风险, 并且, 在项目里面, 输入框如果固定在底部的话, 用系统自带的输入键盘会有各种各样的问题(别问我为什么会有兼容问题,  - -! 已经被万恶的 UC 整哭好多次了);所以, 后面我们是把所有系统输入数字的地方全都替换成自定义组件的键盘;

首先, 我们在 `src`下面新建一个 `plugin`文件夹, 后面这个文件夹里面就存放我们自定义的组件;

*plugin/Keyborad.vue*
`````html
<template>
    <transition name="fade">
        <div id="pluginKeyborad" 
             :style="onShow ? {'z-index':'1000'} : {'z-index':'100'}" 
             v-show="onShow" 
             @touchend="showBox()">
            <transition name="fade">
                <div id="keyborad-mask" v-if="onShow"></div>
            </transition>
            <transition name="action">
                <div class="keyborad" v-if="onShow"  @touchend.stop>
                    <table class="table-number" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td colspan="4" class="before-none"><p>{{result}}</p></td>
                        </tr>
                        <tr v-for="(arr,i) in values" :key="i">
                            <td v-for="(num,index) in arr" 
                                :key="index" @touchend="onKeyTouch(num)">
                                <span :style="num == 'C' ? {'color':'red'} : {}">{{num}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
	/*
	 *  onShow     控制小键盘显示或者隐藏
	 *  isNumber   当前键盘点击，如果不是纯数字的话那就执行加法运算，如果是数字的话就返回数字组合
	 * */
	export default{
		props:{
			onShow:{
				type:Boolean,
				default:false
			},
			isNumber:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				values:[
					[1,2,3],
					[4,5,6],
					[7,8,9],
					['C',0,'X']
				],
				result:'',
                count:0,
                isMaxNum : false
			}
		},
		methods:{
            showBox() {
                this.$emit('updateShow', '1',this.result);
                this.result = '';
				this.count = 0;
            },
			onKeyTouch(num){
                var len = this.result.toString().length+1;
                if(len>22){
                    return false
                }
				if(num == 'X'){
					this.result = this.result + '';
					try{
						this.result = this.result.substr(0,this.result.length -1);
					}catch(e){}
					if(this.result == ''){
						this.result = '';
						this.count = 0;
					}
					return;
				}
				
				if(!this.isNumber){
					this.result += num;
				}else{
					this.count += num;
					this.result = this.count;
				}
				
				if(num == 'C'){
					this.result = '';
					this.count = 0;
                }
			}
        },
	}
</script>
<style scoped="scoped" lang='scss'>
	#pluginKeyborad{
		position: fixed;
		left: 0;
		bottom: 0;
		backface-visibility: hidden;
		z-index: -1;
		width: 100%;
		height: 100%;
		background:transparent;
	}
	#keyborad-mask{
		position: fixed;
		z-index: 1000;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5); 
	}
	.keyborad{
		position: fixed;
		left: 0;
		bottom: 0;
		transform: translate(0, 0);
		backface-visibility: hidden;
		z-index: 5000;
		width: 100%;
		transition: transform .35s;
	}

	.fade-enter,
	.fade-leave-active{
	  opacity: 0;
	}
	.fade-leave-active,
	.fade-enter-active {
	  transition: opacity 300ms!important;
	}
	
	.action-enter,
	.action-leave-active{
	  transform: translate(0, 100%);
	}
	.action-leave-active,
	.action-enter-active {
	  transition: transform 300ms!important;
	}
	.table-number{
		width: 100%;
		background: #fff;
		float: left;
		cursor: pointer;
        overflow: hidden;
	}
	.table-number tr{
		height: 1rem;
	}
	.table-number tr td{
		position: relative;
		width: 33.3333%;
        font-weight: 700;
	}
	.table-number tr td:active{
		background: #f1f1f1;
	}
	.table-number tr td:after {
		content: "";
		display: block;
		border-bottom: 1px solid #f5f5f5;
		width: 100%;
		background: #ccc;
		position: absolute;
		bottom: 0;
		left: 0;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}
	.table-number tr td:before{
		display: block;
		content: "";
		width: 1px;
		height: 100%;
		background: #ccc;
		position: absolute;
		right: 0;
		top: 0;
		transform: scaleX(0.5);
	}
    .before-none{
        overflow: hidden;
        word-break: break-all;
        p{
            white-space:nowrap;
            overflow: hidden;
            width: 100%;
            font-size: 0.28rem;
            font-weight: 700;
            color: #304356;
            padding: 0 0.24rem;
            box-sizing: border-box;
            text-align: left;
        }
    }
	.table-number tr .before-none:before{
		display: none;
	}
</style>
`````
*使用方法*
`````

`````
这样, 一个简单的键盘输入组件就完成了, 这里涉及到我们可以在其他的 `<template>` 组件里面通过 `import` 的方式加载这个键盘组件, 然后传入`props`;

这里涉及到了一些功能点 `vue`组件之间的通信`props`, `$emit`等, 详见 [vue props](https://cn.vuejs.org/v2/guide/components-props.html);

这里只是项目中实现的一个简单的键盘组件, 其他更多复杂的组件可以去[我的 github](https://github.com/Scorpio-nan/H5-CSS3/tree/master/Vue-Components) vue 组件库;

### 常见问题

> 这里列举一些开发过程中遇到一些问题, 并且附带解决方案, 以便后面再次遇到此类问题的时候, 会马上想到解决方案 ; 

#### 组件复用

实际开发过程中, 经常会遇到这样的需求, 就是页面级组件复用的问题; 如果同一个组件被不同的页面引用的时候, 组件的生命周期不会重新实例化;

`````javascript
{ path : 'creted' , component : { PostCreate , name : ' 发表文章' }} ,
{ path : 'edit/ : id ( \\d+)' , component : { PostCreate , name : ' 编辑文章' }}
`````
真实的业务场景中，编辑的页面使用的是同一个 ` component `(如上，发表文章和编辑文章用的是同一个.vue 文件);

默认情况下当这两个页面切换时并不会触发 ` vue ` 的 ` created ` 或者 ` mounted `钩子;
` Vue ` 官方的文档里面 是建议 ` watch ` ` $router `的变化来处理, 类似于这样的:

`````javascript
watch: { 
    '$route '( to, from ,next){
        this.$router.replace('/undefined');
        setTimeout(() => {
            this.$router.push({path : ' creted ' });                
        }            
    }        
}
`````
先让路由跳转到一个` undefined `的空页面, 然后在跳转回来, 这样做可以解决问题, 但是会有一个新的问题, 就是 `history`按钮会退回到空白页;

后来发现其实可以简单的在 ` <router-view>` 上加上一个唯一的` key `, 来保证路由切换时都会重新渲染触发钩子了.

`````javascript
<router-view :key="key"></router-view>
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
}
`````
#### 一键换肤

使用手机APP应用的时候, 一些APP里面会有一个一键换肤的功能; 
