### Unity 引擎

#### Unity 开发工具介绍

##### 面板
 1. Project 项目资源面板
 2. Hierarchy 层次面板
 3. Sence 场景面板
 4. Game 游戏面板
 5. Inspector 监视面板

##### 工具条
 1. 变换工具
 2. 变换切换
 3. 播放控件
 4. 试图

#### Unity 基础概念

##### 坐标
坐标: x轴红色 , y轴蓝色 , z轴蓝色

世界坐标: 整个场景的固定坐标, 不随物体旋转而改变

本地坐标：物体自身坐标, 随旋转而改变

##### 场景
场景 Scene: 一组关联的 `游戏对象` 的集合, 通常游戏中每个关卡就是一个场景, 用于展现当前关卡中的所有物体

##### 物体
游戏对象 GameObject: 运行时出现在场景中的物体, 是一种容器, 可以挂载组件

##### 组件
组件  Component: 是游戏对象的功能模块, 每一个组件都是一个类的实例

Transform 变换组件: 决定物体的位置, 旋转, 缩放比例

Mesh Filter 网格过滤器: 用于从资源中获取网格信息

Mesh Renderer 网格渲染器: 从网格过滤器中获取几何形状, 再根据变化组件定义的位置进行渲染

网格过滤器和网格渲染器联合使用, 使模型显示到屏幕上

包含关系： Project --> Scene --> GameObject --> Component

##### 材质 Material
材质: 物体的质地, 指色彩, 纹理, 光滑度, 透明度, 反射率, 发光等等. 实际上就是 Shader 的实例

Shader 着色器: 专门用来渲染 3D 图形技术, 可以使纹理以某种形式展现, 实际就是一段嵌入到渲染管线中的程序, 可以控制 GPU 运算图像效果的算法

Textrue 纹理: 附加到物体表面的贴图

纹理, 着色器, 与材质之间的关系:

![Material](/res/Material.png)

#### 摄像机
摄像机: 附加了摄像机 Camera 组件的游戏对象; 向玩家捕获和显示世界的设备; 场景中摄像机的数量不受限制

##### 摄像机组件
Transform 变换组件

Camera 摄像机: 向玩家捕获和显示世界

Flare Layer 耀斑层: 激活可显示光源耀斑

GUI Layer: 激活可渲染二位 GUI 元素

Audio Listener 音频监听器: 接收场景输入的音频源 Audio Source 并通过计算机的扬声器播放声音

##### 摄像机属性
Clear Flags 清除标识: 决定屏幕的空白部分如何处理

Skybox 天空盒: 空白部分显示天空盒图案

Solid Color 纯色: 空白部分显示的背景颜色

Depth Only 仅深度: 画中画效果时, 小画面摄像机选择该项可清除屏幕空白部分信息只保留物体颜色信息

Don't Clear 不清除: 不清除任何颜色或深度缓存

Background 背景: 所有元素绘制后, 没有天空盒的情况下, 剩余屏幕的颜色

Culling Mask 选择遮蔽层: 选择要照射层的 Layer, 摄像机视锥以内可视 or 不可视

Depth 层级: 场景中有多个摄像机的时候, 用于定义摄像机的层级(类似于 css 里面的 z-index)

###### 天空盒
围绕整个场景的包装器, 用于模拟天空的材质

天空盒材质种类: 6 Sided , Procedural , Cubemap

###### 使用天空盒
设置摄像机 Clear Flags 属性为 Skybox

方式一: 摄像机添加组件 Skybox

方式二: 光照窗口; Window --> Lighting --> Environment Lighting --> Skybox


#### 光照系统
Global Illumination 简称 GI , 即全局光照; 能够计算直接关, 间接光, 环境光以及反射光的光照系统; 通过 GI 算法可以使渲染出来的光照效果更加真实丰富;

##### 直接光照
从光源直接发出的光, 通过 Light 组件实现;

Type 类型: 灯光对象的当前类型

    - Directional Light 平行光: 平行发射光线, 可以照射场景中的所有物体, 用于模拟太阳光;

    - Point Light 点光源: 在灯光位置上向四周发射光线, 可以照射其范围内的所有对象, 用于模拟灯泡;

    - Spot Light 聚光灯: 在灯光位置上向圆锥区域内发射光线, 只有在这个区域内的物体才能受到光线照射, 用于模拟探照灯;

    - Area Light 区域光: 由一个面向一个方向发射的光线, 只照射该区域内物体, 仅烘焙时有效, 用在光线较为集中的区域;

Shadow Type 阴影类型: Hard 硬阴影, Soft 软阴影

    - Strength 硬度: 阴影的黑暗程度

    - Resolution 分辨率: 设置阴影的细节程度

    - Bias 偏移: 物体与阴影的偏移

