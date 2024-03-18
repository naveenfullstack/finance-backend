const mongoose = require('mongoose');
const mediaxDB = require("../databases/clientDb");
const { Decimal128 } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String},
  password: { type: String},
  old_password: { type: String },
  mobile_number: {type: String},
  personal_account : {type:Boolean},
  business_account : {type:Boolean},
  profile_image: { type: String },
  reset_token: { type: String },
  access_token: { type: String },
  refresh_token: { type: String },
  last_login: { type: Date },
  failed_login_attempts: { type: Number },
  is_blocked: { type: Boolean },
  account_created : {type : String},
  secondary_auth : {type : Boolean},
  email_auth : {type : Boolean},
  sms_auth : {type : Boolean},
  mobile_app_auth : {type : Boolean}
});

const User = mediaxDB.model('User', userSchema);

module.exports = User;