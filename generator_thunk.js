//编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
// function f(m) {
//     return m * 2;
// }
// f(x + 5);
// 等同于
// var thunk = function () {
//     return x + 5;
// };
// function f(thunk) {
//     return thunk() * 2;
// }

// 函数 f 的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。
// 这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式。


//Javascript的Thunk函数
//JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
// 正常版本的readFile（多参数版本）
// fs.readfile(filename, callback); 
// Thunk版本的readFile（单参数版本）
// var thunk = function(filename){
//     return function(callback){
//         fs.readfile(filename, callback);
//     }
// }
// var t = thunk(filename);
// var f = t(callback); //fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

//任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。
// const Thunk = function(fn) {
//     return function (...args) {
//         return function (callback) {
//             return fn.call(this, ...args, callback);
//         }
//     };
// };
// var readFileThunk = Thunk(fs.reaFile);
// readFileThunk(files)(callback);

// function f1(a, callback){
//     callback(a);
// }
//f1('words', console.log);
// const ft = Thunk(f1);
// ft('some words')(console.log);


// Thunkify 模块
// npm install thunkify
// 示例：
// var thunkify = require('thunkify');
// var fs = require('fs');
// var read = thunkify(fs.readFile); //将普通的readFile函数转化成 thunk 函数
// read('package.json')(function(err, str){
//   // ...
// });
// 原始的readFile 函数调用，第二个参数是回调函数
// fs.readFile('/etc/passwd', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);
// var gen = function* (){
//   var r1 = yield readFileThunk('text1.txt');
//   console.log('R1:'+r1.toString());
//   var r2 = yield readFileThunk('text2.txt');
//   console.log('R2:'+r2.toString());
// };

// var g = gen();
// var r1 = g.next();
// r1.value(function (err, data) { //注意这里 r1.value 是个 thunk 函数，它接受一个回调函数（和上面的示例对比得出）
//   if (err) throw err;
//   var r2 = g.next(data); // 第一个yield 的结果 即'text1.txt' 的内容赋值给 r1，输出 R1:text1
//   r2.value(function (err, data) {
//     if (err) throw err;
//     g.next(data); // 第二个yield 的结果 即'text2.txt' 的内容赋值给 r2，输出 R2:text2
//   });
// });
// yield命令用于将程序的执行权移出 Generator 函数，Thunk 函数 将执行权再交还给 Generator 函数(这里有点看不懂)
// 上面代码中，变量g是 Generator 函数的内部指针，表示目前执行到哪一步。next方法负责将指针移动到下一步，并返回该步的信息（value属性和done属性）。
// 仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。这使得我们可以用递归来自动完成这个过程。


//Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。
function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
// 上面代码的run函数，就是一个 Generator 函数的自动执行器。内部的next函数就是 Thunk 的回调函数。
// next函数先将指针移到 Generator 函数的下一步（gen.next方法），然后判断 Generator 函数是否结束（result.done属性），
// 如果没结束，就将next函数再传入 Thunk 函数（result.value属性），否则就直接退出。
var g2 = function* (){
    var f1 = yield readFileThunk('text1.txt');
    console.log('F1:'+f1.toString());
    var f2 = yield readFileThunk('text2.txt');
    console.log('F2:'+f2.toString());
};
run(g2);
  
  
