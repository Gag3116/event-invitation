import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';

// 创建全局响应式状态，用于跟踪用户是否已登录
const isLoggedIn = ref(!!localStorage.getItem('token'));

const app = createApp(App);

// 把 isLoggedIn 作为全局属性传递给所有组件
app.provide('isLoggedIn', isLoggedIn);

app.use(router).mount('#app');
