const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
global.fetch = require("node-fetch");

// User pool instantiation
const poolData = {
  UserPoolId: process.env.AWS_COGNITO_POOL_ID, // Your user pool id here
  ClientId: process.env.AWS_COGNITO_CLIENT_ID // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.confirmUser = async event => {
  const { username, confirmCode } = JSON.parse(event.body);

  var userData = {
    Username: username,
    Pool: userPool
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // user here is an instance of CognitoUser, so it already inherits necessary method
  cognitoUser.confirmRegistration(confirmCode, true, onConfirmed);
};
