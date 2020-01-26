var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const Product = require('../models/product');
const Category = require('../models/category');

/* GET home page. */
router.get('/', catchErrors(async(req, res, next) =>  {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  
  var query = {};

  const products = await Product.paginate(query, {
    sort: {createdAt: -1}, 
    populate: 'category', 
    page: page, limit: limit
  });  

  const categorys = await Category.find({}).sort({sequence: 1});

  res.render('index', {products: products, categorys: categorys});
}));

router.get('/category/:id', catchErrors(async(req, res, next) =>  {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  
  var query = {category: req.params.id};

  const products = await Product.paginate(query, {
    sort: {createdAt: -1}, 
    populate: 'category', 
    page: page, limit: limit
  });  

  const categorys = await Category.find({}).sort({sequence: 1});

  res.render('index', {products: products, categorys: categorys});
}));

module.exports = router;

// router.get('/', catchErrors(async(req, res, next) =>  {

// }));