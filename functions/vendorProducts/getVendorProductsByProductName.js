const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getVendorProductsByProductName = async event => {
  const { pathParameters: { name } } = event; // Extracting an id from the request path
  const params = {
    TableName: "vendorProduct", // The name of your DynamoDB table
    ProjectionExpression:
      "vendorProductId, category, description, fdcId, nutrients, onSale, onSalePrice, price, productId, productName, quantityOnHand, vendorId",
    KeyConditionExpression: "productName = :productName",
    FilterExpression: "contains (productName, :productName)",
    ExpressionAttributeValues: {
      ":productName": name
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
      statusCode: 500
    };
  }
};
