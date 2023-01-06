const express = require('express');
const { login, updateAccount } = require('../contoller/auth.controler');
const { userRequired } = require('../middleware/auth.middleware');
const { notFound, errorHandler } = require('../middleware/error.middleware');
const authRoute = express.Router();

authRoute.post('/',login);
authRoute.put('/',userRequired,updateAccount)

authRoute.all("*",notFound);
authRoute.use(errorHandler);
module.exports={
    authRoute,
}