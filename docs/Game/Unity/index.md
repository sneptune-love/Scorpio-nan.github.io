### Unity 引擎

#### Unity 开发工具介绍

- [详见Unity教程](https://www.bilibili.com/video/BV12s411g7gU?p=64);
- [unity进阶](https://www.bilibili.com/video/bv1K7411Z77R/);
- [Unity脚本进阶](https://www.bilibili.com/video/bv1S4411C72d/);

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

本地坐标: 物体自身坐标, 随旋转而改变

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

包含关系:  Project --> Scene --> GameObject --> Component

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

// 练习详见 (./res/day01.cs)
````

##### 函数重载
定义: 方法名称相同, 参数别列表不同;

作用: 在不同条件下, 解决同一类问题, 让调用者仅仅只记录一个方法;

````csharp
// 例如 Console.WriteLine()

// 练习
// 1. 根据分钟数计算总秒数
// 2. 根据分钟数,小时数,计算总秒数
// 3. 根据分钟数,小时数,天数,计算总秒数

// 根据分钟获取秒数
private static int GetTotalSecond(int minute)
{
    return minute * 60;
}

// 根据分钟,小时获取秒数
private static int GetTotalSecond(int hour,int minute)
{
    return GetTotalSecond(hour * 60 + minute);
}

// 根据分钟数,小时数,天数,计算总秒数
private static int GetTotalSecond(int day,int hour, int minute)
{
    return GetTotalSecond( hour + day * 24, minute);
}
````

##### 递归
方法内部调用自身的过程;

核心思想: 将问题转移给范围缩小的子问题;

适用性: 在解决问题的过程中, 又遇到相同的问题;

优势: 将特别复杂的问题简单化;

注意: 递归性能比较差, 能不用递归解决的问题, 尽量都不用递归;  容易堆栈溢出;

````csharp
// 编写一个函数计算当参数为 8 时的结果是多少;
// 规律: 1 - 2 + 3 - 4 + 5....

private static int GetRecursion(int num)
{
    if (num == 1) return num;
    return num % 2 == 0 ? GetRecursion(num - 1) - num : GetRecursion(num - 1) + num;
}
````
#### 数组
从 Array 类派生的, 一种数据类型相同的变量组合; 一种空间连续的数据结构; 元素通过索引进行操作;

数组声明:
````csharp
// 初始化  new  数组类型[容量]
int[] a = new int[6];

// 练习:
// 让用户在控制台中输入学生总数, 再输入每一个学生的成绩;
private static float[] GetScoreArray()
{
    Console.WriteLine("请输入学生总数:");
    int count = int.Parse(Console.ReadLine());
    float[] array = new float[count];

    for(int i = 0; i < count;)
    {
        Console.WriteLine("请输入第{0}个学生的成绩:",i + 1);
        float score = float.Parse( Console.ReadLine());
        if(score >= 0 && score <= 100)
        {
            array[i++] = score;
        }
        else
        {
            Console.WriteLine("成绩输入有误~");
        }
    }
    return array;
}

Console.WriteLine(new int[] { 10, 5, 6, 30, 600 });
// 600;
````
数组的其他写法:
````csharp
string[] str = new string[2]{"a","b"};

bool[] arr2 = {true, false, true};

// 练习详见 (./res/day02.cs)
````

##### foreach 遍历数组
`foreach` 从头到尾依次读取数组元素;

语法:
````csharp
/*
    foreach(元素类型  变量名  in  数组名称 ){
        // 
    }
*/

int[] arr = new int[]{1,2,3,48,8,6,4};

foreach(int item in arr){
    Console.WriteLine(item);
}

````
##### 数组常用方法

- 数组长度: 数组名.Lenght;
- 清除数组元素: Array.Clear;
- 复制元素: Array.Copy      数组名.CopyTo
- 克隆: 数组名.Clone
- 查找元素: Array.IndexOf   Array.LastIndexOf
- 排序: Array.Sort
- 反转: Array.Reverse

````csharp
//exp

int[] arr = new int[]{1,5,4,6,7,98,200};
int index = Array.IndexOf(arr,5);

// 1
// 练习详见 (./res/day05.cs);
````

##### 二维数组
创建 二维数组:
````csharp
// 数据类型[,]  数组名  =  new  数据类型[行数,列数];
string[,] array = new string[3,2];

// 数据类型[,]  数组名  =  new  数据类型[,]{{元素1,元素2},{元素1,元素2}};
int[,] array = new int[]{{2,3},{7,9}};
````

````csharp
//exp

// 创建一个 5 行 3 列的数组

int[,] array = new int[5,3];

// array.Lenght    ==>  15

// array[1,3] = 6;    将 6 赋值给数组的第 2 行第 4 列;
````
##### 二维数组的遍历

````csharp
int[,] array = new int[5,3];

for(int i = 0; i < array.GetLenght(0); i++){
    for(int j = 0; j < array.GetLenght(1); j++){
        //code
    }
}

//  array.GetLenght(0) 获取二维数组的行/列数;
````

##### 交错数组
定义: 不规则的数组; 交错数组里面的元素都是一维数组;
````csharp
int[][] array = new int[4][];

// 创建一组数组赋值给交错数组
array[0] = new int[3];
array[1] = new int[5];

//交错数组赋值
array[0][2] = 10;
````

##### 参数数组
定义: 允许为函数指定一个也只能是一个特殊参数, 该参数必须是函数中的最后一个参数, 称为参数数组.

对于方法内部而言, 就是一个普通数组; 对于方法外部(调用者), 可以传递数组, 也可以传递一组数据类型相同的变量集合;

````csharp
private static void Main()
{
    // 计算1+2+3+...+8+9+10的和
    var sum = GetSum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
}
/// <summary>
/// 计算一组数字的和
/// </summary>
/// <param name="numbers"></param>
/// <returns></returns>

private static int GetSum(params int[] numbers)
{
    return numbers.Sum();
}

// params 关键字, 允许传递进来的参数是一个  new object[]{}  的数组; 
````

#### 数据类型
数据类型分类:
- 值类型;
- 引用类型;

![data-valubel](/res/data-valubel.png)

值参数: 按值传递, 传递实参变量存储的内容;

引用参数: 按引用传递, 传递实参变量自身的内存地址;

输出参数: 按引用传递, 传递实参变量自身的内存地址;
````csharp
static void Main(string[] args){
    int a1 = 10
    Fun1(a1,new int[]{1,2,5,4});

    int a2 = 1;
    Fun2(ref a2);

    int a3 = 3;
    Fun3(out a3);
}

private static void Fun1(int a, int[] arr){
    //code
}

// ref 关键字将实参自身的内存地址传递给函数, 可以直接修改实参变量内存地址中的值;
private static void Fun2(ref int a){
    //code
}

// out 关键字将实参自身的内存地址传递给函数,
// 与 ref 的区别是方法内部必须对传递进来的值进行修改;
// 输出参数传递之前可以不用进行初始化赋值;
private static void Fun3(out int a){
    //code
}

````
##### 装箱 box
值类型隐式转换为 object 类型或由此值类型实现的任何接口类型的过程;

内部机制:
- 1. 在堆中开辟内存空间;
- 2. 将值类型的数据复制到堆中;
- 3. 返回堆中新分配对象的地址;

````csharp
static void Main(){
    int a = 1;
    
    // 装箱操作;
    object o = a;

    // 拆箱操作;
    int b = (int)o;
}
````

##### 拆箱 unbox
从 object 类型到值类型或者是从接口类型到实现该接口的值类型的显式转换;

内部机制:
- 1. 判断给定类型是否是装箱时的类型;
- 2. 返回已装箱实例中属于原值类型字段的地址;

##### string 字符串类
> 1.字符串常量具备字符串池的特性;

字符串常量在创建之前, 首先在字符串池中查找是否存在相同文本, 如果存在, 则直接返回该对象的引用; 如果不存在, 则开辟空间存储; 目的是提高内存利用率;

> 2.字符串具有不可变性;

字符串常量一旦进入内存, 就不得再次改变. 因为如果在原位置改变会使其他对象的内存被破坏, 导致内存泄漏. 当遇到字符串变量引用新值时, 会在内存中新建一个字符串, 将该字符串的地址交由该变量引用;

````csharp
static void Main(string[] args)
{
    string s1 = "哈哈";
    string s2 = "哈哈";

    // 判断两个字符串的引用是不是同一个;
    bool r1 = object.ReferenceEquals(s1, s2);       //true


    string s3 = new string(new char[] { '哈', '哈' });
    string s4 = new string(new char[] { '哈', '哈' });

    bool r2 = object.ReferenceEquals(s3, s4);       //false
    
}
````
字符串的不可变性, 会导致一些问题的产生, 如果有一个需求需要循环去拼接字符串, 那么这个时候就会产生许多内存消耗, GC 会做大量的回收工作; 例如:

````csharp
string str = "";
for(int i = 0; i < 10; i++){
    // 每一次拼接都会产生一个新的对象, 替换原有对象的引用;
    str += i.ToString();
}
````
这个时候我们就可以使用 `StringBuilder` api 来做字符串拼接了; (通常在游戏开发中会用到的比较多);

优点: 可以在原有的空间上进行修改, 避免产生垃圾;

适用场景: 频繁对字符串进行操作的时候可以使用(增加, 替换, 移除);
````csharp
// 可变字符串  参数可以指定 可变字符串的长度;
StringBuilder str = new StringBuilder(10);

for(int i = 0; i < 10; i++)
{
    str.Append(i);
}

string result = str.ToString();
````

#### 枚举
在项目目录上右键 --> 新建 --> 类; 将新建好的类里面的 class 关键字替换成  enum;

##### 简单枚举
列举某种数据的所有值; [枚举](https://www.bilibili.com/video/BV12s411g7gU?p=91)

作用: 增强代码的可读性, 限定取值;

语法: enum 名字 {值1, 值2, 值3};

枚举元素默认为 int 类型, 准许枚举使用的类型有: byte , sbyte , short , ushrot , int , uint , long 或 ulong;

每个枚举的元素都是有枚举值的, 默认情况下, 第一个枚举的值为 0 , 后面每个枚举的值依次递增, 可以修改值, 后面枚举数的值依次递增;

````csharp
namespace MoveDerection
{
    /// <summary>
    /// 定义枚举类型:移动方向
    /// </summary>
    enum MoveDerection
    {
        Up = 0,
        Down = 1,
        Left = 2,
        Right = 3
    }
}
````
或者是添加类型的枚举:
````csharp
namespace MoveDerection
{
    /// <summary>
    /// 定义枚举类型:移动方向
    /// </summary>
    enum MoveDerection:long
    {
        Up = 0,
        Down = 1,
        Left = 2,
        Right = 3
    }
}
// 资源详见  (./res/day09.cs   ./res/day09-enum-MoveDerection.cs   ./res/day09-enum-PersonStyle.cs)
````

#### 类和对象
面向对象: 一种软件开发思想, 指程序员如何分析, 解决问题;

类是一个抽象的概念, 即可以理解为生活中的类别;

对象是具体实例, 即归属于某个类别的个体;

例如: 学生, 是一个类, 表示一种类型, 那么 张同学, 则是一个对象, 是学生类的实例;

名词类型的共性, 作为数据成员;

动词类型的共性, 作为方法成员;

##### 创建类
语法:
````csharp
//  访问级别   class  类名{
        //  类成员
//  }
````
通常, 每个类都在一个独立的 c# (.cs) 源文件中;

创建一个新的类, 意味着在当前项目里面产生了一种新的数据类型;

````csharp
// 定义一个 Person 类
class Person
{
    //成员变量
    private string name;
    private string sex;
    private int age;

    public void SetName(string name)
    {
        this.name = name;
    }

    public string GetName()
    {
        return this.name;
    }

    public void SetAge(int age)
    {
        this.age = age;
    }

    public int GetAge()
    {
        return this.age;
    }
}

// 实例化 Person 类
Person p1 = new Person();
p1.SetName("张三");
Console.WriteLine(p1.name);         // 张三
````

##### 成员变量
定义在类中, 方法外的变量;

特点:
- 具有默认值;
- 所在类被实例化后, 存在堆内存中, 对象被回收时, 成员变量从堆中清除;
- 可以与局部变量重名;

成员变量默认的访问级别是  `private`;

##### 访问修饰符
C# 中常用的有
- private: 私有访问是允许的最低访问级别, 私有成员只有在声明它们的类和结构中才可以访问.
- public: 公共访问是允许的最高访问级别, 对访问公共成员没有限制.
- protected: 受保护成员在它的类中可以访问并且可有派生类访问.
- internal: 只有在同一程序集的文件中, 内部类型或成员才可访问.

##### 属性
对字段起保护作用, 可实现只读, 只写的功能;

本质就是对字段的读取与写入的方法;

语法:
````csharp
//   [访问修饰符]  数据类型  属性名{
//       get{
//           return 字段;
//       }
//       set{
//           字段 = value;
//       }
//   }

// exp  改写上面 Person 类

class Person
{
    //成员变量
    private string name;
    private string sex;
    private int age;

    public string Name{
        get{
            return this.name;
        }
        set{
            this.name = value;
        }
    }

    public int Age{
        get{
            return this.age;
        }
        set{
            this.age = value;
        }
    }
}
Person p1 = new Person();
p1.Name = "张三";
Console.WriteLine(p1.name);         // 张三
````
通常一个共有属性和一个私有字段对应; 属性只是外壳, 实际上是对私有字段进行操作;

##### 构造函数
提供了创建对象的方式, 通常用于初始化类的成员;

一个类若没有构造函数, 那么编译器就会提供一个无参数的构造函数;

特点: 没有返回值 ;  与类名相同; 

> 如果不希望在类的外部被创建对象, 就可以将构造函数私有化 (常用于设计模式里面的--单例模式);

````csharp
class Person
{
    //成员变量
    private string name;
    private string sex;
    private int age;

    // Person 类的构造函数
    public Person(string name, int age){
        this.name = name;
        this.age = age;
    }

    public string Name{
        get{
            return this.name;
        }
        set{
            this.name = value;
        }
    }

    public int Age{
        get{
            return this.age;
        }
        set{
            this.age = value;
        }
    }
}
Person p1 = new Person("张三",20);
````
c# 3.0 以后提供一个自动属性, 包含一个字段和两个方法; 如下: 
````csharp
class Person{
    public string Name{get; set;}
    public int Age{get;set;}

    // 空的构造函数放在这里是为了 允许不添加参数创建对象;
    public Person(){}
    public Person(string name, int age){
        this.Name = name;
        this.Age = age;
    }
}
````
##### 总结
类的结构:
````
[访问级别]   class  类名 {
    字段: 存储数据
    属性: 保护字段
    构造方法: 提供创建对象的方式, 初始化类的成员
    方法: 向类的外部提供某种功能
}
````

#### c# 泛型集合

##### 动态数组
使用数组的两个小问题;
- 1. 数组初始化必须指定大小;
- 2. 读写元素必须通过索引;

泛型集合就是为了解决数组长度不固定的时候用来替代数组的类型;

语法:
````csharp 
// [动态数组](https://www.runoob.com/csharp/csharp-arraylist.html)
// List<数据类型> 变量名 = new List<数据类型>(List长度)

List<User> listUser = new List<User>(3);

// exp 详见   (./res/day11.cs) 
````

#### c# 字典集合

语法:
````csharp

Dictionary<string, User> dic = new Dictionary<string, User>();

dic.Add("nxy", new User("zhangsan", "abc132"));
User user = dic["nxy"];

// exp 详见   (./res/day11.cs) 
````

#### 继承
继承是面向对象程序设计中最重要的概念之一. 继承允许我们根据一个类来定义另一个类, 这使得创建和维护应用程序变得更容易. 同时也有利于重用代码和节省开发时间. 

语法:
````csharp
//   <访问修饰符符> class <基类>
//   {
//    // code
//   }
//   class <派生类> : <基类>
//   {
//    // code
//   }

//exp
class Person{
    public string Name{get;set;}
}

//  学生类继承自人
class Student:Person{
    public int Score{get;set;}
}

Student stu = new Student();
stu.Name = "张三";
````

##### Static

- 1. 静态的成员变量

[Static 关键字](https://www.bilibili.com/video/BV12s411g7gU?p=104)

使用 Static 关键字修饰的成员变量; 

静态成员变量属于类, 类被加载时初始化, 且只有一份;

实例成员变量属于对象, 在每个对象被创建时初始化, 每个对象一份; 

特点: 存在优先于对象, 被所有对象所共享, 常驻内存, 并且只能通过类名调用;

- 2. 静态构造函数

初始化类的静态数据成员;

仅在类被加载时执行一次;

不允许使用访问修饰符;

作用: 初始化类的静态数据成员;

- 3. 静态类

不能使用 Static 关键字修饰的类;

不能实例化, 只能包含静态成员;

静态类不能被继承, 但是静态方法和属性都可以被继承;

适用性:
- 利: 单独空间存储, 所有对象共享, 可以直接被类名调用;
- 弊: 静态方法只能访问静态成员, 共享数据被多个对象访问会出现并发;

适用场合:
- 所有对象需要共享的数据;
- 在没有对象前就要访问的成员;
- 工具类适合做静态类(常用, 不需要过多数据);


#### 结构

结构 struct 定义: 用于封装小型相关变量的值类型, 与类语法相似, 都可以包含数据成员和方法成员, 但结构属于值类型, 类属于引用类型;

使用性: 表示点、颜色等轻量级对象. 如: 创建存储 1000 个点的数组, 如果使用类, 将为每个对象分配更多的内存, 使用结构可以节约资源;



### Unity 脚本

#### Unity 脚本生命周期
`public` 修饰符是将脚本里面定义的变量暴露给编辑器; 而如果使用 `private` 关键字就不会在编辑器里面显示;  有点类似于 `cocosCreator` 的 `@property`;

如果我们需求是希望变量是私有的, 并且希望将变量暴露给编辑器, 就可以使用 `SerializeField` 关键字去修饰变量;

````csharp
//  在编辑器中暴露私有变量
[SerializeField]
private int a = 100;

//  在编辑器中隐藏共有变量
[HideInInspector]
public string name = "";

//  只能设置 0 - 100 之间范围内的数值
[Range(0, 100)]
[SerializeField]
private int number;
````
###### Awake 唤醒
当物体载入时立即调用 1 次, 常用于在游戏开始时初始化, 可以判断当满足某种条件执行此脚本 this.enable = true;

###### OnEnable 当可用
每次当脚本对象启用时调用;

###### Start 开始
物体载入, 且脚本对象启用时被调用 1 次, 常用于数据或游戏逻辑初始化, 执行时机晚于 Awake;

###### FiexdUpdate 固定更新
脚本启用之后, 固定时间被调用, 适用于对游戏对象做物理操作, 例如移动等等; 

设置更新频率: Edit --> Project Setting --> Time --> Fixed Timestep 值, 默认为 0.02s;

###### OnCollisionXXX 碰撞
当满足碰撞条件时调用;

###### OnTriggerXXX 触发
当满足触发条件时调用;

###### Update 更新
脚本启用后, 每次渲染场景时调用, 频率与设备性能及渲染量有关;

###### LateUpdate 延迟更新
在 Update 函数被调用后执行, 适用于跟随逻辑;

###### OnMouseXXX 输入事件
- OnMouseEnter  :  鼠标移入时触发
- OnMouseOver   :  鼠标经过时触发
- OnMouseExit   :  鼠标离开时触发
- OnMouseDown   :  鼠标按下时触发
- OnMouseUp     :  鼠标抬起时触发

###### 场景渲染
- OnBecameVisible   :  当 Mesh Renderer 在任何相机上可见时调用;
- OnBecameInvisible :  当 Mesh Renderer 在任何相机上不可见时调用;

###### 结束阶段
- OnDisable             :  当对象变为不可用或附属游戏对象非激活状态时此函数被调用
- OnDestroy             :  当脚本销毁或附属游戏对象销毁时调用
- OnApplicationQuit     :  当应用程序退出时调用

#### 调试
将程序投入到实际运行中, 通过开发工具进行测试, 修正逻辑错误的过程;

##### 使用 Unity 编辑器
1. 控制台调试:
````csharp
Debug.Log(变量);

print(变量);
````
2. 定义共有变量, 程序运行之后在监测面板看数据;

##### 使用 vs (用来调试复杂业务逻辑)
安装 vstu 工具, 在 Unity 项目面板中导入 tools;  [vs调试](https://www.bilibili.com/video/BV12s411g7gU?p=119)

调试步骤:
- 在可能出错的行添加断点;
- 启动调试;
- 在 Unity 中 Play 场景;

##### GUI调试
在 Unity 中添加 UI 界面, 用代码调试; GUI 会在Unity 界面中添加按钮图形;
````csharp
private void OnGUI()
{
    if (GUILayout.Button("按钮"))
    {
        // 调试代码
        print("OK");
    }
}
````

#### Unity 常用 API
Unity核心类:
![Unity核心类](/res/Core-Class.png)


##### Component

所有附件到游戏对象的基类, 我们的代码将永远不会直接创建一个组件. 而是, 写脚本代码, 附加脚本到一个游戏对象上;

````csharp
//  exp  获取所有组件
private void OnGUI()
{
    if (GUILayout.Button("按钮"))
    {
        print("OK");
    }

    if (GUILayout.Button("所有组件~"))
    {
        Component[] comps = this.GetComponents<Component>();

        foreach (var item in comps)
        {
            Debug.Log(item.GetType());
        }
    }
}

//      GetComponent                    获取当前对象上面的某一个组件
//      GetComponents                   获取当前对象上面的所有组件
//      GetComponentInChildren          从自身开始向下查找所有的子组件
//      GetComponentInParent            从自身开始向上查找所有的父组件


//  exp 

//  获取当前组件下面的 transform 子组件, 只查找一层;
private void OnGUI()
{
    if (GUILayout.Button("所有子组件~"))
    {
        foreach (Transform item in this.transform)
        {
            Debug.Log(item.name);
        }
    }
}

//  查找物体
this.transform.Find("");
````

##### gameObject
游戏对象, Unity场景里面所有实体的基类.

````csharp
//  在场景中物体的激活状态(物体实际的激活状态)
//  this.gameObject.activeInHierarchy

//  物体自身的激活状态(物体在 Inspector 面板中的状态) 
//  this.gameObject.activeSelf

//  设置物体禁用或者启用
//  this.gameObject.SetActive(true);

//  创建物体
GameObject lightGo = new GameObject();
//  添加组件
Light light = lightGo.AddComponent<Light>();

//  在场景中根据名称查找物体
GameObject.Find("");

//  根据标签名查找物体(所有)
GameObject[] allEnemy = GameObject.FindGameObjectsWithTag("allEnemy");
//  根据标签名查找物体(单个)
GameObject Player = GameObject.FindWithTag("Player");

//  查找挂载 Enemy 脚本的所有对象
Enemy[] Enemys = Object.FindObjectsOfType<Enemy>();

````

***TransformHelper***
````csharp
public class TransformHelper 
{
    /// <summary>
    /// 在层级未知的情况下查找物体
    /// 变换组件类助手, 用于递归查找组件下面指定名称的子组件
    /// </summary>
    /// <param name="trs">父物体变换组件</param>
    /// <param name="childName">需要查找的子对象名称</param>
    /// <returns></returns>
    public static Transform GetChild(Transform parentTF,string childName)
    {
        Transform childTF = parentTF.Find(childName);
        if (childTF != null) return childTF;

        int count = parentTF.childCount;
        for(int i = 0; i < count; i++)
        {
            childTF = GetChild(parentTF.GetChild(i), childName);
            if(childTF != null)
            {
                return childTF;
            }
        }
        return null;
    }
}
//  Transform tras = TransformHelper.GetChild(this.transform,"bult");
````
##### Time
从 Unity 获取时间信息的接口;

常用属性:
- time : 从游戏开始到现在的时间;
- timeScale : 时间缩放;
- deltaTime : 以秒为单位, 表示每帧的经过时间;
- unscaledDeltaTime : 不受缩放影响的每帧经过时间;

````csharp
private void Update()
{
    //  旋转速度 *  每帧消耗的时间 ; 可以保证旋转/缩放等动画速度不受机器性能的影响
    this.transform.Rotate(0, 1 * Time.deltaTime, 0);
}

//  timeScale 作用缩放时间, 常用于暂停/继续游戏;
private void OnGUI()
{
    if (GUILayout.Button("暂停游戏~"))
    {
        Time.timeScale = 0;
    }
    if (GUILayout.Button("继续游戏~"))
    {
        Time.timeScale = 1;
    }
}

//  重复调用(被执行的方法名称, 第一次调用时间, 每次执行间隔);   类似 JavaScript 里面的 setInterval
InvokeRepeating("Timer", 1, 1);

//  取消重复调用
CancelInvoke();
````

#### 预制体 Prefab
一种资源类型, 可以多次在场景中进行实例;

优点: 对预制体的修改, 可以同步到所有实例, 从而提高开发效率;

如果单独修改实例的属性值, 则该值不再随预制体变化;

Select键: 通过预制体实例选择对应的预制体;

Revert键: 放弃实例属性值, 还原成预制体原有属性值;

Apply键: 将某一个实例的修改应用到所有实例;

预制体的制作: 从 Hierarchy 面板中将游戏物体拖拽到  Project 面板中就生成了一个预制体;


#### 动画
> [Animation 动画](https://www.bilibili.com/video/BV12s411g7gU?p=135);

1. Animation View 

通过动画视图可以直接创建和修改动画片段(Animation Clips); 显示动画视图, Window - Animation

2. 创建动画片段

为物体添加 Animation 组件; 在动画视图中创建片段;

3. 时间轴

![animate-timeline](/res/animate-timeline.png)

可以单击时间线上的任何位置预览或者修改动画片段;

数字显示为秒数和帧数; 例如: 1:30  表示 1 秒和 30帧;

可以使用按钮跳转到下一个关键帧或者上一个关键帧, 也可以输入指定帧数直接跳到该帧;


#### Input
input 包装了输入功能的类, 可以读取输入管理器中设置的按键; 以及访问移动设备的多点触控或加速感应数据; 建议在 Update 中监测用户的输入行为;

##### 鼠标输入
当指定的鼠标按钮被按下时返回  true;
````csharp
// 0 鼠标左键   1 鼠标右键   2 鼠标中键
bool result = Input.GetMouseButton(0);
````

在用户按下指定鼠标键的第一帧返回 true;
````csharp
// 0 鼠标左键   1 鼠标右键   2 鼠标中键
bool result = Input.GetMouseButtonDown(0);
````

在用户释放指定鼠标按键的第一帧返回 true;
````csharp
// 0 鼠标左键   1 鼠标右键   2 鼠标中键
bool result = Input.GetMouseButtonUp(0);
````
##### 键盘输入
当通过名称指定的按键被用户按住时返回 true;
````csharp
bool res = Input.GetKey(KeyCode.A);
````

当用户按下指定名称按键时的那一帧返回 true;
````csharp
bool res = Input.GetKeyDown(KeyCode.A);
````

在用户释放给定名称按键的那一帧返回 true;
````csharp
bool res = Input.GetKeyUp(KeyCode.A);
````

````csharp
//  exp  按下 C 键的同时按下 D 键
void Update()
{
    if(Input.GetKey(KeyCode.C) && Input.GetKeyDown(KeyCode.D))
    {
        //  code;
    }
}
````

##### InputManager
即输入管理器;  Edit -->  Project Setting  -->  Input

使用脚本通过虚拟轴名称获取自定义键的输入;

玩家可以在游戏启动时根据个人喜好对虚拟轴进行修改;

获取虚拟轴:
````csharp
//  Input.GetButton("虚拟轴名称")
bool result = Input.GetButton("Vertical");
bool result = Input.GetButtonDown("Horizontal");
bool result = Input.GetButtonUp("虚拟轴名称");
```` 
上面的方法, 只能判断用户所绑定的虚拟按键有没有被按下, 无法知道用户按下的是哪个按键; 如果想要知道用户具体按下的是哪个按键可以使用:

````csharp
//  Input.GetAxis("虚拟轴名称");
float a = Input.GetAxis("Horizontal");
float b = Input.GetAxisRaw("Vertical");

//  Horizontal  默认绑定的是  a  ←       d  → 
//  Vertical    默认绑定的是  w  ↑       s  ↓ 
//  返回值  0 代表按下; 1 代表正向按钮; -1 代表负向按钮 
````

````csharp
void Update()
{
    /*
    * 需求: 做人物在3d 场景内的鼠标滚动操作;
    * 类似第一视角类游戏的场景旋转
    **/

    //鼠标左右移动
    float x = Input.GetAxis("Mouse X");
    float y = Input.GetAxis("Mouse Y");


    //Y 轴旋转;
    this.transform.Rotate(-y, 0, 0);
    //左右旋转需要延世界坐标旋转
    this.transform.Rotate(0, x, 0, Space.World);
}

//  (./res/InputManager.cs)
````


#### 三维数学 Vector3

````csharp
//  Mathf.Lerp(起点, 终点, 比例) (./res/InputDemo.cs);
float num = Mathf.Lerp(20, 60, 0.1f);

//  Mathf.Abs(小数) 取小数的绝对值
int num = Mathf.Abs(0.154624f);
````

##### 向量
定义: 一个数字列表, 表示各个维度上的有向位移; 一个有大小有方向的物理量; 大小就是方向的模长, 方向描述了空间中向量的指向; 可以表示物体的位置和方向;

向量的大小(模):  













