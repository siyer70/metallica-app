var env = process.env.NODE_ENV || 'development';

const myprocess = {env:{}};

//if(env==='development' || env==='test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    myprocess.env[key] = envConfig[key];
  });

  console.log(myprocess.env);
//}

export default myprocess;