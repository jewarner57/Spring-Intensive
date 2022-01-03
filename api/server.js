require('dotenv').config();
require('./data/db')

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');

const authRoutes = require('./routes/auth')
const mediaRoutes = require('./routes/media')

const app = express();

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// Use handlebars view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.use('/user', authRoutes)
app.use('/media', mediaRoutes)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`API listening on port http://localhost:${process.env.PORT}!`);
});

module.exports = app;
