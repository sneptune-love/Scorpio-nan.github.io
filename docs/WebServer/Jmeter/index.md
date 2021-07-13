### Jmeter 环境搭建

[JEMETR软件测试](https://www.bilibili.com/video/BV1st411Y7QW?p=18)

+ 1. 下载 http://jmeter.apache.org/ (需要注意的是要选择 zip 的包下载);
+ 2. 解压完成之后将 Jmeter 添加到环境变量; 
+ 3. 下载安装 JDK 1.8 链接：https://pan.baidu.com/s/1PskNWdnM6bEyflMDX26qxQ  提取码：vi4c 
+ 4. 以上步骤完成之后, 打开终端, 输入 jmeter 即启动 jmeter 的工作界面;

### Jmeter 工作界面

#### GET 请求

添加: 线程组右键 --- 添加 --- 取样器 --- http请求

作用: 用来发送http请求, 添加完成之后需要填写参数, 然后点击启动按钮发送http 请求

#### Http 请求默认值

添加: 线程组右键 --- 添加 --- 配置元件 --- http请求默认值

作用: http请求默认值, 会在发送 http 请求的时候自带这些默认参数;

#### 查看结果树

添加: 线程组右键 --- 添加 --- 监听器 --- 查看结果树

作用: 用来查看当前线程组内http请求发送和接收的信息;

##### 查看结果树--CSSjQuery_Tester

设置了查看结果树, 我们就可以实时看到每个请求的请求数据以及响应数据; 

作用: css/jquery 测试程序只适用于文本响应, 可以根据 JSoup 或 Jodd 对响应数据进行过滤和查看; 不同于 Text , CSSjQuery_Tester 还提供类似 jquery 的 api 可以方便查找数据;

例如: div[class=nav active] 可以查找到 `<div class="nav active"></div>` 内的数据;

##### 查看结果树--HTML

HTML 查看一共有三种模式:

+ 1. HTML: HTML视图将响应层以 HTML 形式呈现, 渲染的 HTML 可以无法与浏览器显示的页面相比较; 但是可以提供一个基本的页面判断, 帮助我们确定是否请求页面成功, 但是图像和样式表等不会下载;
+ 2. HTML(download resource): 如果选择了这个选项, 则会下载 HTML 代码引用的图像、样式表等, 呈现出更加具体的 HTML 样式;
+ 3. HTML Source formatted: 如果选择了 HTML Source 格式化视图的选项, 则呈现由 Jsoup 格式化和清理的 HTML 源代码, 相对于第一种来说更简单, 跟 Text 模式没什么区别;

##### 查看结果树--Json Path Tester

工具提供了 Json 的查看模式, 而 Json Path Tester 相对于 Json 格式多了一个提取的功能; 

例如: $.result.data 可以获取到 `{result:{data:[]}}`;

##### 查看结果树--Regexp Tester

可以对请求的结果进行正则表达式匹配; 便于只查看某一部分需要匹配的内容;

例如: `<title>(.*?)</title>` 可以匹配到 HTML 中包含 `<title></title>` 的内容;

#### HTTP 信息头管理

添加: 线程组右键 --- 添加 --- 配置元件 -- HTTP信息头管理

作用: 有一些网址有做请求头校验, 例如 token user-Agent 等; HTTP信息头管理 可以很方便的为 http 请求添加请求头;

#### 断言

Jmeter 中有个元件叫做 Assertion, 它的作用和 loadrunner 中的检查点类似, 用于检查测试中得到的响应数据是否符合预期, 用以保证性能测试过程中的数据交互与预期一致;

使用断言的目的就是在 request 的返回层添加一层判断机制,  因为 request 成功了, 并不代表结果就一定是正确的, 所以通过断言, 我们不再被 200 所迷惑, 而是通过断言就可以看到请求是否成功;

添加: 右键线程组下的 http 请求 -- 添加 -- 断言 -- 响应断言;

添加后在 Applay to 面板选择 Main sample only(只针对当前请求);

完成之后还需要在线程组里面添加一个 断言结果;  右键线程组 -- 添加 -- 监听器 -- 断言结果; 

这个时候如果再一次发送 http 请求, 请求所返回的结果不符合预期, 就会提示报错信息;

#### Jmeter 自定义变量

添加: 右键线程组 -- 添加 -- 配置元件 -- 用户自定义的变量

作用: 如果有多个 http 请求, 需要修改参数的时候我们就需要每一个点开去修改参数, 自定义变量的好处就是将可变参数集中管理, 如果要修改, 只需要修改自定义变量的值就行;

例如: 请求日期查询的接口, 日期就可以作为一个变量, 使用的时候 `${variable}` 就可以了;


#### Jmeter 请求元件参数化 txt

上面的自定义变量可以看到变量的便利性, 但如果是 http 请求很多的情况下, 就有点不方便了; 下面就可以用到读取文件的方式来替换变量;

例如: 我们有一个登录接口, http://localhost:8080/api/login;

在发送登录请求的时候, 需要传递两个参数过去  username  password; 我们针对这个登录接口设计了 5 条用例

+ 1. 正常登录
+ 2. 正确的用户名和错误的密码
+ 3. 不输入用户名
+ 4. 不输入密码
+ 5. 输入错误的用户名

针对这 5 个用例我们首先考虑的做法是添加 5 条 http 请求, 但如果一个接口有几十条或者是更多用例添加多条 http 请求肯定是不现实的; 如果用到 txt 参数化, 只需要一个 http 请求就可以搞定;

首先我们将上面 5 个用例先用 txt 文本编辑好, 内容如下:

```txt
18088886666,123456
18088886666,8986466
,123456
18088886666,
18088886600,123456
```
> 注: 每一行代表一个请求的参数, 有多个参数中间用 `,` 隔开, 与下面的 CSV Data Set Config 里的变量名称对应

编辑好之后, 右键线程组 -- 添加 -- 配置元件 -- CSV Data Set Config

+ 文件名:           测试用例 txt 的文件地址;
+ 文件编码:         如果有中文编码就选择 utf-8;
+ 变量名称:         username,password (根据 .txt 文本来决定, 以 `,` 分割, 如果有多个变量就填多个变量名)
+ 忽略首行:         默认为 False, 该为 True 之后就不读取文件的首行内容;
+ 分隔符:           文件内容以 `,` 分隔, 还可以自定义符号;

添加好之后点击运行, 这个时候只会请求一次 http 接口, 如果需要循环文件内容, 连续请求多次接口, 完成用例, 只需要点击线程组 把线程属性里面的 循环次数修改为指定次数就可以;

#### Jmeter 请求元件参数化 csv

上面我们用 txt 来管理参数化的数据, 那么如果是不同的情况, 比如我们现在有一个注册的接口 http://localhost:8080/api/register; 发送请求的时候, 需要传递两个参数,  username  password;

注册的唯一要求是手机号不能重复, 这个时候如果是用 txt 去管理数据的话就不是很方便了, excel 格式更利于我们来对数据进行管理; 

只需要将 excel 格式存储为 `.csv` 格式, 就可以直接导入到 jmeter 中, 使用方法和 txt 一致, 不同的是, 表格的一列就是一个变量, 如果有多列, 可以填写多个变量; 例如:

<table>
    <tr>
        <td>13800000000</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000001</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000002</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000003</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000004</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000005</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000006</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000007</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000008</td>
        <td>1234567</td>
    </tr>
    <tr>
        <td>13800000009</td>
        <td>1234567</td>
    </tr>
</table>

那么在 Jmeter CSV 数据文件设置 的变量名称里面就可以写 `username,password`;


#### Jmeter 参数化函数助手 __CSVRead

CSVRead 利用函数从文件里面读取数据, 和读取 csv 方式一样, 点击工具栏上的   工具 -- 函数助手对话框 -- 在弹出的对话框里面选择 CSVRead;

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>用于获取值的CSV文件 | *别名</td>
            <td>‪D:\workspace\zy_test.csv</td>
        </tr>
        <tr>
            <td>CSV文件列号| next| *alias</td>
            <td>1</td>
        </tr>
    </tbody>
</table>

如上,  `用于获取值的CSV文件 | *别名 ` 列填写 csv 所在地址, `CSV文件列号| next| *alias` 填写 Excel 内的列索引, 这里需要注意的是列索引是从 0 开始, 并非 1;  例如 A 列, 就填写 0;

点击生成之后就可以得到变量 `${__CSVRead(‪D:\workspace\zy_test.csv,0)}`, 在 http 请求参数的地方就可以直接使用这个变量了, 但需要注意的是, 如果要遍历 Excel 表中的数据, 修改线程组里面的循环次数是没有用的, 需修改线程数;


#### Jmeter 参数化函数助手 

利用函数助手随机生成字符, 将随机字符作为参数变量; 点击工具栏上的  工具 -- 函数助手对话框 -- 在弹出的对话框中选择 RandomString;


<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Random string length</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Chars to use for random string generation</td>
            <td>abc123456789</td>
        </tr>
        <tr>
            <td>存储结果的变量名（可选）</td>
            <td>rd</td>
        </tr>
    </tbody>
</table>

`Random string length` 需要生成字符串的长度,  `Chars to use for random string generation` 源字符, 在这些字符里面随机取多上长度的字符; 

点击生成之后就可以得到变量 `${__RandomString(10,abc123456,rd)}`, 在 http 请求参数的地方就可以直接使用这个变量了;


#### Jmeter 正则表达式提取器

用于 http 后置处理, 在得到请求结果之后可以通过正则表达式将结果里面需要的内容提取出来; 

右键线程组 -- 添加 -- 后置处理器 -- 正则表达式提取器;

我们可以使用正则表达式对请求的各部分进行提取(信息主体、body、请求头、URL 等);

+ 引用名称: 自定义变量, 可以便于提取信息之后, 在后面的 http 请求中使用;
+ 正则表达式:   正则表达式, 例如 `<head>(.*)<\/head>` 用于提取网页中 head 内包含的内容;
+ 匹配数字: 0 代表随机匹配一个内容, 如果是 -1 那就表示匹配所有满足条件的内容;

添加完成之后, 这个时候发起 http 请求是不会看到任何效果, 如果想要查看正则表达式匹配的内容, 还需要添加一个查看结果树 和 Debug Sampler

右键线程组  添加 -- 监听器 -- 查看结果树,  右键线程组  添加 -- 取样器 -- Debug Sampler; 


#### Jmeter 请求元件 foreach 控制器

一般常用于对正则表达式提取的结果进行循环控制, 用正则表达式可以提取出很多个结果, 再使用 foreach 对结果进行遍历, 输出为变量, 后面的 http 请求可以使用 foreach 输出的变量;

添加: 右键线程组 -- 添加 -- 逻辑控制器 -- ForEach 控制器

+ 输入变量前缀: 这个就是由正则表达式提取出来的变量名;
+ 开始循环字段: 循环索引的起始位置;
+ 结束循环字段: 需要循环多少次;
+ 输出变量名:  将循环出来的结果作为变量, 提供给后面的 http 请求使用; 

在 foreach 循环控制器里面可以添加 http 请求, 如果满足循环条件就会执行循环, 请求多次;


#### Jmeter 请求元件 Json Path 提取器

`$` 表示根节点, `.` 表示下一级节点, 例如 `{message:"请求成功",code:200,result:{avator:"",realname:"zhangsan"}}`, 就可以通过  `$.result.realname` 拿到 json 数据里面的 `realname` 字段;

Json Path 提取器用于对上一个请求的结果进行提取, 将提取的结果输出为变量交给下一个 http 请求使用;

添加: 右键http请求 -- 添加 -- 后置处理器 -- Json 提取器;

+ Names of created variables: 存储的变量名, 用于后续的 http 请求使用;
+ JSON Path expressions: json 表达式, 如上 `$.result.realname`;
+ Default Values: 如果没有匹配到的默认值;

#### Jmeter 请求之 Cookie 处理

在实际应用中, 网站里面除登录接口以外的其他接口, 往往都是需要携带 cookie 才能请求成功, 这个时候就可以使用 cookie 管理器;

添加: 右键线程组 -- 添加 -- 配置元件 -- HTTP Cookie 管理器;

这种方式有的时候如果 cookie 产生变化, 就会不起作用, 我们还可以通过另外一种方式: 先用正则表达式从信息头里面提取出 cookie, 再将提取出来的变量添加到 cookie 管理器中;


