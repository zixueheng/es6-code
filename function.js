//解构赋值
let [a, b, c] = [1, 2, 3]; //数组解构赋值，数组的元素是按次序排列的，变量的取值由它的位置决定
console.log(a,b,c);
let { foo, bar } = { foo: "aaa", bar: "bbb" }; //对象解构赋值，对象的属性没有次序，变量必须与属性同名，才能取到正确的值
console.log(foo, bar);


//获取函数名称
function f1(){}
console.log(f1.name); //返回该函数的函数名

var f2 = function(){}
console.log(f2.name); //返回该函数的函数名


//rest参数
function add(...values) {
    let sum = 0;
    for (var val of values) {
        sum += val;
    }
    return sum;
}
console.log(add(2, 5, 3)); // 10


//箭头函数
var f = v=>v+v; //等同于下面函数
// function f(v){
//     return v+v;
// }
console.log(f(2));
//如果不需要参数或需要多个参数，就使用一个圆括号代表参数部分
var g = () => 5; //var g = function() { return 5 };
console.log('G: '+g());
var sum = (num1,num2)=>num1+num2; //等同于
// var sum = function(num1, num2) {
//     return num1 + num2;
// };
console.log(sum(1,2));

var calc = (num1, num2) => { let x=2; return x*(num1 + num2); } //代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
console.log(calc(1,2));

let full = ({first, last}) => 'Name: '+first+' '+last; //与变量解构结合使用，等同于full2
console.log(full({first:'jack', last:'jones'}));
// function full2(person) {
//     return 'Name: '+person.first + ' ' + person.last;
// }
// console.log(full2({first:'jack', last:'jones'}));

let arr = [0,1,2].map(x => x+x); //简化回调函数，等同于下面写法
let arr2 = [0,1,2].map(function(x){return x+x});
console.log(arr);
console.log(arr2);