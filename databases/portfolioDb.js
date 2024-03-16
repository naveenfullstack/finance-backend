const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const portfolioDb = mongoose.createConnection(process.env.PORTFOLIO_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = portfolioDb;
