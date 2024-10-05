<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Register</button>
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

    const register = async () => {
      try {
        const response = await axios.post('/api/register', {
          username: username.value,
          password: password.value
        });
        localStorage.setItem('token', response.data.token);
        isLoggedIn.value = true;
        router.push('/create'); // 使用 router.push 进行跳转
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.msg === "Username already exists") {
          errorMessage.value = "Username already exists. Please choose another.";
        } else {
          errorMessage.value = "Error registering user. Please try again.";
        }
        console.error('Error registering user:', error);
      }
    };

    return {
      username,
      password,
      register,
      errorMessage
    };
  },
  name:'RegisterPage'
};
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>
