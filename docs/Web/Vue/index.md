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
`````html
<template>
	<Keyborad :onShow="onShow" @updateShow="updateShow"/>
</template>
import Keyborad from '@/components/Keyborad';
export default{
	components:{
		Keyborad
	},
	data(){
		return{
			onShow:false
		}
	},
	methods:{
		updateShow(ev){
			//这里接收到的就是键盘组件 emit 回来的数据；
		}
	}
}
`````
这样, 一个简单的键盘输入组件就完成了, 这里涉及到我们可以在其他的 `<template>` 组件里面通过 `import` 的方式加载这个键盘组件, 然后传入`props`;

这里涉及到了一些功能点 `vue`组件之间的通信`props`, `$emit`等, 详见 [vue props](https://cn.vuejs.org/v2/guide/components-props.html);

这里只是项目中实现的一个简单的键盘组件, 其他更多复杂的组件可以去[我的 github](https://github.com/Scorpio-nan/H5-CSS3/tree/master/Vue-Components) vue 组件库;

### 常见问题

> 这里列举一些开发过程中遇到一些问题, 并且附带解决方案, 以便后面再次遇到此类问题的时候, 会马上想到解决方案 ; 

#### 页面级组件复用

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
####  Vue检测对象的属性变化


###### 1.Vue追踪数据变化
`Vue` 的响应式原理是把一个普通的 `JavaScript`对象作为 `Vue` 实例下的 `data`选项, `Vue`将遍历此对象的所有属性, 并使用 `Object.defineProperty` 把这些属性全部转换成 `getter/setter`,这些 `getter/setter`对用户来说是不可见的，但是在内部它们让 `Vue `能够追踪依赖，在属性被访问和修改时通知变更。

###### 2.检测对象变化
上面我们了解了`Vue`检测数据变化是依赖将对象显式声明在 `data`中, `Vue` 才能通过对象的 `getter/setter`去追踪数据变化, 但是在我们日常开发过程中, 有很多的数据是无法预估的, 不能直接显式的声明在 `data` 属性里面, 这个时候, 当我们通过请求之后对数据结构做出变更之后, 视图是没办法实时刷新的;

对于以上需求, `Vue` 官方也给出了方法, 就是通过 `Vue.set(object, propertyName, value)` 向嵌套对象添加相应属性;
`````javascript
Vue.set(vm.someObject, 'b', 2)   	

//或者可以使用vue实例方法
vm.$set(vm.someObject, 'b', 2);
`````
有时候我们可能需要对对象赋值多个新属性, 比如使用 `Object.assign()` 或者是 `_.extend()`,但是,这样添加到对象上面的属性不会触发更新,在这种情况下, 你应该用原对象与要混合进去的对象的属性一起创建一个新的对象。

`````javascript
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
`````

###### 3.watch 监听不到对象属性变化
我们在使用 `Vue props` 向子组件传参数的时候, 子组件监听传入对象的某个属性, 发现 `watch` 不能监测到对象里面数据的变化,代码如下:

`````javascript
<script>
	export default{
		data(){
			return{}
		},
		props:{   				  //固定参数类型为 Object
			obj:{
				type:Object,
				defalut:{}
			}
		},
		watch:{
			obj(oval,nval){
				
			}
		}
	}
</script>
`````
`Vue` 官方给我们提供的 `Vue.set()`是一个比较简单易用的为对象添加动态属性的方法, 但是如果需要为一个对象添加多层自定义属性, 这种语法写起来就比较麻烦了;而且代码也是比较难看的, 这个时候我们就可以使用一个简单暴力的方法, 利用原生 JS 的 `JSON.stringify()` 先将对象转换成一个字符串, 这个时候 data 里面的属性也可以是个字符串, 这样就能实时监测字符串的变化了;
`````javascript
<script>
	export default{
		data(){
			return{}
		},
		props:['obj'],				  //参数类型随意
		watch:{
			obj:{
				deep:true, 			 //深度监听
				immediate: true,    	//首次加载自运行
				handler(oval,nval){ 	//事件函数
					JSON.parse(nval);
				}
			}
		}
	}
</script>
`````


#### 一键换肤

使用手机APP应用的时候, 一些APP里面会有一个一键换肤的功能; 换肤功能对用户来讲, 也是可以缓解一下视觉疲劳, 增加一些趣味感的;

换肤功能的本质是替换掉 `style` 样式, 使用另外一个 `css` 文件; 知道了怎么去做, 那我们就可以通过这个思路去实现;

###### 1.定义全局scss 文件;
首先, 我们需要在静态资源里面新建一个 `theme` 文件夹, 这个文件夹里面, 主要存放定义全局所使用到的主题颜色;(一个APP肯定会有一个主题色, 其他的颜色基本上都是辅助色),
所以, 我们可以在 `theme` 文件夹里面新建一些主题色的 scss文件; (blue.scss , red.scss 等);

*public.scss* 
`````css
//@import './theme/lightviolet.scss';               //浅紫色
@import './theme/lightblue.scss';               	//浅蓝色
//@import './theme/lightred.scss';                	//浅红色
//@import './theme/yellow.scss';                  	//土豪金
//@import './theme/lightyellow.scss';             	//玛雅黄色
//@import './theme/lightorange.scss';             	//淘宝红
`````
*lightblue.scss*
`````css
$bgColor:#f5f6f7;           //全局的背景颜色                              

$warnColor:#ec5050;         //全局警示性颜色

$successColor:#34a853;      //全局成功颜色
                         
$importFontColor:#333;      //全局重要文字

$normalFontColor:#666;      //全局普通文字
`````
###### 2.使用方法
然后在 `public.scss` (这个文件主要定义的是全局的css样式, 例如 animation 移动端的 border 1px 等)里面引入一下 `theme` 文件夹下面的主题色文件了; 接着, 我们把 `public.scss` 文件在 `template`里面引入;
就可以直接在 `style` 里面使用 `lightblue.scss`里面的变量了;

这样有一个问题就是, 我们的代码在本地换肤的时候, 基本上是没问题的, 只需要手动去替换掉 `public.scss` 里面引入的地址就可以了; 但是打包上线的时候, 换肤功能就没办法正常使用了, 因为打包出来文件里面只会将当前引用的 `.scss ` 文件打包进去, 这样发布的时候就还是只有一套主题色,并且, 还没办法通过换肤的按键去动态切换皮肤, 因为 `webpack` 打包的时候, 将组件里面的 css 都打包到 js文件中去了;

###### 3.一键换肤方案
上面, 我们实现了一键换肤的核心功能, 但是, 我们还需要将组件里面 `style` 提取到 `.css`, 这里我们需要用到 `webpack` 的一个css的插件,[extract-text-webpack-plugin](https://webpack.docschina.org/plugins/extract-text-webpack-plugin/), 它会将所有入口文件中引用的 .css 文件都打包到一个独立的css文件中去;

*webpack.prod.conf.js*
`````javascript
....
plugins:[
	new ExtractTextPlugin({
		filename: utils.assetsPath('css/[name].[contenthash].css'),
    	allChunks: true				//此配置标识为是否需要开启提取css文件
    }),
]
....
`````
这样, 我们每更换一次scss的引用,再运行打包一次, 就可以拿到不同皮肤的样式表; 
但是, 随着站点的增多, 以及皮肤的增多, 每次我们需要浪费很多时间在打包这个事情上(如果有5个主题色的话, 要手动切换5次文件, 并打包5次),这个开销是非常巨大的;所以,针对这个,我们还需要优化;

###### 4.最终方案
> 问题思考:换肤的本质是通过更换 style 样式达到目的, style 又可以通过不同的 class 类名来控制, 那我们是不是可以预先生成好所有的主题色, 然后通过切换类名来达到换肤的目的; 这样就解决了每次打包发布的时候要打包多次的尴尬了;

1). 首先, 我们把所有的theme文件里面的变量都提取到 `core.scss` 里面;

*core.scss*
`````css
$array:(
    lightblue     :#19b4f5,             //冰川蓝
    lightorange   :#ed742e,             //旺旺红
    lightviolet   :#8c19ff,             //高贵紫
    lightyellow   :#ff9800,             //帝王黄
    lightred      :#ff1a18,             //法拉利红
    yellow        :#f7ab00              //土豪金
);
@each $key,$val in $array{
    //选中的背景
    .#{$key}-active{
        &:active{
            border: 0;
            background: rgba($val, 0.6);
        }
    }
    //input focus框高亮
    .#{$key}-focus{
        &:focus{
            border: 1px solid $val;
        }
    }
	....
}
`````
2). 在 `main.js` 里面直接引入;
`````javascript
import '../static/sass/core.scss'; 
`````
这里需要注意的是, main 里面引入的 scss 文件里面的变量, 在组件里面是不能使用的, 因为在 mian 里面的 scss 会被组件加载之前就被 scss-loader 编译成普通的 css 文件了;

并且, 如果我们在组件里面写 css3 的一些新的属性的时候, postCss-loader 和 autoprefixer 会为我们补全浏览器前缀; (后面会写一篇 webpack 的笔记来详细介绍一下这些 loaders);但是在 main.js 里面引入的 scss 文件不会被处理, 这也是因为 `webpack.prod.conf.js` 里面配置的入口文件是 main; 

所以, core.scss 这个文件里面有用到 css3 的属性的地方, 我们需要手动添加一下前缀(好在用到的地方就几行代码);

3). 配合 `Vuex` 达到动态换肤的效果;
上面, 我们是将所有用到的 theme 都通过不同的类名打包到同一个 css 文件中了, 编译出来大概是这个样子的;
`````css
.lightblue-active{
	background: rgba(25,180,245, 0.6);
}
.lightorange-active{
	background: rgba(237,116,46, 0.6);
}
.lightviolet-active{
	background: rgba(140,25,255, 0.6);
}
.lightyellow-active{
	background: rgba(255,152,0, 0.6);
}
.lightred-active{
	background: rgba(255,26,24, 0.6);
}
.yellow-active{
	background: rgba(247,171,0, 0.6);
}
`````
我们需要通过切换不同的类名来达到换肤的功能; 这里, 我们可以借用 vuex 和 cookie 来动态切换和对切换过后的 theme 做持久化;

