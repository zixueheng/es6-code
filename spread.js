// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
console.log(...[1, 2, 3]); //和下面效果一致
console.log(1,2,3);

// 写法例子
// function f(v, w, x, y, z) { }
// const args = [0, 1];
// f(-1, ...args, 2, ...[3]); //实际是 f(-1, 0, 1, 2, 3);

// const arr = [
//     ...(x > 0 ? ['a'] : []), //这里使用运算结果
//     'b',
//   ];

// 用法例子
function push(arr, ...item){
    arr.push(...item); //向数组的末尾添加一个或多个元素，并返回新的长度。
}
let arr = [0,1];
push(arr,2,3,4);
console.log(...arr); //0 1 2 3 4

function add(x,y){
    return x+y;
}
let num = [50,60];
let sum = add(...num); //该运算符将一个数组，变为参数序列
console.log(sum); //110

// ES5 方式数组复制
// const a = [1,2];
// const b = a.concat(); //数组复制
// a[0] = 2;
// console.log(a[0]);
// console.log(b[0]);

//ES6 方式数组复制
const a = [1,2,3];
// const b = [...a]; // const [a, b, c] = [1, 2, 3];
// console.log(...b);
const [...b] = a; //和上面方式一样
console.log(...b); //1 2 3

// 合并数组
// [0,1,2].concat(array); //es5
// [0,1,2,...array]; //es6

console.log(...[...'hello']); //扩展运算符还可以将字符串转为真正的数组