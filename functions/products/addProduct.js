const fetch = require("node-fetch");
const AWS = require("aws-sdk");
const crypto = require("crypto");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

const access_token = process.env.USDA_FOOD_DATA_CENTRAL_TOKEN;

module.exports.addProduct = async event => {
  const { category, productName, description } = JSON.parse(event.body);
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
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "No fcId for product found." })
    };
  }

  const params = {
    TableName: "product", // The name of your DynamoDB table
    Item: {
      productId: generateUUID(),
      category: category,
      productName: productName,
      description: description,
      fdcId: fdcId
    }
  };

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
