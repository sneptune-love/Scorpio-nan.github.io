### 设计模式

设计模式就是一套被反复使用, 多人知晓的, 经过分类的代码设计经验的总结;  设计模式基础知识查看 [JavaScript 知识点](/docs/Web/JavaScript/index.md)

### 发布订阅模式

`pub/sub` 这种模式应该是应用最广泛的模式了, 在这种模式中, 并不是一个对象调用另外一个对象的方法, 而是一个对象订阅另外一个对象的特定的活动并在状态改变之后获得通知的; 

常见的发布订阅模式例如 `Vue` 框架里面的  `$emit`, `$on`; 下面设计一个简单的发布订阅模式;

```javascript
class Event{
    constructor(){
        this.callbacks = {};
    }
    $off(eventName){
        this.callbacks[eventName] = null;
    }
    $emit(eventName,args){
        let cbs = this.callbacks[eventName];
        if(cbs){
            cbs.forEach(c=>{
                c.call(this,args);
            })
        }
    }
    $on(eventName,fn){
        (this.callbacks[eventName] || this.callbacks[eventName] = []).push(fn);
    }
}

export default new Event();

Event.$emit("component",{type:"",action:{}});
Event.$on("component",function(res){})
```

### 单例模式

单例模式的定义: 保证一个类仅有一个实例, 并提供一个全局访问它的访问点, 实现方法先判断实例类是否存在, 如果存在则直接返回, 如果不存在就创建了再返回;

```typescript
class Store {
    static readonly instance = new Store();

    public config;

    public init(config){
        this.config = config;
    }

    public getConfig(){
        return this.config;
    }

    public update(key,value){
        this.config[key] = value;
    }
}
export const store = Store.instance;
```
单例模式通常被用作项目里面的数据管理, 将数据都存储在全局的 `store` 里面, 通多类的静态属性的特性, 确保数据的唯一性; 

单例模式也常被用在 `web` 开发中的 `web` 组件中, 例如弹窗组件; 重复操作 dom 元素比较消耗性能, 可以用单例模式:

```javascript
var CreateDiv = (function(){
    var instance;
    var CreateDiv = function(html){
        if(instance) return instance;
        this.html = html;
        this.init();
        return instance = this;
    }
    CreateDiv.prototype.init = function(){
        var div = document.createElement("div");
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    return CreateDiv;
})();

var a = new CreateDiv("hahaha");
var b = new CreateDiv("hahaha");
```

### 策略模式

策略模式的定义是: 定义一系列的算法, 把它们都封装起来, 并且使他们可以相互替换; 策略模式的目的就是将算法的使用与算法的实现分开;

以计算奖金为例子, 绩效为 S 的人年终奖有 4 倍工资, 绩效为 A 的人年终奖有 3 倍工资, 而绩效为 B 的人, 年终奖有 2 倍工资:

```javascript
function calculateBonus(performanceLevel, salary){
    if(performanceLevel === "S") return salary * 4;
    if(performanceLevel === "A") return salary * 3;
    if(performanceLevel === "B") return salary * 2;
}
calculateBonus( 'B', 20000 );   // 输出：40000
calculateBonus( 'S', 6000 );    // 输出：24000
```
这段代码非常简单, 但是存在缺点, 函数里面包含了许多 `if` 语句, 这些语句需要覆盖所有逻辑分支, 如果需要增加绩效等级为 C 的, 或者是需要把奖金的系数改为 5, 那么就必须去修改 `calculateBonus` 内部实现;

使用策略模式重构代码后:

