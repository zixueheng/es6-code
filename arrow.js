// function Person() {
//     // Person() 构造函数定义 `this`作为它自己的实例.
//     this.age = 0;
  
//     setInterval(function growUp() {
//       // 在非严格模式, growUp()函数定义 `this`作为全局对象, 
//       // 与在 Person()构造函数中定义的 `this`并不相同.
//       this.age++; //这里引用的age是未定义的
//       console.log(this.age); //这里输出NaN
//     }, 1000);
//   }

// 在ECMAScript 3/5中，通过将this值分配给封闭的变量，可以解决this问题。
// function Person() {
//   var that = this;
//   that.age = 0;

//   setInterval(function growUp() {
//     //  回调引用的是`that`变量, 其值是预期的对象. 
//     that.age++;
//     console.log(that.age); //这里正常输出 1 2 3 4 ...
//   }, 1000);
// }

//箭头函数不会创建自己的this,它从会从自己的作用域链的上一层继承this。因此，在下面的代码中，传递给setInterval的函数内的this与封闭函数中的this值相同：
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| 正确地指向person 对象
    console.log(this.age); //这里正常输出 1 2 3 4 ...
  }, 1000);
}

var p = new Person();