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
const game = require('./models/game');
const moment = require('moment');
const venues = require('../jsonfiles/venuedata'); // Importing venue data

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
    const { email, password, firstName, lastName, image } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({
          message: 'Email, password, firstName and last name are required',
        });
    }
    // Check if user already exists
    console.log('🔍 Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already registered with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      image,
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
      return res
        .status(401)
        .json({ success: false, status: '401', message: 'Invalid Email' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: false, status: '401', message: 'Invalid Password' });
    }
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ success: true, status: '200', token: token });
  } catch (error) {
    console.error('Login error:', error.message);
    res
      .status(500)
      .json({
        success: false,
        status: '500',
        message: 'Internal Server Error',
      });
  }
});
app.post('/resetpassword', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: 'Email and new password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/user/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    console.log('Fetching user with ID:', userId);
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(500).json({message: 'User not found'});
    }
    return res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: 'Error fetching the user details'});
  }
});

async function addVenues() {
  try {
    let addedCount = 0;
    let skippedCount = 0;

    for (const venue of venues) {
      // Check if venue with same name or fullLink exists
      const existingVenue = await Venue.findOne({ name: venue.name });
      if (existingVenue) {
        skippedCount++;
        continue;
      }

      // If not found, insert the new venue
      await Venue.create(venue);
      addedCount++;
    }
  } catch (error) {
    console.error('❌ Error adding venues:', error);
  }
}
addVenues().catch(err => {
  console.error('❌ Error in addVenues:', err);
});

app.get('/venues', async (req, res) => {
  try {
    const venues = await Venue.find({});
    if (!venues || venues.length === 0) {
      return res.status(404).json({ message: 'No venues found' });
    }
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch venues' });
  }
});

app.post('/creategame', async (req, res) => {
  try {
    const { sport, area, date, time, admin, totalPlayers } = req.body;

    const activityAccess = 'public';

    console.log('sport', sport);
    console.log(area);
    console.log(date);
    console.log(admin);

    const newGame = new Game({
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      players: [admin],
    });

    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (error) {
    console.error('Failed to create game:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});

app.get('/games', async (req, res) => {
  try {
    const games = await Game.find({})
      .populate('admin')
      .populate('players', 'image firstName lastName');

    const currentDate = moment();
    const filteredGames = games.filter(game => {
      const gameDate = moment(game.date, 'Do MMMM');

      const gameTime = game.time?.split(' - ')[0];
      const gameDateTime = moment(
        `${gameDate.format('YYYY-MM-DD')} ${gameTime}`,
        'YYYY-MM-DD h:mm A',
      );

      return gameDateTime.isAfter(currentDate);
    });

    const formattedGames = filteredGames.map(game => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      time: game.time,
      area: game.area,
      players: game.players.map(player => ({
        _id: player._id,
        imageUrl: player.image,
        name: `${player.firstName} ${player.lastName}`,
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      adminName: `${game.admin?.firstName ?? ''} ${game.admin?.lastName ?? ''}`,
      adminUrl: game.admin?.image ?? '',
      matchFull: game.matchFull,
    }));

    res.json(formattedGames);
  } catch (err) {
    console.error('❌ Error while fetching games:', err.message);
    console.error(err.stack); // Full stack trace for debugging

    res.status(500).json({
      message: 'Failed to fetch games',
      error: err.message,
    });
  }
});

app.get('/upcoming', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log('userId', userId);
    const games = await Game.find({})
      .populate('admin')
      .populate('players', 'image firstName lastName');

    // Format games with the necessary details
    const formattedGames = games.map(game => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      time: game.time,
      area: game.area,
      players: game.players.map(player => ({
        _id: player._id,
        imageUrl: player.image, // Player's image URL
        name: `${player.firstName} ${player.lastName}`, // Optional: Player's name
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      courtNumber: game.courtNumber,
      adminName: `${game.admin.firstName} ${game.admin.lastName}`,
      adminUrl: game.admin.image, // Assuming the URL is stored in the image field
      admin: game.admin._id.toString(),
      isUserAdmin: game.admin._id.toString() === userId,
      matchFull: game.matchFull,
    }));
    res.json(formattedGames);
  } catch (error) {
    console.error('❌ Error fetching upcoming games:', error);
    res.status(500).json({ message: 'Failed to fetch upcoming games' });
  }
});

app.post('/games/:gameId/request', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { userId, courtNumber } = req.body;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the user is already in the game
    const isUserAlreadyInGame = game.requests.find(
      request => request.userId.toString() === userId,
    );
    if (isUserAlreadyInGame) {
      return res
        .status(400)
        .json({ message: 'You have already requested to join this game' });
    }

    // Add the user to the requests array
    game.requests.push({ userId, courtNumber });

    await game.save();
    res.status(200).json({ message: 'Game request sent successfully', game });
  } catch (error) {
    console.error('❌ Error while requesting game:', error);
    res.status(500).json({ message: 'Failed to request game' });
  }
});

app.get('/games/:gameId/requests', async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate({
      path: 'requests.userId',
      select: 'email firstName lastName image skill noOfGames playpals sports',
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const requestsWithUserInfo = game.requests.map(request => ({
      userId: request.userId._id,
      email: request.userId.email,
      firstName: request.userId.firstName,
      lastName: request.userId.lastName,
      image: request.userId.image,
      skill: request.userId.skill,
      noOfGames: request.userId.noOfGames,
      playpals: request.userId.playpals,
      sports: request.userId.sports,
      comment: request.comment,
    }));

    res.json(requestsWithUserInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});
