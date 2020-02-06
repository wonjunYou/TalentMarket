var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const Product = require('../models/product');
const Category = require('../models/category');

/* GET users listing. */
router.get('/category', catchErrors(async(req, res, next) =>  {
  res.render('manager/manage_category');
}));

router.post('/category', catchErrors(async(req, res, next) =>  {
  var category = new Category({
    name: req.body.name,
    sequence: req.body.sequence
  });
  await category.save();

  req.flash('success', '키테고리 추가 성공');
  res.redirect('back');
}));

module.exports = router;
