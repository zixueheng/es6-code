// 块级作用域
// （1）let 取代 var
// ES6 提出了两个新的声明变量的命令：let和const。其中，let完全可以取代var，因为两者语义相同，而且let没有副作用。

// 在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。
// const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。


// 字符串
// 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';
// acceptable
const c = `foobar`;
// good
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';


// 解构赋值
// 使用数组成员对变量赋值时，优先使用解构赋值。
const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr;
// 函数的参数如果是对象的成员，优先使用解构赋值。
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}
// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}
// best
function getFullName({ firstName, lastName }) {
}
// 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
// bad
function processInput(input) {
    return [left, right, top, bottom];
}
// good
function processInput(input) {
    return { left, right, top, bottom };
}
const { left, right } = processInput(input);


// 对象
// 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};
// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
// 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
// bad
const a = {};
a.x = 3;
// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });
// good
const a = { x: null };
a.x = 3;

// 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;
// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

// 另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
var ref = 'some value';
// bad
const atom = {
  ref: ref,
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};
// good
const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};


// 数组
// 使用扩展运算符（...）拷贝数组。
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
// 使用 Array.from 方法，将类似数组的对象转为数组。
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);


// 函数
// 立即执行函数可以写成箭头函数的形式。
(() => {
  console.log('Welcome to the Internet.');
})();
// 那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
// bad
[1, 2, 3].map(function (x) {
    return x * x;
});
// good
[1, 2, 3].map((x) => {
    return x * x;
});
// best
[1, 2, 3].map(x => x * x);
// 简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

// 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
// bad
function divide(a, b, option = false ) {}
// good
function divide(a, b, { option = false } = {}) {}
  
// 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
// good
function concatenateAll(...args) {
  return args.join('');
}

// 使用默认值语法设置函数参数的默认值。
// bad
function handleThings(opts) {
  opts = opts || {};
}
// good
function handleThings(opts = {}) {
  // ...
}


// Map 结构
// 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
let map = new Map(arr);
for (let key of map.keys()) {
  console.log(key);
}
for (let value of map.values()) {
  console.log(value);
}
for (let item of map.entries()) {
  console.log(item[0], item[1]);
} //或者如下
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
