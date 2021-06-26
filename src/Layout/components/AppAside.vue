<template>
  <div class="app-aside">
    <div class="app-aside__logo">
      <span>后台管理系统LOGO</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-aside {
  padding-bottom: 36px;
  background-color: $--app-aside-background-color;
}
.app-aside__logo {
  height: $--app-header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid rgba(14, 185, 221, .5);
}
::v-deep.el-scrollbar {
  height: 100%;
}
</style>
