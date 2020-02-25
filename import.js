//目前 nodejs(8.x)不支持
import {firstName, lastName as surname, year} from './export';
console.log(firstName);

//import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
// import {a} from './xxx.js'
// a = {}; // Syntax Error : 'a' is read-only;
//但是，如果a是一个对象，改写a的属性是允许的。
// import {a} from './xxx.js'
// a.foo = 'hello'; // 合法操作

// import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
// import {myMethod} from 'util';


// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。
// foo();
// import { foo } from 'my_module';
// 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。


//import(); //提案，还未支持，异步加载
//import()返回一个 Promise 对象。下面是一个例子。
// const main = document.querySelector('main');
// import(`./section-modules/${someVariable}.js`)
// .then(module => {
//     module.loadPageInto(main);
// })
// .catch(err => {
//     main.textContent = err.message;
// });

// 下面是import()的一些适用场合。
// （1）按需加载。
// import()可以在需要的时候，再加载某个模块。
// button.addEventListener('click', event => {
//   import('./dialogBox.js')
//   .then(dialogBox => {
//     dialogBox.open();
//   })
//   .catch(error => {
//     /* Error handling */
//   })
// });
// 上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
// （2）条件加载
// import()可以放在if代码块，根据不同的情况，加载不同的模块。
// if (condition) {
//   import('moduleA').then();
// } else {
//   import('moduleB').then();
// }
// 上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。
// （3）动态的模块路径
// import()允许模块路径动态生成。
// import(f())
// .then(...);
// 上面代码中，根据函数f的返回结果，加载不同的模块。

//import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
import('./myModule.js')
.then(({export1, export2}) => { //export1和export2都是myModule.js的输出接口，可以解构获得
  // ...·
});

import('./myModule.js')
.then(myModule => { 
  console.log(myModule.default); //如果模块有default输出接口，可以用参数直接获得。
});

//如果想同时加载多个模块，可以采用下面的写法。
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   //···
});

//import()也可以用在 async 函数之中。
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();



