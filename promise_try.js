console.log('begin');
const f = () => console.log('now');
const p = Promise.resolve().then(f); //立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时
console.log('next');
// begin
// next
// now