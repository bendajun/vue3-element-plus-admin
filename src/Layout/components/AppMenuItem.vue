<template>
  <div class="app-menu-item">
    <el-submenu v-if="!menu.hidden && children && children.length" :index="menu.path">
      <template v-slot:title>
        <g-svg-icon :icon-class="menu.meta.icon" />
        <span>{{ menu.meta.name }}</span>
      </template>
      <app-menu-item
        v-for="menu in children"
        :key="menu.name"
        :menu="menu"
      ></app-menu-item>
    </el-submenu>
    <el-menu-item v-if="!menu.hidden && !children" :index="menu.path">
      <template v-slot:title>
        <div class="app-item">
          <g-svg-icon :icon-class="menu.meta.icon" />
          <span>{{ menu.meta.name }}</span>
        </div>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppMenuItem',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const children = computed(() => props.menu && props.menu.children)

    return {
      children
    }
  }
})

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.el-menu-item.is-active { // 菜单选中时的背景颜色
  .app-item {
    color: #fff;
    background-color: $--app-aside-active-color;
  }
}
.el-menu-item:hover,:deep(.el-submenu__title:hover) { // 鼠标滑过菜单时的背景颜色
  background-color: $--app-aside-active-color!important;
}
:deep(el-submenu__title) i { // 右侧下拉图标颜色
  color: #fff;
}
// 当前菜单嵌套3层时，样式的递归，如需嵌套更多，再添加即可
.app-menu-item {
  .app-menu-item {
    .app-menu-item {
      .app-item {
        padding-left: 50px;
      }
    }
  }
}
.el-menu-item,.el-menu-item.is-active { // 菜单的样式
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px!important;
  .app-item {
    display: flex;
    align-items: center;
    width: 80%;
    height: 65%;
    padding-left: 40px;
    border-radius: 20px;
  }
}
.el-menu {
  border: none;
}
</style>

<style lang="scss">
@import "@/style/var.scss";
// 下面都是折叠后的样式
.el-menu--collapse .el-submenu__title span {
  display: none;
}
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
.el-menu--vertical {
  background: $--app-aside-active-color;
  .el-submenu__title {
    padding-left: 40px!important;
  }
}
</style>
