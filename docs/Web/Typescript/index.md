### 概述
[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/project/modules.html#%E5%85%A8%E5%B1%80%E6%A8%A1%E5%9D%97)

>`TypeScript `具有类型系统,  且是`JavaScript`的超集. 它可以编译成普通的 `JavaScript`代码. `TypeScript` 是一个比 `JavaScript` 更 `Java` 的 `Script`;

### 安装

```bash
npm install typescript -g

tsc

#   Version 3.9.7
#   Syntax:   tsc [options] [file...]
#   
#   Examples: tsc hello.ts
#             tsc --outFile file.js file.ts
#             tsc @args.txt
#             tsc --build tsconfig.json
```

### ts 类型文件定义

在开发ts时, 有时会遇到没有 `d.ts` 文件的库, 同时在老项目迁移到ts项目时也会遇到一些文件需要自己编写声明文件, 但是在需要的声明文件比较多的情况, 就需要自动生产声明文件;

- 1. 为整个包添加声明文件; 使用微软的 `dts-gen`

```bash
npm install -g dts-gen   # 先全局安装dts-gen
npm install -g yargs     # 然后在全局安装你需要生产声明文件的库
dts-gen -m yargs         # 执行命令生成文件
```

- 2. 为单个文件生成声明文件; 使用 `dtsmake`

```bash
npm i dtsmake -g   # 先全局安装dtsmake
dtsmake -s /path/name.js  # 需要生成的文件地址
```
> 生成的文件一般都会有一些问题, 需要自己稍微修改一下, 如果不想写类型直接用 `any`; 执行的时候可能会报错 `tern` 没有按装, 就需要在安装一下, 在项目目录 `npm i tern --save-dev`;


### 装饰器
装饰器允许向一个现有的对象添加新的功能, 同时又不改变其结构, 这种类型的设计模式属于结构型模式, 它是作为一个现有的类的包装;

这种模式创建了一个装饰类, 用来包装原有的类, 并在保持类方法签名的完整性的前提下, 提供了额外的功能;

#### 装饰器原理
装饰器, 本质上就是一个函数, 它会在运行时被调用, 被装饰的声明信息做为参数传入; 理论上忽略参数的话, 任何函数都可以当做装饰器使用;

````typescript
import * as Koa from 'koa';

function decrator(method){
    return (target,property,descriptor)=>{
        console.log('method',method);
        console.log('arguments',arguments);
        console.log('target',target);
        console.log('property',property);
        console.log('descriptor',descriptor);
    }
    /*
     *      method /get
     *      arguments [Arguments] { '0': '/get' }
     *      target User {}
     *      property list
     *      descriptor {
     *          value: [Function: list],
     *          writable: true,
     *          enumerable: false,
     *          configurable: true
     *      }
     * 
     */
}

export default class User {
    @decrator('/get')
    public list(ctx:Koa.Context){
        ctx.body = { ok:1 }
    }
}
````
#### 装饰器适用场景
装饰器能够被附加到类声明, 方法, 属性或参数上, 可以修改类的行为;

+ AOP 切面应用:
    + 静态注入方式
    + 反射机制

+ 开放封闭原则, 类的解耦:
    + MVC 权限判断
    + 注解

#### 装饰器类型
常见的装饰器有: 类装饰器、属性装饰器、方法装饰器、参数装饰器

装饰器的写法: 普通装饰器 (无法传参) 、 装饰器工厂(可传参)

##### 类装饰器

+ 1. 无参数装饰器

````typescript
function logClass(category:any){
    console.log('category',category);
    category.prototype.apiUrl = 'http://www.baidu.com';
    category.prototype.func = function(){};
}

@logClass
class HttpClient{
    constructor(){}
}

const http = new HttpClient();
console.log(http['apiUrl']);

//  category [Function: HttpClient]
//  http://www.baidu.com
````
+ 2. 有参数装饰器(工厂模式)

````typescript
function logClass(params:any){
    console.log('params',params);
    return (target)=>{
        target.prototype.apiUrl = params;
        target.prototype.func = function(){};
    }
}

@logClass('http://www.baidu.com')
class HttpClient{
    constructor(){}
}

const http = new HttpClient();
console.log(http['apiUrl']);

//  params http://www.baidu.com
//  http://www.baidu.com
````

##### 方法装饰器

+ 1. 无参数装饰器

````typescript
function logClass(target, name, descriptor){
    var oldValue = descriptor.value;
    descriptor.value = function(){
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    }
}

class Maths{
    constructor(){

    }

    @logClass
    add(a,b){
        return a + b;
    }
}

const user = new Maths();
console.log(user.add(3,5));

//  Calling "add" with [Arguments] { '0': 3, '1': 5 }
//  8
````
+ 2. 装饰器工厂(可传参)

````typescript
function fnMethod(params){
    return (target, property, descriptor)=>{
        // 保存一下旧的方法
        const oMthod = descriptor.value;
        // 改写旧的方法
        descriptor.value = function(a,b){
            // 调用未改写的方法
            //oMthod.apply(null,...arguments);
            return (a + b) * params;
        }
    }
}

class Maths{
    constructor(){}

    @fnMethod(5)
    add(a,b){
        return a + b;
    }
}

const fnObj = new Maths();
console.log(fnObj.add(3,5));

//  40
````
##### 属性装饰器

属性装饰器表达式会在运行时当作函数被调用, 传入下列2个参数:
+ 对于静态成员来说是类的构造函数, 对于实例成员是类的原型对象;
+ 属性名;

````typescript
function fnProperty(value:any){
    return (target,attr)=>{
        console.log('target',target);
        console.log('attr',attr);
        target[attr] = value;
    }
}

class Person{
    @fnProperty('laowang')
    public name:string
}

const p = new Person();
console.log(p.name);

//  target Person {}
//  attr name
//  laowang
````
#### 装饰器执行顺序

````typescript
function anotationClass(args:any){
    console.log("anotationClass evaluated",args);
    return (target)=> console.log('anotationClass executed',target);
}

function anotationMethods(args:any){
    console.log('anotationMethods evaluated', args);
    return (target, property, descriptor) => console.log('anotationMethods executed',target);
}

function anotationProperty(args:any){
    console.log('anotationProperty evaluated', args);
    return (target, attr) => console.log('anotationProperty executed',target);
}

@anotationClass(0)
@anotationClass(1)
class Person{

    @anotationProperty('0')
    @anotationProperty('1')
    public name:string

    @anotationMethods(0)
    @anotationMethods(1)
    getName(){
        return this.name
    }
}

const p = new Person();

/*
 *      anotationProperty evaluated 0
 *      anotationProperty evaluated 1
 *      anotationProperty executed Person {}
 *      anotationProperty executed Person {}
 *      anotationMethods evaluated 0
 *      anotationMethods evaluated 1
 *      anotationMethods executed Person {}
 *      anotationMethods executed Person {}
 *      anotationClass evaluated 0
 *      anotationClass evaluated 1
 *      anotationClass executed [Function: Person]
 *      anotationClass executed [Function: Person]
 */
````
执行顺序: 属性 -->  方法 -->  类

#### Typescript 装饰器实践

`NodeJs` + `Typescript` + `Koa` 装饰器实现后台 `api` 开发;

##### 项目初始化
````bash
npm init -y
npm install typescript ts-node-dev tslint @types/node -D
````
修改 `package.json` 为:
````json
"scripts": {
    "start": "ts-node-dev ./src/index.ts -P tsconfig.json --no-cache",
    "build": "tsc -P tsconfig.json && node ./dist/index.js",
    "tslint": "tslint --fix -p tsconfig.json"
}
````
在根目录下创建 `tsconfig.json`:
````json
{
    "compilerOptions": {
        "outDir": "./dist",
        "target": "es2017",
        "module": "commonjs",                   //组织代码方式
        "sourceMap": true,
        "moduleResolution": "node",             // 模块解决策略
        "experimentalDecorators": true,         // 开启装饰器定义
        "allowSyntheticDefaultImports": true,   // 允许es6方式import
        "lib": [
            "es2015"
        ],
        "typeRoots": [
            "./node_modules/@types"
        ],
    },
    "include": [
        "src/**/*"
    ]
}
````
##### 项目基础代码

+ 1. 安装依赖:

````bash
npm i koa koa-static koa-body koa-xtime glob -S
````

+ 2. 在 src 目录下面新建 `index.ts`:

***src/index.ts***
````typescript
import * as Koa from 'koa';
import koaBody, * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timming from 'koa-xtime';

const app:Koa = new Koa();

app.use(timming());
app.use(serve(`${__dirname}/public`));

app.use(bodify());
app.use((ctx:Koa.Context)=>{
    ctx.body = "Hello ts-koa";
})

app.listen(3001,()=>{
    console.log("服务器启动成功~");
});
````
````bash
npm start
````
##### 实现路由定义和发现

需求: 定义一个装饰器, 实现 router 的自动注册; 
要求: `@get` 的时候, 路由的请求方式为 `get`, `@post` 路由的请求方式为 `post`; 当传进去 `prefix`, 对用的路由规则为 `prefix/xxx`, 例如:`api/users`;

+ 1. 路由发现及注册, 在 src 目录下面创建 `util/route-decors.ts`:

***src/util/route-decors.ts***
````typescript
import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
    /**
    * 路由文件扩展名，默认值是`.{js,ts}`
    */
    extname?: string;
};
type RouteOptions = {
    /**
    * 适用于某个请求比较特殊，需要单独制定前缀的情形
    */
    prefix?: string;
    /**
    * 给当前路由添加一个或多个中间件
    */
    middlewares?: Array<Koa.Middleware>;
};
const router = new KoaRouter();
const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        const url = options.prefix ? options.prefix + path : path
        router[method](url, target[property])
    }
}
const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router);

