### Sass 语法

#### 嵌套

```scss
// 层级嵌套, id 或 class 类名
#main{
    width: 100%;
    .container{
        font-size: 16px;
    }
    button{
        padding: 4px 6px;
        &:after{
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }
}

// 属性嵌套   font-family, font-size, font-weight; 三个属性的缩写 
.container{
    font:{
        family: fantasy;
        size: 30em;
        weight: bold;
    }
}
```

#### 数据类型

```scss
/*
 * 1. 数字类型
 */
1, 2, 15, 20px

/*
 * 2. 字符串
 */
"fff", 'ccc', ddd

/*
 * 3. 颜色值
 */
blue, #efefed, rgba(0,0,0,0.6)

/*
 * 4. 布尔类型
 */
true, false

/*
 * 5. 空值
 */
null

/*
 * 6. 数组, 逗号隔开
 */
table-layout,table-layout-row, table-layout-col, table-layout-item 

/*
 * 7. 对象, map 类型  key:value
 */
(
    key1: value1,
    key2: value2,
    key3: value3
)
```

#### 运算符
`sass` 支持对数字的加减乘除运算; 

```scss
$w: 20px;
$h: 10px;

p{
    font-size: $w / 2;
    height: round($h) * 2;
    padding: 5px + $h / 2;
}
```


#### 插值语句(拼接字符)

```scss
#{ };
```

#### 循环控制

```scss
// each 循环
$array:(a,b,c,d);

@each $i in $array{
    .#{$i}{
        color:#ccc;
    }
}

// for 循环, 不依赖数组
@for $i from 1 through 5 {
    .item-#{$i} { 
        width: 2em * $i; 
    }
}

// while 循环
$i: 5;
@while $i > 0 {
    .item-#{$i} { 
        width: 2em * $i; 
    }
    $i:$i - 1; 
}

```

#### 函数
和 JavaScript 里面的函数功能一样, 通常用来处理某一类事情的; 例如: 页面兼容

```scss
@function v($px){
    @if $px == 0{
        @return 0;
    }
    @return $px / 1334 * 100vw;
}

@function h($px){
    @if $px == 0{
        @return 0;
    }
    @return $px / 750 * 100vh;
}

.container{
    width: v(520);
    height: h(340);
}
```

#### 混合指令
通常用于定义可重复的样式, 避免了无异议的 `class` 名;

```scss
@mixin clearfix {
    display: inline-block;
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    * html & { height: 1px }
}

.list{
    @include clearfix;
    padding: 4px 0;
}

// 带参数的mixin
@mixin box-shadow($shadows...){
    -moz-box-shadow: $shadows;
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
}

.shadows{
    @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

#### extend 继承

```scss
.clearfix {
    display: inline-block;
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    * html & { height: 1px }
}

.container{
    padding: 5px 8px;
    @extend .clearfix;
}
```


