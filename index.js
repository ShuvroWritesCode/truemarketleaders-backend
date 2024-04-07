const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const dataRoute = require('./routes/dataRoute');
const authRoute = require('./routes/authRoute');

dotenv.config({ path: './config/config.env' });
// Passport config
require('./config/passport')(passport);
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Body parser
app.use(express.urlencoded({ extended: false }));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', dataRoute);
app.use('/api', authRoute);

app.listen(3000, () => {
  console.log('server port running on 3000');
});
