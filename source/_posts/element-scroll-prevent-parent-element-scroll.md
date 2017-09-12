---
title: 元素滚动时禁止父元素滚动
date: 2016-12-29 20:01:59
tags:
---

```js
import Vue from 'vue'

// from: http://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/

function handleStopScroll (e) {
  let el = e.currentTarget
  let scrollTop = el.scrollTop
  let scrollHeight = el.scrollHeight
  let height = el.clientHeight
  let delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0)
  console.log(scrollTop, scrollHeight, height, delta)

  // delta > 0 上滚
  // delta < 0 下滚
  if ((delta > 0 && scrollTop <= delta) ||
    (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
    el.scrollTop = delta > 0 ? 0 : scrollHeight
    event.preventDefault()
  }
}

let eventType = 'mousewheel'
if (window.document.mozHidden !== undefined) {
  eventType = 'DOMMouseScroll'
}

Vue.directive('stop-scroll', {
  bind () {
    this.el.addEventListener(eventType, handleStopScroll, false)
  },
  unbind () {
    this.el.removeEventListener(eventType, handleStopScroll)
  }
})
```
