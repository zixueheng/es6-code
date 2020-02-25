//Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
function* gt(){
    try {
        yield;
    } catch (error) {
        console.log('内部错误'+error);
    }
}
let gti = gt();
gti.next();
try {
    gti.throw('a');
    gti.throw('b');
} catch (error) {
    console.log('外部错误'+error);
}
// 内部错误a
// 外部错误b
// 第一个错误被 Generator 函数体内的catch语句捕获。
// gti第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。


//用throw命令抛出的异常只能被函数体外的catch语句捕获
var g = function* () {
    while (true) {
        try {
            yield;
        } catch (e) {
            if (e != 'a') throw e;
            console.log('内部捕获', e);
        }
    }
};
var i = g();
i.next();
try {
    throw new Error('a');
    throw new Error('b');
} catch (e) {
    console.log('外部捕获', e);
}
//外部捕获 Error: a
//只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了

// 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
var g = function* () {
    while (true) {
        yield;
        console.log('内部捕获', e);
    }
};
var i = g();
i.next();
try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}
// 外部捕获 a


//throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
var gen = function* gen(){
    try {
        yield console.log('a');
    } catch (e) {
        // ...
    }
    yield console.log('b');
    yield console.log('c');
}
var g = gen();
g.next() // a
g.throw() // b
g.next() // c

//如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

//这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield表达式，可以只用一个try...catch代码块来捕获错误。
//如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次catch语句就可以了。

//Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
function* foo() {
    var x = yield 3;
    var y = x.toUpperCase();
    yield y;
}
var it = foo();
console.log(it.next()); // { value:3, done:false }
try {
    it.next(42);
} catch (err) {
    console.log(err);
} //TypeError: x.toUpperCase is not a function

//一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
//如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
  