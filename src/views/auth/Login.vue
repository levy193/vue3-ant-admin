<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isEmptyString } from '@/utils/lib'
import { useAccountStore } from '@/store/account'
import { notification } from 'ant-design-vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const accountStore = useAccountStore()
const loading = ref(false)
const account = ref({
  username: '',
  password: ''
})
const usernameRef = ref(null)
const passwordType = ref('password')

onMounted(() => {
  usernameRef.value.focus()
})

function showHidePassword() {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

async function login() {
  if (!isEmptyString(account.value.username) || !isEmptyString(account.value.password)) {
    loading.value = true
    try {
      await accountStore.login(account.value)
      router.push({
        path: '/',
        replace: true
      })
    } catch (error) {
      // Error
    }
    
    loading.value = false
  } else {
    notification.error({
      message: 'Error',
      description: 'Tài khoản và mật khẩu không thể để trống.'
    })
  }
}
</script>

<template>
  <div class="login-main">
    <a-row type="flex" justify="center">
      <a-col :span="8" class="login-section">
        <a-card title="Đăng nhập vào hệ thống">
          <a-form :model="account">
            <a-form-item label="Tài khoản">
              <a-input
                ref="usernameRef"
                v-model:value="account.username"
              />
            </a-form-item>
            <a-form-item label="Mật khẩu">
              <a-input
                :type="passwordType"
                v-model:value="account.password"
              >
                <template #suffix>
                  <EyeOutlined v-if="passwordType === 'password'" @click="showHidePassword"/>
                  <EyeInvisibleOutlined v-else @click="showHidePassword" />
                </template>
              </a-input>
            </a-form-item>
            <a-row type="flex" justify="end">
              <a-button
                type="primary"
                :loading="loading"
                @click.prevent="login"
              >
                Đăng nhập
              </a-button>
            </a-row>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss">
.login-main {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-section {
    margin-top: 20vh;
    padding: 24px;
  }
}
</style>