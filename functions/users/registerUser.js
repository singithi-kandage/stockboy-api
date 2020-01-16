const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");
const crypto = require("crypto");
global.fetch = require("node-fetch");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// User pool instantiation
const poolData = {
  UserPoolId: process.env.AWS_COGNITO_POOL_ID, // Your user pool id here
  ClientId: process.env.AWS_COGNITO_CLIENT_ID // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.registerUser = event => {
  const { email, password, firstName, lastName, isVendor } = JSON.parse(
    event.body
  );

  const params = {
    TableName: "user",
    Item: {
      userId: generateUUID(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      isVendor: isVendor
    }
  };

  var attributeList = [];
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "given_name",
      Value: firstName
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "family_name",
      Value: lastName
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:isVendor",
      Value: isVendor
    })
  );

  userPool.signUp(email, password, attributeList, null, onSignUp);
  addUser(params);
};

const onSignUp = (err, userData) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("userData: " + userData);
    cognitoUser = userData.user;
    // Add to user table
    addUser();
  }
};

const addUser = async params => {
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200
    };
    return response; // Returning a 200 if the item has been inserted
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
