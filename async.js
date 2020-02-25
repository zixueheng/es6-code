// ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。
// 前文有一个 Generator 函数，依次读取两个文件。
const fs = require('fs');
const readFile = function(fileName){
    return new Promise(function(resole, reject){
        fs.readFile(fileName,function(err, data){
            if(err) return reject(err);
            return resole(data); 
        });
    });
};
// const gen = function*(){
//     var t1 = yield readFile('text1.txt');
//     var t2 = yield readFile('text2.txt');
// }
// var g = gen();
// g.next().value.then(function(value){
//     console.log(value.toString());
// }, function(error){
//     console.log('Error1:'+error);
// });
// g.next().value.then(function(value){
//     console.log(value.toString());
// }, function(error){
//     console.log('Error2:'+error);
// });

const asyncReadFile = async function () {
    const f1 = await readFile('text1.txt');
    const f2 = await readFile('text2.txt');
    console.log(f1.toString());
    console.log(f2.toString());
};
asyncReadFile(); //执行
// async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await
// async函数对 Generator 函数的改进，体现在以下四点。
// （1）内置执行器。
// Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
// asyncReadFile();
// 上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
// （2）更好的语义。
// async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
// （3）更广的适用性。
// co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
// （4）返回值是 Promise。
// async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
// 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

//async 函数有多种使用形式。
// 函数声明
// async function foo() {}
// 函数表达式
// const foo = async function () {};
// 对象的方法
// let obj = { async foo() {} };
// obj.foo().then();
// Class 的方法
// class Storage {
//   constructor() {
//     this.cachePromise = caches.open('avatars');
//   }
//   async getAvatar(name) {
//     const cache = await this.cachePromise;
//     return cache.match(`/avatars/${name}.jpg`);
//   }
// }
// const storage = new Storage();
// storage.getAvatar('jake').then();
// 箭头函数
// const foo = async () => {};


//语法说明
// async函数返回一个 Promise 对象。
// async函数内部return语句返回的值，会成为then方法回调函数的参数。
async function f(words){
    return words;
}
f('Hello').then(a => console.log(a));

//async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
async function f2(words){
    throw new Error('F2错误');
}
f2('Hello').then(a => console.log(a)).catch(err => console.log(err));

// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
// 除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数

//正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
async function f3(){
    return await 123; //await命令的参数是数值123，它被转成 Promise 对象，并立即resolve。
} //同下
// async function f3(){
//     return await Promise.resolve('456');
//     return await Promise.reject('456'); //await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
// }
f3().then(a => console.log(a)).catch(err => console.log(err));;

// 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。
// async function f4() {
//     await Promise.reject('F4出错了');
//     await Promise.resolve('hello world'); // 不会执行
// }

async function f5() {
    try {
        await Promise.reject('F5出错了'); //将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
    } catch(e) {
    }
    return await Promise.resolve('hello world');
}
// async function f5() {
//     await Promise.reject('F5出错了').catch(e => console.log(e)); //另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
//     return await Promise.resolve('hello world');
// }
f5().then(v => console.log(v)); //hello world 


// 使用注意点
// 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
// async function f6() {
//     let foo = await getFoo();
//     let bar = await getBar();
// }
// 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
// async function f7() {
//     // 写法一
//     let [foo, bar] = await Promise.all([getFoo(), getBar()]);
//     // 写法二
//     let fooPromise = getFoo();
//     let barPromise = getBar();
//     let foo = await fooPromise;
//     let bar = await barPromise;
// }
// 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。
// async function dbFuc(db) {
//     let docs = [{}, {}, {}];
//     // 报错
//     docs.forEach(function (doc) {
//         await db.post(doc); //Unexpected identifier
//     });
// }
// 正确的写法是采用for循环：
// async function dbFuc(db) {
//     let docs = [{}, {}, {}];
//     for (let doc of docs) {
//         await db.post(doc);
//     }
// }
// 如果确实希望多个请求并发执行，可以使用Promise.all方法
// async function dbFuc(db) {
//     let docs = [{}, {}, {}];
//     let promises = docs.map((doc) => db.post(doc));
//     let results = await Promise.all(promises);
//     console.log(results);
// }
// 或者使用下面的写法
// async function dbFuc(db) {
//     let docs = [{}, {}, {}];
//     let promises = docs.map((doc) => db.post(doc));
//     let results = [];
//     for (let promise of promises) {
//         results.push(await promise);
//     }
//     console.log(results);
// }


//例子
//依次远程读取一组 URL，然后按照读取的顺序输出结果。
//Promise 的写法如下
function logInOrder(urls){
    //远程读取
    textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
    });
    //依次输出
    textPromises.reduce((chain,textPromise) => {
        return chain.then(()=>textPromise).then(text => console.log(text));
    });
}
// var f = fetch('https://video.myyll.com/api'); //fetch用法
// f.then(response => response.json()).then(data=>console.log(data)).catch(e=>console.log(e));
// 上面代码使用fetch方法，同时远程读取一组 URL。
// 每个fetch操作都返回一个 Promise 对象，放入textPromises数组。然后，reduce方法依次处理每个 Promise 对象，然后使用then，将所有 Promise 对象连起来，因此就可以依次输出结果。
// 这种写法不太直观，可读性比较差。下面是 async 函数实现。
// async function logInOrder(urls) {
//     for (const url of urls) {
//         const response = await fetch(url);
//         console.log(await response.text());
//     }
// }
// 如果需要的是并发发出远程请求
// async function logInOrder(urls) {
//     // 并发读取远程URL
//     const textPromises = urls.map(async url => {
//         const response = await fetch(url);
//         return response.text();
//     });
//     // 按次序输出
//     for (const textPromise of textPromises) {
//         console.log(await textPromise);
//     }
// }
// 上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。


// 异步遍历器（这里在 nodejs8.x中是不能运行的）
// 《遍历器》一章说过，Iterator 接口是一种数据遍历的协议，只要调用遍历器对象的next方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。
// next方法返回的对象的结构是{value, done}，其中value表示当前的数据的值，done是一个布尔值，表示遍历是否结束。
// 这里隐含着一个规定，next方法必须是同步的，只要调用就必须立刻返回值。也就是说，一旦执行next方法，就必须同步地得到value和done这两个属性。如果遍历指针正好指向同步操作，当然没有问题，但对于异步操作，就不太合适了。
// 目前的解决方法是，Generator 函数里面的异步操作，返回一个 Thunk 函数或者 Promise 对象，即value属性是一个 Thunk 函数或者 Promise 对象，等待以后返回真正的值，而done属性则还是同步产生的。
// ES2018 引入了”异步遍历器“（Async Iterator），为异步操作提供原生的遍历器接口，即value和done这两个属性都是异步产生。

//异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象。
// asyncIterator.next().then(
//     ({ value, done }) => {/* code */}
// );
//asyncIterator是一个异步遍历器，调用next方法以后，返回一个 Promise 对象。因此，可以使用then方法指定，这个 Promise 对象的状态变为resolve以后的回调函数。
//回调函数的参数，则是一个具有value和done两个属性的对象，这个跟同步遍历器是一样的
// 其他参考 http://es6.ruanyifeng.com/#docs/async#%E5%BC%82%E6%AD%A5%E9%81%8D%E5%8E%86%E5%99%A8