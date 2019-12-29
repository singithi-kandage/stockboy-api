const fetch = require("node-fetch");
const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

const access_token = process.env.USDA_FOOD_DATA_CENTRAL_TOKEN;

module.exports.updateProduct = async event => {
  const { pathParameters: { id } } = event;
  const { category, productName, description } = JSON.parse(event.body);
  const productId = id;

  const fdcRequestUrl =
    "https://api.nal.usda.gov/fdc/v1/search?api_key=" + access_token;
  let fdcId = "null";

  try {
    const res = await fetch(fdcRequestUrl, {
      method: "POST",
      body: JSON.stringify({ generalSearchInput: productName }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await res.json();
    fdcId = json.foods[0].fdcId;
    const r = {
      statusCode: 200
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "No fcId for product found." })
    };
  }

  const params = {
    TableName: "product",
    Item: {
      productId: productId,
      category: category,
      productName: productName,
      description: description,
      fdcId: fdcId
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
      statusCode: 500
    };
  }
};
