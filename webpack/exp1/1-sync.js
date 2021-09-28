// 同步钩子
const {
    // 同步钩子
    SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
} = require('tapable');

// 初始化hook, 确定参数
const syncHk = new SyncHook(['name', 'age'])

// 生产商品，注册事件
syncHk.tap('plugin1', (name, age) => {

    console.log('plugin1', name, age);

})

syncHk.tap('plugin2', (name, age) => {

    console.log('plugin2', name, age);

})

syncHk.call('zack', '28');

// 输出： 
// plugin1 zack 28
// plugin2 zack 28

const bailHk = new SyncBailHook(['name', 'age']);

bailHk.tap('a', (name, age) => {
    console.log('a', name, age);
})

bailHk.tap('b', (name, age) => {
    console.log('b', name, age);
    return 'b';
})

bailHk.tap('c', (name, age) => {
    console.log('c', name, age);
})

bailHk.call('jack', 29);

// 输出
// a jack 29
// b jack 29

const waterHk = new SyncWaterfallHook(['name']);

// 返回值作为下一个tap的入参。

// goods
waterHk.tap('a', (name) => {

    console.log('a', name);
    return 'a';
});

waterHk.tap('b', (name) => {

    console.log('b', name);
    return 'b';
})

waterHk.tap('c', (name) => {

    console.log('c', name);
    return 'c';
})

waterHk.call('waterHk');

// 输出
// a waterHk
// b a
// c b

const loopHk = new SyncLoopHook(['a']);

let count = 1;
loopHk.tap('sum', (a) => {
    if (count >= 3) {
        console.log('end');
        return;
    }

    count++;
    return true;
});

// 多写一个会怎样？

// loopHk.tap('sub', (a) => {
//     if (count < 1) {
//         console.log('end');
//         return;
//     }

//     count--;
//     return true;
// });

loopHk.call(1);
console.log(count);
