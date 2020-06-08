### 概述
Lua 是一种轻量小巧的脚本语言, 用标准C语言编写并以源代码形式开放, 其设计目的是为了嵌入应用程序中, 从而为应用程序提供灵活的扩展和定制功能.

其设计目的是为了嵌入应用程序中, 从而为应用程序提供灵活的扩展和定制功能.

### 基本语法

#### 注释
````lua
--  这是单行注释
````
````lua
--[[
    这是多行注释
    为了表示这是多行, 再写一行文字;
--]]
````

### 数据类型
Lua 是动态类型语言, 变量不要类型定义, 只需要为变量赋值.  值可以存储在变量中, 作为参数传递或结果返回.

Lua 中有 8 个基本类型分别为: nil、boolean、number、string、userdata、function、thread 和 table.
````lua
print(type('这是一个字符串类型'));
print(type(20 * 6));
print(type(true));
print(type(type));
print(nil);
print(type(type(x)));

--[[
    string
    number
    boolean
    function
    nil
    string
--]]
````

nil 空, 同 JavaScript 里面的 null;

table 表
> `.. ` 同 JavaScript 里面的 `+ `, 字符串拼接;

````lua
obj = {key1='key1',key2='key2','key3'};

for k, v in pairs(obj) do
    print('keys:' .. k .. '; values:' .. v);
end

--[[
    keys:1; values:key3
    keys:key1; values:key1
    keys:key2; values:key2
--]]
````

string 类型
````lua
b = '这是字符串类型';
print(type(b));			-- string

-- 还可以用多行字符表示; [[]]
b = [[
    <html>
        <head></head>
        <body>

        </body>
    </html>
]]
````

function 函数
和 javascript 里面的函数相同, 不过语法不一样
````lua
-- 递归乘积
function fact(n)
    if(n == 1) then
		return n;
	else
		return n * fact(n - 1);
	end;
end;
````

### 变量
Lua 变量有三种类型: 全局变量、局部变量、表中的域.

Lua 中的变量全是全局变量, 那怕是语句块或是函数里, 除非用 local 显式声明为局部变量.

````lua
-- 全局变量
b = 5;

-- 局部变量
local c = 10;
````

### 流程控制
语法: 
````lua
if (boolean) then
    -- code
else
    -- code
end;

--exp
a = o;
if(a) then
	print('a为真');
else
	print('a为假');
end;
 -- a为假
````
````lua
if (boolean) then
    --code
elseif (boolean) then
    --code
else
    --code
end;
````
### 循环
while 语法:
````lua
while (boolean)
do
    --code
end;

--exp
a=10
while( a < 15 )
do
   print("a 的值为:", a)
   a = a + 1;
end

-- a 的值为:    10
-- a 的值为:    11
-- a 的值为:    12
-- a 的值为:    13
-- a 的值为:    14
````
for 语法:
````lua
-- 泛型
for key , value in ipairs(table) do
    --code
end;

--exp
a = {'one' = 10, 'two' = 20, 'three' = 30};
for key , val in ipairs(a) do
    print(key,val);
end;

-- 1	one
-- 2	two
-- 3	three
````
练习: 在控制台中输出 9*9 乘法表

````lua
for i = 1, 9 do
	for j = i, 9 do
		print(i..'*'..j..'='..(j*i));
	end
end
````


### 函数
函数语法:
````lua
[local] function name(arg...)
    -- code;
    [return result];  
end;

--exp
local function max(arg1,arg2)
	if (arg1 < arg2) then
		return arg2;
	else
		return arg1;
	end;
end;
print(max(2,5));
````
和变量的声明方式差不多, 如果是局部函数就在前面加上 `local` 关键字;

函数多返回值:
````lua
function maximum (a)
    local mi = 1             -- 最大值索引
    local m = a[mi]          -- 最大值
    for i,val in ipairs(a) do
       if val > m then
           mi = i
           m = val
       end
    end
    return m, mi
end

print(maximum({8,10,23,12,5}))
-- 23    3
````
可变参数: 在函数参数列表中使用三点 `...` 表示函数有可变的参数; 参数个数是不定的;
````lua
function averarg(...)
    -- arg 类似于 javascript 里面的 arguments 类数组;
    -- arg 类数组, 因此我们可以通过  arg[index] 来取参数的第几个参数;
    print(arg);
