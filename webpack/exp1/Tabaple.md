# target

1、生产消费者模式 vs 发布订阅模式
2、帮助理解钩子
3、tapable的基础用法
4、hooks的封装
5、webpack plugin的写法 webpack/tapable.js
6、源码分析
7、如何把tapable改成前端适用？

# 基础概念

```js
const {
    // 同步钩子
    SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,

    // 异步并行钩子
	AsyncParallelHook,
	AsyncParallelBailHook,

    // 异步串行钩子
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook



} = require('tapable)
```

(1）hook类型解析

a.基本的钩子：没有waterfail、Bail、Loop的钩子。只会简单的调用每个tap传入的函数
b.waterfail:会从每个函数传一个返回值给下一个函数
c.Bail: 支持更早的退出，当tab进去的函数无任何返回值。bail会停止其他函数执行。
d.loop: 某个tab事件有返回值，则会循环之前执行的事件。

(2）三种注册方式
tab: 生产同步钩子对应的goods事件
tabAsync: 生产带callback回调的异步钩子对应的goods
tabPromise: 生产带promise回调的异步钩子对应的goods

(3)与注册对应的三种请求方式
call:
callAsync:
promise: