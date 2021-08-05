# 项目代码规范汇总
  * eslint + standard 标准
  * stylelint + scss + css-order
  * 全局组件放在components目录下，局部组件放在对应页面的components文件夹下
  * 页面已文件夹的形式命名 + index.vue的形式，全局组件命名全部采用文件夹 + 大驼峰.vue的形式，局部组件采用大驼峰.vue的形式放在components文件夹下
  * 组件引入时采用大驼峰形式命名，使用时采用横线分割。js变量使用小驼峰，css变量使用横线和下划线分割。
  * css命名要语义化：一级： app 二级嵌套： app-header 三级嵌套： app-header__title 四级嵌套： app-header__title-name
  * html: 属性名放在前面，@click点击事件放在后面，属性和事件超过三个就要换行。组件无插槽内容的全部使用单标签闭合。


# commit提交规范
``` js
build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
merge：分支合并 Merge branch ? of ?
fix：bug 修复
perf：性能, 体验优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型
```