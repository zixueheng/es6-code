//ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
//它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
//Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
//凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
let s1 = Symbol('foo');
console.log(s1); // Symbol(foo)
console.log(s1.toString()); // "Symbol(foo)"

// Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性
let mySymbol = Symbol('key');
let nextSymbol = Symbol('key');
// 第一种写法
// let a = {};
// a[mySymbol] = 'Hello!'; //ES6 允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内
// 第二种写法
let a = {
  [mySymbol]: 'Hello', //ES6 允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内
  [nextSymbol]: 'World!'
};
console.log(a);
console.log(a.mySymbol); //undefined Symbol值作为对象属性名时，不能用点运算符，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值
console.log(a[mySymbol]); //Hello!
console.log(a[nextSymbol]); //Hello!

let s = Symbol();
let f = {
    //[s]:function(args){console.log(args);}, //在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
    //[s]:(args)=>{console.log(args);}, //箭头函数表达方式
    [s](args){console.log(args+' symbol');},//ES6 允许直接写入变量和函数，作为对象的属性和方法，等同上面的效果
    s:function(args){console.log(args+' normal');} //直接用s就是字符串属性名
};
f[s]('hello'); //hello symbol
f.s('hello'); //hello normal


// Symbol.for()接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
// Symbol.for("bar") === Symbol.for("bar"); // true
// Symbol("bar") === Symbol("bar"); // false

// Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的key
// 需要注意的是，Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。
let bar = Symbol.for('barkey');
console.log(Symbol.keyFor(bar)); //barkey
let anotherbar = Symbol('anotherbar'); //这里不是登记
console.log(Symbol.keyFor(anotherbar)); //undefined
