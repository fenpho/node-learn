<template>
  <div class="login" v-if="data.type === 'login'">
    <h3 class="title">登录</h3>
    <form @submit.prevent>
      <div class="form-item">
        <label><span class="label">用户名：</span><input type="text"  v-model="data.login.name" /></label>
      </div>
      <div class="form-item">
        <label><span class="label">密码：</span><input type="password" autocomplete="new-password"  v-model="data.login.password" /></label>
      </div>
      <button @click="submitLogin">登录</button>
    </form>
    <p class="tip">没有账号？<span @click="data.type = 'register'">去注册</span></p>
  </div>
  <div class="register" v-else>
    <h3 class="title">注册账号</h3>
    <form @submit.prevent>
      <div class="form-item">
        <label><span class="label">用户名：</span><input v-model="data.register.name" /></label>
      </div>
      <div class="form-item">
        <label><span class="label">密码：</span><input type="password" autocomplete="new-password"  v-model="data.register.password" /></label>
      </div>
      <div class="form-item">
        <label><span class="label">确认密码：</span><input type="password" autocomplete="new-password"  v-model="data.register.confirmPassword" /></label>
      </div>
      <button @click="submitRegister">注册</button>
    </form>
    <p class="tip">已有账号，<span @click="data.type = 'login'">去登录</span></p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register, login } from '@/server';

const router = useRouter()
const data = reactive({
  type: 'login',
  login: {
    name: '',
    password: ''
  },
  register: {
    name: '',
    password: '',
    confirmPassword: '',
  },
})

const submitRegister = () => {
  if (!data.register.name?.length) {
    alert('请输入用户名')
    return
  }
  if (!data.register.password?.length) {
    alert('请输入密码')
    return
  }
  if (!data.register.confirmPassword?.length) {
    alert('请输入确认密码')
    return
  }
  if (data.register.confirmPassword !== data.register.password) {
    alert('两次输入密码不一致')
    return
  }

  register({
    name: data.register.name,
    password: data.register.password
  }).then(res => {
    if (res.code === 200) {
      alert(res.message)
      data.type = 'login'
    }
  })
}

const submitLogin = () => {
  // if (!data.login.name?.length) {
  //   alert('请输入用户名')
  //   return
  // }
  // if (!data.login.password?.length) {
  //   alert('请输入密码')
  //   return
  // }

  login({
    name: data.login.name,
    password: data.login.password
  }).then(res => {
    if (res.code === 200) {
      alert(res.message)
      
      sessionStorage.setItem('userName', res.data.name)
      sessionStorage.setItem('userId', res.data.id)
      router.push({
        name: 'Home'
      })
    }
  })
}
</script>

<style scoped>
.tip span {
  color: lightblue;
  cursor: pointer;
  user-select: none;
}

.form-item {
  margin-bottom: 20px;
}

.form-item .label {
  display: inline-block;
  width: 80px;
}
</style>