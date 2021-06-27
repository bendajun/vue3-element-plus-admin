<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form__title" >后台管理系统</div>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="handleLogin" :loading="loading">登录</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  getLocalToken,
  setLocalToken,
  removeLocalToken,
} from '@/utils/auth'
import { getToken } from '@/api/app'

const handleToken = () => {
  if (getLocalToken()) {
    removeLocalToken() // 移出Token
    location.reload()
  }
}

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      handleToken()
    })

    const router = useRouter()
    const route = useRoute()
    const loginFormRef = ref(null)
    const formStatus = reactive({
      loading: false,
      loginForm: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
      }
    })
    const handleLogin = async() => {
      try {
        await loginFormRef.value.validate()
        formStatus.loading = true
        const params = {
          userName: formStatus.loginForm.userName,
          password: formStatus.loginForm.password,
        }
        const { code, token } = await getToken(params)
        if (code === 0) {
          setLocalToken(token)
          ElMessage.success('登录成功')
          const { redirect } = route.query || {}
          redirect ? router.push({ path: redirect }) : router.push({ path: '/' })
        }
      } catch (error) {
        console.error(error)
      } finally {
        formStatus.loading = false
      }
    }
    return {
      loginFormRef,
      ...toRefs(formStatus),
      handleLogin,
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
  overflow: hidden;
  background: url(../../assets/img/login-bg.jpg) no-repeat top center;
  background-size: cover;
}
.login-form {
  width: 260px;
  padding: 40px;
  border-radius: 10px;
  background-color: #fff;
  &__title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
  }
}
.el-button {
  width: 100%;
}
</style>
