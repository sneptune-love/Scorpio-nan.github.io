### JavaScript 知识点

### call 和 apply

`Function.prototype.call` 和 `Function.prototype.apply` 都是非常常用的方法, 他们的作用几乎一样, 区别就在于传递进去的参数形式不同;

#### apply 和 call 的区别
+ `apply:`
 
`apply` 接收两个参数, 第一个参数指定了函数体内的 this, 第二个参数为一个带下标的集合, 这个集合可以为数组, 也可以为类数组, `apply` 方法把这个集合中的元素作为参数传递给被调用的函数;

```javascript
function func(a,b,c){
    console.log([a,b,c]);
}

func.apply(null,[1,2,3]);   // [1,2,3]
```
参数 `1,2,3` 被放在数组中一起传入 `func` 函数, 它们分别对应 `func` 函数的参数列表中的 `a,b,c`;

+ `call:`

`call` 传入的参数数量不是固定的, 跟 `apply` 相同的是, 第一个参数也是代表函数体内的 `this` 指向, 从第二个参数开始往后, 每一个参数被依次传入函数:

```javascript
function func(a,b,c){
    console.log([a,b,c]);
}

func.call(null,1,2,3);   // [1,2,3]
```
当调用一个函数时, `javascript` 的解释器不会计较形参和实参的个数, 类型以及顺序上的区别, 参数在函数内部就是用一个数组来表示, 从这个意义上说, `apply` 比 `call` 的使用率更高, 我们不必关心具体有多少个参数被传入函数, 只要 `apply` 一股脑都推过去就行了;

`call` 是包装在 `apply` 上面的语法糖, 如果我们明确的知道函数需要接收多少个参数, 就可以使用 `call` 来传递参数;

有时候我们使用 `call` 或者是 `apply` 的目的不在于指定 `this` 的指向, 而是另有用途, 比如借用其他对象的方法, 那么我们可以传入 `null` 来代替某个具体的指向;

```javascript
Math.max.apply( null, [ 1, 2, 5, 3, 4 ])   // 5
```

#### call 和 apply 用途

+ 1. 改变 `this` 指向:

`call` 和 `apply` 最常见的用途是改变 `this` 指向:

```javascript
function getName(){
    console.log(this.name);
}

var obj1 = { 
    name:"Geoge"
}

var obj2 = {
    name:"Pitter"
}

getName();                  //
getName.call(obj1);         //  Geoge
getName.call(obj2);         //  Pitter
```
当执行 `getName.call(obj1)` 这句的时候, `getName` 函数体内的 `this` 指向的是 `obj1` 所以这里的:

```javascript
function getName(){
    console.log(this.name);
}
```
等同于：

```javascript
function getName(){
    console.log(obj1.name);
}
```

+ 2. `Function.prototype.bind`:

大部分高级浏览器都实现了内置的 `Function.prototype.bind`, 用来指定函数内部的 `this` 指向, 即使没有原生的 `Function.prototype.bind` 实现, 我们也可以来模拟一个:

```javascript
Function.prototype.bind = function(context){
    var self = this;
    return function(){
        return self.apply(context,arguments);
    }
}

var obj = {
    name:"Eva"
}

var func = function(){
    console.log(this.name);
}.bind(obj);

func();
```
通过 `Function.prototype.bind` 来包装 `func` 函数, 并传入一个对象 `context` 当做参数, 这个 `context` 就是需要修改 `this` 的指向;

### 闭包和高阶函数

在 `javascript` 版本的设计模式中, 许多模式都可以用闭包和高阶函数来实现;

#### 闭包

闭包的形成与变量的作用域以及变量的生存周期密切相关; 变量的作用域, 指的就是变量的有效范围, 我们常见的是在函数中声明的变量作用域; 

例如下面一个很经典的例子, 我们可以利用闭包来达到效果:

```html
<html>
    <body>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <script>
            var nodes = document.getElementsByTagName( 'div' );
            for ( var i = 0, len = nodes.length; i < len; i++ ){
                nodes[ i ].onclick = function(){
                    alert ( i );
                }
            };
        </script>
    </body>
</html>
```
测试这段代码的时候就会发现, 无论点击哪个 `div`, 最后弹出的结果都是 `5`; 这是因为 `div` 节点的 `onclick` 事件是被异步触发的, 当事件触发的时候, `for` 循环早就已经结束, 此时变量 `i` 的值已经是 `5` 了;

我们可以使用闭包来解决这个问题, 把每次循环的 `i` 的值都暂存在闭包内, 当事件函数顺着作用域链从内往外查找 `i` 时, 就会先找到闭包内部的 `i`;

```javascript
var nodes = document.getElementsByTagName( 'div' );
for ( var i = 0, len = nodes.length; i < len; i++ ){
    (function(i){
        nodes[ i ].onclick = function(){
            alert ( i );
        }
    })(i);
};
```
随着 `es20115` 的普及, 上面的问题也可以使用 `let` 来作为变量 `i` 的声明, `let` 关键字将循环中的 `i` 的值每次都创建一个代码块; 

