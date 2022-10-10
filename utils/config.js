require('dotenv').config;

const PORT = process.env.PORT;
const MONGODBURI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODBURI;

module.exports = {
  MONGODBURI,
  PORT,
};
