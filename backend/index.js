const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

// 连接 MongoDB

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


// 引入路由
const authRoutes = require('./routes/authRoutes');
const invitationRoutes = require('./routes/invitationRoutes');

// 使用路由，设置 /api 前缀
app.use('/api', authRoutes); 
app.use('/api', invitationRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
