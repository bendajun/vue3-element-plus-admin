<template>
  <div>
    此页面是测试接口出错登陆重定向的
    <div>操作：一直刷新当前页面即可</div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

import { test } from '@/api/user'
export default {
  setup() {
    onMounted(() => {
      test()
    })
  },
}
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
</style>
