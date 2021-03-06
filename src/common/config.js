var env = process.env.NODE_ENV || 'development';

const myprocess = {env:{}};

var config = require('./config.json');
var envConfig = config[env];

Object.keys(envConfig).forEach((key) => {
  myprocess.env[key] = envConfig[key];
});

export default myprocess;