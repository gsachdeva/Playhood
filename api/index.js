require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const Game = require('./models/game');
const Venue = require('./models/venue');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB Connection
console.log('🔗 MONGO_URI =', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { email, password, firstName,image } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({ message: 'Email, password, and firstName are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      image
    });

    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: newUser._id }, secretKey);

    res.status(201).json({ token });

  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
