<template>
  <div class="app-aside">
    <div class="app-aside__logo">
      <span v-if="!isCollapse">后台管理系统LOGO</span>
    </div>
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="transparent"
        :default-active="menuActive"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <app-menu-item
          v-for="menu in allRoutes"
          :key="menu.name"
          :menu="menu"
        ></app-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import AppMenuItem from './AppMenuItem'

export default defineComponent({
  name: 'AppAside',
  components: {
    AppMenuItem,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    return {
      menuActive: computed(() => route.path),
      allRoutes: computed(() => store.getters['app/allRoutes']),
      isCollapse: computed(() => store.getters['app/isCollapse']),
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-aside {
  padding-bottom: 36px;
  background-color: $--app-aside-background-color;
}
.app-aside__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $--app-header-height;
  border-bottom: 1px solid rgba(14, 185, 221, .5);
  color: #fff;
}
:deep(.el-scrollbar) {
  height: 100%;
}
</style>
