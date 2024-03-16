const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const bookDb = mongoose.createConnection(process.env.BOOKING_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = bookDb;