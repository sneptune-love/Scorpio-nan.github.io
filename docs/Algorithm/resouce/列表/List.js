class List{
    constructor(){
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
    }

    // 清空列表
    clear(){
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    }

    // 辅助查找方法
    find(element){
        for(var i = 0; i < this.dataStore.length; i++){
            if(this.dataStore[i] == element){
                return i;
            }
        }
        return -1;
    }

    // 显示列表中的元素
    toString(){
        return this.dataStore;
    }

    // 向列表中插入一个元素
    insert(element,after){
        var insertPos = this.find(after);
        if(insertPos > -1){
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    }

    // 添加元素
    append(element){
        this.dataStore[this.listSize++] = element;
    }

    // 从列表中删除
    remove(element){
        var at = this.find(element);
        if(at > -1){
            this.dataStore.splice(at,1);
            --this.listSize;
            return true;
        }
        return false;
    }

    // 将位置初始化到列表的第 0 个
    front(){
        this.pos = 0;
    }

    // 迭代器方法
    end(){
        this.pos = this.listSize - 1;
    }

    // 迭代器方法
    prev(){
        if(this.pos > 0){
            -- this.pos;
        }
    }

    // 迭代器方法
    next(){
        if(this.pos < this.listSize - 1){
            ++ this.pos;
        }
    }

    // 列表长度
    length(){
        return this.listSize;
    }

    // 当前位置
    currPos(){
        return this.pos;
    }

    // 移动到第几个位置
    moveTo(position){
        this.pos = position;
    }

    // 返回当前位置的元素
    getElement(){
        return this.dataStore[this.pos];
    }

    // 判断给定的值是否在列表中
    contains(element){
        for(var i = 0; i < this.dataStore.length; i++){
            if(this.dataStore[i] == element){
                return true;
            }
        }
        return false;
    }
}

// 使用方法:
var Lunguale = new List();

Lunguale.append("Python");
Lunguale.append("JavaScript");
Lunguale.append('PHP');
Lunguale.append("Go")
Lunguale.append("TypeScript");
Lunguale.append("Java");
Lunguale.append('Lua');
Lunguale.append("Csharp");

Lunguale.front();
console.log(Lunguale.getElement());         // Python

Lunguale.next();
Lunguale.next();
console.log(Lunguale.getElement());         // PHP

Lunguale.prev();
console.log(Lunguale.getElement());         // JavaScript


// 用迭代器访问列表
for(Lunguale.end(); Lunguale.currPos() >= 0; Lunguale.prev()){
    console.log(Lunguale.getElement());
}





