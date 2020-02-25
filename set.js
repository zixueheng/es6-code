//集合测试
let set = new Set(); //类似于数组，但是成员的值都是唯一的，没有重复的值。
let arr = [2,3,4,5,6,2,1,2,3];

// [2,3,4,5,6,2,1,2,3].forEach(function(x){
//     set.add(x);
// });

arr.forEach(x => set.add(x)); //箭头函数，和上面写法效果一样

for(let i of set){ //遍历集合
    console.log(i);
}

const set2 = new Set(arr);
console.log(...set2);

//去除数组重复成员
let arr2 = [...new Set(arr)];
console.log(arr2);

// add(value)：添加某个值，返回 Set 结构本身。
// delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// has(value)：返回一个布尔值，表示该值是否为Set的成员。
// clear()：清除所有成员，没有返回值。

let arr3 = Array.from(set); //Array.from方法可以将 Set 结构转为数组
console.log(arr3);

let set3 = new Set(['red', 'green', 'blue']);
for (let item of set3.keys()) { //由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
  console.log(item);
}
for (let item of set3.values()) { //由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
  console.log(item);
}
for (let [key,value] of set3.entries()) {
  console.log(key,value);
}
