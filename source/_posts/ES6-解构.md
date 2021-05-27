---
title: ES6 解构
date: 2017-04-24 19:53:21
tags:
---

## 数组
### 从数组中取元素
```js
const names = ['Luke', 'Eva', 'Phil'];

const [first] = names;
console.log(first); // 'Luke'

const [first, second] = names;
console.log(first, second); // 'Luke' 'Eva'
```
### 元素缺失时的默认值
```js
const [first, second, third, fourth='Martin'] = names;
console.log(fourth); // 'Martin'
```
### 跳过数组中的元素
```js
var [first, , second] = names;
console.log(first, second); // 'Luke' 'Phil'
```
### 分配数组中剩下的给某元素
```js
var [first, ...rest] = names;
console.log(rest); // ['Eva','Phil']
```

## 对象
```js
const person = {
  name: 'Luke',
  age: '24',
  facts: {
    hobby: 'Photo',
    work: 'Software Developer'
  }
}
```
### 从对象中提取数据
```js
const {name, age} = person;
console.log(name, age); // 'Luke' '24'
```
### 提取嵌套值
```js
const {facts: {hobby}} = person;
console.log(hobby); // 'Photo'
```
### 数据缺失时的默认值
```js
const {hometown = 'Unknown'} = person;
console.log(hometown); // 'Unknown'
```

## 解构函数参数
```js
const toString = ({name, age}) => {
  return `${name} is ${age} years old`;
}

toString(person); // Luke is 24 years old
```