end;

averarg();
averarg(1);
averarg(1,2);
averarg(1,2,3);

--[[
    table: 00A296F8     -- 输出的是个表结构, 后面的值表示在内存中的地址;
    table: 00A297E8
    table: 00A29950
    table: 00A296D0
--]]
````
我们也可以使用 `select("#",...)` 来获取可变参数的数量:
````lua
function average(...)
   result = 0
   -- 这里一定要用变量接收一下, 不然做运算的时候会把 arg 里面的参数个数也用来参与运算;
   local arg = {...}
   for i,v in ipairs(arg) do
      result = result + v
   end
   print("总共传入 " .. select("#",...) .. " 个数")
   return result/select("#",...)
end

print("平均值为",average(10,5,3,4,5,6))

--[[
    总共传入 6 个数
    平均值为    5.5
--]]
````
### 运算符
运算符基本上和 JavaScript 一致; 

算数运算符:  加 `+` , 减 `-` , 乘 `*` , 除 `/` , 取余 `%` , 幂 `^`; 

关系运算符:  等于 `==` , 不等于 `~=` , 大于 `>` , 小于 `<` , 大于等于 `>=` , 小于等于 `<=`;
````lua
a = 21;
b = 10;
if( a ~= b )
then
   print("a 不等于 b" );
else
   print("a 等于 b" );
end

-- a 不等于 b
````
逻辑运算符:  `and` , `or` , `not`;

其他运算符:  `#` (用来返回字符串或者是 table 的长度) , `..` (拼接字符串); 
 
### 字符串
string.format();
````lua
n = 5;
m = 10;
print('加法运算:'..n..'+'..m..'='..(n+m));
print(string.format('加法运算:%d+%d+%d',n,m,(n+m)));

--[[
    加法运算:5+10=15        
    加法运算:5+10+15        %d 相当于 c# 语言中的 {0}, 这里代表占位符, 前面有多少个 %d, 后面就对应传几个参数;
--]]

username = 'ahugoune';
password = 'syz1232465';

