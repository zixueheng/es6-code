// 当尝试设置属性时，set语法将对象属性绑定到要调用的函数。
// {set prop(val) { . . . }}
// {set [expression](val) { . . . }}

// 参数
// prop
//     要绑定到给定函数的属性名。
// val
//     用于保存尝试分配给prop的值的变量的一个别名。
// 表达式
//     从 ECMAScript 2015 开始，还可以使用一个计算属性名的表达式绑定到给定的函数。 
var language = {
    set current(name) {
        this.log.push(name);
    },
    log: []
}
language.current = 'EN';
console.log(language.log); // ['EN']
language.current = 'FA';
console.log(language.log); // ['EN', 'FA']

delete language.current; //使用delete操作符移除 setter
language.current = 'CN';
console.log(language.log);

//我们可以随时使用 Object.defineProperty() 给一个已经存在的对象添加一个 setter
var o = {a:0};
Object.defineProperty(o, 'b', {set: function(x){this.a = x / 2; }});
o.b = 4;
console.log(o.a); //2

//使用计算属性名
var expr = "foo";
var obj = {
  baz: "bar",
  set [expr](v) { this.baz = v; }
};
console.log(obj.baz); // "bar"
obj.foo = "baz";      // run the setter
console.log(obj.baz); // "baz"