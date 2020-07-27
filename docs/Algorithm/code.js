/**
 * [两数之和]
 * 给定 nums = [2,7,11,15]  target = 9;
 * 因为 nums[0] + nums[1] = 9;
 * 所以 return [0,1];
 */
var twoSum = function(nums,target){
    for(var i = 0; i < nums.length; i++){
        for(var j = 0; j < nums.length; j++){
            if(nums[i] + nums[j] == target && i != j){
                return [i,j];
            }
        }
    }
}
//console.log(twoSum([5,6,4,7,8,3],10));

var twoSum2 = function(nums,target){
    let obj = {};
    for(let i = 0; i < nums.length; i++){
        let num = nums[i];
        if(num in obj){
            return [obj[num],i];
        }else{
            obj[target-num] = i;
        }
    }
}
//console.log(twoSum([5,6,2,7,8,3],10));

/**
 * [斐波那契]
 * 给定 N , 计算 F(N)
 * 输入 2 , 输出 1
 * 例如: F(2) = F(1) + F(0) = 1 + 0 = 1;
 */
var fib = function(N){
    if(N == 1 || N == 0) return N;
    return fib(N - 1) + fib(N - 2);
}
//console.log(fib(10));


var cache = [];
var fib = function(N){
    for(let i = 0; i <= N; i++){
        if(i == 0 || i == 1){
            cache[i] = i;
        }else{
            cache[i] = cache[i - 1] + cache[i - 2];
        }
    }
    return cache[N];
}
//console.log(fib(10));

/**
 * [有效的括号]
 * 给定一个只包含 '(' , ')' , '[' , ']' , '{' , '}' 的字符串, 判断字符串是否有效
 * 有效字符串满足:
 *  1. 左括号必须用相同类型的右括号闭合;
 *  2. 左括号必须以正确的顺序闭合
 * 注意:空字符串可被认为是有效字符串
 * 例如:输入'()',  输出 true
 */
var isValid = function(s){
    var stack = [];
    var obj = {
        '(':')',
        '[':']',
        '{':'}'
    }
    for(let i = 0; i < s.length; i++){
        let ele = s[i];
        if(ele in obj){
            stack.push(ele);
        }else{
            if(ele != obj[stack.pop()]){
                return false;
            }
        }
    }
    return !stack.length;
}
//console.log(isValid('[]'))      
//console.log(isValid('[}'))      


/**
 * [简化路径]
 * 以 Unix 风格给出一个文件的绝对路径, 将其转换为规范路径
 * 注意:返回的规范路径必须以 '/' 开头, 并且两个目录之间必须只有一个 '/', 最后一个目录名不能以 '/' 结尾;
 * 例如: 输入 "/home/" , 输出 "/home";
 */
var simplifyPath = function(path){
    let stack = [];
    let paths = path.split('/');
    for(let i = 0; i < paths.length; i++){
        let p = paths[i];
        if(p == '..'){
            stack.pop(p);
        }else if(p && p != '.'){
            stack.push(p);
        }
    }
    return '/' + stack.join('/');
}
//console.log(simplifyPath('./../home/abc/'));


/**
 * [移除链表元素]
 * 删除链表中等于给定值 val 的所有节点
 * 输入: 1-->2-->3-->4-->5-->6;
 * val = 6;
 * 输出: 1-->2-->3-->4-->5
 */
var removeElements = function(head,val){
    let ele = {
        next:head
    }
    let cur = ele;
    while(cur.next){
        if(cur.next.val = val){
            cur.next  = cur.next.next;
        }else{
            cur = cur.next;
        }
    }
    return ele.next;
}


/**
 * [反转链表元素]
 * 删除链表中等于给定值 val 的所有节点
 * 输入: 1-->2-->3-->4-->5-->null;
 * 输出: 5-->4-->3-->2-->1==>null;
 */
var reverseList = function(head){
    let cur = head;
    let prev = null;
    while(cur !== null){
        let next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}


/**
 * [环形链表]
 * 给定一个链表, 判断链表中是否有环;
 * pos 来表示链表尾部链接到链表中的位置, 索引从 0 开始, 如果 pos 是 -1, 则在链表中没有环
 */
var hasCycle = function(head){
    let cache = new Set();
    while(head){
        if(cache.has(head)){
            return true;
        }else{
            cache.add(head);
        }
        head = head.next;
    }
    return false;
}

var hasCycle = function(head){
    // 操场跑圈, 只要是个圈, 跑的快的, 一定会把跑的慢的追上;
    let slow = head;
    let fast = head;
    while(fast && fast.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow){
            return true;
        }
    }
    return false;
}

//console.log(new Array(5).fill(0));







