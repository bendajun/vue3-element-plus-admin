<template>
  <header class="app-header">
    <div class="app-header__fold" @click="handleClickFold">
      <i class="el-icon-s-unfold"></i>
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const {
  mapMutations,
} = createNamespacedHelpers('app');

export default {
  name: 'AppHeader',
  methods: {
    ...mapMutations({
      toggleMenu: 'TOGGLE_MENU_COLLAPSE',
    }),
    handleClickFold() {
      this.toggleMenu();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-header {
  height: $--app-header-height;
  // background-color: $--app-header-background-color;
  // 不要渐变色注释即可，然后使用上方的背景色
  background:linear-gradient(to right, rgba(14, 185, 221, 1), rgba(108, 66, 183, 1));
  background:-webkit-linear-gradient(left, rgba(14, 185, 221, 1), rgba(108, 66, 183, 1));
  background:-moz-linear-gradient(left, rgba(14, 185, 221, 1), rgba(108, 66, 183, 1));
  background:-o-linear-gradient(left, rgba(14, 185, 221, 1), rgba(108, 66, 183, 1));
  box-shadow: 3px 3px 3px 3px rgba(14, 185, 221, .1);
  display: flex;
  align-items: center;
  padding: 0 12px;
  &__fold {
    width: 30px;
    cursor: pointer;
  }
}
</style>
