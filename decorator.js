//现在不支持 类修饰器

// @testable
// class MyTestableClass {
//   // ...
// }
// function testable(target) {
//   target.isTestable = true;
// }
// MyTestableClass.isTestable // true
//上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。testable函数的参数target是MyTestableClass类本身。


// 方法的修饰
// 修饰器不仅可以修饰类，还可以修饰类的属性。
// class Person {
//   @readonly
//   name() { return `${this.first} ${this.last}` }
// }
// 上面代码中，修饰器readonly用来修饰“类”的name方法。

// 修饰器函数readonly一共可以接受三个参数。
// function readonly(target, name, descriptor){
//   // descriptor对象原来的值如下
//   // {
//   //   value: specifiedFunction,
//   //   enumerable: false,
//   //   configurable: true,
//   //   writable: true
//   // };
//   descriptor.writable = false;
//   return descriptor;
// }
// readonly(Person.prototype, 'name', descriptor);
// // 类似于
// Object.defineProperty(Person.prototype, 'name', descriptor);

// 下面的@log修饰器，可以起到输出日志的作用。
// class Math {
//   @log
//   add(a, b) {
//     return a + b;
//   }
// }
// function log(target, name, descriptor) {
//   var oldValue = descriptor.value;
//   descriptor.value = function() {
//     console.log(`Calling ${name} with`, arguments);
//     return oldValue.apply(this, arguments);
//   };
//   return descriptor;
// }
// const math = new Math();
// // passed parameters should get logged now
// math.add(2, 4);

//修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。