const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getVendor = async event => {
  const { pathParameters: { id } } = event; // Extracting an id from the request path
  const vendorId = id;

  const params = {
    TableName: "vendor", // The name of your DynamoDB table
    Key: { vendorId } // They key of the item you wish to find.
  };
  try {
    // Utilising the get method to retrieve an indvidual item
    const data = await documentClient.get(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};
