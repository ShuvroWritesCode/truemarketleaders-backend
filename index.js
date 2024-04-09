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
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });
// Passport config
require('./config/passport')(passport);
connectDB();
const app = express();
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:3000/api',
//     changeOrigin: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());

// Body parser
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173', 'https://truemarketleaders-llc-five.vercel.app'], // Allow requests from this origin
  methods: ['GET,POST'], // Allow only GET and POST requests
  allowedHeaders: 'Content-Type,Authorization', // Allow only these headers
};

app.use(cors(corsOptions));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://sarhancapital:temporaryPassword100!@marketterminalfinance.lnb53b1.mongodb.net/?retryWrites=true&w=majority' }),
    cookie: {
      domain: '.vercel.app', 
    },
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
