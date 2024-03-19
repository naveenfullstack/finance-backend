const mongoose = require('mongoose');
const financeDB = require("../databases/clientDb");
const { Decimal128 } = mongoose.Schema.Types;

const budgetSchema = new mongoose.Schema({
  name: { type: String },
  ending_date: { type: Date},
  budget_amount : {type : Decimal128},
  spend : {type : Decimal128},
  user_id : {type : String},
  currency_id : {type : String}
});

const Budget = financeDB.model('Budget', budgetSchema);

module.exports = Budget;
