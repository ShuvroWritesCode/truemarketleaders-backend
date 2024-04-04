const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dataRoute = require('./routes/dataRoute');

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
// console.log('Hello world');
app.use('/api', dataRoute);

app.get('/status', (request, response) => {
  const status = {
    Status: 'Running',
  };

  response.send(status);
});

app.listen(3000, () => {
  console.log('server port running on 3000');
});
