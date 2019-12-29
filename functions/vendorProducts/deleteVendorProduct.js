const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteVendorProduct = async event => {
  const { pathParameters: { id } } = event;
  const vendorProductId = id;
  
  const params = {
    TableName: "vendorProduct",
    Key: { vendorProductId }
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
