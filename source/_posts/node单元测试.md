---
title: node单元测试
date: 2017-09-04 14:34:59
tags: node
---
## 为什么需要单元测试
单元测试的重要就像城市离不开下水道，虽然一般用户感知不到，但一旦没有或不健全，就是灾难，参见天朝的城市...浏览器端 js 的单元测试，因为前端业务的多变性和对dom的依赖，业务代码的单测一直很难展开，而 node 应用不存在这个问题，node 中没有dom，而且变化会比前端少，稳定性诉求更高。node 中单元测试容易展开，且成效好。

## node 中的单元测试
[mocha](https://mochajs.org/) 是常用的 node 单元测试框架，使用简单且灵活，是进行 node 单测的首选。

安装 mocha：

```bash
npm install -g mocha
```
在 test 目录我们新建一个 demo-spec.js（约定-spec为用例文件） 文件，测试数组的 indexOf() 方法：
```js
var assert = require("assert");
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});
```
assert 模块是 node 内置的断言库。

describe() 用于定义测试用例组，是可以嵌套的。

it() 是定义具体的测试用例。

assert.equal() 用于判断值是否符合预期。

命令行运行用例 ：
```bash
mocha
```
默认会运行 test 目录下的所有用例文件，输出的信息
```bash
Array
#indexOf()
  ✓ should return -1 when the value is not present
```

## should断言库
node 内置的断言库 assert ，功能比较弱，不太好用，推荐使用 should ，详细api可以看 [should.js](http://shouldjs.github.io/)。

should 的断言方法注入到 Object.prototype 中，所以断言的风格更符合用户思维习惯，也支持链式调用，跟 jQuery 有点像：
```js
var should = require("should");
describe('Should test', function() {
    it('number', function() {
        (123).should.be.a.Number;
    });
    it('object property', function() {
        var obj = {name:'minghe',email:"minghe36@gmail.com"};
        obj.should.have.property('name','minghe');
        obj.should.have.property('email');
    });
});
```
(123).should.be.a.Number 判断 123 是否是一个数字，适用于其他类型的判断。

obj.should.have.property('name','minghe') obj 对象是否包含属性 name ，且 name = 'minghe' 。
更多的 api 请看 文档

## mocha异步测试
```js
var fs = require('fs');
var should = require('should');
describe('fs', function() {
    describe('#readFile()', function() {
        it('should not be null', function(done) {
            fs.readFile('./package.json', 'utf8', function(err,res){
                if (err) throw err;
                res.should.not.equal(null);
                done();
            });
        });
    });
});
```
关键在于 done 实参，必须在执行完异步后（在异步回调中）执行下 done()，就能捕获到用例。

回调函数 done() 支持接收一个错误：done(err)，用于简化错误处理。

## supertest请求测试
在 node 业务应用中，我们经常需要测试路由的可用性，如何处理呢？

可以使用 supertest 模块，supertest 专门用于 http 断言，支持 http 请求测试。

用例写法：

```js
var superagent = require('supertest');
var app = require('../app');

function request() {
    return superagent(app.listen());
}

describe('Routes', function () {
    describe('GET /', function () {
        it('should return 200', function (done) {
            request()
                .get('/')
                .expect(200, done);
        });
    });
});
```

superagent(app.listen()) 会截获 koa 的 http 请求，可以使用 get 、 post 等方法，对请求进行测试。

```js
request()
    .get('/')
    .expect(200, done);
```

get('/') 即测试首页 get 请求，.expect(200, done) 测试 请求状态码是否为 200 （请求成功），done 是必须传入的，这样请求测试结束后，才能把测试信息推送给mocha处理。

上述测试代码等价于：

```js
request()
    .get('/')
    .expect(200)
    .end(function(err, res){
        if (err) return done(err);
        done();
    });
```

.end() 回调会在请求完成后触发，可以在回调中对错误进行处理，res 包含完整的请求信息，可以对这些信息进行测试，比如页面输出的内容等。

运行命令 ：

```bash
mocha --harmony
```

留意：测试 koa 的请求必须加--harmony，否者会抛异常。

我们经常需要对 json 接口的数据结构合法性进行测试，如何借助 supertest 实现测试呢？

我们新建个 /api/user/:id 的路由，返回一个用户信息：

```js
app.get('/api/user/:id',function *(){
    var user = {name:'minghe',email:'minghe36@gmail.com'};
    user = JSON.stringify(user);
    this.body = user;
})
```

测试此路由是否返回正确的数据：

```js
it('should be json',function(done){
    request()
        .get('/api/user/1')
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            var text = res.text;
            var json = JSON.parse(text);
            json.should.have.property('email');
            json.should.have.property('minghe');
            done();
        });
})
```

supertest 很强大，可以设置请求的头信息，使用 set() ：

```js
request()
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
```

而 expect() 除了支持状态码测试外，还支持头信息测试：.expect('Content-Type', /json/) 。

## 测试覆盖率
我们写了测试用例，但如何知道用例的覆盖率呢？

可以使用 istanbul 实现单元测试覆盖率报告，istanbul 功能非常强大，支持与 mocha 的结合。

在应用工程中执行：

```bash
npm install --save-dev istanbul
```

命令比较长，我们将其写入到 package.json 的 script 方便调用：

```json
"scripts": {
    "test": "NODE_ENV=local node --harmony node_modules/.bin/istanbul cover --report html ./node_modules/mocha/bin/_mocha -- 'test/**/*-spec.js'"
}
```

- NODE_ENV=local node --harmony ：以本地环境、es6支持启动 node 应用；
- node_modules/.bin/istanbul cover --report html ：调用 istanbul 程序执行 cover 命令（执行覆盖率计算），--report html 生成的报告以 html 的形式；
- ./node_modules/mocha/bin/_mocha -- 'test/*/-spec.js' ：关联 mocha 测试驱动程序，执行 tes 目录下 所有的后缀是 -spec.js 的用例文件。

运行 npm test ，如果一切正常，将会在工程目录中生成 coverage 目录，可以打开 coverage/index.html 查看覆盖率报告。
