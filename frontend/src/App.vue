<template>
  <div id="app">
    <!-- 如果不是 RSVP 页面则显示 header -->
    <header v-if="!isRSVP">
      <h1>Event Invitation App</h1>
      <nav>
        <router-link to="/">Home</router-link>

        <!-- 登录状态相关导航链接 -->
        <span v-if="!isLoggedIn"> | </span>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <span v-if="!isLoggedIn"> | </span>
        <router-link v-if="!isLoggedIn" to="/register">Register</router-link>

        <!-- 已登录用户的链接 -->
        <span v-if="isLoggedIn"> | </span>
        <router-link v-if="isLoggedIn" to="/create">Create Invitation</router-link>
        <span v-if="isLoggedIn"> | </span>
        <router-link v-if="isLoggedIn" to="/responses">View Responses</router-link>
        <span v-if="isLoggedIn"> | </span>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, provide, computed } from 'vue'; // 使用 ref 和 provide
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const isLoggedIn = ref(!!localStorage.getItem('token')); // ref 用于存储登录状态
    const route = useRoute();
    const router = useRouter();

    // 计算是否为 RSVP 页面
    const isRSVP = computed(() => {
      return route.path.startsWith('/rsvp');
    });

    // 提供登录状态
    provide('isLoggedIn', isLoggedIn);

    // 退出登录逻辑
    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      router.push('/login');
    };

    return {
      isRSVP,
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style>
/* 样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

header {
  background-color: #f8f8f8;
  padding: 20px;
  margin-bottom: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #42b983;
  margin: 0 10px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
</style>