```javascript
var nodes = document.getElementsByTagName( 'div' );
for ( let i = 0, len = nodes.length; i < len; i++ ){
    nodes[ i ].onclick = function(){
        alert ( i );
    }
};
```

闭包可以帮助把一些不需要暴露在全局环境的变量封装成私有变量, 不让外部去修改变量的值; 例如我们可以用闭包模拟一个 `stack` 栈;

```javascript
function Stack(){
    var items = [];
    // 入栈
    this.push = function(item){
        items.push(item);
    }
    // 出栈
    this.pop = function(){
        return items.pop();
    }
    // 返回栈内所有元素
    this.getAll = function(){
        return items;
    }
}

var stack = new Stack();
stack.push(2);
```
`Stack` 内部的 `items` 作为存储栈, 可以在函数内定义一系列的方法去操作栈, 但是不能直接在外部访问栈元素; `es2015` 新增了 `class` 关键字, `class` 内部定义的变量就是私有变量, 不需要使用闭包来模拟;


#### 闭包和面向对象程序设计

使用闭包来实现一个面向对象的程序设计;

```javascript
var extend = function(){
    var value = 0;
    return {
        call:function(){
            value ++;
            console.log(value);
        }
    }
}

var extend = extend();
extend.call();          // 1
extend.call();          // 2
extend.call();          // 3
```
如果换成面向对象的写法就是:

```javascript
var extend = {
    value:0,
    call:function(){
        this.value ++;
        console.log(this.value);
    }
}
extend.call();          // 1
extend.call();          // 2
extend.call();          // 3

// 或者

function Extend(){
    this.value = 0;
}

Extend.prototype.call = function(){
    this.value ++;
    console.log(this.value);
}

var extend = new Extend();
extend.call();          // 1
extend.call();          // 2
extend.call();          // 3
```

#### 闭包实现命令模式

命令模式的意图就是就是把请求封装为对象, 从而分离请求的发起者和请求的接收者之间的耦合关系, 在命令执行之前, 可以预先往命令对象中植入命令的接收者; 这个也是设计模式之一;

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="execute">点击我执行命令</button>
    <button id="undo">点击我执行命令</button>

    <script>
        var TV = {
            open:function(){
                console.log("打开电视机~");
            },
            close:function(){
                console.log("关闭电视机~");
            }
        }
        var createCommand = function(reciver){
            return {
                execute:function(){
                    return reciver.open();
                },
                undo:function(){
                    return reciver.close();
                }
            }
        }
        var setCommand = function(command){
            document.getElementById("execute").onclick = function(){
                command.execute();
            }
            document.getElementById("undo").onclick = function(){
                command.undo();
            }
        }

        setCommand(createCommand(TV));
    </script>
</body>
</html>
```

#### 高阶函数

把函数当做参数传递, 这代表我们可以抽离出一部分容易变化的业务逻辑, 把这部分的逻辑放在函数参数中, 这样可以分离业务代码中容易变化和不变的部分; 其中最常见的就是回调函数;

+ 1. 把函数当做参数传递, 回调函数;

```javascript
function getUserInfo(userId,callback){
    $.ajax('http://localhost:3000/getUserInfo?userId=' + userId,function(data){
        if(typeof callback == "function"){
            callback(data);
        }
    })
}

getUserInfo(157,function(data){
    // todo...
})
```

+ 2. 函数作为返回值输出, 判断数据类型;

判断一个数据是否是数组, 字符串或者是数值类型, 可以使用 `Object.prototype.toString` 来计算, 例如 `Object.prototype.toString.call( [1,2,3] )` 总是返回 `"[object Array]"`;

```javascript
var isString = function(obj){
    return Object.prototype.toString.call(obj) == "[object String]";
}

var isArray = function(obj){
    return Object.prototype.toString.call(obj) == "[object Array]";
}

var isNumber = function(obj){
    return Object.prototype.toString.call(obj) == "[object Number]";
}
```
我们发现, 这些函数大部分都是相同的, 不同的只是函数的返回值, 为了避免冗余的代码, 我们可以尝试把这些字符串作为参数提前植入 `isType` 函数;

```javascript
function isType(type){
    return function(obj){
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    }
}
var isString = isType( 'String' );
var isArray = isType( 'Array' );
var isNumber = isType( 'Number' );

console.log(isArray([1,2,3]));
```
还可以使用循环语句来批量注册这些 `isType` 函数:

```javascript
var Type = {};

