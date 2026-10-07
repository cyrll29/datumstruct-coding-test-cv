const path = require('path');

module.exports = {
  port: process.env.PORT || 4000,
  dataFile: process.env.DATA_FILE || path.join(__dirname, '..', '..', 'data', 'users.json'),
};