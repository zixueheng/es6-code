//数组遍历器
var makeIterator = function(array){
    var nextIndex = 0;
    return {
        next:function(){
            return nextIndex<array.length ? {value:array[nextIndex++], done:false} : {value:undefined, done:true};
        },
        hasNext:function(){
            return nextIndex<array.length ? true : false;
        }
    };
}
var it = makeIterator([0,1,2,3,4,5]);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
while(it.hasNext()){
    console.log(it.next());
}


//ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。
//Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。
//至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内（参见《Symbol》一章）。
const obj = {
    [Symbol.iterator] : function () {
        return {
            next: function () {
                return {
                value: 1,
                done: true
                };
            }
        };
    }
};
//对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。
//执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

// ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。
// 原因在于，这些数据结构原生部署了Symbol.iterator属性（详见下文），另外一些数据结构没有（比如对象）。
// 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

// 原生具备 Iterator 接口的数据结构如下。

//     Array
//     Map
//     Set
//     String
//     TypedArray
//     函数的 arguments 对象
//     NodeList 对象
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator](); ////ES6 允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内
console.log(iter.next()); // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
console.log(iter.next()); // { value: 'c', done: false }
console.log(iter.next()); // { value: undefined, done: true }

//对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。
//除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

//一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
//1、对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
//2、扩展运算符（...）也会调用默认的 Iterator 接口。
//3、yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
};
var iterator = generator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }


let iterator_generator = {
    [Symbol.iterator] : function*(){
        yield 1;
        yield 2;
        yield 3;
    }
}; //该对象Symbol.iterator的属性是Generator函数，Symbol.iterator方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可
console.log([...iterator_generator]); //[ 1, 2, 3 ]
//简写
let iterator_generator2 = {
    * [Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}
console.log([...iterator_generator2]); //[ 1, 2, 3 ]
for (let x of iterator_generator2) {
    console.log(x);
}
// 1
// 2
// 3


//遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
//return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
