const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://sarhancapital:temporaryPassword100!@marketterminalfinance.lnb53b1.mongodb.net/?retryWrites=true&w=majority', {});
    console.log('Connected to db');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
