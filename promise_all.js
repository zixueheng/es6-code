//Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
//const p = Promise.all([p1, p2, p3]);
//p的状态由p1、p2、p3决定，分成两种情况。
//（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
//（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

const p = [1,2,3].map((id) => {
    return new Promise(function(resolve,reject){
        if(id == 4){
            reject(id + ' is error');
        }else{
            resolve(id + ' is ok');
        }
    });
});
Promise.all(p).then(
    (ids) => {
        ids.forEach( //这里是一个数组
            (id) => console.log('Get: '+id)
        );
    }
).catch(
    (error) => console.log(error)
);
// Get: 1 is ok
// Get: 2 is ok
// Get: 3 is ok


//注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
}).then(result => result) //这里箭头函数等效于 function(result){return result;}，即返回 result
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
    reject('报错了');
}).then(result => result)
.catch(e => e);

Promise.all([p1, p2]) //两个实例都是resolved
.then(result => console.log(result))
.catch(e => console.log('ALL: '+e));
//p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。
//该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。
//如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。
// [ 'hello', '报错了' ]



//Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
//const p = Promise.race([p1, p2, p3]);
//只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
//Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

