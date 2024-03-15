const Domain = process.env.DATABASE;

const requests = {

  //Databases
  defaultDb: `${Domain}/default`,
  client: `${Domain}/client`
};

module.exports = requests;