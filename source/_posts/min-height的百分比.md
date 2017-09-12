---
title: min-height的百分比
date: 2017-04-06 19:51:50
tags:
---
设置min-height的元素即使内容的高度很少时也能撑开到min-height设置的高度;当内容的高度大于min-height时就设置为内容的高度.

要使min-height的百分比值生效,其父元素的**height**值必须为一个**固定的高度**或者是一个有效的**百分比高度**.

值得注意的是,父元素设置了有效的min-height但没有设置height属性时,子元素的height和min-height的百分比不会生效.因为设置height和min-height必须基于一个设置了固定高度或者是一个有效百分比高度的父元素.
