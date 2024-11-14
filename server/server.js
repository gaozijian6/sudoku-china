const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

// 定义各难度级别的Schema
const puzzleSchema = new mongoose.Schema({
  puzzle: String,
  solution: String
});

// 创建各难度级别的Model
const Easy = mongoose.model('Easy', puzzleSchema, 'easy');
const Medium = mongoose.model('Medium', puzzleSchema, 'medium');
const Hard = mongoose.model('Hard', puzzleSchema, 'hard');
const Extreme = mongoose.model('Extreme', puzzleSchema, 'extreme');

// 定义用户Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  avatar: String,
  lastLoginAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // 建议使用环境变量存储

// 认证中间件
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: '未登录' });
  }
  
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.userId);
  
  if (!user) {
    return res.status(401).json({ success: false, message: '用户不存在' });
  }
  
  req.user = user;
  next();
};

// 改进Google登录接口
app.post('/api/auth/google', async (req, res) => {
  const { googleId, email, name, avatar } = req.body;
  
  let user = await User.findOne({ googleId });
  
  if (!user) {
    user = await User.create({
      googleId,
      email,
      name,
      avatar
    });
  }

  // 更新最后登录时间
  user.lastLoginAt = new Date();
  await user.save();
  
  // 生成JWT token
  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ 
    success: true,
    user,
    token
  });
});

// 获取当前用户信息接口
app.get('/api/user/profile', authMiddleware, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// 检查token有效性接口
app.post('/api/auth/check', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'token有效'
  });
});

// MongoDB连接配置
const mongoConnect = async () => {
  await mongoose.connect('mongodb://localhost:27017/sudoku', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB连接成功');
  
  // 查询各集合中的数据量
  const easyList = await Easy.find();
  
  console.log('Easy题目数量:', easyList);
}

mongoConnect();

// 基础中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置端口并启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

module.exports = { app, mongoose };