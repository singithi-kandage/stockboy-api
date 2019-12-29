const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteShoppingListItem = async event => {
  const { pathParameters: { id } } = event;
  const itemId = id;

  const params = {
    TableName: "shoppingList",
    Key: { itemId }
  };
  try {
    const data = await documentClient.delete(params).promise();
    const response = {
      statusCode: 200
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
