const fetch = require("node-fetch");
const AWS = require("aws-sdk");
const crypto = require("crypto");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

const access_token = process.env.USDA_FOOD_DATA_CENTRAL_TOKEN;

module.exports.addVendorProduct = async event => {
  const {
    vendorId,
    category,
    productId,
    productName,
    description,
    fdcId,
    quantityOnHand,
    price,
    onSale,
    onSalePrice
  } = JSON.parse(event.body);
  let nutrients = "null";

  const fdcRequestUrl =
    "https://api.nal.usda.gov/fdc/v1/" + fdcId + "?api_key=" + access_token;

  try {
    const res = await fetch(fdcRequestUrl);
    const json = await res.json();
    nutrients = JSON.stringify(json.labelNutrients);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Nutrients for product not found." })
    };
  }

  try {
    const params = {
      TableName: "vendorProduct", // The name of your DynamoDB table
      Item: {
        vendorProductId: generateUUID(),
        vendorId: vendorId,
        category: category,
        productId: productId,
        productName: productName,
        description: description,
        fdcId: fdcId,
        quantityOnHand: quantityOnHand,
        price: price,
        onSale: onSale,
        onSalePrice: onSalePrice,
        nutrients: nutrients
      }
    };

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
