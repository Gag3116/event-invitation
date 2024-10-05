<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router'; // 导入 useRouter

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoggedIn = inject('isLoggedIn');
    const router = useRouter(); // 使用 useRouter 获取 router 实例

    const login = async () => {
      try {
        const response = await axios.post('/api/login', {
          username: username.value,
          password: password.value
        });
        localStorage.setItem('token', response.data.token);
        isLoggedIn.value = true;
        router.push('/create'); // 使用 router.push 进行跳转
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.msg === "Invalid credentials") {
          errorMessage.value = "Invalid credentials. Please try again.";
        } else {
          errorMessage.value = "Error logging in. Please try again.";
        }
        console.error('Error logging in:', error);
      }
    };

    return {
      username,
      password,
      login,
      errorMessage
    };
  },
  name:'LoginPage'
};
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>
