---
layout: post_layout
title: Qt 容器类内存控制备忘
time: 2019年03月28日 星期四
location: 北京
pulished: true
excerpt_separator: "```"
---

## 前言
目前开发的Qt监控程序需要能够承受在7×24小时连续工作，经过测试程序在24小时运行后，内存达到惊人的的1G左右，因此针对这个问题，对代码进行优化调整。

## 分析原因
内存持续增长，很显然存在内存泄漏问题。

### 第三方库引起内存泄漏

经过观察，程序每隔30s内会有明显增长。根据这个现象，很快定位在调用第三方计算库后内存会涨，目前来看是第三方库的问题。

经过协调，第三方库提供了内存修复的版本，新版本发布后，内存增长有了缓解，但是依然达不到要求。

### Qt 容器类的内存分配问题

排除第三方库引起的内存泄漏后，很显然我们自身的程序也存在问题，在排除new/delete等低级错误后，我把目光集中到Qt的几个常用容器类上。当初开发使用Qt，为了方便，使用了很多<code>QList</code>、<code>QStringList</code>、<code>QVector</code>等常用容器类。使用断点调试，我一步一步定位，发现在几个清理过程中，内存并没有如想象一般减少。

<code>QList</code>内存由Qt自身控制，会在程序结束后统一回收，很显然对长时间运行的程序，无法及时释放导致程序内存越来越大，我们需要手动控制内存。

```C
void QList::reserve(int alloc)

Reserve space for alloc elements.If alloc is smaller than the current size of 
the list, nothing will happen.Use this function to avoid repetetive 
reallocation of QList's internal data if you can predict how many elements 
will be appended. Note that the reservation applies only to the internal 
pointer array.This function was introduced in Qt 4.7.
```

使用<code>reserve()</code>预分配最大可用空间，在<code>Qlist</code>超过预分配的内存空间，在执行<code>clear()</code>时会马上释放多余分配的空间，从而实现对内存的控制。

## 结束
目前先总结到这儿，期待后续修改的效果，在此做个记录。
