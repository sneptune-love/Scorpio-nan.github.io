class Queue{
    constructor(){
        this.queue = [];
    }

    // 从队列的尾部添加一个元素
    enqueue(item){
        this.queue.push(item);
    }

    // 从队列头部删除一个元素
    dequeue(){
        return this.queue.shift();
    }

    // 返回头部的元素 (不是删除)
    head(){
        return this.queue[0];
    }

    // 返回队列尾部元素
    tail(){
        return this.queue[this.queue.length - 1];
    }

    // 返回队列大小
    size(){
        return this.queue.length;
    }

    // 清除
    clear(){
        this.queue = [];
    }

    // 判断队列是否为空
    isEmpty(){
        return this.queue.length == 0;
    }
}

/**
 * 练习: 用两个队列实现一个栈
 * 思路: 两个队列分别命名为 queue1 queue2, 实现思路如下:
 *  push  实现 push 方法时, 如果这两个队列都为空, 那么默认向 queue1 里面添加数据, 如果一个不为空, 则向这个不为空的队列里面添加数据; 
 *  top   两个队列都为空, 或者一个不为空, 只需要返回不为空的队列的尾部元素即可;
 *  pop   pop 方法比较特殊, 要删除的是栈顶, 但这个栈顶元素其实是队列的尾部元素, 每一次做 pop 操作时, 将不为空的队列的元素一次删除并放入到另一个队列中, 直到遇到队列中只剩下一个元素, 删除这个元素, 其余的元素都跑到之前为空的队列中了;
 * 在具体实现中, 额外定义两个变量, data_queue 和 empty_queue , data_queue 始终指向那个不为空的队列, empty_queue 始终指向那个为空的队列;
 * 
 */

function QueueStack(){
    var queue1 = new Queue();
    var queue2 = new Queue();
    var data_queue = null;
    var empty_queue = null;

    var init_queue = function(){
        if(queue1.isEmpty() && queue2.isEmpty()){
            data_queue = queue1;
            empty_queue = queue2;
        }else if(queue1.isEmpty()){
            data_queue = queue2;
            empty_queue = queue1;
        }else{
            data_queue = queue1;
            empty_queue = queue2;
        }
    }

    this.push = function(item){
        init_queue();
        data_queue.enqueue(item);
    }

    this.top = function(){
        init_queue();
        return data_queue.tail();
    }

    this.push = function(){
        init_queue();
        while(data_queue.size() > 1){
            empty_queue.enqueue(data_queue.dequeue());
        }
        return data_queue.dequeue();
    }
}

/**
 * 练习: 打印杨辉三角
 *          1
 *        1   1
 *      1   2   1
 *     1  3   3  1
 *    1  4  6  4  1
 * 思路: 杨辉三角中的每一行, 都依赖上一行的数据, 假设在队列中存储第 n-1 行的数据, 输出第 n 行时, 只需要将队列中数据一次列出, 进行计算得到下一行的数据, 并将计算结果放到队列中;
 */

function Print(n){
    var queue = new Queue();
    queue.enqueue(1);

    for(var i = 1; i <= n; i++){
        var line = '';
        var pre = 0;
        for(var j = 0; j < i; j++){
            var item = queue.dequeue();
            line += item + " ";

            var value = item + pre;
            pre = item;
            queue.enqueue(value);
        }
        queue.enqueue(1);
        console.log(line);
    }
}
//Print(10);

/**
 * 练习: 寻路, 元素为 0 , 表示这个点可以通过, 元素为 1 , 表示不可以通过, 设置起点为 maze_array[2][1], 终点为 maze_array[3][5]; 用程序计算两点是否相通, 如果相通就输出两点之间最短的距离;(从起点到终点所经过的每一个点);
 * var maze_array = [
 *    [0,0,1,0,0,0,0],
 *    [0,0,1,1,0,0,0],
 *    [0,0,0,0,1,0,0],
 *    [0,0,0,1,1,0,0],
 *    [1,0,0,0,1,0,0],
 *    [1,1,1,0,0,0,0],
 *    [1,1,1,0,0,0,0]
 * ]
 * 思路: 从 maze_array[2][1] 开始, 把这个点邻近能到达的点都标记为 1 (表示起始点距离为 1 ), 然后把标记为 1 的点能够到达的邻近点标记为 2 (表示起始点距离为2), 如此处理, 直到到达终点, 或者找不到可以到达的邻近点为止, 标记后结构图如下:
 *  [3,2,0,0,0,0,0]
 *  [2,1,0,0,0,0,0]
 *  [1,0,1,2,0,0,0]
 *  [2,1,2,0,0,0,0]
 *  [0,2,3,4,0,8,0]
 *  [0,0,0,5,6,7,8]
 *  [0,0,0,6,7,8,0]
 * 从起始点到终点, 需要经过 8 个点, 这是最短路线, 这时需要从终点开始反方向寻找路线;
 */
var maze_array = [
    [0,0,1,0,0,0,0],
    [0,0,1,1,0,0,0],
    [0,0,0,0,1,0,0],
    [0,0,0,1,1,0,0],
    [1,0,0,0,1,0,0],
    [1,1,1,0,0,0,0],
    [1,1,1,0,0,0,0]
]

function FindWay(arr,basex,basey){
    var temp = [];
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            
        }
    }
    return arr;
}

console.log(FindWay(maze_array,2,1));
