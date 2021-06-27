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
      console.log('我是首页列表2的页面的onMounted生命周期，我只会执行多次，因为我没有被缓存来')
    })
    onActivated(() => {
      console.log('我是首页列表2的页面的onActivated生命周期，我没被缓存，根本不会执行，所以你看不见我这段话')
    })
  },
})

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
</style>
