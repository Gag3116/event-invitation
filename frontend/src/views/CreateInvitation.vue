<template>
  <div class="create-invitation-container">
    <h2>Create a New Event Invitation</h2>
    <form @submit.prevent="createInvitation" class="invitation-form">
      <div class="form-group">
        <label for="weddingName">Event Name:</label>
        <input v-model="weddingName" type="text" id="weddingName" placeholder="Enter the event name" required />
      </div>
      <div class="form-group">
        <label for="weddingDate">Event Date:</label>
        <input v-model="weddingDate" type="date" id="weddingDate" required />
      </div>
      <div class="form-group">
        <label for="weddingLocation">Event Location:</label>
        <input v-model="weddingLocation" type="text" id="weddingLocation" placeholder="Enter the event location" required />
      </div>
      <button type="submit" class="submit-button">Create Invitation</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const weddingName = ref('');
    const weddingDate = ref('');
    const weddingLocation = ref('');
    const errorMessage = ref('');
    const router = useRouter(); // 获取路由实例

    const createInvitation = async () => {
      try {
        const response = await axios.post('/api/create', {
          weddingName: weddingName.value,
          weddingDate: weddingDate.value,
          weddingLocation: weddingLocation.value
        });
        // 创建邀请函成功后跳转到预览页面
        router.push(`/preview/${response.data._id}`); // 跳转到预览页面
      } catch (error) {
        errorMessage.value = "Error creating invitation. Please try again.";
        console.error('Error creating invitation:', error);
      }
    };

    return {
      weddingName,
      weddingDate,
      weddingLocation,
      createInvitation,
      errorMessage
    };
  }
};
</script>

<style>
/* 主容器样式 */
.create-invitation-container {
  max-width: 600px;
  margin: 30px auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  text-align: center;
}

/* 标题样式 */
.create-invitation-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* 表单样式 */
.invitation-form {
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

/* 提交按钮样式 */
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

/* 错误信息样式 */
.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}
</style>