*store/actios*
`````javascript
const THEME = {
	lightblue: {
		Class: 'lightblue',
		name:'冰川蓝'
	},
	lightorange: {
		Class: 'lightorange',
		name:'旺旺红'
	},
	lightviolet: {
		Class: 'lightviolet',
		name:'高贵紫'
	},
	lightyellow: {
		Class: 'lightyellow',
		name:'帝王黄'
	},
	lightred: {
		Class: 'lightred',
		name:'法拉利红'
	},
	yellow: {
		Class: 'yellow',
		name:'土豪金'
	}
}
//vuex 的其他操作, 这里就不再过多赘述, 只写出 actions 部分
export default{
	setCurrentTheme({commit}, res) {
		commit(CURRENTTHEME, THEME[res]);
		var obj = {
			name: THEME[res].name,
			color: THEME[res]
		}
		$.cookie('THEME', JSON.stringify(obj), {expires: 365});
	},
}
`````
*App.vue*
`````javascript
export default{
	beforeCreate() {
		this.$nextTick(() => {
			var theme = null;
			var obj;
			theme = $.cookie('THEME');
			if(theme) {
				theme = JSON.parse(theme);
			}else {
				obj = {
					name: '帝王黄',
					color: 'lightyellow'
				}
				$.cookie('THEME', JSON.stringify(theme), {
					expires: 365
				});
				theme = obj;
			}
			try {
				this.$store.dispatch('setCurrentTheme', theme.color);
			} catch(err) {
				console.log('%c 没有获取到用户选择的皮肤，将使用默认皮肤~');
			}
		})
	},
}
`````
首次的时候, 会去判断一下 cookie 里面是否有存在之前设置过的主题色, 如果有就用之前设置过的, 如果没有就用默认黄色;

