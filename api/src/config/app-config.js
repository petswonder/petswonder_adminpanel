// Import native 'node.js' modules
import path from "path";

// Import dependencies
import {} from "dotenv/config.js";
import mysql from "mysql";


import AWS from "aws-sdk";

const ssm = new AWS.SSM({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const res = []

const getParameters = () => {
  return new Promise((resolve, reject) => {
    var params = {
      Names: [ '/petswonder/app_port', '/petswonder/db/host', '/petswonder/db/name', '/petswonder/db/password', '/petswonder/db/port', '/petswonder/db/user', '/petswonder/salt_rounds'],
      WithDecryption: true || false
    }
    ssm.getParameters(params, function(err, data) {
      if(err){
        reject(console.log('Error getting parameter: ' + err, err.stack));
      } else {
          resolve(data);
      }
    })
  })
}

const getParametersValues = await getParameters()

// console.log(getParametersValues)


// Application port for express
// const APP_PORT = getParameterWorker('/petswonder/app_port', false)

    const APP_PORT = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/app_port').Value;
    const SALT_ROUNDS = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/salt_rounds').Value;

    const DB_PORT = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/db/port').Value
    const DB_HOST = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/db/host').Value
    const DB_USER = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/db/user').Value
    const DB_PASSWORD = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/db/password').Value
    const DB_DATABASE = await getParametersValues.Parameters.find(x => x.Name === '/petswonder/db/name').Value

    // Create connection
    const con = mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE
    });


    // MySQL Session
    let options = {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE
    }

// Cookie name and secret
const cookie = {
  name: 'test',
  secret: 'test_secret'
}

// Export all constants
export {
  APP_PORT,
  // VIEWS,
  SALT_ROUNDS,
  con,
  options,
  cookie
};