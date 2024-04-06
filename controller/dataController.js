const Chart = require('../models/chartsSchema');
const BreakoutReport = require('../models/breakoutReportsSchema');

exports.hello = async (req, res) => {
  res.json({ message: 'Hello world' });
};

exports.getChart = async (req, res) => {
  try {
    // Extract ticker name from the request body
    const { ticker } = req.body;

    // Validate if the ticker name is provided
    if (!ticker) {
      return res.status(400).json({ error: 'Ticker name is required' });
    }

    // Find the chart data for the provided ticker
    const tickers = await Chart.findOne({ ticker }).select('chart');

    // Check if the ticker is found
    if (!tickers) {
      return res.status(404).json({ error: 'Ticker not found' });
    }

    const chartData = tickers.chart;

    // Create an object to store unique dates as keys
    const uniqueDates = {};

    // Filter out duplicate values based on distinct dates
    const filteredChartData = chartData.filter((item) => {
      // Extract date from the current item
      const date = new Date(item.date).toISOString().slice(0, 10); // Extract YYYY-MM-DD
      // Check if the date is already in the object
      if (uniqueDates[date]) {
        return false; // If duplicate, filter it out
      }
      // If not a duplicate, mark the date as seen in the object and keep the item
      uniqueDates[date] = true;
      return true;
    });

    res.json(filteredChartData); // Send the filtered chart data in the response
  } catch (error) {
    console.error('Error retrieving chart data:', error);
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
