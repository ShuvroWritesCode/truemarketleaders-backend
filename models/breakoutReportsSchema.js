const mongoose = require('mongoose');


const breakoutReportSchema = new mongoose.Schema({
    ticker : String ,
    brokeOut : Boolean ,
    breakingOut : Boolean , // <= If true the stock is shown on the breakouts list
    breakingDown : Boolean, // <= If true the stock is shown on the breakdown list
    timeframe : String ,
    breakoutDate : Date,
    lastUpdate : Date,
    origin : String,
    figure : String ,
    breakoutPivot : Number,
    closeToBreakoutPivot : Number,
    breakdownPivot : Number,
    closeToBreakdownPivot : Number ,
    closeToBreakout : Boolean,
    topTrendline : {
      start : [Number,Number],
      end : [Number,Number]
    },
    bottomTrendline : {
      start : [Number,Number],
      end : [Number,Number]
    },
    close : Number,
    marketCap : Number,
    volume : Number,
    change : Number,
    priceChange : Number,
    breakoutPercent : Number,
    revenuesEstimatesChange : Number,
    epsEstimatesChange : Number,
    lastYearRevenuesChange : Number,
    lastYearEpsChange : Number,
    nextYearRevenuesChange : Number,
    nextYearEpsChange : Number,
    breakoutType : String,
    ytdChange : Number,
  })
  
  module.exports = mongoose.model('BreakoutReport', breakoutReportSchema);