通过 Mesh Renderer 组件 启用/禁用 阴影

    - Cast / Receive Shadows 当前物体是否投射 / 接收阴影

    - Off 不投射阴影; On 投射阴影; Two Sided 双面阴影; Shadows Only 隐藏物体只投射阴影;

阴影剔除: 设置显示阴影的距离(做游戏优化使用) Edit --> Project Settings --> Quality --> Shadows Disdance

##### 间接光照
物体表面在接受光照后反射出来的光

通过 Light 组件中 Bounce Intensity 反弹强度控制

可以通过 Scene 面板 Irradiance 模式查看间接光照

注意: 只有标记为 Lightmaping Static 的物体才能产生间接反弹光照

##### 环境光照
作用于场景内所有物体的光照, 通过 Environment Lighting 中 Ambient 控制

Ambient Source 环境光源

    - Skybox 通过天空盒颜色设置环境光照

    - Gradient 梯度颜色: Sky 天空颜色, Equator 地平线颜色, Ground 地面颜色

    - Ambient Color 纯色

Ambient Intensity 环境光强度

Ambient GI 环境光 GI 模式

    - Realtime 实时更新, 环境光源会改变选择此项

    - Backed 烘焙, 环境光源不会改变选择此项

##### 反射光照
根据天空盒或者是立方体贴图计算的作用于所有物体的反射效果, 通过 Environment Lighting 中 Reflection 控制

Reflection Source 放射源:

    - Skybox 天空盒: Resolution 分辨率, Compression 是否压缩

    - Custom 自定义: Cubemap 立方体贴图

Reflection Intensity 反射强度

Reflection Bounces 使用 Reflection Probe 后允许不同游戏对象间来回反弹的次数

##### 实时GI
Realtime GI 所谓 “实时” 是指在运行期间任意修改光源, 而所有的变化可以立即更新; 正是由于 Unity 5x 引入了行业领先的实时全局光照技术 Enlighten 系统, 才可以在运行时产生间接光照, 使场景更为真实, 丰富;

操作步骤:
 1. 游戏对象设置为 Lightmaping Static 
 2. 启用 Lighting 面板的 Precomputed Realtime GI 
 3. 点击 Build 按钮(如果勾选 Auto 编辑器会自动检测场景的改动修复光照效果)

##### 烘焙 Lightmap
当场景里面包含大量物体时, 实时光照和阴影对游戏性能有很大的影响, 使用烘焙技术, 可以将光线效果预渲染成贴图再作用到物体上模拟光照, 从而提高性能, 适用于在性能较低的设备上运行的程序;

##### 光源侦测
由于 LightMapping 只能作用于 Static 静态物体, 所以导致运动的物体与场景中的光线无法融合在一起, 显得非常的不真实, 而 Light Probes 组件可以通过 Probe 收集光影信息, 然后对运动物体临近的几个 Probe 进行插值运算, 最后将光照作用到物体之上;

操作步骤:
 1. 创建游戏对象 Light Probe Group
 2. 添加侦测小球 Add Probe
 3. 点击 Build 按钮 (如果选择 Auto 编辑器就会自动检测场景的改动修复光照效果)
 4. 勾选需要侦测的物体的 MeshRenderer 组件的 Use Light Probes 属性

#### 声音系统
Unity 支持的音频文件格式有 mp3, ogg, wav, aif, mod, it, s3m, xm

声音分为 2D, 3D 两类, 3D 声音: 有空间感, 近大远小; 2D 声音: 适合背景音乐;

在场景中产生声音主要依靠两个重要的组件:

    - Audio Listener 音频监听器: 接受场景中音频源 Audio Source 发出的声音, 通过计算机的扬声器播放声音;

    - Audio Source 音频源

### c# 语言基础

#### 数据类型

##### 整形(整数)

1个字节: 有符号 sbyte (-128 ~ 127) , 无符号 byte (0 ~ 255);

2个字节: 有符号 short (-32768 ~ 32767) , 无符号 ushort (0 ~ 65536);

4个字节: 有符号 int , 无符号 uint;

8个字节: 有符号 long , 无符号 ulong;

##### 浮点数(小数)

4个字节: 单精度浮点类型 float , 精度 7 位;

8个字节: 双精度浮点类型 double , 精度 15-16 位;

16个字节: 128 位数据类型 decimal , 精度 28-29 位, 适用于财务和货币计算;

注意事项: 

    1. 非整形变量赋值要加上后缀, 如果不加默认为 double;

    2. 浮点数计算会出现舍入误差: bool number = 1.0f - 0.9f == 0.1f;

    二进制无法精确表示 1/10 , 就像十进制无法精确表示 1/3 , 所以二进制表示十进制会有一些舍入误差, 对于精度要求较高的场合会导致代码的缺陷, 可以使用 decimal 代替;

##### 非数值类型

char 字符, 2 个字节, 存储单位字符, 使用单引号;

string 字符串, 存储文本, 使用双引号;

