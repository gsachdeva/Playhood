require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const moment = require('moment');
const User = require('./models/user');
const Game = require('./models/game');
const Venue = require('./models/venue');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const jwt = require('jsonwebtoken');
const { use } = require('react');

console.log("🔗 MONGO_URI =", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: newUser._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log('Error creating User');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }
    if (!user.password !== password) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log('Error creating User');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
