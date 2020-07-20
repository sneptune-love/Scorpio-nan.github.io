
#### 两数之和
给定一个整数数组 `nums ` 和一个目标值 `target`, 请你在该数组中找出和为目标值的那两个整数, 并返回他们的数组下标.

你可以假设每种输入只会对应一个答案.但是, 你不能重复利用这个数组中同样的元素.

 1. 暴力循环
    ````javascript
    var twoSum = function(nums,target){
        for(var i = 0; i < nums.length; i++){
            for(var j = 0; j < nums.length; j++){
                if(nums[i] + nums[j] == target && i != j){
                    return [i,j];
                }
            }
        }
    }
    console.log(twoSum([5,6,4,7,8,3],10));      // [1,2]
    ````
 2. 空间换时间
    ````javascript
    var twoSum = function(nums,target){
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
    console.log(twoSum([5,6,2,7,8,3],10));      // [2,4]
    ````
#### 斐波那契
斐波那契数列(Fibonacci sequence), 又称黄金分割数列; 通常用 F(N) 表示, 形成的数列成为斐波那契数列, 该数列由 0 和 1 开始, 后面的每一项数字都是前面两项数字的和;

 1. 递归
    ````javascript
    var fib = function(N){
        if(N == 1 || N == 0) return N;
        return fib(N - 1) + fib(N - 2);
    }
    console.log(fib(10));                       // 55
    ````
 2. 递推
    ````javascript
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
    console.log(fib(10));                       // 55
    ````
#### 堆栈结构
栈是一种特殊的线性代表, 仅能够在栈顶仅进行操作, 有着先进后出的特性;




