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
const moment = require('moment');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}
/* GET users listing. */
router.get('/:id', catchErrors(async(req, res, next) =>  {
  var product = await Product.findById(req.params.id);
  var seller = await Seller.findOne({seller_id: product.seller}).populate('seller_id');
  res.render('products/product_explain', {product: product, seller: seller});
}));

router.get('/purchase/:id', needAuth, catchErrors(async(req, res, next) =>  {
  var product = await Product.findById(req.params.id);
  var seller = await  Seller.findOne({seller_id: product.seller}).populate('seller_id');
  res.render('products/purchase_page', {product: product, seller: seller});
}));

router.post('/purchase/:id', needAuth, catchErrors(async(req, res, next) =>  {
  var product = await Product.findById(req.params.id);
  var seller = await Seller.findOne({seller_id: product.seller}).populate('seller_id');
  var closingDate = moment().add(product.requireTime,'d');
  var order = new Order({
    buyer: req.user._id,
    seller: seller.seller_id,
    product: product._id,
    price: product.price,
    closingDate: closingDate
  });
  await order.save();
  res.redirect('/');
}));

module.exports = router;
