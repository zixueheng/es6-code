//Promise.resolve()将现有对象转为 Promise 对象
//Promise.resolve等价于下面的写法。
// Promise.resolve('foo')
// // 等价于
// new Promise(resolve => resolve('foo'))

//Promise.resolve方法的参数分成四种情况
//1）参数是一个 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
//2）参数是一个thenable对象（指的是具有then方法的对象），Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
let thenable = {
    then: function(resolve, reject){
        resolve(1);
    }
};
let p1 = Promise.resolve(thenable);
p1.then((x)=>console.log(x));
//3）参数不是具有then方法的对象，或根本就不是对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
const a = Promise.resolve('hello');
a.then((x)=>console.log(x));
//4）不带有任何参数，直接返回一个resolved状态的 Promise 对象。


//Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');
// 等同于
//const p = new Promise((resolve, reject) => reject('出错了'))
p.then(null, function (s) {
  console.log(s)
});
// 出错了 ，上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。
//注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。
