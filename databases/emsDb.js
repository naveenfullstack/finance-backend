const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const emsDb = mongoose.createConnection(process.env.EMS_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = emsDb;
