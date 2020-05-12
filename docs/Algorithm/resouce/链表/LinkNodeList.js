class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkNodeList{
    constructor(){
        this.head = null;
        this.length = 0;
    }
    // 增删改查
    
    // 新增
    append(data){
        let node = new Node(data);
        let cur;

        // 两种情况, 1. 链表是空的  2. 链表不是空的
        if(!this.head){
            this.head = node;
        }else{
            cur = this.head;
            while(cur.next){
                cur = cur.next;
            }
            cur.next = node;
        }
        this.length += 1;
    }

    // 打印整个链表
    print(){
        let cur = this.head;
        let ret = [];

        while(cur){
            ret.push(cur.data);
            cur = cur.next;
        }
        return ret.join('==>');
    }

    // 删除指定位置的数据
    removeAt(index){
        let cur = this.head;
        let prev = null;
        let i = 0;
        if(index == 0){
            this.head = cur.next;
        }else{
            while(i < index){
                // 上一个状态和下一个状态都需要保持
                prev = cur;
                cur = cur.next;
                i++;
            }
            prev.next = cur.next;
            cur.next = null;
        }
        this.length -= 1;
        return cur.data;
    }   

    // 

}


let linkNode = new LinkNodeList();

linkNode.append('哈喽~');
linkNode.append('哈喽~,你瞅啥!');
linkNode.append('哈喽~,嘿嘿!');
linkNode.append('哈喽~,你是沙雕吗~');

console.log(linkNode.print());

linkNode.removeAt(2);

console.log(linkNode.print());