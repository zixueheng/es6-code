const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]); //等同于下面逻辑
// const items = [
//     ['name', '张三'],
//     ['title', 'Author']
// ];
// const map = new Map();
// items.forEach(
//     ([key, value]) => map.set(key, value)
// );

// map.size // 2
// map.has('name') // true
// map.get('name') // "张三"
// map.has('title') // true
// map.get('title') // "Author"
// map.delete('title') //true
// map.clear()


// keys()：返回键名的遍历器。
// values()：返回键值的遍历器。
// entries()：返回所有成员的遍历器。
// forEach()：遍历 Map 的所有成员。

const map2 = new Map([
['F', 'no'],
['T',  'yes'],
]);

for (let key of map2.keys()) {
console.log(key);
}
// "F"
// "T"

for (let value of map2.values()) {
console.log(value);
}
// "no"
// "yes"

for (let item of map2.entries()) {
console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map2.entries()) {
console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map2) {
console.log(key, value);
}
// "F" "no"
// "T" "yes"


// Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
const map3 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);

console.log([...map3.keys()]);// [1, 2, 3]
console.log([...map3.values()]);// ['one', 'two', 'three']
console.log([...map3.entries()]);// [[1,'one'], [2, 'two'], [3, 'three']]
console.log([...map3]);// [[1,'one'], [2, 'two'], [3, 'three']]

