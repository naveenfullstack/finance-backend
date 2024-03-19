const mongoose = require('mongoose');
const financeDB = require("../databases/clientDb");

const currencySchema = new mongoose.Schema({
  currency_name: { type: String },
  country: { type: String },
  user_id: { type: String},
  flag : {type : String}
});

const Currency = financeDB.model('Currency', currencySchema);

module.exports = Currency;