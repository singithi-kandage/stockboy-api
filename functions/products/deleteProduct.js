const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteProduct = async event => {
  const { pathParameters: { id } } = event;
  const productId = id;

  const params = {
    TableName: "product",
    Key: { productId }
  };
  try {
    const data = await documentClient.delete(params).promise();
    const response = {
      statusCode: 200
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};
