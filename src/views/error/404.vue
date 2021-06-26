<template>
  <div class="page--full">
    404
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        console.log(val)
      }
    }
  },
})
/*
  当我访问一个不存在的路径的时候，如/is/does/not/exist，会跳转到当前页面，路由信息如下
  fullPath: "/is/does/not/exist"
  hash: ""
  href: "/is/does/not/exist"
  matched: [{…}]
  meta: {}
  name: "notFound"
  params:
  notFoundPath: (4) ["is", "does", "not", "exist"]
  __proto__: Object
  path: "/is/does/not/exist"
  query: {}
  redirectedFrom: undefined
*/

</script>
