---
title: CSS Grid
date: 2017-12-05 16:28:45
tags:
---
Grid(网格) 布局是第一个专门为解决布局问题而创建的 CSS 模块，我们终于不需要想尽办法hack 页面布局样式了。

## 网格容器
我们通过在元素上声明 `display：grid` 或 `display：inline-grid` 来创建一个网格容器。一旦我们这样做，这个元素的所有直系子元素将成为网格项目。
```html
<div class="wrapper">
   <div>One</div>
   <div>Two</div>
   <div>Three</div>
   <div>Four</div>
   <div>Five</div>
</div>
```
```css
.wrapper {
  display: grid;
}
```
![](images/css_grid_1.jpeg)

## 网格轨道
我们通过 `grid-template-columns` 和 `grid-template-rows` 属性来定义网格中的行和列。这些属性定义了网格的轨道。一个网格轨道就是网格中任意两条线之间的空间。
```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```
![](images/css_grid_2.jpeg)

### fr单位
轨道可以使用任何长度单位进行定义。 网格还引入了一个额外的长度单位来帮助我们创建灵活的网格轨道。新的fr单位代表网格容器中可用空间的一等份。
```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```
### 使用repeat()
使用 repeat() 标记来重复部分或整个轨道列表
```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```
也可写成：
```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```
### 隐式和显式网格
当我们创建上文中网格例子的时候，我们用 `grid-template-columns` 属性定义了自己的列轨道，但是却让网格按所需的内容创建行，这些行会被创建在隐式网格中。显式网格包含了你在 `grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列。按照默认，这些轨道将自动定义尺寸，所以会根据它里面的内容改变尺寸。

你也可以在隐式网格中用 `grid-auto-rows` 和 `grid-auto-columns` 属性来定义一个设置大小尺寸的轨道。

### 轨道大小和minmax()
下面例子中我用minmax()作为grid-auto-rows的值,自动创建的行高将会是最小100像素，最大为auto
```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
```
### 网格间距
```css
.wrapper {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   grid-column-gap: 10px;
   grid-row-gap: 1em;
}
```

## 放置网格项目
当放置子元素时，我们使用 网格线 对元素进行定位。
```html
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
  <div class="four">Four</div>
  <div class="five">Five</div>
</div>
```
```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(200px, auto);
}
.one {
  background: #e4f0f5;
  grid-column: 1;
  grid-row: 1;
}
.two {
  background: #fff3d5;
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
.three {
  background: #eeeeee;
  grid-row: 2 / 5;
  grid-column: 1;
}
.four {
  background: #e4f0f5;
  grid-column: 2;
  grid-row: 3/5;
}
.five {
  background: #fff3d5;
  grid-column: 3;
  grid-row: 3;
}
```
![](images/css_grid_3.jpeg)

使用以上的方式就能快速实现任意想要的布局。