print(string.format("select * from user where username='%s' and password='%s'",username,password));
-- select * from user where username='ahugoune' and password='syz1232465'
````
常见的占位符详见  [菜鸟教程](https://www.runoob.com/lua/lua-strings.html);

### 数组
Lua 数组的索引键值可以使用整数表示, 数组的大小不是固定的.

> Lua 数组的索引默认都是从 1 开始, 也可以指定索引, 也可以为负数为索引;

````lua
arr = {"lua","c#","javascript","java"};
for i = 1, #arr do
	print(arr[i]);
end;

--[[
    lua
    c#
    javascript
    java    
--]]
````
#### 多维数组
和数组的格式一样, 就是在数组里面嵌套数组;
````lua
array = {{"java","c#","c++"},{"lua","javascript","typescript"},{"vue","react"}};
for i = 1, #array do
    for j = 1,#array[i] do
        print(array[i][j]);
    end;
end;

--[[
    java
    c#
    c++
    lua
    javascript
    typescript
    vue
    react    
--]]
````

### 迭代器 (iterator)

````lua
-- for k, v in pairs(t) do

array = {'Lua','Java','Typescript'};
for k,v in pairs(array) do
	print(k..':'..v);
end;

--[[
    1:Lua
    2:Java
    3:Typescript    
--]]
````
````lua
-- for k, v in ipairs(t) do

array = {'Lua','Java','Typescript'};
for k,v in pairs(array) do
	print(k..':'..v);
end;

--[[
    1:Lua
    2:Java
    3:Typescript    
--]]
````
> `pairs` 和 `ipairs` 的区别在于 `ipairs` 在遍历数组的时候, 如果中间有一个值为空的话就终止遍历, 而 `pairs` 会跳过索引;

````lua
array = {'Lua','Java',nil,'Typescript'};
for k,v in pairs(array) do
	print(k..':'..v);
end;

--[[
    1:Lua
    2:Java
    4:Typescript   
--]]


array = {'Lua','Java',nil,'Typescript'};
for k,v in ipairs(array) do
	print(k..':'..v);
end;

--[[
    1:Lua
    2:Java
--]]
````

### 模块
Lua 的模块是由变量、函数等已知元素组成的 table, 因此创建一个模块很简单, 就是创建一个 table, 然后把需要导出的常量、函数放入其中, 最后返回这个 table 就行.

***module.lua***
````lua
-- 导出一个模块的方法;
module = {}

module.var = function()
	print("这是一个模块~");
end;

-- 上面的写法还可以写成这样的;
--[[
    function module.var()
        print("这是一个模块~");
    end;    
--]]
return module;
````
使用模块:
````lua
-- require 后面直接跟模块名就可以引入模块
require 'module';
-- 或者是可以使用局部变量接收一个模块
local mo = require 'module';

print(module.var());
````

### 元表 (Metatable)
元表是用来定义对 table 或 userdata 操作方式的表;

````lua
local t1 = {1}
local t2 = {2}
local t3 = t1 + t2
-- error  attempt to perform arithmetic on local 't1' (a table value)
````
如上例子: 我们直接对两个 `table` 执行 `＋` 运算, 会报错; 因为程序不知道如何对两个表执行 `+` 运行, 这时候就需要通过元表来定义如何执行 t1 的 `+`运算, 有点类似于c语言中的运算符重载.

````lua
local mt = {}
--定义mt.__add元方法(其实就是元表中一个特殊的索引值)为将两个表的元素合并后返回一个新表
mt.__add = function(t1,t2)
	local temp = {}
	for _,v in pairs(t1) do
		table.insert(temp,v)
	end
	for _,v in pairs(t2) do
		table.insert(temp,v)
	end
	return temp
end
local t1 = {1,2,3}
local t2 = {2}
--设置t1的元表为mt
setmetatable(t1,mt)

local t3 = t1 + t2
--输出t3
local st = "{"

for _,v in pairs(t3) do
	st = st..v..", "
end

st = st.."}";
print(st);

-- {1, 2, 3, 2, }
````
#### __index 方法
通过键来访问 table 的时候, 如果这个键没有值, 那么 Lua 就会寻找该 `table`的 `metatable` (假定有metatable)中的 `__index`  键.如果 `__index` 包含一个表格, Lua会在表格中查找相应的键;
````lua
mytable = {'c#','lua','javascript','java'};

mymetTable = {
    __index = function(table,key)   -- table 为元表所关联的表
        --print('调用了 __index 方法');
        return 'typescript';
    end;
}

mytable = setmetatable(mytable,mymetTable);

-- 访问普通表里面不存在的键的时候就会自动调用  __index 方法;
print(mytable[1]);             -- c#
print(mytable[10]);            -- typescript

````
__index 用来处理当我们访问不到的时候这个键的值的时候, 做的一些处理;

#### __newindex 方法
__newindex 元方法用来对表更新, 当我们操作的是一个新的索引的时候才会起作用;

````lua
mytable = {'c#','java','typescript'};

mymetTable = {
    __newindex = function(table,key,val)
        print('我们修改的key为:'..key..', 修改的值为:'..val);
        -- 给需要修改的表添加行;
        rawset(mytable, key, "\""..value.."\"");
    end;
}

mytable = setmetatable(mytable,mymetTable);

mytable[1] = 'php';         -- 无输出
mytable[10] = 'php';        -- 我们修改的key为:10, 修改的值为:php
````

#### __call 方法
把表当做函数来使用, 只要有 __call 这个属性, 就可以把表当做函数来使用;
````lua
mytable = {'c#','java','typescript'};
mymetTable = {
    -- 可以接受多个参数;
    __call = function(table,args)
        print(args);
        -- [return 可选]
	end;
}
mytable = setmetatable(mytable,mymetTable);
mytable(20)

-- 20;
````

#### __tostring 方法
通常我们直接打印表的时候会是这样显示的:
````lua
mytable = {'c#','java','typescript'};
print(mytable);

-- table: 00CCC248
````
__tostring 方法可以将表内容以字符串的格式输出:

````lua
mytable = {'c#','java','typescript'};

mymetTable = {
    __call = function(table,args)
		print(args);
	end,
	__tostring = function(table)
		local str = '';
		for k,v in pairs(table) do
			str = str..v..';';
		end;
		return str;
	end
}

mytable = setmetatable(mytable,mymetTable);

print(mytable);

-- c#;java;typescript;
````

### 协同程序 (coroutine)
协同函数和普通的函数功能差不多, 普通函数是当我们调用的时候直接执行完成, 而协同函数可以在执行过程中暂停; 在后面的某一时刻可以让函数继续执行;

#### 定义协同函数

````lua
co = coroutine.create(
	function(a,b)
		print(a + b);
	end
)

-- 启动协同函数, 第一个参数为需要启动协同函数的名称, 后面的参数是协同函数内部函数的参数;
coroutine.resume(co,20,30);

-- 50;
````
定义协同函数 `coroutine.create` , 启动协同函数 `coroutine.resume`;

或者是使用 `wrap` 来定义协同函数:

````lua
co = coroutine.wrap(
	function(a,b)
		print(a + b);
	end
)

co(20,30);

-- 50;
````
`coroutine.create` 和 `coroutine.wrap` 的区别是, `coroutine.wrap` 定义的函数, 可以直接用函数名来启动;

#### 暂停和继续运行协同函数
`coroutine.yield`, 将协同设置为挂起状态, 这个和 `resume `配合使用能有很多有用的效果;

````lua
co = coroutine.create(
	function(a,b)
		print(a + b);               -- 1. 当函数调用的时候第一步执行这行
		coroutine.yield();          -- 2. 遇到 yield 的时候协同程序挂机, 执行下面的语句
		print(a - b);               -- 5. 接收到启动命令;
	end
)

coroutine.resume(co,20,30);
print('program is over here~');     -- 3. 程序挂起之后执行
coroutine.resume(co);               -- 4. 将挂起的程序重新启动, 这个时候可以直接启动, 而不需要传递参数进去;

--[[
    50
    program is over here~
    -10
--]]
````

#### 协同函数的返回值

````lua
co = coroutine.create(
    function(a,b)
        -- yield() 接受到的参数会返回给第一次执行的结果;
        coroutine.yield(a*b,a+b);
        -- return  程序执行完成之后的返回值;
		return a%b, a/b;
	end
)

-- 程序被挂起时接收到 yield 的返回值;
res,res1,res2 = coroutine.resume(co,20,25);
print(res,res1,res2);

print('program is over here~');

-- 程序结束之后接收到 return 的返回值;
res,res1,res2 = coroutine.resume(co);
print(res,res1,res2);

-- 第一个返回值永远是 true 或者是 false, 表示当前协同程序是否启动成功, 后面返回值就是 yield 函数或者是 return 返回的值;
--[[
    true	500	45
    program is over here~
    true	20	0.8 
--]]

````

#### 协同程序和主程序的数据交流
`coroutine.status` 查看协同程序的运行状态;
````lua
co = coroutine.create(
	function(a,b)
		print(coroutine.status(co),'222');
		coroutine.yield(a*b,a+b);
		print(coroutine.status(co),'333');
		return a%b, a/b;
	end
)

print(coroutine.status(co),'111');
res,res1,res2 = coroutine.resume(co,20,25);
--print(res,res1,res2);
--print('program is over here~');
res,res1,res2 = coroutine.resume(co);
--print(res,res1,res2);
print(coroutine.status(co),'444');

--[[
    suspended	111
    running	    222
    running	    333
    dead	    444    
--]]
````
`suspended` 暂停的, `running` 正在运行, `dead` 程序运行结束;

### 文件 I/O 
Lua I/O 库用于读取和处理文件; 分为简单模式(和C一样)、完全模式;

. 简单模式(simple model)拥有一个当前输入文件和一个当前输出文件, 并且提供针对这些文件相关的操作.

. 完全模式(complete model) 使用外部的文件句柄来实现. 它以一种面对对象的形式, 将所有的文件操作定义为文件句柄的方法

#### 读取文件
````lua
file = io.open (filename [, mode])

--exp
-- io.open('文件名','打开方式')   更多文件打开方式详见 [菜鸟教程](https://www.runoob.com/lua/lua-file-io.html)
file = io.open('test.txt','r');

-- 设置输入的文件为读取到的文件;
io.input(file);

-- io.read() 读取一行文件, 返回的是字符串
print(io.read());

-- 对文件操作完成之后, 需要关闭文件;
io.close(file);

````

#### 写入文件
````lua
-- 写入文件的文件名和写入方式;  a 为附加模式, 如果文件不存在就创建文件, 如果文件存在就往文件里面追加内容;
file = io.open('data.txt','a');

-- 指定写入的文件
io.output(file);

-- 写入文件的内容;
io.write('www.runoob.com');

-- 写入完成之后执行关闭操作;
io.close(file);
````
在以上读取文件的实例中, 我们使用的是 `io.read()` 方法, 这个方法是没有带参数的, 参数可以是一下几种:

- `*n`  读取一个数字并返回它;
- `*a`  从当前位置读取整个文件;
- `*l`  读取下一行, 在文件末尾处返回 `nil`; (默认不传参数就是这个模式);
- `number`  读取指定个数的文本内容;  `io.read(10)` 表示只读取 10 个字符;

#### 完全模式读写文件
简单模式, 只能同时对一个文件进行读写; 通常我们如果需要在同一时间处理多个不同的文件, 我们就需要使用 `file:function_name` 替代 `io.function_name` 方法:
````lua
file = io.open('test.txt','r');

print(file:read());

file:close();
````

````lua
-- 以附加的方式打开只写文件
file = io.open("test.lua", "a")

-- 在文件最后一行添加 Lua 注释
file:write("--test")

-- 关闭打开的文件
file:close()
````
这里的调用方法是 `file:read()` , 后面接的是 `:` 而不是 `,`;

### Lua 面向对象基础
lua 中的 function 可以用来表示方法. 对于一个对象: 拥有属性和方法; 那么 lua 中的类可以通过 table + function 模拟出来;

````lua
person = {
	name = "张三",
	age = 26
}
person.eat = function(self)
	print(self.name..'今年'..self.age..'了');
end;

person.eat(person);

-- 张三今年26了
````
这种写法有一个限制, 就是每次调用的时候我们都需要将调用函数的对象传递进去, 才能找到调用的方法; 我们可以改写如下:
````lua
person = {
	name = "张三",
	age = 26
}
function person:eat()
	print(self.name..'今年'..self.age..'了');
end;

-- 两种调用方式都可以, 使用 . 就需要将调用的对象传递给函数;
person:eat();
person.eat(person);

-- 将原来的 . [属性]  替换成  : [属性]; 就可以在函数内部使用 self 关键字了;
````
#### Lua 中类的实现
上面我们用表实现了一个简单的面向对象程序, 但是如果需要构造多个 `person` 实例, 我们就需要写很多次重复的代码; 

````lua
person = {
	name = "张三",
	age = 26
}
function person:eat()
	print(self.name..'今年'..self.age..'了');
end;

function person:new()
	local t = {};
    -- 调用一个属性的时候, 如果 t 中不存在这个属性, 那么就会在 __index 方法指定的元表中查找;
	setmetatable(t,{
		__index = self
	})

    -- 这种写法和上面的写法是一样的;
    -- setmetatable(t,self);
    -- self.__index = self;
    
	return t;
end;

p1 = person:new();
p2 = person:new();
p2.name = '李四';

print(p1.name);
print(p2.name);

-- 张三
-- 李四
````
#### 面向对象的继承
````lua
person = {
	name = "张三",
	age = 26
}
function person:eat()
	print(self.name..'今年'..self.age..'了');
end;

function person:new(o)
	local t = o or {};

	setmetatable(t,{
		__index = self
	})

	setmetatable(t,self);
	self.__index = self;

	return t;
end;


student = person:new({
	class = '三年级二班',
	weight = 100,
	name = '学生'
})

-- stu1 的元表是 student , 而 student 元表是 person , 如果 student 里面没有这个属性, 就会去 person 元表里面查找; 这样就实现了继承;

stu1 = student:new();

print(student.name);
print(stu1.name);

-- 学生
-- 学生
````

