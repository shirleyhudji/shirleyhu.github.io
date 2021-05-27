---
title: BFC理解
date: 2016-10-21 20:50:55
tags:
---

### BFC布局规则
内部的Box会在垂直方向，一个接一个地放置。
Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。 => 用于清除上下margin重叠
每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。  => 用于左右布局
BFC的区域不会与float box重叠。
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
计算BFC的高度时，浮动元素也参与计算。 => 用于清除浮动

### 归纳形成BFC的几个要点
float的值不为none;
position的值为fixed或者absolute;
display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个;
overflow的值不为visible。