const Chart = require('../models/chartsSchema');
const BreakoutReport = require('../models/breakoutReportsSchema');

exports.hello = async (req, res) => {
  res.json({ message: 'Hello world' });
};

exports.getChart = async (req, res) => {
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

exports.getAllTickersWithDetails = async (req, res) => {
  try {
    const tickers = await BreakoutReport.find(
      {},
      'ticker change close priceChange'
    ); // Select specific fields

    if (tickers.length > 0) {
      const firstTicker = tickers[0];
      console.log('First ticker:', firstTicker);
    } else {
      console.log('No tickers found');
    }

    res.status(200).json({ tickers });
  } catch (error) {
    console.error('Error retrieving tickers:', error);
    res.status(500).json({ message: 'Error fetching tickers' });
  }
};
