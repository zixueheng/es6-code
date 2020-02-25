var counter = function(arr) {
    return `数组中有${arr.length}个元素`; //模板字符串
}

module.exports = {
    counter: counter,
    sum: function(a,b){
        return `A加B的和是${a+b}`; //模板字符串
    },
    pi: 3.14
}