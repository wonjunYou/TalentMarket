var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const User = require('../models/user');
const Seller = require('../models/seller');
const Order = require('../models/order');
const Status = require('../models/status');
const Product = require('../models/product');
const Category = require('../models/category');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
;

/* GET users listing. */
router.get('/:id', catchErrors(async(req, res, next) =>  {
  var product = await Product.findById(req.params.id);
  var seller = await await Seller.findOne({seller_id: product.seller}).populate('seller_id');
  res.render('products/product_explain', {product: product, seller: seller});
}));

module.exports = router;
