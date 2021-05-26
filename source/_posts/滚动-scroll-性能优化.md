---
title: 滚动 scroll 性能优化
date: 2017-06-05 10:46:53
tags:
---

在绑定 scroll 这类事件时，当它发生时，它被触发的频次非常高，间隔很近。如果事件中涉及到大量的位置计算、DOM 操作、元素重绘等工作且这些工作无法在下一个 scroll 事件触发前完成，就会造成浏览器掉帧。加之用户鼠标滚动往往是连续的，就会持续触发 scroll 事件导致掉帧扩大、浏览器 CPU 使用率增加、用户体验受到影响。

## 优化方法
### 1、防抖（debounce）
防抖技术可以把多个顺序地调用合并成一次，即在规定的时间间隔内只执行一次。

```js
// 简单的防抖动函数
function debounce(func, wait, immediate) {
    // 定时器变量
    var timeout;
    return function() {
    // 每次触发 scroll handler 时先清除定时器
    clearTimeout(timeout);
    // 指定 xx ms 后触发真正想进行的操作 handler
    timeout = setTimeout(func, wait);
    };
};

// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}

// 采用了防抖动
window.addEventListener('scroll',debounce(realFunc,500));
// 没采用防抖动
window.addEventListener('scroll',realFunc);
```

### 2、节流（throttle）
节流技术只允许一个函数在 x 毫秒内执行一次，跟防抖技术主要的不同在于，保证 x 毫秒内至少执行一次。

```js
// 简单的节流函数function throttle(func, wait, mustRun) {
    var timeout,
    startTime = new Date();

    return function() {
        var context = this,
        args = arguments,
        curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
        func.apply(context,args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
        }else{
                timeout = setTimeout(func, wait);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
// 采用了节流函数
window.addEventListener('scroll',throttle(realFunc,500,1000));
```

### 3、requestAnimationFrame实现节流方法
requestAnimationFrame 可替代 throttle，函数需要重新计算和渲染屏幕上的元素时，想保证动画或变化的平滑性，可以用它。

```js
var ticking = false; // rAF 触发锁

function onScroll(){
  if(!ticking) {
    requestAnimationFrame(realFunc);
    ticking = true;
  }
}

function realFunc(){
    // do something...
    console.log("Success");
    ticking = false;
}
// 滚动事件监听
window.addEventListener('scroll', onScroll, false);
```

详见：
[高性能滚动 scroll 及页面渲染优化](http://web.jobbole.com/86158/)
[实例解析防抖和节流函数](http://bubkoo.com/2017/01/18/debouncing-throttling-explained-examples/)
[页面高性能滚动scroll优化——防抖与节流](http://y.dobit.top/Detail/340.html)

```js
function debounce(fn, wait) {
    var timmer
    return function() {
        // 第一次触发函数的时候，延迟delay时间执行，如果在delay时间段内再次触发该函数，则重新开始计时
        // 如果delay时间段内没有触发该函数，则执行该函数
        if (timmer) {
            clearTimeout(timmer)
        }
        timmer = setTimeout(fn, wait)
    }
}

function throttle(fn, delay) {
    let timer = null;
    return function() {
        if(timer) return false
        timer = setTimeout(() => {
            fn()
            timer = null
        }, delay)
    }
}


function throttle(func, wait) {
    var args,
        result,
        thisArg,
        timeoutId,
        lastCalled = 0;

    return function() {
      var now = new Date,
          remain = wait - (now - lastCalled);

      args = arguments;
      thisArg = this;

      if (remain <= 0) {
        lastCalled = now;
        result = func.apply(thisArg, args);
      }
      else if (!timeoutId) {
        timeoutId = setTimeout(() => {
            lastCalled = new Date;
            timeoutId = null;
            result = func.apply(thisArg, args);
        }, remain);
      }
      return result;
    };
}
```
