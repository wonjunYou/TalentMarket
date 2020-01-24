var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const Product = require('../models/product');
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

  res.render('index', {products: products});
}));

module.exports = router;