for(var i = 0, type; type = ["String","Number","Array"][i++];){
    (function(type){
        Type["is" + type] = function(obj){
            return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    })(type)
}

console.log(Type.isArray([1,2,3]));
```

#### 高阶函数 AOP 切面应用

AOP 切面应用的主要作用是把一些跟核心业务逻辑模块的无关功能抽离出来, 这些跟业务逻辑无关的模块常包括日志统计, 安全控制, 异常处理; 把这些功能都抽离出来之后, 再通过动态组织的方式掺入业务逻辑中, 这样做的好处是可以保证业务模块的纯净和高内聚性, 其次是可以很方便的复用日志统计等功能;

```javascript
Function.prototype.before = function(beforeFn){
    var self = this;        // 保存原函数的引用
    return function(){      // 返回原函数和形函数的代理函数
        beforeFn.apply(this,arguments);         // 执行新函数, 修正 this
        return self.apply(this,arguments);      // 执行原函数
    }
} 

Function.prototype.after = function(afterFn){
    var self = this;
    return function(){
        var ret = self.apply(this,arguments);
        afterFn.apply(this,arguments);
        return ret;
    }
}

var func = function(){
    console.log(2);
}

func = func.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
})

func();
```

#### 高阶函数的其他应用

+ 1. 函数柯里化

柯里化(currying) 又称为部分求值, 一个 currying 的函数首先会接收一些参数, 接收了这些参数之后该函数并不会立即求值, 而是继续返回一个新的函数, 刚传入的参数在函数形成的闭包中被保存起来, 待到函数被真正求值的时候, 之前传入的参数都会被一次性用于求值;

```javascript
var currying = function(fn){
    var args = [];
    return function(){
        if(arguments.length == 0){
            return fn.apply(this,args);
        }else{
            [].push.apply(args,arguments);
            return arguments.callee;
        }
    }
}
var cost = (function(){
    var money = 0;
    return function(){
        for(var i = 0; i < arguments.length; i++){
            money += arguments[i];
        }
        return money;
    }
})();

var cost = currying(cost);     // 转换成柯里化函数;

cost(100);          // 未真正求值
cost(200);          // 未真正求值
cost(500);          // 未真正求值

console.log(cost());    // 求值并输出
```
+ 2. 反柯里化

在我们的预期中, `Array.prototype` 上的方法原本只能用来操作 `Array` 对象, 但用 `call` 和 `apply` 可以把任意对象当做 `this` 传入某个方法, 这样一来方法中用到的 `this` 就不再局限于原来规定的对象了;

```javascript
Function.prototype.uncurrying = function(){
    var self = this;                // self 此时是 Array.prototype.push
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj,arguments);
    }
}

for ( var i = 0, fn, ary = [ 'push', 'shift', 'forEach' ]; fn = ary[ i++ ]; ){
    Array[ fn ] = Array.prototype[ fn ].uncurrying();
};

var obj = {
    "length": 3,
    "0": 1,
    "1": 2,
    "2": 3
};

Array.push(obj,4);
console.log(obj);               // {0: 1, 1: 2, 2: 3, 3: 4, length: 4}

var first = Array.shift(obj);
console.log(first);             // 1   截取掉对象的第一个元素
console.log(obj);               // {0: 2, 1: 3, 2: 4, length: 3}

Array.forEach(obj,function(i,n){
    console.log(n);
})
```

+ 3. 函数节流

函数节流在实际开发中应用非常广泛, 比如窗口事件 `onresize`, 滚动事件 `onscroll` 等等, 关于函数节流的代码实现有很多种, 下面的 `throttle` 函数的原理是将即将执行的函数用 `setTimeout` 延迟一段时间执行, 如果该次延迟执行还没有完成, 则忽略接下来调用该函数的请求;

```javascript
var throttle = function(fn, interval){
    var self = fn,          // 保存需要被延迟执行的函数的引用
        timer,              // 定时器
        firstTime = true;   // 是否是第一次调用
        
    return function(){
        var args = arguments,
            me = this;
        if(firstTime) {                 // 如果是第一次执行, 则不需要延迟
            self.apply(me,args);
            return firstTime = false;
        }
        if(timer){                      // 如果定时器还存在, 那说明上一次执行还没有完成
            return false;
        }
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            self.apply(me,args);
        }, interval || 500);
    }
}

window.onresize = throttle(function(){
    console.log(Math.random());
},500)
```

+ 4. 分时函数

一个例子是创建 `webqq` 的好友列表, 列表中通常有成百上千个好友, 如果一个好友用一个节点来表示, 当我们在渲染这个列表的时候, 可能会一次性往页面中插入上千个元素; 这样会影响性能, 可能会造成浏览器卡死;

这个问题的解决方案之一就是下面的 `timeChunk` 函数, `timeChunk` 函数让创建节点的工作分批进行, 比如把 1 秒创建 1000 个节点, 改为每 200 毫秒创建 8 个;

```javascript
var timeChunk = function (ary, fn, count) {
    var obj, t;
    var len = ary.length;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    }
    return function () {
        t = setInterval(function () {
            if (ary.length == 0) return clearInterval(t);        // 如果全部节点都已经创建好
            start();
        }, 200)          // 分批执行时间间隔, 也可以用参数的形式传入
    }
}

var ary = [];
for (var i = 1; i <= 1000; i++) {
    ary.push(i);
};

var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);

renderFriendList();
```

### js 操作 Excel

[详情查看代码](./resouce/index.html);

