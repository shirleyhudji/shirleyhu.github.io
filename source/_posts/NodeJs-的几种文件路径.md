---
title: 'NodeJs 的几种文件路径 '
date: 2016-09-18 20:03:54
tags:
---
先看一个简单的栗子：

假如我们有这样的文件结构：

app/
  -lib/
    -common.js
  -model
    -task.js
    -test.js

在 task.js 里编写如下的代码：

var path = require('path');

console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));

在 model 目录下运行 node task.js 得到的输出是：

/Users/guo/Sites/learn/app/model.js
/Users/guo/Sites/learn/app/model.js/task.js
/Users/guo/Sites/learn/app/model.js
/Users/guo/Sites/learn/app/model.js

然后在 app 目录下运行 node model/task.js，得到的输出是：

/Users/guo/Sites/learn/app/model.js
/Users/guo/Sites/learn/app/model.js/task.js
/Users/guo/Sites/learn/app
/Users/guo/Sites/learn/app

那么，不好意思不是问题来了~T_T,我们可以得出一些肤浅的结论了：

__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
__filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
./: 跟 process.cwd() 一样、一样、一样的吗？

只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径，如下：

// 当前目录下
path.dirname(__filename) + '/test.js';
// 相邻目录下
path.resolve(__dirname, '../lib/common.js');