export const get = method('get');
export const post = method('post');
export const put = method('put');
export const del = method('del');
export const patch = method('patch');

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
    const extname = options.extname || '.{js,ts}';
    glob.sync(require('path').join(folder,`./**/*${extname}`)).forEach((item) => require(item))
    return router;
}
````
+ 2. 创建路由, 在 src 下新建 `routes/user.ts`:

***src/routes/user.ts***
````typescript
import * as Koa from 'koa';
import { get , post} from '../util/route-decors';

export default class User {
    @get('/list',{ prefix:'/user' })
    public pageList(ctx:Koa.Context){
        ctx.body = {
            state:"success",
            message:"请求成功~",
            data:{}
        }
    }
}
````
+ 3. 使用, 将 `routes` 目录下面的所有的路由用 `loader` 读取出来, 并注册到 app 上:

***index.ts***
````typescript
import * as Koa from 'koa';
import { load } from './util/route-decors';
import { resolve } from 'path';

const app:Koa = new Koa();

const router = load(resolve(__dirname,'./routes'));
app.use(router.routes());

app.listen(3001,()=>{
    console.log("服务器启动成功~");
});
````
````bash
npm start

# http://127.0.0.1:3001/user/list
````

##### 数据校验

上面我们对路由的装饰器保留了一个 `middlewares` 参数, 可以利用中间件的机制实现对数据的校验;

+ 1. 首先对 `route-decors`进行改造:

````typescript
//...
const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        const middlewares = [];
        // 如果装饰器里面有传过来中间件
        if(options.middlewares){
            middlewares.push(...options.middlewares);
        }
        
        const url = options.prefix ? options.prefix + path : path
        // 还需要将正常业务的中间件放进去
        middlewares.push(target[property]);
        router[method](url, ...middlewares);
    }
}
//...
````
+ 2. 直接在路由里面就可以传入 `middleware` 参数了:

***src/routes/user.ts***
````typescript
import * as Koa from 'koa';
import { get , post} from '../util/route-decors';

export default class User {
    @get('/list',{ 
        prefix:'/user',
        middlewares:[
            async function valitation(ctx:Koa.Context,next:()=> Promise<any>){
                // 校验参数里面是否有 name 字段
                const { name } = ctx.query;
                if(!name) throw "unkonw name property";
                await next();
            }
        ]
    })
    public pageList(ctx:Koa.Context){
        ctx.body = {
            state:"success",
            message:"请求成功~",
            data:{}
        }
    }
}
````
##### 路由守卫(鉴权)

通常开发情况下, 我们需要对某些 api 进行鉴权, 也可以使用装饰器来完成功能;

***src/util/route-decors.ts***
````typescript
//...
const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        // 这里使用 nexttick 是因为方法装饰器比类装饰器先执行
        process.nextTick(()=>{
            const middlewares = [];
            // 如果类上面有装饰器就把 类的装饰器也放进去
            if(target.middlewares){
                middlewares.push(...target.middlewares);
            }

            // 如果装饰器里面有传过来中间件
            if(options.middlewares){
                middlewares.push(...options.middlewares);
            }
    
            const url = options.prefix ? options.prefix + path : path
            // 还需要将正常业务的中间件放进去
            middlewares.push(target[property]);
            router[method](url, ...middlewares);
        })
    }
}
export const middlewares = function middlewares(middlewares:Koa.Middleware[]) {
    return function (target) {
        target.prototype.middlewares = middlewares;
    };
};
````
***src/routes/user.ts***
````typescript
//...
@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        if (ctx.header.token) {
            await next();
        } else {
            throw "请登录";
        }
    }
])
export default class User {}
````
##### 数据库整合
[sequelize-typescript 使用文档](https://www.jianshu.com/p/e6e6dde76094)

安装依赖:
````bash
$  npm install -S sequelize sequelize-typescript reflect-metadata mysql2 @types/bluebird @types/node @types/validator
````

***index.ts***
````typescript
//...
import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
    port:3306,
    database:'test',
    username:"root",
    password:'root',
    dialect:'mysql',
    // 添加这个之后会自动遍历 model 目录下面的所有文件, 并创建模型
    modelPaths:[`${__dirname}/model`]
})
database.sync({force:true});
````
创建模型: src 目录下新建 `model/user.ts`:
````typescript
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({modelName : 'users'})
export default class User extends Model<User>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id:number;

    @Column(DataType.CHAR)
    public name: string;
}
````
使用模型: `routes/user.ts`:
````typescript
import model from '../model/user';

export default class User {
    @get('/users')
    public async list(ctx: Koa.Context) {
        const users = await model.findAll()
        ctx.body = { ok: 1, data: users };
    }
}
````
[Typescript 中台开发开源库](https://github.com/su37josephxia/smarty-end)


