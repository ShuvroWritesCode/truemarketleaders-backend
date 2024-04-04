const Chart = require('../models/chartsSchema');
const BreakoutReport = require('../models/breakoutReportsSchema');

exports.hello = async (req, res) => {
  res.json({ message: 'Hello world' });
};

exports.getAllTickers = async (req, res) => {
  try {
    const tickers = await Chart.findOne().select('chart');
    res.json(tickers.chart); // Send only the chart array in the response
  } catch (error) {
    console.error('Error retrieving tickers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getOneBreakout = async (req, res) => {
  try {
    const breakoutReport = await BreakoutReport.find();
    res.json(breakoutReport); 
  } catch (error) {
    console.error('Error retrieving breakout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};