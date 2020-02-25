//定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
//类的数据类型就是函数，类本身就指向构造函数
console.log(typeof Point); //function
console.log(Point === Point.prototype.constructor); //true
console.log(Point.name); //Point 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性

var point = new Point(1,2);
console.log(point.toString()); //(1, 2)

//构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
//由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
// Object.assign(Point.prototype, {
//     toString(){},
//     toValue(){}
// });


// Class 表达式
// 与函数一样，类也可以使用表达式的形式定义。
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
var instance = new MyClass();
console.log(instance.getClassName()); //Me
//Me.name // ReferenceError: Me is not defined

//如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass1 = class { /* ... */ };

//采用 Class 表达式，可以写出立即执行的 Class。
let person = new class{
    constructor(name){
        this.name = name;
    }
    myName(){
        return this.name;
    }
}('Jack Jones');
console.log(person.myName()); //Jack Jones

//ES6 不支持私有属性和私有方法

//与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class Bor{
    constructor(){}
    get pro1() {
        return this.param;
    }
    set pro1(param){
        this.param = param;
    }
}
var bor = new Bor();
bor.pro1 = 'Pro1';
console.log(bor.pro1); //Pro1


// Class 的 Generator 方法
// 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数
class genclass{
    constructor(...args){
        this.args = args;
    }
    *[Symbol.iterator] () {
        for(let arg of this.args){
            yield arg;
        }
    }
}
var obj1 = new genclass('hello','world');
for(let o of obj1){
    console.log(o);
}
// hello
// world


// Class 的静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class StaticClass{
    static getName(){
        return 'StaticClass';
    }
}
console.log(StaticClass.getName()); //StaticClass
// var obj2 = new StaticClass();
// obj2.getName(); //TypeError: obj2.getName is not a function

//注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
// class StaticClass2 {
//     static bar () {
//         this.baz(); //调用的是下面的静态baz方法
//     }
//     static baz () {
//         console.log('hello');
//     }
//     baz () {
//         console.log('world');
//     }
// }
//上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。
// StaticClass2.bar() // hello

// 父类的静态方法，可以被子类继承。
// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }
// class Bar extends Foo {
// }
// Bar.classMethod() // 'hello'
// 上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。
// 静态方法也是可以从super对象上调用的。
// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }
// class Bar extends Foo {
//   static classMethod() {
//     return super.classMethod() + ', too';
//   }
// }
// Bar.classMethod() // "hello, too"


// new.target 属性
// new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
// 如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
function Person1(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}
// 另一种写法
// function Person2(name) {
//   if (new.target === Person) {
//     this.name = name;
//   } else {
//     throw new Error('必须使用 new 命令生成实例');
//   }
// }
var aperson = new Person1('张三'); // 正确
var notAPerson = Person1.call(Person1, '张三');  // 报错

// Class 内部调用new.target，返回当前 Class。
// class Rectangle {
//   constructor(length, width) {
//     console.log(new.target === Rectangle);
//     this.length = length;
//     this.width = width;
//   }
// }
// var obj = new Rectangle(3, 4); // 输出 true

// 需要注意的是，子类继承父类时，new.target会返回子类。
// class Rectangle {
//   constructor(length, width) {
//     console.log(new.target === Rectangle);
//     // ...
//   }
// }
// class Square extends Rectangle {
//   constructor(length) {
//     super(length, length);
//   }
// }
// var obj = new Square(3); // 输出 false
// 上面代码中，new.target会返回子类。

// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
// class Shape {
//   constructor() {
//     if (new.target === Shape) {
//       throw new Error('本类不能实例化');
//     }
//   }
// }
// class Rectangle extends Shape {
//   constructor(length, width) {
//     super();
//     // ...
//   }
// }
// var x = new Shape();  // 报错
// var y = new Rectangle(3, 4);  // 正确
// 上面代码中，Shape类不能被实例化，只能用于继承。
// 注意，在函数外部，使用new.target会报错。