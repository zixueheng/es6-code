//子类必须在constructor方法中调用super方法，否则新建实例时会报错。
//这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
class Point { /* ... */ }
class ColorPoint extends Point {
  constructor() {
    super();
  }
}
//let cp = new ColorPoint(); //ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
//如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
// class ColorPoint extends Point {
// }
// // 也就是等同于
// class ColorPoint extends Point {
//   constructor(...args) {
//     super(...args);
//   }
// }
//另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。

//父类的静态方法，也会被子类继承。
class A {
  static hello() {
    console.log('hello world');
  }
}
class B extends A {
}
B.hello()  // hello world

//Object.getPrototypeOf方法可以用来从子类上获取父类
console.log(Object.getPrototypeOf(ColorPoint)); //[Function: Point]
console.log(Object.getPrototypeOf(ColorPoint) === Point); //true 因此，可以使用这个方法判断，一个类是否继承了另一个类。


//super 关键字
//第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
// class A {}
// class B extends A {
//   constructor() {
//     super(); //子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。
//   }
// }
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
// class A {}
// class B extends A {
//   m() {
//     super(); // 报错
//   }
// }
//第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
// class A {
//   p() {
//     return 2;
//   }
// }
// class B extends A {
//   constructor() {
//     super();
//     console.log(super.p()); // 2 super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()
//   }
// }
// let b = new B();
//这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
class A1{
  constructor(){
    this.p = 1;
  }
  thisp(){
    return this.p;
  }
}
class B1 extends A1{
  constructor(){
    super();
  }
  get getP(){
    return super.p; //p是父类A实例的属性，super.p就引用不到它
  }
  get getX(){
    return super.x;
  }
}
var b1 = new B1();
console.log(b1.getP); //undefined
A1.prototype.x = 2;
console.log(b1.getX); //2 属性x是定义在A.prototype上面的，所以super.x可以取到它的值
//console.log(b1.thisp()); //这里需要在B1的构造函数里面调用 super()

//ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
class A2 {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B2 extends A2 {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}
let b2 = new B2();
console.log(b2.m());
// 2
// undefined

//如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
class Parent{
  static myMethod(msg){
    console.log('static', msg);
  }
  myMethod(msg) {
    console.log('instance', msg);
  }
}
class Child extends Parent{
  static myMethod(msg){
    super.myMethod(msg); //这里指向父类，即Parent.myMethod()
  }
  myMethod(msg){
    super.myMethod(msg); //这里指向父类的原型对象，即 Parent.prototype.myMethod()
  }
}
Child.myMethod(1); //static 1
(new Child()).myMethod(2); //instance 2
// Parent.myMethod(1); //static 1
// Parent.prototype.myMethod(2); //instance 2


// 类的 prototype 属性和__proto__属性
// 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
// （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
class A3 {
}
class B3 extends A3 {
}
console.log(B3.__proto__ === A3); // true， 子类的__proto__属性，表示构造函数的继承，总是指向父类
console.log(B3.prototype.__proto__ === A3.prototype); // true， 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性

// 类的继承是按照下面的模式实现的
// class A {}
// class B {}
// Object.setPrototypeOf(B.prototype, A.prototype); //B 的实例继承 A 的实例，等同于B.prototype.__proto__ = A.prototype;
// Object.setPrototypeOf(B, A); // B 继承 A 的静态属性，等同于 B.__proto__ = A;
// const b = new B();
// Object.setPrototypeOf方法的实现：
// Object.setPrototypeOf = function (obj, proto) {
//   obj.__proto__ = proto;
//   return obj;
// }
