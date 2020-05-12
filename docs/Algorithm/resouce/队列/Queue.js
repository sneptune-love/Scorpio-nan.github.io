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
 * 练习:约瑟夫环
 * 
 */

