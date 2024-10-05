<template>
  <div v-if="invitation">
    <h2>Invitation Preview</h2>
    <div class="invitation-card">
      <h3>{{ invitation.weddingName }}</h3>
      <p>Date: {{ new Date(invitation.weddingDate).toLocaleDateString() }}</p>
      <p>Location: {{ invitation.weddingLocation }}</p>
      <p>
        RSVP link: 
        <a :href="rsvpLink">{{ rsvpLink }}</a>
        <!-- 复制链接按钮 -->
        <button @click="copyLink" class="copy-button">Copy Link</button>
      </p>
    </div>

    <!-- RSVP 回复表格 -->
    <h3>Guest RSVPs</h3>
    <table v-if="invitation.rsvp && invitation.rsvp.length > 0" class="rsvp-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Number of Attendees</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guest in invitation.rsvp" :key="guest.name">
          <td>{{ guest.name }}</td>
          <td>{{ guest.attendingCount }}</td> <!-- 显示出席人数 -->
        </tr>
        <tr class="total-row">
          <td><strong>Total</strong></td>
          <td><strong>{{ totalAttendingCount }}</strong></td> <!-- 显示总出席人数 -->
        </tr>
      </tbody>
    </table>
    <p v-else>No RSVPs yet.</p>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
import axios from '@/utils/axios';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute(); // 获取动态路由中的邀请函 ID
    const invitation = ref(null);
    const rsvpLink = ref('');
    const copyMessage = ref(''); // 复制操作的提示消息

    // 计算总出席人数
    const totalAttendingCount = computed(() => {
      if (!invitation.value || !invitation.value.rsvp) {
        return 0;
      }
      return invitation.value.rsvp.reduce((total, guest) => total + (guest.attendingCount || 0), 0); // 累加所有出席人数
    });

    const fetchInvitation = async () => {
      try {
        const response = await axios.get(`/api/invitation/${route.params.id}`); // 根据邀请函 ID 获取邀请函详情
        invitation.value = response.data;
        rsvpLink.value = `${window.location.origin}/rsvp/${response.data._id}`; // 动态生成 RSVP 链接
      } catch (error) {
        console.error('Error fetching invitation:', error);
      }
    };

    // 复制 RSVP 链接到剪贴板
    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(rsvpLink.value); // 将 RSVP 链接复制到剪贴板
        copyMessage.value = 'Link copied!';
        setTimeout(() => {
          copyMessage.value = ''; // 3秒后清除消息
        }, 3000);
      } catch (error) {
        console.error('Failed to copy the link:', error);
        copyMessage.value = 'Failed to copy link!';
      }
    };

    onMounted(() => {
      fetchInvitation(); // 组件加载时获取邀请函详情
    });

    return {
      invitation,
      rsvpLink,
      totalAttendingCount,
      copyLink,
      copyMessage // 提示消息
    };
  }
};
</script>

<style>
.invitation-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px 0;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 600px;
  margin: auto;
}

.invitation-card h3 {
  margin-top: 0;
}

.invitation-card p {
  margin: 5px 0;
}

.copy-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.copy-button:hover {
  background-color: #45a049;
}

.rsvp-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.rsvp-table th, .rsvp-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.rsvp-table th {
  background-color: #f2f2f2;
}

.total-row td {
  font-weight: bold;
  background-color: #f2f2f2;
}

.copy-message {
  color: green;
  font-size: 12px;
  margin-left: 10px;
}
</style>
