//Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
//执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
//形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

function* helloGenerator(){
    // console.log('begin');
    yield 'hello';
    yield 'world';
    return 'end';
}
//helloGenerator(); //此处不会输出，也不返回内部值
//Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
//不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。

//必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
//换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
var h = helloGenerator();
console.log(h.next());
console.log(h.next());
console.log(h.next());
console.log(h.next());
// { value: 'hello', done: false }
// { value: 'world', done: false }
// { value: 'end', done: true }
// { value: undefined, done: true }


//由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志
//需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a){
    var length = a.length;
    for(var i=0;i<length;i++){
        if(typeof a[i] == 'number'){
            yield a[i];
        }else{
            yield* flat(a[i]);
        }
    }
}
for(let f of flat(arr)){
    console.log(f);
}
// 1
// 2
// 3
// 4
// 5
// 6

//yield表达式如果用在另一个表达式之中，必须放在圆括号里面
function* demo() {
    // console.log('Hello' + yield); // SyntaxError
    // console.log('Hello' + yield 123); // SyntaxError
    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}
// var d = demo();
// console.log('D', d.next());
// console.log('D', d.next());
// console.log('D', d.next());
//yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo1() {
    //foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
    console.log(input); //yield表达式本身没有返回值，或者说总是返回undefined
}
// var d1 = demo1();
// console.log('D1',d1.next()); //{ value: undefined, done: false }


//任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象
let iterator_generator = {
    [Symbol.iterator]: function* (){ //由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口
        yield 1;
        yield 2;
        yield 3;
    }
};
//上面代码，Generator 函数赋值给Symbol.iterator属性，从而使得该对象具有了 Iterator 接口，可以被...运算符遍历了
console.log([...iterator_generator]); //[ 1, 2, 3 ]
for(let x of iterator_generator){
    console.log(x);
}
// 1
// 2
// 3


//next()方法的参数
//yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作(上一个yield表达式)的返回值。
function* f() {
    for(var i = 0; true; i++) {
        var reset = yield i;
        if(reset) { i = -2; }
    }
} 
//上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。
//当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-2，下一轮循环就会从-2开始递增。
var g = f();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next(true));
console.log(g.next());
console.log(g.next());
// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: -1, done: false }
// { value: 0, done: false }
// { value: 1, done: false }
//Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
//通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
console.log(a.next()); // Object{value:6, done:false}
console.log(a.next()); // Object{value:NaN, done:false}
console.log(a.next()); // Object{value:NaN, done:true}
var b = foo(5);
console.log(b.next()); // { value:6, done:false }
console.log(b.next(12)); // { value:8, done:false } 第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8
console.log(b.next(13)); // { value:42, done:true } 第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。
//注意，由于next方法的参数表示 上一个yield表达式 的返回值，所以在第一次使用next方法时，传递参数是无效的。
//V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for(let x of foo()){
    console.log(x);
} //一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中
// 1
// 2
// 3
// 4
// 5

//原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
function* objectEntries(obj){
    let objKeys = Reflect.ownKeys(obj);
    for(let key of objKeys){
        yield [key, obj[key]];
    }
}
let jane = { first: 'Jane', last: 'Doe' };
for(let [key, value] of objectEntries(jane)){
    console.log(key, value);
}
// first Jane
// last Doe


// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
// 这意味着，它们都可以将 Generator 函数返回的 Iterator对象（遍历器对象），作为参数。
function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
}
console.log([...numbers()]); //[ 1, 2 ]
console.log(Array.from(numbers())); //[ 1, 2 ] 说明：只要是部署了Iterator 接口的数据结构，Array.from都能将其转为数组，详见array.js
let [a1, a2] = numbers(); //解构赋值
console.log(a1,a2); //1 2
for (let n of numbers()) {
    console.log(n)
}
// 1
// 2


//yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* foo2() {
    yield 'a';
    yield 'b';
}
function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}
// 等同于
// function* bar() {
//     yield 'x';
//     yield 'a';
//     yield 'b';
//     yield 'y';
// }
// 等同于
// function* bar() {
//     yield 'x';
//     for (let v of foo()) {
//         yield v;
//     }
//     yield 'y';
// }
//从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式
//实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历
let read = (function* () {
    yield* ["a", "b", "c"];
    yield* 'hello';
})();
console.log([...read]); //[ 'a', 'b', 'c', 'h', 'e', 'l', 'l', 'o' ]

function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
}
function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
}
console.log([...logReturned(genFuncWithReturn())]);
// The result
// [ 'a', 'b' ]


//如果一个对象的属性是 Generator 函数，可以简写成下面的形式。
let new_generator = {
    * new_generator(){
    }
}
//等同于
// let new_generator = { 
//     new_generator: function* (){
//     }
// }
  