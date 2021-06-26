<template>
  <div class="login" @click="aaa">
    login
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    aaa() {
      this.$router.push({
        name: 'notFound',
        params: {
          notFoundPath: 1
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
