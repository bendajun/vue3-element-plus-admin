<template>
  <div class="app-tag-view">
    <el-tag
      class="tags"
      :class="{ isActive: $route.path === tag.path }"
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
import { createNamespacedHelpers } from 'vuex';

const {
  mapState,
  mapMutations,
} = createNamespacedHelpers('tagView');

export default {
  name: 'AppTagView',
  data() {
    return {};
  },
  watch: {
    $route: {
      handler() {
        this.addVisitedTags();
      },
    },
  },
  computed: {
    ...mapState(['visitedViews']),
  },
  created() {
    this.initVisitedViews();
    this.addVisitedTags();
  },
  methods: {
    ...mapMutations({
      initVisitedView: 'INIT_VISTED_VIEW',
      addVisitedView: 'ADD_VISTED_VIEW',
      delVisitedView: 'DEL_VISTED_VIEW',
    }),
    isAffix(tag) {
      return tag.affix;
    },
    initVisitedViews() {
      this.initVisitedView(this.$store.getters['app/allRoutes']);
    },
    addVisitedTags() {
      const { name } = this.$route;
      if (name) {
        this.addVisitedView(this.$route);
      }
    },
    closeSelectedTag(view) {
      const oldVisitedViews = this.visitedViews;
      this.delVisitedView(view);
      if (view.path === this.$route.path) {
        this.toLastView(oldVisitedViews, view);
      }
    },
    handleToRoute(view) {
      if (this.$route.path !== view.path) {
        this.$router.push({
          path: view.path,
        });
      }
    },
    toLastView(oldVisitedViews, view) {
      const index = oldVisitedViews.findIndex(item => {
        return item.path === view.path;
      });
      this.$router.push({
        path: this.visitedViews[index - 1].path,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-tag-view {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
.tags {
  height: 80%;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
::v-deep.isActive  {
  color: #fff;
  background: $--app-theme-color;
  .el-icon-close {
    color: #fff;
  }
}
</style>
