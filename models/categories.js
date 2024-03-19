const mongoose = require('mongoose');
const financeDB = require("../databases/clientDb");

const categoriesSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String},
  user_id : {type : String},
  currency_id : {type : String}
});

const Categories = financeDB.model('Categories', categoriesSchema);

module.exports = Categories;
