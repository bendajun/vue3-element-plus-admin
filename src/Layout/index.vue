<template>
  <div class="app-layout">
    <app-aside />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import AppAside from './components/AppAside.vue'

export default defineComponent({
  components: {
    AppAside
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';
.app-layout {
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: $--app-layout-background-color;
}
.app-aside {
  width: $--app-aside-width;
  flex-shrink: 0;
}
.app-body {
  flex: 1;
}
.app-header {
  height: $--app-header-height;
}
.app-tag-view {
  height: $--app-tag-view-height;
}
.app-main {
  height: calc(100vh - #{$--app-header-height});
}
</style>
