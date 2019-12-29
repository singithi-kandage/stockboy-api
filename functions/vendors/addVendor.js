const fetch = require("node-fetch");
const AWS = require("aws-sdk");
const crypto = require("crypto");
const encodeUrl = require("encodeurl");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

const access_token = process.env.MAPQUEST_GEOCODING_TOKEN;

module.exports.addVendor = async event => {
  const { userId, farmName, line1, line2, city, province } = JSON.parse(
    event.body
  );
  const encodedAddress = encodeUrl(`${line1} ${line2}, ${city}, ${province}`);
  const geocodingRequestUrl =
    "http://www.mapquestapi.com/geocoding/v1/address?key=" +
    access_token +
    "&location=" +
    encodedAddress +
    "thumbMaps=false";
  let latitude = "null";
  let longitude = "null";

  try {
    const res = await fetch(geocodingRequestUrl);
    const json = await res.json();
    latitude = json.results[0].locations[0].latLng.lat;
    longitude = json.results[0].locations[0].latLng.lng;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "No longitude or latitude found for your location."
      })
    };
  }

  const params = {
    TableName: "vendor", // The name of your DynamoDB table
    Item: {
      vendorId: generateUUID(),
      userId: userId,
      farmName: farmName,
      line1: line1,
      line2: line2,
      city: city,
      province: province,
      latitude: latitude,
      longitude: longitude
    }
  };

  try {
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
