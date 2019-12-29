const fetch = require("node-fetch");
const AWS = require("aws-sdk");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

const access_token = process.env.USDA_FOOD_DATA_CENTRAL_TOKEN;

module.exports.updateVendorProduct = async event => {
  const { pathParameters: { id } } = event;
  const {
    vendorId,
    category,
    productId,
    productName,
    description,
    quantityOnHand,
    fdcId,
    price,
    onSale,
    onSalePrice
  } = JSON.parse(event.body);
  const vendorProductId = id;
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

  const params = {
    TableName: "vendorProduct",
    Item: {
      vendorProductId: vendorProductId,
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
