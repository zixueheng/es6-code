//Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
console.log(g.next());        // { value: 1, done: false }
console.log(g.return('foo')); // { value: "foo", done: true }
console.log(g.next());        // { value: undefined, done: true }
//如果return方法调用时，不提供参数，则返回值的value属性为undefined。

//如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
function* numbers () {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false } //开始执行finally
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true } //最后执行return()
//调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。



//next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
//next()是将yield表达式替换成一个值。
const g = function* (x, y) {
    let result = yield x + y;
    return result;
};
const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}
gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

//throw()是将yield表达式替换成一个throw语句。
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));

//return()是将yield表达式替换成一个return语句。
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;