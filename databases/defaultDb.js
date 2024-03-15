const mongoose = require('mongoose');
const db = require('./dbUrls');

mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
  try {
    if (!db.defaultDb) {
      throw new Error('Environment variable DATABASE is not defined.');
    }

    await mongoose.connect(db.defaultDb);
    console.log('Connected to the MongoDB Default database');
  } catch (error) {
    console.error(`Error connecting to the Default database: ${error.message}`);
  }
};

module.exports = connectToDatabase;
