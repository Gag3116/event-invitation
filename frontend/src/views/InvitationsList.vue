<template>
    <div>
      <h2>Your Sent Invitations</h2>
      <ul v-if="invitations.length > 0">
        <li v-for="invitation in invitations" :key="invitation._id">
          <router-link :to="`/preview/${invitation._id}`">{{ invitation.weddingName }} - {{ new Date(invitation.weddingDate).toLocaleDateString() }}</router-link>
        </li>
      </ul>
      <p v-else>No invitations sent yet.</p>
    </div>
  </template>
  
  <script>
  import axios from '@/utils/axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const invitations = ref([]);
  
      const fetchInvitations = async () => {
        try {
          const response = await axios.get('/api/invitations'); // 获取用户所有的邀请函
          invitations.value = response.data;
        } catch (error) {
          console.error('Error fetching invitations:', error);
        }
      };
  
      onMounted(() => {
        fetchInvitations(); // 组件加载时获取邀请函数据
      });
  
      return {
        invitations
      };
    }
  };
  </script>
  
  <style>
  /* 样式可根据需求调整 */
  </style>
  