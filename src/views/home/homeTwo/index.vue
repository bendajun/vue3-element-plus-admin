<template>
  <div>
    首页列表2
  </div>
</template>

<script>
import { defineComponent, onMounted, onActivated } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('我是首页列表2的页面的onMounted生命周期，我只会执行一次，因为我被keep-alive缓存下来了')
    })
    onActivated(() => {
      console.log('我是首页列表2的页面的onActivated生命周期，我只会执行多次，因为我被keep-alive缓存下来了')
    })
  },
})

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
</style>
