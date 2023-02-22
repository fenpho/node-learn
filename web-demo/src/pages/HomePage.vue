<template>
  <div class="home">
    <section class="list">
      <p>留言列表</p>
      <ul>
        <li class="item" v-for="item in data.list" :key="item.id">{{ item.message }}</li>
      </ul>
    </section>
    <section class="put-message">
      <p>我也要留言：</p>
      <textarea type="textarea" v-model="data.message" />
      <button class="btn" @click="submitMessage">提交留言</button>
    </section>
  </div>
</template>

<script setup>
import { sendMessage, getMessage } from '@/server'
import { reactive } from 'vue'

const data = reactive({
  message: '',
  list: []
})

const getMessageList = () => {
  getMessage().then(res => {
    if (res.code === 200) {
      data.list = res.data
    }
  })
}
getMessageList()

const submitMessage = () => {
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')
  sendMessage({
    message: data.message,
    userName,
    userId
  }).then(res => {
    if (res.code === 200) {
      console.log(res)
      alert(res.message)
      data.message = ''
      getMessageList()
    }
  })
}
</script>

<style scoped>
.home .list p {
  font-size: 16px;
  font-weight: bold;
}

.home .put-message textarea {
  width: 500px;
  height: 200px;
}

.home .put-message {
  margin-top: 30px;
}

.home .put-message .btn {
  display: block;
  margin-top: 20px;
}
</style>