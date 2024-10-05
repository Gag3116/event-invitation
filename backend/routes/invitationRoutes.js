const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const User = require('../models/User');
const auth = require('../middleware/auth');

// 创建婚礼邀请（仅限已登录用户）
router.post('/create', auth, async (req, res) => {
  const { weddingName, weddingDate, weddingLocation } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newInvitation = new Invitation({
      weddingName,
      weddingDate,
      weddingLocation,
      rsvp: []
    });
    await newInvitation.save();

    // 确保 invitations 字段存在并且是数组
    if (!user.invitations) {
      user.invitations = [];
    }

    // 将邀请函的 ID 关联到用户
    user.invitations.push(newInvitation._id);
    await user.save();

    res.status(201).json(newInvitation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 获取用户的所有邀请函（需要登录）
router.get('/invitations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('invitations');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.invitations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 获取单个邀请函的详情（不需要登录）
router.get('/invitation/:id', async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ msg: 'Invitation not found' });
    }
    res.json(invitation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 提交 RSVP（不需要登录）
router.post('/invitation/:id/rsvp', async (req, res) => {
  const { name, attendingCount } = req.body; // 接收姓名和出席人数

  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ msg: 'Invitation not found' });
    }

    // 更新 RSVP 列表，存储姓名和出席人数
    invitation.rsvp.push({ name, attendingCount });
    await invitation.save();

    res.status(200).json({ msg: 'RSVP submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
