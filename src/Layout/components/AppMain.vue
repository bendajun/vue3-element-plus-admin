<template>
  <div class="app-main">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive> -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain',
})

</script>

<style lang="scss" scoped>
@import '@/style/var.scss';
.app-main {
  padding: 12px;
}
</style>
