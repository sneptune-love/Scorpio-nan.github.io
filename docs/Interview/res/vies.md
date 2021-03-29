#### 最小公倍数

```js
function getBeishu(a,b){
    var c = a* b;
    for(var i = 1; i <= c; i++){
        if(i % a == 0 && i % b == 0){
            return i;
        }
    }
    return false;
}
```

#### 立方根

```js

```



### 数据结构与算法

+ 栈结构        是一种特殊的列表, 栈里面的元素只能通过列表的一端访问, 先进先出

+ 队列          是一种特殊的列表, 不同的是队列只能在队尾插入元素, 在队首删除元素, 先进先出

+ 链表          在许多的编程语言中数组的长度是固定的, 如果数据被放满, 再插入数据就比较麻烦了, 添加和删除元素都需要将数组中的其他元素前移或者是后移; 链表是由一组节点组成的集合, 每个节点都使用一个对象的引用指向它的后继;

+ 字典          Object 实现, ES6 里面的 Map 对象; 

                ```js
                iconFn(level){
                    switch (level){
                        case 101:
                            return '\ue600' ;
                        case 102:
                            return '\ue6cc' ;
                        case 103:
                            return '\ue6cd' ;
                        default:
                            return '***' ;
                    }
                ｝


                iconFn(level){
                    const myMap = new Map([
                            [101,'\ue600'],
                            [102,'\ue6cc'],
                            [103,'\ue6cd'],
                        ])
                    return	myMap.get(level) ? myMap.get(level) : '****' ;
                }
                ```
+ 排序算法      冒泡排序, 选择排序, 插入排序



### 设计模式

+ 单例模式      保证一个类仅有一个实例, 并提供一个访问它的全局访问点

+ 发布订阅模式  它定义对象间的一种一对多的依赖关系, 当一个对象的状态发生改变时, 所有依赖于它的对象都将得到通知

+ 装饰者模式    AOP 切面应用, react redux connect  es6 装饰器