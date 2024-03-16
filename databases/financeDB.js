const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const financeDb = mongoose.createConnection(process.env.FINANCE_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = financeDb;
