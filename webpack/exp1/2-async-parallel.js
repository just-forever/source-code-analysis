const {
    // 异步并行钩子
	AsyncParallelHook,
	AsyncParallelBailHook,

} = require('tapable');

// (1) AsyncParallelHook
// a.tapAsync

// const quene1 = new AsyncParallelHook(['name']);

// console.time('cost1');

// quene1.tapAsync('1', (name, cb) => {
//     setTimeout(() => {
//         console.log(name, 1);
//         cb(null, '1'); // 返回不为null，具体为某个值会怎样？
//     }, 2000)
// })

// quene1.tapAsync('2', (name, cb) => {
//     setTimeout(() => {
//         console.log(name, 2);
//         cb(null, '2'); // 返回不为null，具体为某个值会怎样？
//     }, 1000)
// })

// quene1.callAsync('tabAsync', (err, res) => {
//     console.log('over', err, res);
//     console.timeEnd('cost1');
// });
// 为什么cb传入2, 回调输出res是undefined

// 异步 其中一个出错，直接会导致出错。

// b.tabPromise

// const quene2 = new AsyncParallelHook(['name']);
// console.time('promise');
// quene2.tapPromise('1', (name) => {

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(name, 1);
//             resolve('1');
//         }, 2000)
//     })
// })

// quene2.tapPromise('2', (name) => {

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(name, 2);
//             // resolve('2');
//             reject('2')
//         }, 2000)
//     })
// })

// quene2.promise('tabPromise').then(res => {
//     console.log('over', res);
//     console.timeEnd('promise')
// })
// .catch(err => {
//     console.log('error', err)
// })
// 并行，谁先结束，谁先输出。

const quene3 = new AsyncParallelBailHook(['name']);
console.time('cost3');

// 注册goods
quene3.tapAsync('1', (name, cb) => {
    console.log(name, 1);
    cb();
})

quene3.tapAsync('2', (name, cb) => {
    console.log(name, 2);
    cb(null, '2');
})

quene3.tapAsync('3', (name, cb) => {
    console.log(name, 3);
    cb();
})

// 消费
quene3.callAsync('bail tapAsync', (err, res) => {
    console.log('over', res);
    console.timeEnd('cost3');
}) 