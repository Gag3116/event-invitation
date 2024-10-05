const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  invitations: [{ type: Schema.Types.ObjectId, ref: 'Invitation' }] // 定义 invitations 为 ObjectId 数组，引用 Invitation 模型
});

module.exports = mongoose.model('User', userSchema);
