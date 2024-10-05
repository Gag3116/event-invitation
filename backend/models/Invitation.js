const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  weddingName: { type: String, required: true },
  weddingDate: { type: Date, required: true },
  weddingLocation: { type: String, required: true },
  rsvp: [
    {
      name: String,         // RSVP 提交者的姓名
      attendingCount: Number // RSVP 提交者的出席人数
    }
  ] // RSVP 列表
});

module.exports = mongoose.model('Invitation', invitationSchema);
