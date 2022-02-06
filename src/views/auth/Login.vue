<template>
<div class="main-login">
  .login
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'login-page',
  setup() {
    return {
      account: {
        username: ref(String),
        password: ref(String)
      }
    }
  }
}
</script>

<style lang="scss">
.main-login {}
</style>
