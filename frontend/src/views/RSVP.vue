<template>
  <div v-if="loading" class="loading">Loading...</div> <!-- 显示加载状态 -->
  <div v-else-if="invitation" class="rsvp-container">
    <div class="invitation-details">
      <h2>RSVP for {{ invitation.weddingName }}</h2>
      <p><strong>Date:</strong> {{ new Date(invitation.weddingDate).toLocaleDateString() }}</p>
      <p><strong>Location:</strong> {{ invitation.weddingLocation }}</p>
    </div>

    <!-- RSVP 表单 -->
    <form @submit.prevent="submitRSVP" class="rsvp-form">
      <div class="form-group">
        <label for="name">Your Name:</label>
        <input v-model="name" type="text" id="name" placeholder="Enter your name" required />
      </div>
      <div class="form-group">
        <label for="attendingCount">Number of Attendees:</label>
        <input v-model.number="attendingCount" type="number" id="attendingCount" min="1" placeholder="Number of attendees" required />
      </div>
      <button type="submit" class="submit-button">Submit RSVP</button>
    </form>

    <p v-if="responseMessage" class="response">{{ responseMessage }}</p>
  </div>
  <p v-else>Error loading invitation details. Please try again later.</p> <!-- 显示错误信息 -->
</template>

<script>
import axios from '@/utils/axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const invitation = ref(null); // 保存邀请函数据
    const name = ref(''); // RSVP 提交者姓名
    const attendingCount = ref(1); // 出席人数，默认值为 1
    const responseMessage = ref(''); // 用于显示提交 RSVP 成功或失败的消息
    const loading = ref(true); // 控制加载状态

    // 获取邀请函数据
    const fetchInvitation = async () => {
      try {
        const response = await axios.get(`/api/invitation/${route.params.id}`);
        invitation.value = response.data; // 保存获取到的邀请函数据
      } catch (error) {
        console.error('Error fetching invitation:', error);
        invitation.value = null; // 如果获取失败，设置为 null
      } finally {
        loading.value = false; // 请求完成后，取消 loading 状态
      }
    };

    // 提交 RSVP 表单
    const submitRSVP = async () => {
      try {
        await axios.post(`/api/invitation/${route.params.id}/rsvp`, {
          name: name.value,
          attendingCount: attendingCount.value // 提交 RSVP 时的出席人数
        });
        responseMessage.value = 'RSVP submitted successfully!';
      } catch (error) {
        responseMessage.value = 'Error submitting RSVP. Please try again.';
        console.error('Error submitting RSVP:', error);
      }
    };

    // 在页面加载时获取邀请函数据
    onMounted(() => {
      fetchInvitation();
    });

    return {
      invitation,
      name,
      attendingCount,
      submitRSVP,
      responseMessage,
      loading,
    };
  }
};
</script>

<style>
/* RSVP 容器 */
.rsvp-container {
  max-width: 600px;
  margin: 30px auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* 邀请函详情 */
.invitation-details {
  text-align: center;
  margin-bottom: 20px;
}

.invitation-details h2 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.invitation-details p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

/* RSVP 表单 */
.rsvp-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

/* 提交按钮 */
.submit-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

/* 提示消息 */
.response {
  margin-top: 20px;
  color: green;
  text-align: center;
  font-size: 14px;
}

/* Loading 样式 */
.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
}
</style>
