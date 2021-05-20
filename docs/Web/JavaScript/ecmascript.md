## ES6 语法特性

### 变量 （let , const）

`var` 定义变量的缺陷：

+ 变量提升:

    ```js
        // var 变量可以先使用再声明;
        console.log(a);     //  5;
        var a = 5;

        /** let 声明的变量只能先声明再使用
         *
            console.log(a);     //  Uncaught ReferenceError: Cannot access 'a' before initialization;
            var a = 5;
         */
    ```


+ 重复声明:

    ```js
        var a = 12;
        var a = 5;

        console.log(a);     // 5

        /** let 定义的变量, 不可以重复定义
         * 
            let a = 12;
            let a = 5;
            console.log(a);     // Uncaught SyntaxError: Identifier 'a' has already been declared
        */
    ```

+ 控制修改:

    ```js
        var HOST = "github.com";
        if(HOST = 'git'){};

        console.log(HOST);  // git

        /** const 定义一个常量, 不允许修改的
         * 
            const HOST = "github.com";
            if(HOST = 'git'){};

            console.log(HOST);  // Uncaught TypeError: Assignment to constant variable.
        */
    ```

+ 块级作用域:

    ```html
        <div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
        </div>
    ```

    ```js

        // 如果页面上有三个按钮, 现在要给每一个按钮添加一个点击事件
        var btns = document.querySelectorAll('button');
        for(var i = 0; i < btns.length; i++){
            btns[i].onclick = function(){
                alert('第 ' + i + ' 个按钮');
            }
        }

        /*
         *  这个时候每个按钮点击都会弹出 '第3个按钮' ;
         *  我们其实可以通过闭包的方式将上面的代码进行改造一下, 利用闭包创建一个代码块
         */
        var btns = document.querySelectorAll('button');
        for(var i = 0; i < btns.length; i++){
            (function(i){
                btns[i].onclick = function(){
                    alert('第 ' + i + ' 个按钮');
                }
            })(i)
        }

        /**
         * let 代码块解决循环的问题;
         */
        let btns = document.querySelectorAll('button');
        for(let i = 0; i < btns.length; i++){
            btns[i].onclick = function(){
                alert('第 ' + i + ' 个按钮');
            }
        }

    ```

+ 总结: let 声明的变量在代码块内有效, 不可以重复声明, 不存在变量提升; const 定义常量, 不允许修改;

### 解构赋值

