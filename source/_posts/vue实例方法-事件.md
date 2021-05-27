---
title: vue实例方法 / 事件
date: 2017-01-20 20:01:00
tags:
---
## vm.$on( event, callback )

参数：

{String} event
{Function} callback
用法：

监听当前实例上的自定义事件。事件可以由 vm.$emit, vm.$dispatch 或 vm.$broadcast触发。传入这些方法的附加参数都会传入这个方法的回调。

示例：

vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// -> "hi"

## vm.$emit( event, […args] )

参数：

{String} event
[...args]
触发当前实例上的事件。附加参数都会传给监听器回调。

## vm.$dispatch( event, […args] )

参数：

{String} event
[...args]
用法：

派发事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止，除非它返回 true。附加参数都会传给监听器回调。

## vm.$broadcast( event, […args] )

参数：

{String} event
[...args]
用法：

广播事件，通知给当前实例的全部后代。因为后代有多个枝杈，事件将沿着各“路径”通知。每条路径上的通知在触发一个监听器后停止，除非它返回 true。
