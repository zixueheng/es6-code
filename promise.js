//Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

//(1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
//只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

//(2)一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
//只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
//如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

//有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

//Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
//其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

//ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
const promise = new Promise(function(resolve, reject){ //Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
    //code here
    let result = false; // 异步操作结果
    if(result){
        resolve('success'); //resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
    }else{
        reject('error'); //reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
    }
});
//Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value){
   console.log(value);
}, function(error){
   console.log(error)
});
//then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。
//其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
// success


//下面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。
function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve, ms, 'Done!');
        //setTimeout(reject, ms, 'Error!');
    });
}
timeout(1000).then((value)=>{
    console.log(value);
},(error)=>{
    console.log(error);
}); //1秒后输出Promise对象的结果


// Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
// let promise = new Promise(function(resolve, reject) {
//     console.log('Promise');
//     resolve();
// });
// promise.then(function() {
//     console.log('resolved.');
// });
// console.log('Hi!');
// Promise
// Hi!
// resolved

//采用链式的then，可以指定一组按照次序调用的回调函数。
//这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
// getJSON("/post/1.json").then(
//     post => getJSON(post.commentURL)
//   ).then(
//     comments => console.log("resolved: ", comments),
//     err => console.log("rejected: ", err)
//   );



  