# vue3-compositionApi-elementPlus-admin

## vue3 + vue-router4 + vuex4
 * 项目全部使用Vue3以及生态工具的最新写法。

### 项目说明
 * 项目只包含框架的搭建，功能的完整封装，不包含任何业务组件。开箱即用。
 * 最新版的组合式api + 新版路由 + 新版store的使用
 * 采用的是前端保存路由菜单，根据后台返回的角色信息，动态加载路由和菜单渲染
 * webpack-dll分离第三方库
 * element-plus的全局自定义主题封装
 * 如何优雅的全局封装处理svg图标组件
 * 全局的自定义指令封装例子(vue3已删除过滤器)
 * 全局axios请求响应拦截封装
 * 考虑到日常开发处理时间格式化较为常见，使用dayJs封装了大量时间操作函数。(momentjs已停止维护)

### 账号密码
 * 采用淘宝的rap接口mock模式，只需要随便输入就行，只进行了非空校验

### TODO:
  * 因为是将路由和路由懒加载组件存放在vuex中的，所以使用了markRaw对组件进行了标记，防止进行Proxy代理
  * 但是目前处理方式未统一处理，后续优化

### Vue3核心Api实现
  * [步步注释为您讲解Vue3核心Api](https://github.com/bendajun/vue3-sound-code)

### Vuex4源码实现
  * [带你一步步实现Vuex4](https://github.com/bendajun/vue3-vuex-sound-code)

### 卑微
  * 如果这个项目帮助了您，请动动您的小手帮我点个star
  * 好人一生平安