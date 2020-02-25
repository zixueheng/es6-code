//一、Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
let array_like = {
    '0':'a',
    '1':'b',
    '2':'c',
    length: 3
};
console.log(Array.from(array_like)); //[ 'a', 'b', 'c' ]
console.log(Array.from({ length: 3 })); //[ undefined, undefined, undefined ] 所谓类似数组的对象，本质特征只有一点，即必须有length属性

//只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组
console.log(Array.from('hello')); //字符串转数组 [ 'h', 'e', 'l', 'l', 'o' ]

let set = new Set([0,1,2]);
console.log(Array.from(set)); //集合转数组 [ 0, 1, 2 ]

//Array.from还可以接受第二个参数(一个function)，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
let arraylike = {0:1, 1:2, 2:3, length:3};
console.log(Array.from(arraylike, x => x*x)); //[ 1, 4, 9 ]
console.log(Array.from([1, 2, 3], x => x * x)); //[ 1, 4, 9 ]
console.log(Array.from(arraylike).map(x => x*x)); //[ 1, 4, 9 ]


//二、Array.of方法用于将一组值，转换为数组
console.log(Array.of(1,2,3)); //[ 1, 2, 3 ]
console.log(Array.of(3)); //[ 3 ]

//只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
console.log(Array()); // []
console.log(Array(2)); // [, ,]
console.log(Array(3)); // [, , ,]
console.log(Array(3, 11)); // [3, 11]
console.log(Array(3, 11, 8)); // [3, 11, 8]

//Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一
// Array.of() // []
// Array.of(undefined) // [undefined]
// Array.of(1) // [1]
// Array.of(1, 2) // [1, 2]


//三、Array.find()
//数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
//如果没有符合条件的成员，则返回undefined
console.log([1, 4, -5, 10].find(x=>x<0)); //查找数组中的负数
let result = [1, 5, 10, 15].find(function(value, index, arr) { //find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
    return value > 9;
  }); // 10
console.log(result);
let index = [1, 5, 10, 15].findIndex(function(value, index, arr) { //返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
    return value > 9;
  }); // 2
console.log(index);

function f(a){
    return a > this.age;
}
let person = {'name':'jack', 'age':30};
console.log([10,20,30,40,50,12].find(f, person)); //40， 可以接受第二个参数，用来绑定回调函数的this对象

//四、entries()，keys()和values()——用于遍历数组
//keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1

// for (let elem of ['a', 'b'].values()) { //这个会报错
//     console.log(elem);
// }
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"


//五、include()，某个数组是否包含给定的值
console.log([1, 2, 3].includes(2));     // true
console.log([1, 2, 3].includes(4));     // false
console.log([1, 2, NaN].includes(NaN)); // true
// if (arr.indexOf(el) !== -1) { //es5写法
//     // ...
// }  

