const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.updateShoppingListItem = async event => {
  const { pathParameters: { id } } = event;
  const { userId, productName, price, vendor } = JSON.parse(event.body);
  const itemId = id;

  const params = {
    TableName: "shoppingList",
    Item: {
      itemId: itemId,
      userId: userId,
      productName: productName,
      price: price,
      vendor: vendor
    }
  };
  try {
    const data = await documentClient.put(params).promise();
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
