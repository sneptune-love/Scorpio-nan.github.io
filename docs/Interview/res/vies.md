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


15802770699