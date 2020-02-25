// class A2 {
//     constructor() {
//       this.x = 1;
//     }
//     print() {
//       console.log(this.x);
//     }
//   }
//   class B2 extends A2 {
//     constructor() {
//       super();
//       this.x = 2;
//     }
//     m() {
//       super.print();
//     }
//   }
//   let b2 = new B2();
//   console.log(b2.m()); // 2

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


// settimeout是异步执行，10ms后往任务队列里面添加一个任务，只有主线上的全部执行完，才会执行任务队列里的任务，当主线执行完成后，i是4，所以此时再去执行任务队列里的任务时，i全部是4了。对于打印4次是：
//  每一次for循环的时候，settimeout都执行一次，但是里面的函数没有被执行，而是被放到了任务队列里面，等待执行，for循环了4次，就放了4次，当主线程执行完成后，才进入任务队列里面执行。
//  　　（注意：for循环从开始到结束的过程，需要维持几微秒或几毫秒。)
// 当我把var 变成let 时
// for(let i=0;i<=3;i++){ setTimeout(function() {  console.log(i)  }, 10);}
// 打印出的是：0,1,2,3
for(var i=0;i<5;i++){
    setTimeout(() => console.log(i), 0);
}
// 5
// 5
// 5
// 5
// 5

// 当解决变量作用域，
// 因为for循环头部的let不仅将i绑定到for循环快中，事实上它将其重新绑定到循环体的每一次迭代中，确保上一次迭代结束的值重新被赋值。
// setTimeout里面的function()属于一个新的域，通过 var 定义的变量是无法传入到这个函数执行域中的，通过使用 let 来声明块变量，这时候变量就能作用于这个块，
// 所以 function就能使用 i 这个变量了；这个匿名函数的参数作用域 和 for参数的作用域 不一样，是利用了这一点来完成的。这个匿名函数的作用域有点类似类的属性，是可以被内层方法使用的。
for(let i=0;i<5;i++){
    setTimeout(() => console.log(i), 0);
}
// 0
// 1
// 2
// 3
// 4