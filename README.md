This is the API for the StockBoy app.

This app is designed for an application to help connect users with fresh local produce.
Unfortunately, newly created users via the Register endpoint need to be manually confirmed by an admin (for the time being) before they can sign in.

This API is a work in progress.

To Run:
npm i -g serverless
Install 
Run "serverless deploy" to deploy the app.

Base URL:
https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/

Endpoints:
getCategories: stockboy-api-production-getCategories:
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/categories

addCategory: stockboy-api-production-addCategory
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/categories
  Data Params:
  {"category": "TestCategory"}

loginUser: stockboy-api-production-loginUser
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/users/login
  Data Params:
  {"username":"test", "password":"Test1234!@"}

registerUser: stockboy-api-production-registerUser
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/users/register
  Data Params:
  { "username":"test", "email":"test@gmail.com", "password":"Test1234!@", "firstName": "first", "lastName":"last" "isVendor":"false"}

getVendors: stockboy-api-production-getVendors
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendors

getVendors: stockboy-api-production-getVendor
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendors/{id}

addVendor: stockboy-api-production-addVendor
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendors
  Data Params:
  {"userId": "id", "farmName": "name", "line1": "line1", "line2": "line2", "city": "city", "province": "province"}

getProducts: stockboy-api-production-getProducts
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/products

getProduct: stockboy-api-production-getProduct
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/products/{id}

addProduct: stockboy-api-production-addProduct
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/products
  Data Params:
  {"category": "category", "productName": "productName", "description":"description"}

updateProduct: stockboy-api-production-updateProduct
  PUT - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/products/{id}
  Data Params:
  {"category": "category", "productName": "productName", "description":"description"}

deleteProduct: stockboy-api-production-deleteProduct
  DELETE - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/products/{id}

getAllVendorProducts: stockboy-api-production-getAllVendorProducts
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts

getVendorProductsByVendorId: stockboy-api-production-getVendorProductsByVendorId
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts/searchByVendor/{id}

getVendorProductsByProductName: stockboy-api-production-getVendorProductsByProductName
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts/searchByProduct/{name}

getVendorProduct: stockboy-api-production-getVendorProduct
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts/{id}

addVendorProduct: stockboy-api-production-addVendorProduct
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts
  Data Params
  {
    "vendorId":"vendorId",
    "category":"category",
    "productId":"productId",
    "productName":"productName",
    "description":"description",
    "fdcId":"fdcId",
    "quantityOnHand":"quantityOnHand",
    "price":"price",
    "onSale":"onSale",
    "onSalePrice":"onSalePrice"
  }

updateVendorProduct: stockboy-api-production-updateVendorProduct
  PUT - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts/{id}
  Data Params
  {
    "vendorId":"vendorId",
    "category":"category",
    "productId":"productId",
    "productName":"productName",
    "description":"description",
    "fdcId":"fdcId",
    "quantityOnHand":"quantityOnHand",
    "price":"price",
    "onSale":"onSale",
    "onSalePrice":"onSalePrice"
  }

deleteVendorProduct: stockboy-api-production-deleteVendorProduct
  DELETE - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/vendorProducts/{id}

getShoppingListItems: stockboy-api-production-getShoppingListItems
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/shoppingList/{id}

getShoppingListItem: stockboy-api-production-getShoppingListItem
  GET - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/shoppingList/{id}

addShoppingListItem: stockboy-api-production-addShoppingListItem
  POST - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/shoppingList
  Data Params:
  {"userId":"userId", "productName":"productName", "price":"price", "vendor":"vendor" }

updateShoppingListItem: stockboy-api-production-updateShoppingListItem
  PUT - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/shoppingList/{id}
  Data Params:
  {"userId":"userId", "productName":"productName", "price":"price", "vendor":"vendor" }

deleteShoppingListItem: stockboy-api-production-deleteShoppingListItem
  DELETE - https://badr8lsop3.execute-api.ca-central-1.amazonaws.com/production/shoppingList/{id}