const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const moment = require('moment');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const jwt = require('jsonwebtoken');

mongoose.connect(
  'mongodb+srv://sachdevag8944:Krishiv@cluster0.j1wwvqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
