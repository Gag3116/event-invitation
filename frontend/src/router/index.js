import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateInvitation from '../views/CreateInvitation.vue';
import InvitationPreview from '../views/InvitationPreview.vue'; // 预览邀请函的页面
import InvitationsList from '../views/InvitationsList.vue'; // 邀请函列表页面
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import RSVP from '@/views/RSVP.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/create',
    name: 'CreateInvitation',
    component: CreateInvitation,
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: '/preview/:id',
    name: 'InvitationPreview',
    component: InvitationPreview,
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: '/invitations',
    name: 'InvitationsList',
    component: InvitationsList,
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: '/rsvp/:id',
    name: 'RSVP',
    component: RSVP, // RSVP 页面无需登录
  },
  {
    path: '/responses',
    name: 'Responses',
    component: InvitationsList,
    meta: { requiresAuth: true }, // 需要登录
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由守卫，确保用户登录才能访问受保护页面
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // 检查是否有 token 确认是否登录

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // 如果访问需要认证的页面但未登录，则重定向到登录页面
    next('/login');
  } else {
    // 如果无需认证，或已登录，则继续访问目标页面
    next();
  }
});

export default router;
