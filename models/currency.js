const mongoose = require('mongoose');
const mediaxDB = require("../databases/clientDb");
const { Decimal128 } = mongoose.Schema.Types;

const currencySchema = new mongoose.Schema({
  currency_name: { type: String },
  country: { type: String },
  user_id: { type: String},
  flag : {type : String}
});

const Currency = mediaxDB.model('Currency', currencySchema);

module.exports = Currency;