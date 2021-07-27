<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          v-if="route.meta.keepAlive"
          :is="Component"
          :key="route.path"
        />
      </keep-alive>
      <component
        v-if="!route.meta.keepAlive"
        :is="Component"
        :key="route.path"
      />
    </router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain'
})
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';

.app-main {
  padding: 12px;
}
</style>
