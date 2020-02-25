//ES6 允许直接写入变量和函数，作为对象的属性和方法。
let a = 1;
let b = {a};
console.log(b); //{ a: 1 }

let age = 20;
let person = {
    name: 'jack',
    age, //age: 20
    hello(){return this.name+' is '+this.age+' years old';} //方法简写 hello:function(){return this.name+' is '+this.age+' years old';}
};
//console.log(person);
console.log(person.hello()); //jack is 20 years old

function point(){
    let [x,y] = [1,2];
    return {x,y}; //属性简写 { x: 1, y: 2 }
}
console.log(point());

let propertyKey = 'key1';
let obj = { //ES6 允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内
    [propertyKey]: 1,
    ['a'+'b']:2
};
console.log(obj);//{ key1: 1, ab: 2 }


//Object.is() 比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
console.log(Object.is('foo', 'foo'));// true
console.log(Object.is({}, {}));// false


//Object.assign() 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3, b:4 }; //目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
Object.assign(target, source1, source2);
console.log(target); // { a: 1, b: 4, c: 3 }
//注意：Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
console.log(obj2.a.b) // 2

//Object.assign方法有很多用处
//1）为对象添加属性
// class Point {
//   constructor(x, y) {
//     Object.assign(this, {x, y});
//   }
// }
//2）为对象添加方法
// Object.assign(SomeClass.prototype, {
//   someMethod(arg1, arg2) {
//   },
//   anotherMethod() {
//   }
// });
// 等同于下面的写法
// SomeClass.prototype.someMethod = function (arg1, arg2) {
// };
// SomeClass.prototype.anotherMethod = function () {
// };


let obj3 = { foo: 123 };
console.log(Object.getOwnPropertyDescriptor(obj3, 'foo')); //获取该属性的描述对象
// { value: 123,
//     writable: true,
//     enumerable: true,
//     configurable: true }
const obj4 = {
    foo: 123,
    get bar() { return 'abc' }
  };
console.log( Object.getOwnPropertyDescriptors(obj4)); //返回指定对象所有自身属性（非继承属性）的描述对象


//Object.setPrototypeOf() 设置一个对象的prototype对象，返回参数对象本身
let proto = {y:1, z:2};
let obj5 = {x:0};
Object.setPrototypeOf(obj5, proto);
console.log(obj5.x, obj5.y, obj5.z);

// Object.setPrototypeOf()方法用于读取一个对象的原型对象。
// function Rectangle() {
// }
// const rec = new Rectangle();
// Object.getPrototypeOf(rec) === Rectangle.prototype // true
// Object.setPrototypeOf(rec, Object.prototype);
// Object.getPrototypeOf(rec) === Rectangle.prototype // false


//关键字super，指向当前对象的原型对象
let superObj = {a:1};
let thisObj = {
    a:2,
    get_this(){return this.a;},
    get_super(){return super.a;}
}
Object.setPrototypeOf(thisObj, superObj);
console.log(thisObj.get_this(), thisObj.get_super()); //2 1


let obj6 = { a: 1, b: 2, c: 3 };
for (let key of Object.keys(obj6)) {
  console.log(key); // 'a', 'b', 'c'
}
for (let value of Object.values(obj6)) {
  console.log(value); // 1, 2, 3
}
for (let [key, value] of Object.entries(obj6)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}


// 对象拓展运算符
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(z); //{ a: 3, b: 4 }
//解构赋值必须是最后一个参数，否则会报错。
// let { ...x, y, z } = obj; // 句法错误  Rest element must be last element
// let { x, ...y, ...z } = obj; // 句法错误  Rest element must be last element

let obj7 = {a:1};
let objClone = {...obj7}; // 等同于下面写法
// let objClone = Object.assign({}, obj7);
// obj7.a = 2;
console.log(objClone); //{ a: 1 }
// let ab = { ...a, ...b }; //扩展运算符可以用于合并两个对象， 等同于
// let ab = Object.assign({}, a, b);