*template*
`````html
<template>
	<span class="iconfont" :class="color + '-active'">清除缓存</span>
</template>
<script>
export default{
	computed:{
		color(){
			return this.$store.getters.getCurrentTheme;
		}
	}
}
</script>
`````
然后换肤功能使用也是比较简单的, 需要更换皮肤的时候调用一下 ` that.$store.dispatch('setCurrentTheme', color) `; 至此, 一键换肤的功能就完美实现了;

当然, 这样做有一个弊端就是打包出来的文件提交会比较大, 这个优化工作详见后面写的 `webpack` 笔记;

#### Vue SEO 优化

##### seo优化之预渲染prerender-spa-plugin
平常我们开发过程中都是使用 `vue-cli`来开发项目, 但是这种 spa 应用是非常不利于 seo 优化的;而 Vue 针对 seo 优化也有自己的解决方案; `vue ssr`[Vue服务器端](https://ssr.vuejs.org/zh/) 和 [NUXT](https://zh.nuxtjs.org/guide/installation); 这些都是 vue 的服务端渲染方案;

预渲染, 相对于 SSR 比较简单, 并且可以极大的提高网页的性能; 而且, 配合一些 meta 插件, 基本上能完全满足 SEO 需求;

安装
`````bash
npm install prerender-spa-plugin vue-meta-info --save
`````
`prerender-spa-plugin` 安装过程中, 会为我们下载一个 chromeium 的浏览器; 原理就是将我们页面的路由全部在浏览器中打开一次, 然后爬出页面相对应的内容, 再输出为 html 静态文件; `vue-meta-info` 这个插件的作用是为我们每一个打包出来的静态页面添加一个 title , content, discripetion , 也就是我们 seo 优化内容里面的关键词;

> 需要注意的是, 使用这个插件, 路由就需要改成同步加载的方式;

配置

***webpack.prod.conf.js***
`````javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin')   //引用插件
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
//webpack的plugin 下面添加一个插件
...
plugins:[
	// 配置PrerenderSPAPlugin
	new PrerenderSPAPlugin({
		// 生成文件的路径，也可以与webpakc打包的一致。
		staticDir: path.join(__dirname, '../dist'),

		// 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
		routes: ['/', '/allLottery','/openResult','/DaohanZhandian','/caiba','/Home'],

		// 这个很重要，如果没有配置这段，也不会进行预编译
		// renderer: new Renderer({
		// 	inject: {
		// 	  foo: 'bar'
		// 	},
		// 	headless: false,
		// 	// 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
		// 	//renderAfterDocumentEvent: 'render-event'
		// })
		
		//一开始是用上面那种写法, 但是编译会报错;
		renderer: new PrerenderSPAPlugin.PuppeteerRenderer({//这样写renderAfterTime生效了
			renderAfterTime: 5000
		})
	}),
]
`````
修改完 webpack 配置之后, 我们还需要在 main.js 里面添加一行配置

***main.js***
`````javascript
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
	mounted () {
        document.dispatchEvent(new Event('render-event'))
        //document.dispatchEvent(new Event('custom-render-trigger'))
	}
})
`````
这样, 就配置完成了, 再次运行一下 `npm run build` 会看到 dist 目录下面, 我们的代码全都被打包成了一个个的 .html文件;

##### 头部标签插件vue-meta-info
上面, 我们已经安装好了 `vue-meta-info` 插件, 再次修改一下 main.js, 在 main 里面添加;

***main.js***
`````javascript
import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo);
`````
***template.vue***
`````javascript
export default {
	metaInfo: {
		title: 'We Inc',
		meta: [
			{
				name: 'keywords',
				content: '关键字1,关键字2,关键字3'
			},
			{
				name: 'description',
				content: '这是一段网页的描述'
			}
		]
	}
}
`````
这样, 就可以将关键字预渲染到 .html 页面中去了;






