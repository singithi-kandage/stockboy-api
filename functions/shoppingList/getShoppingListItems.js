const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getShoppingListItems = async event => {
  const { pathParameters: { id } } = event; // Extracting an id from the request path
  const params = {
    TableName: "shoppingList", // The name of your DynamoDB table
    ProjectionExpression: "userId,price, productName,itemId,vendor",
    KeyConditionExpression: "userId = :userId",
    FilterExpression: "contains (userId, :userId)",
    ExpressionAttributeValues: {
      ":userId": id
    }
  };
  try {
    // Utilising the scan method to get all items in the table
    const data = await documentClient.scan(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
