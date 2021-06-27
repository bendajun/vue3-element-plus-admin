<template>
  <div class="app-tag-view">
    <el-tag
      class="tags"
      :class="{ isActive: route.path === tag.path }"
      v-for="tag in visitedViews"
      :closable="!tag.affix"
      :key="tag.path"
      @click="handleToRoute(tag)"
      @close="!isAffix(tag) ? closeSelectedTag(tag) : ''"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
import { defineComponent, watch, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AppTagView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const visitedViews = computed(() => store.state.tagView.visitedViews)
    const initVisitedView = (allRoutes) => store.commit('tagView/INIT_VISTED_VIEW', allRoutes)
    const addVisitedView = (route) => store.commit('tagView/ADD_VISTED_VIEW', route)
    const delVisitedView = (view) => store.commit('tagView/DEL_VISTED_VIEW', view)

    const isAffix = tag => tag.affix

    const initVisitedViews = () => {
      initVisitedView(store.getters['app/allRoutes'])
    }

    const addVisitedTags = () => {
      const { meta } = route
      if (meta && meta.name) {
        addVisitedView(route)
      }
    }

    const toLastView = (oldVisitedViews, view) => {
      const index = oldVisitedViews.findIndex(item => {
        return item.path === view.path
      })
      router.push({
        path: visitedViews.value[index - 1].path,
      })
    }

    const closeSelectedTag = (view) => {
      const oldVisitedViews = visitedViews.value
      delVisitedView(view)
      if (view.path === route.path) {
        toLastView(oldVisitedViews, view)
      }
    }

    const handleToRoute = (view) => {
      if (route.path !== view.path) {
        router.push({
          path: view.path,
        })
      }
    }

    onMounted(() => {
      initVisitedViews()
      addVisitedTags()
    })

    watch(route, () => {
      addVisitedTags()
    })

    return {
      route,
      visitedViews,
      isAffix,
      handleToRoute,
      closeSelectedTag,
    }
  },
})

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-tag-view {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  background: #fff;
}
.tags {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  margin: 0 2px;
  cursor: pointer;
}
:deep(.isActive) {
  color: #fff;
  background: $--app-theme-color;
  .el-icon-close {
    color: #fff;
  }
}
</style>
