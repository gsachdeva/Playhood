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
const venues = [
  {
    name: '147 One Four Seven Snooker, Billiards and Pool Sports Academy',
    rating: 4,
    deferLink: 'https://playo.page.link/ry8TT',
    fullLink:
      'https://playo.co/venue/?venueId=4ec5b58f-d58f-4ce1-8c84-2caa63007ecc',
    avgRating: 4,
    ratingCount: 3,
    lat: 12.9341796,
    lng: 77.6101537,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/FIGURINEFITNESSINDIRANAGAR/SnookerRoom1652349575145.jpeg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'AVS Compound, 1st Floor, 1st Cross',
    bookings: [],
  },
  {
    name: 'OvalNet Badminton Academy - Sahakar Nagar',
    rating: 4,
    deferLink: 'https://z34v4.app.goo.gl/MAAX',
    fullLink:
      'https://playo.co/venue/?venueId=afbe7186-2f86-4215-8715-4b967f166b09',
    avgRating: 4,
    ratingCount: 3,
    lat: 13.059883,
    lng: 77.582389,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/OVALNETBADMINTONACADEMY/OvalNetBadmintonAcademy6.jpg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'No. 3/1, Kodigehalli Main Road, Adjacent to Cauvery College',
    bookings: [],
  },
  {
    name: 'OvalNet Badminton Academy - Sahakar Nagar',
    rating: 4,
    deferLink: 'https://z34v4.app.goo.gl/MAAX',
    fullLink:
      'https://playo.co/venue/?venueId=afbe7186-2f86-4215-8715-4b967f166b09',
    avgRating: 4,
    ratingCount: 3,
    lat: 13.059883,
    lng: 77.582389,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/OVALNETBADMINTONACADEMY/OvalNetBadmintonAcademy6.jpg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'No. 3/1, Kodigehalli Main Road, Adjacent to Cauvery College',
    bookings: [],
  },
  {
    name: 'Play Zone - Sahakarnagar (Shree Vayu Badminton Arena)',
    rating: 4,
    fullLink:
      'https://playo.co/venue?venueId=6bb450c0-318b-49e5-b7c0-c02a37d34ef8',
    deferLink: 'https://z34v4.app.goo.gl/4Kqo',
    avgRating: 4,
    ratingCount: 3,
    lat: 13.053750730700056,
    lng: 77.57626923775621,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/PLAYZONESAHAKARNAGARSHREEVAYUBADMINTONARENA20231206074712995440/PlayZoneSahakarnagarShreeVayuBadmintonArena1701880566748.jpeg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address:
      'Sahakar Nagar road, Adjacent to AMCO layout and Tata Nagar, Hebbal',
    bookings: [],
  },
  {
    name: 'VIN Badminton',
    rating: 4,
    deferLink: 'https://z34v4.app.goo.gl/RTF4',
    fullLink:
      'https://playo.co/venue/?venueId=37f3675b-dfd2-4f30-8506-a3883abef902',
    avgRating: 4,
    ratingCount: 3,
    lat: 13.071497063988476,
    lng: 77.58706385591489,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/VINI5BADMINTONARENA20240226042742110513/Vini5BadmintonArena1709376498394.jpg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'Vini5 badminton arena, 5th main road, Canara bank layout',
    bookings: [],
  },
  {
    name: 'Serve & Smash Badminton Academy',
    rating: 4,
    fullLink:
      'https://playo.co/venue?venueId=a0c6ceb4-d09b-4fcf-bafd-6c949a55590c',
    deferLink: 'https://z34v4.app.goo.gl/3k9a',
    avgRating: 4,
    ratingCount: 3,
    lat: 13.045735,
    lng: 77.572929,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/SERVESMASH20191003055000886885/ServeSmash0.jpeg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: '1st Cross, RMV 2nd Stage, Nagashettihalli bangalore',
    bookings: [],
  },
];
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
      console.log("✅ Fetched", req.toString());

    const games = await Game.find({})
      .populate('admin')
      .populate('players', 'image firstName lastName');

      console.log("✅ Fetched games:", games.length);

    const currentDate = moment();
      console.log("📆 Current Date & Time:", currentDate.format());

    const filteredGames = games.filter(game => {
      const gameDate = moment(game.date, 'Do MMMM'); // e.g., "9th July"
      //   console.log('📅 Parsed Game Date:', game.date, "->", gameDate.format());

      const gameTime = game.time?.split(' - ')[0]; // Get start time (e.g., "10:00 AM")
      //   console.log('🕒 Game Start Time:', gameTime);

      const gameDateTime = moment(
        `${gameDate.format('YYYY-MM-DD')} ${gameTime}`,
        'YYYY-MM-DD h:mm A',
      );

      //   console.log('🧮 Game DateTime:', gameDateTime.format());

      return gameDateTime.isAfter(currentDate);
    });

     console.log("✅ Filtered games count:", filteredGames.length);

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
      adminName: `${game.admin.firstName} ${game.admin.lastName}`,
      adminUrl: game.admin.image, // Assuming the URL is stored in the image field
      matchFull:game.matchFull
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
    const { userId, comment } = req.body;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    const existingRequest = game.requests.find(
      request => request.userId.toString() === userId,
    );
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: 'You have already requested to join this game' });
    }
    game.requests.push({ userId, comment });
    await game.save();
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('❌ Error sending request:', error);
    res.status(500).json({ message: 'Failed to send request' });
  }
});

app.get('/games/:gameId/requests', async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate({
      params: 'requests.userId',
      select: 'email firstName lastName image skill noOfGames playpals sports',
    });
    if(!game) {
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
      sports: request.userId.sports}));

      res.status(200).json(requestsWithUserInfo);

  } catch (error) {
    console.error('❌ Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});

app.get("/user/:userId",async (req, res) => {

  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({user})
  }
  catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }

});

