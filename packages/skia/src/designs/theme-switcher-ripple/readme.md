实现思路

一. 截图
二. 将截图作为页面最高级(zIndex)的组件, 再把新主题的页面也截图, 旧主题截图为 A, 新主题截图为 B
三. 把 A 截图后放在上面, 然后截图新主题, 再把新主题截图
三. 然后页面切换为另一种主题模式, 但是截图还是保持在最高级, 所以真实页面不会被看到
四. 在截图上面播放 Clip 动画, 通过 Clip 动画的属性, Clip 为一个圆形, Clip 部分透明