bool 真/假, 1 个字节, true / false;

##### 调试
排除错误的能力

1. 在可能出错的代码行添加断点;
2. 按 F5 键运行程序;
3. 按 F11 逐语句执行;
4. 按 shift + F5 结束调试;

##### 占位符
通常拼接字符串是用 ` + ` 来拼接, 但是这样的代码可读性不高, 并且容易出错; 可以使用 `string.Format()` api 来做字符串处理;
````csharp
string name = "张三";
string age = "26";

string person = string.Format("他的名字是:{0},他的年龄是:{1}", name, age);

Console.WriteLine(person);
Console.ReadLine();
````

##### 标准字符串格式化
````csharp
// 标准字符串格式化
Console.WriteLine("金额:{0:c}元", 100);

// 不足两位用 0 来填充
Console.WriteLine("{0:d2}", 5);         // 输出为 05
Console.WriteLine("{0:d2}", 15);        // 输出为 15

// 以指定精度显示四舍五入
Console.WriteLine("{0:f1}", 1.26);      // 输出为 1.3

// 以百分数显示
Console.WriteLine("{0:p}", 0.1);        // 输出为 10.00%
````

#### 数据类型转换

##### string 类型转数值类型
````csharp
string strNumber = "18";
int a = int.Parse(strNumber);           // 18
float b = float.Parse(strNumber);       // 18

Console.WriteLine(a);
Console.WriteLine(b);
````


##### 任意类型转 string 类型
````csharp
int number1 = 25;
float number2 = 18.2f;

Console.WriteLine(number1.ToString());  // 25
Console.WriteLine(number2.ToString());  // 18.2
````

###### 练习
练习: 让用户在控制台中输入 4 位整数, 计算每一位数相加的总和

例如: 1234  -->  1 + 2 + 3 + 4 = 10

方案1:从字符串中获取每一个字符

方案2:从整数中获取每一位
````csharp
#region  vs的功能, 用来折叠代码
// 方案1
Console.WriteLine("请输入需要计算的四位数字:");
string input = Console.ReadLine();

int num1 = int.Parse(input[0].ToString());
int num2 = int.Parse(input[1].ToString());
int num3 = int.Parse(input[2].ToString());
int num4 = int.Parse(input[3].ToString());

Console.WriteLine(num1 + num2 + num3 + num4);
Console.ReadLine();

#endregion
````
````csharp
// 方案2
Console.WriteLine("请输入需要计算的四位数字:");
string input = Console.ReadLine();
int num = int.Parse(input);

int num1 = num / 1000;
int num2 = (num / 100) % 10;
int num3 = (num / 10) % 10;
int num4 = num % 10;

Console.WriteLine(num1 + num2 + num3 + num4);
Console.ReadLine();
````

##### 隐式转换 、 显式转换
````csharp
// 隐式转换:自动转换 (由小范围到大范围)
byte b = 100;
int i = b;

// 显式转换:强制转换 (由大范围到小范围)
// 有可能发生精度丢失
int c = 100;
byte j = (byte)c;
````
byte 在内存中占用的位置是 8 位, 而 int 在内存中占用的是 4 个 8 位, byte 能表示的数值, 用 int 肯定能表示; int 能表示的数值, byte 不一定能表示;

> 注: 由多种类型的数值相加, 结果自动向较大的类型提升

#### 语句

##### 选择语句
`if... else`, `if... else if ... else`, `switch...case`; 这部分和 JavaScript 一致;

##### 循环语句
`while...`, `for...`; 和 JavaScript 一致;

````csharp
// 猜数字
// 程序产生一个 1-100 之内的随机数;
// 让玩家重复猜测, 直到猜对位置;
// "大了", "小了", "恭喜, 猜对了, 总共猜了 ? 次";

// 产生一个随机数工具
Random random = new Random();
//产生一个随机数 1-100 之间;
int number = random.Next(1, 101);

int count = 0;
int inpNumber;
do
{
    count++;
    Console.WriteLine("请输入一个数字:");
    inpNumber = int.Parse(Console.ReadLine());

    if(inpNumber > number)
    {
        Console.WriteLine("大了~");
    }
    else if (inpNumber < number)
    {
        Console.WriteLine("小了~");
    }
    else
    {
        Console.WriteLine("猜对了~,您总共猜了{0}次", count);
    }

} while (number != inpNumber);
````

#### 方法
各种语言都有方法的概念, 有的语言称其为函数或者是过程;

方法就是对一系列语句的命名, 表示一个功能或者是行为, 如: Start, Update ...;

使用方法可以提高代码的可重用性和可维护性;

##### 语法
定义方法: 
````csharp
//  [访问修饰符] [可选修饰符] [返回值类型] [方法名称](参数列表) { 
        // 方法体;
        //return 结果;
//  }
// 例如:
private static void Fun(string arg1,float arg2)
{
    //...
    return;
}
````

