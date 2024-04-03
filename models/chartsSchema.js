const mongoose = require('mongoose');

const candleSchema = new mongoose.Schema({
  open: Number,
  close: Number,
  high: Number,
  low: Number,
  date: Date,
  volume: Number,
});

const chartsSchema = new mongoose.Schema({
  ticker: String,
  lastUpdate: Date,
  chart: [candleSchema],
});

module.exports = mongoose.model('Chart', chartsSchema);
