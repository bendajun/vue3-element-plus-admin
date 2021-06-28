<template>
  <header class="app-header">
    <div class="app-header__fold" @click="toggleMenu">
      <i class="el-icon-s-unfold"></i>
    </div>
    <el-tooltip placement="bottom" effect="light">
      <template #content>
        <el-button type="text" @click="handleLoginOut">退出</el-button>
      </template>
      <el-button type="text">
        {{ userInfo.userName }}
        <i class="el-icon-view el-icon-arrow-down"></i>
      </el-button>
    </el-tooltip>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const store = useStore()
    const router = useRouter()
    const userInfo = store.getters['app/userInfo']
    const handleLoginOut = async() => {
      await ElMessageBox.confirm('确定退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      router.replace('/login')
      ElMessage.success({ message: '退出成功', duration: 4000 })
    }
    return {
      userInfo,
      toggleMenu: () => store.commit('app/TOGGLE_MENU_COLLAPSE'),
      handleLoginOut,
    }
  }
})

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: $--app-header-height;
  // background-color: $--app-header-background-color;
  // 不要渐变色注释即可，然后使用上方的背景色
  background:linear-gradient(to right, rgba(14, 185, 221, 1), rgba(108, 66, 183, 1));
  box-shadow: 3px 3px 3px 3px rgba(14, 185, 221, .1);
  &__fold {
    width: 30px;
    cursor: pointer;
  }
}
</style>
