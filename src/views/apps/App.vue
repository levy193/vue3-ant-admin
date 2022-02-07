<template>
  <div class="app-main">
    <a-button @click.prevent="login">Đăng nhập</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isEmptyString } from '@/utils/lib'

let loginLoading = ref(false)

const account = {
  username: ref(String),
  password: ref(String)
}

async function login() {
  if (!isEmptyString(account.username.value) || !isEmptyString(account.password.value)) {
    loginLoading.value = true
    loginLoading.value = false
  } else {
    this.$notification .open({
      message: 'Oops!',
      description: 'Tài khoản và mật khẩu không thể để trống.'
    })
  }
}
</script>
