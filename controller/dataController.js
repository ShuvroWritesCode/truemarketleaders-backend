const Chart = require('../models/chartsSchema');

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
