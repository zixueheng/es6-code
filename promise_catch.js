//catch() 用于指定发生错误时的回调函数。
const promise_catch = new Promise(function(resolve, reject){
    //resolve('Success!'); //如果 Promise 状态已经变成resolved，再抛出错误是无效的。
    throw new Error('Failed!');
    //reject('Failed2!'); //reject方法的作用，等同于抛出错误，会触发catch回调函数
});
promise_catch.then(function(result){
    console.log(result);
}).catch(function(error){
    console.log('E:'+error);
});
//一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
// bad
// promise.then(function(data) {
// // success
// }, function(err) {
// // error
// });

// // good
// promise.then(function(data) { //cb
// // success
// })
// .catch(function(err) {
// // error
// });
// 第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。
