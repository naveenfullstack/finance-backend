const axios = require('axios');

const ReqIp = async (req, res, next) => {
  try {
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = ipResponse.data.ip;

    const ipDetailsResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const ipDetails = ipDetailsResponse.data;

// Extract the desired information
const { country, city, timezone, query } = ipDetails;

// Define ANSI escape codes for green text color
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

// Print the values with green color
console.log(`${greenColor}Country:${resetColor} ${country}`);
console.log(`${greenColor}City:${resetColor} ${city}`);
console.log(`${greenColor}Timezone:${resetColor} ${timezone}`);
console.log(`${greenColor}Ip Address:${resetColor} ${query}`);

req.ipAddress = ipAddress;
req.ipDetails = ipDetails;

    next();
  } catch (error) {
    console.error('Error retrieving IP address:', error);
    next();
  }
};

module.exports = ReqIp;
  