```javascript
var strategies = {
    "S": function( salary ){
        return salary * 4;
    },
    "A": function( salary ){
        return salary * 3;
    },
    "B": function( salary ){
        return salary * 2;
    } 
}

var calculateBonus = function(level,salary){
    return strategies[level](salary);
}

console.log(calculateBonus("A",5000));
```
#### 策略模式 - 表单验证

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="http:// xxx.com/register" id="registerForm" method="post">
        请输入用户名：<input type="text" name="userName" />
        请输入密码：<input type="text" name="password" />
        请输入手机号码：<input type="text" name="phoneNumber" />
        <button>提交</button>
    </form>
    <script>
        var strategies = {
            isNonEmpty: function (value, errorMsg) {
                if (value == '') return errorMsg;
            },
            minLength: function (value, length, errorMsg) {
                if (value.length < length) return errorMsg;
            },
            isMobile: function (value, errorMsg) {
                if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
            }
        }

        var Validator = function(){
            this.cache = [];
        }

        Validator.prototype.add = function(dom, rules){
            var self = this;
            for(var i = 0, rule; rule = rules[i++];){
                (function(rule){
                    var strategyAry = rule.strategy.split(':');
                    var errorMsg = rule.errorMsg;

                    self.cache.push(function(){
                        var strategy = strategyAry.shift();
                        strategyAry.unshift( dom.value );
                        strategyAry.push( errorMsg );
                        return strategies[ strategy ].apply( dom, strategyAry );
                    })
                })(rule)
            }
        }

        Validator.prototype.start = function(){
            for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];){
                var errorMsg = validatorFunc();
                if(errorMsg) return errorMsg;
            }
        }

        var registerForm = document.getElementById("registerForm");
        var validateFunc = function(){
            var validator = new Validator();

            validator.add(registerForm.userName,[{
                strategy: 'isNonEmpty',
                errorMsg: '用户名不能为空'
            },{
                strategy: 'minLength:6',
                errorMsg: '用户名长度不能小于 10 位'
            }]);

            validator.add(registerForm.password,[{
                strategy: 'minLength:6',
                errorMsg: '密码长度不能小于 6 位'
            }])

            validator.add(registerForm.phoneNumber,[{
                strategy: 'isMobile',
                errorMsg: '手机号码格式不正确'
            }])

            var errorMsg = validator.start();
            return errorMsg;
        }

        registerForm.onsubmit = function(){
            var errorMsg = validateFunc();
            if(errorMsg){
                alert(errorMsg);
                return false;
            }
        }
    </script>
</body>
</html>
```
这种模式下, 我们可以对输入框添加多条验证规则, 并且, 如果想要扩展校验规则, 只需要给 `strategies` 对象添加属性;

### 代理模式

代理模式是为一个对象提供一个代用品或占位符, 以便控制对它的访问;

在 web 开发中, 如果直接给某个 img 标签节点设置 src 属性, 由于图片过大或者是网络不佳, 图片的位置往往有段时间会是一片空白, 常见的做法就是在图片被真正加载好之前放一张 loading 的图片用来站位, 来提示图片正在加载;

```javascript
var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc:function(src){
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        myImage.setSrc(this.src);
    }
    
    return {
        setSrc:function(src){
            myImage.setSrc("file://D/imges/loading.gif");
            img.src = src;
        }
    }
})();

proxyImage.setSrc("http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg");
```

### 命令模式

命令模式是简单和优雅的设计模式之一, 命令模式中的命令 `command` 指的是一个执行某些特定事情的命令;

命令模式最常见的应用场景就是: 有时候需要先某些对象发送请求, 但是并不知道请求的接收者是谁, 也不知道被请求的操作是什么, 此时希望用一种松耦合的方式来设计程序, 使得请求的发送者和接收者能够消除彼此之间的耦合关系;

例如: 菜单程序, 对于界面上的按钮, 开发人员只知道按钮按下会发生某些事情, 不知道具体是用来做什么的; 可能是刷新菜单, 增加子菜单等; 那我们可以用命令模式设计按钮将要执行的命令;

```javascript
var bindClick = function(node, func){
    node.onclick = func;
}

var MenuBar = {
    refresh:function(){
        console.log("刷新菜单~");
    }
}

var SubMenu = {
    add:function(){
        console.log("添加菜单~");
    },
    del:function(){
        console.log("删除菜单~");
    }
}

var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");

bindClick(btn1,MenuBar.refresh);
bindClick(btn2,SubMenu.add);
```

#### 命令模式 - 录像功能

模式可以用来实现播放录像功能, 原理和画图的原理一样, 我们把用户在键盘的输入都封装成命令, 执行过的命令将会被存放到堆栈中, 播放录像的时候只需要从头开始一次执行这些命令即可;

```javascript
var Ryu = {
    attack:function(){
        console.log("攻击~");
    },
    defense:function(){
        console.log("防御~");
    },
    jump:function(){
        console.log("跳跃~");
    },
    crouch:function(){
        console.log("蹲下~");
    }
}

var makeCommand = function(reciver, state){
    return function(){
        reciver[state]();
    }
}

var commands = {
    "119" : "jump",
    "115" : "crouch",
    "97"  : "defense",
    "100" : "attack"
}

var commandStack = [];

document.onkeypress = function(ev){
    var keyCode = ev.keyCode;
    var command = makeCommand(Ryu, commands[keyCode]);

    if(command){
        command();
        commandStack.push(command);
    }
}

document.getElementById("replay").onclick = function(){
    var command;
    while(command = commandStack.shift()){
        command();
    }
}
```



