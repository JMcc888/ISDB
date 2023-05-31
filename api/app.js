// NPM Packages
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xssClean = require('xss-clean')

require('dotenv').config({path: "./config/config.env"})

// Helper Files
const connectDB = require('./config/connectdb')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions')

// API Routes
const userRoutes = require('./routes/users')
const artistRoutes = require('./routes/artists')
const albumRoutes = require('./routes/albums')
const songRoutes = require('./routes/songs')
const authRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review')

// Express config
const app = express();

app.use(express.json())

app.use(cookieParser())

const PORT = process.env.PORT || 3500;
app.set("view engine", "ejs");

// Connect Database
connectDB()

// CORS Setup
app.use(cors(corsOptions))

// Sanitize input
app.use(mongoSanitize());

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xssClean())

app.get("/", (req, res) => {
  res.render("index");
});

// Use Routes
app.use('/api/users', userRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/auth', authRoutes)

app.all('*', (req, res) => {
  res.status(404)
if (req.accepts('json')) {
      res.json({message: 'Requested resource not found.'})
  } else {
      res.type('txt').send('Requested resource not found.')
  }
})

// Run API
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});

// Error Handler
app.use(errorHandler)