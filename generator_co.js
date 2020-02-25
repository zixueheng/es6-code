//co 模块可以让你不用编写 Generator 函数的执行器（接generator_thunk.js）。
const co = require('co');
const fs = require('fs');
// function readFile(fileName){
//     fs.readFile(fileName, (err, data) => {
//         if (err) throw err;
//         return data;
//     });
// }
const readFile = function(fileName){
    return new Promise(function(resole, reject){
        fs.readFile(fileName,function(err, data){
            if(err) return reject(err);
            return resole(data); 
        });
    });
};
var gen = function* () {
    var f1 = yield readFile('text1.txt');
    var f2 = yield readFile('text2.txt');
    console.log(f1.toString());
    console.log(f2.toString());
};
  
//co(gen);
// 上面代码中，Generator 函数只要传入co函数，就会自动执行。
// co函数返回一个Promise对象，因此可以用then方法添加回调函数。
// co(gen).then(function (){
//     console.log('Generator 函数执行完成');
// });

// 手动执行方法 同上面的 co(gen)
// var g = gen();
// g.next().value.then(function(data){
//   g.next(data).value.then(function(data){ //第一个yield的结果赋值给f1，即输出 text1
//     g.next(data); //第二个yield的结果赋值给f2，即输出 text2
//   });
// });


// 为什么 co 可以自动执行 Generator 函数？
// 前面说过，Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
// 两种方法可以做到这一点。
// （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
// （2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。
// co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。
// 如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。

// 自动执行器
// function run(gen){
//     var g = gen();
//     function next(data){
//         var result = g.next(data);
//         if (result.done) return result.value;
//         result.value.then(function(data){
//             next(data);
//         });
//     }
//     next();
// }
// run(gen);
  
  
// co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
// 这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。
// 数组的写法
// co(function* () {
//     var res = yield [
//         Promise.resolve(1),
//         Promise.resolve(2)
//     ];
//     console.log(res);
// }).catch(onerror);
// [ 1, 2 ]
// // 对象的写法
// co(function* () {
//     var res = yield {
//         1: Promise.resolve('a'),
//         2: Promise.resolve('b'),
//     };
//     console.log(res);
// }).catch(onerror);
// { '1': 'a', '2': 'b' }
// function onerror(err) {
//     // log any uncaught errors
//     // co will not throw any errors you do not handle!!!
//     // HANDLE ALL YOUR ERRORS!!!
//     console.error(err.stack);
// }

// co(function* () {
//     var values = [n1, n2, n3];
//     yield values.map(somethingAsync);
// });
// function* somethingAsync(x) {
//     // do something async
//     return y
// }
// 上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。
  
  