const mongoose = require('mongoose');
const financeDB = require("../databases/clientDb");
const { Decimal128 } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
  title: { type: String },
  payment_method: { type: String },
  type: { type: String},
  category_name : {type : String},
  category_id : {type : String},
  amount : {type : Decimal128},
  invoice : {type : String},
  currency_id : {type : String},
  user_id : {type : String}
});

const Transactions = financeDB.model('Transactions', transactionSchema);

module.exports = Transactions;