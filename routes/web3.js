var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const Product = require('../models/product');
const Category = require('../models/category');
const Web3 = require('web3');

let web3 = new Web3(new web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/1aaf0adf6b8c495190259f11e9f997ea"))
/* GET users listing. */

module.exports = router;
