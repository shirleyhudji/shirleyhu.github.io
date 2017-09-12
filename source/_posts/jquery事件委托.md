---
title: jquery事件委托
date: 2017-02-26 19:59:49
tags:
---

```js

$(selector).delegate(selector, 'click', function() {

 var slug = $(this).data('slug');

 self.initData(slug);

});

```
