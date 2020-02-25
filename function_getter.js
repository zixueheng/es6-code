// get语法将对象属性绑定到查询该属性时将被调用的函数。
// {get prop() { ... } }
// {get [expression]() { ... } }

// 参数
// prop
//     要绑定到给定函数的属性名。
// expression
//     从 ECMAScript 2015 开始，还可以使用一个计算属性名的表达式绑定到给定的函数。 

//在新对象初始化时定义一个getter
let obj = {
    log: ['a', 'b'],
    get last(){
        if (this.log.length == 0) return undefined;
        return this.log[this.log.length - 1];
    }
}
console.log(obj.last); //b
delete obj.last; //只需使用 delete，就可删除 getter：
console.log(obj.last); //undefined

//要随时将 getter 添加到现有对象，使用 Object.defineProperty().
var o = { a:0 }
Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });
console.log(o.b) // Runs the getter, which yields a + 1 (which is 1)

//使用计算属性名
var expr = 'foo';
var obj2 = {
  get [expr]() { return 'bar'; }
};
console.log(obj2.foo); // "bar"