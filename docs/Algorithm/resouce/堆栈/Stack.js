class Stack{
    constructor(){
        this.stack = [];
    }

    // 添加
    push(ele){
        this.stack.push(ele);
    }

    // 弹出栈顶元素
    pop(){
        return this.stack.pop();
    }

    // 返回栈顶元素
    top(){
        return this.stack[this.stack.length - 1];
    }

    // 判断栈是否为空
    isEmpty(){
        return this.stack.length == 0;
    }

    // 返回栈的大小
    size(){
        return this.stack.length;
    }

    // 清空栈
    clear(){
        this.stack = [];
    }
}

/**
 * 练习:
 * 下面的字符串中包含小括号, 请编写一个函数判断字符串中的括号是否合法, 所谓合法就是括号成对出现;
 * sdf(ds(kjh(dd)kjh)jkjl)jjlj
 * (sdjhg(kjhgj)skjh(hjkkl))
 * ()()jhghj()(hjgji()lkjfh)(
 */

var isValid = function(str){
    var stack = new Stack();
    for(let i = 0; i < str.length; i++){
        var item = str[i];
        if(item == '('){
            stack.push(item);
        }else if(item == ')'){
            if(stack.isEmpty()) return false;
            stack.pop();
        }
    }
    return stack.isEmpty();
}

/*
console.log(isValid('sdf(ds(kjh(dd)kjh)jkjl)jjlj'));            // true
console.log(isValid('(sdjhg(kjhgj)skjh(hjkkl))'));              // true
console.log(isValid('()()jhghj()(hjgji()lkjfh)('));             // false
*/

/**
 * 练习:
 * 逆波兰表达式, 也叫后缀表达式, 它将复杂表达式转换为可以依靠简单的操作得到计算的结果的表达式, 例如, (a+b)*(c+d) 转换为 ab + cd + *;
 * 示例: ["4","13","5","/","+"]  等价于: (4 + (13 / 5)) = 6;
 *       ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]  等价于: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5;
 * 思路: 如果元素不是 + - * / 中的某一个, 就压入栈中;
 *       如果元素是 + - * / 中的某一个, 则从栈中连续弹出两个元素, 并对这两个元素进行计算, 将计算结果压入栈中;
 */
var calcExp = function(exp){
    var stack = new Stack();
    for(var i = 0; i < exp.length; i++){
        var item = exp[i];
        if(["+","-","*","/"].indexOf(item) >= 0){
            var val1 = stack.pop();
            var val2 = stack.pop();
            var _exp = val2 + item + val1;
            // 计算并取整;
            var res = parseInt(eval(_exp));
            stack.push(res.toString());
        }else{
            stack.push(item);
        }
    }
    return stack.pop();
}

console.log(calcExp(["4","13","5","/","+"]));
console.log(calcExp(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));