const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");
global.fetch = require("node-fetch");

// User pool instantiation
const poolData = {
  UserPoolId: process.env.AWS_COGNITO_POOL_ID, // Your user pool id here
  ClientId: process.env.AWS_COGNITO_CLIENT_ID // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.loginUser = async event => {
  const { username, password } = JSON.parse(event.body);

  var data = await login(username, password, function(err, result) {
    if (err) {
      console.log("Error: " + JSON.stringify(err));
      return err;
    }
    console.log("Result: " + JSON.stringify(result));
    return result;
  });
  return {
    body: JSON.stringify(data)
  };
};

const login = (userName, password, callback) => {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: userName,
    Password: password
  });
  var userData = {
    Username: userName,
    Pool: userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var accesstoken = result.getAccessToken().getJwtToken();
      callback(null, accesstoken);
    },
    onFailure: function(err) {
      callback(err, null);
    }
  });
};
