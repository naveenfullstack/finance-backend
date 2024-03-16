const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const mediaxDB = mongoose.createConnection(process.env.MEDIAX_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mediaxDB;
