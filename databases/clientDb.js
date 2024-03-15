const mongoose = require("mongoose");
const dbs = require("./dbUrls")

mongoose.Promise = global.Promise;

const clientDb = mongoose.createConnection(dbs.client, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = clientDb;