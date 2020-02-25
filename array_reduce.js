
var numbers = [1, 2, 3, 4];
 
function getSum(total, num) {
    return total + num;
}
console.log(numbers.reduce(getSum,1));