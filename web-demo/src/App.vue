<template>
  <ul class="link-wrap" @click="toPage">
    <li v-for="item in data.links" class="link" :key="item.link" :link="item.link">{{ item.name }}</li>
  </ul>
  <router-view />
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const data = reactive({
  links: [
    {
      name: '首页',
      link: 'Home'
    },
    {
      name: '登录',
      link: 'Login'
    },
  ]
})
const router = useRouter()
const toPage = $event => {
  router.push({
    name: $event.target.getAttribute('link')
  })
}
</script>

<style>
#app {
  padding: 20px;
}

.link-wrap {
  overflow: hidden;
}

.link-wrap .link {
  float: left;
  list-style: none;
  margin: 5px 10px;
  color: lightblue;
  cursor: pointer;
  user-select: none;
}
</style>
