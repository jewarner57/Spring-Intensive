require('dotenv').config();
require('./data/db')

const express = require('express');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors')

const authRoutes = require('./routes/auth')
const mediaRoutes = require('./routes/media')
const commentRoutes = require('./routes/comment')

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }))

// Routes
app.use('/user', authRoutes)
app.use('/media', mediaRoutes)
app.use('/comment', commentRoutes)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`API listening on port http://localhost:${process.env.PORT}!`);
});

module.exports = app;
