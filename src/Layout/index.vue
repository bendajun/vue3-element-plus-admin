<template>
  <div class="app-layout">
    <!-- 使用appAsideCollapseWidth而未使用auto的原因是为了让transition属性生效 -->
    <app-aside class="app-aside" :style="{width: isCollapse ? appAsideCollapseWidth : appAsideWidth }"></app-aside>
    <div class="app-body">
      <app-header class="app-header"></app-header>
      <app-tag-view class="app-tag-view"></app-tag-view> <!--不需要此需求，去掉这个和store/tagView.js文件即可-->
      <app-main class="app-main"></app-main>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
import AppTagView from './components/AppTagView.vue'
import AppMain from './components/AppMain.vue'

import { appAsideWidth, appAsideCollapseWidth } from '@/style/var.scss'

export default defineComponent({
  components: {
    AppAside,
    AppHeader,
    AppTagView,
    AppMain,
  },
  setup() {
    const store = useStore()
    return {
      appAsideWidth,
      appAsideCollapseWidth,
      isCollapse: computed(() => store.getters['app/isCollapse']),
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';

.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: $--app-layout-background-color;
}

.app-aside {
  flex-shrink: 0;
  transition: width 0.5s;
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
