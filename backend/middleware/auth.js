const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 获取token
  const token = req.header('x-auth-token');

  // 检查是否没有token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
