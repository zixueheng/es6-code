var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

//目前 nodejs(8.x)不支持
export {firstName, lastName, year}; //导出变量

export function multiply(x, y) {  //导出函数
    return x * y;
};

//export输出的变量就是本来的名字，但是可以使用as关键字重命名。
// function v1() {  }
// function v2() {  }
// export {
//   v1 as streamV1,
//   v2 as streamV2,
//   v2 as streamLatestVersion
// };


// circle.js
// export function area(radius) {
//     return Math.PI * radius * radius;
// }
// export function circumference(radius) {
//     return 2 * Math.PI * radius;
// }
  
// main.js
// import { area, circumference } from './circle';
// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(14));
//上面写法是逐一指定要加载的方法，整体加载的写法如下。
// import * as circle from './circle';
// console.log('圆面积：' + circle.area(4));
// console.log('圆周长：' + circle.circumference(14));


// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。
// export-default.js
// export default function () {
//   console.log('foo');
// }
// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
// import customName from './export-default'; //需要注意的是，这时import命令后面，不使用大括号。
// customName(); // 'foo'

// export default命令用在非匿名函数前，也是可以的。
// export default function foo() { //foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。
//   console.log('foo');
// }
// // 或者写成
// function foo() {
//   console.log('foo');
// }
// export default foo; //foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。

//export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。


// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
// export { foo, bar } from 'my_module';
// // 可以简单理解为
// import { foo, bar } from 'my_module';
// export { foo, bar };
// 上面代码中，export和import语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

// export { foo as myFoo } from 'my_module'; // 接口改名
// export * from 'my_module'; // 整体输出
// export { default } from 'foo'; //默认接口的写法
// 具名接口改为默认接口的写法如下。
// export { es6 as default } from './someModule';
// // 等同于
// import { es6 } from './someModule';
// export default es6;

// 模块之间也可以继承。
// 假设有一个circleplus模块，继承了circle模块。
// // circleplus.js
// export * from 'circle';
// export var e = 2.71828182846;
// export default function(x) {
//   return Math.exp(x);
// }
// 上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。

//跨模块常量
//const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;
// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3
// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3

// 案列
// 如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。
// // constants/db.js
// export const db = {
//   url: 'http://my.couchdbserver.local:5984',
//   admin_username: 'admin',
//   admin_password: 'admin password'
// };
// // constants/user.js
// export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

// 然后，将这些文件输出的常量，合并在index.js里面。
// // constants/index.js
// export {db} from './db';
// export {users} from './users';
// 使用的时候，直接加载index.js就可以了。
// // script.js
// import {db, users} from './index';
