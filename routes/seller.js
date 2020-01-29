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

// local 사진 저장
const mimetypes = {
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png"
};
const upload = multer({
  dest: 'tmp', 
  fileFilter: (req, file, cb) => {
    var ext = mimetypes[file.mimetype];
    if (!ext) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});


function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

function isSeller(req, res, next){
  if (req.user.seller){
    next();
  }else{
    req.flash('danger','판매자로 가입해주세요!');
    res.redirect('/seller/join');
  }
}

router.get('/join', needAuth, catchErrors(async(req, res, next) =>  {
  var seller = {};
  res.render('seller/seller_join', {seller: seller});
}));

router.get('/product/add', needAuth, isSeller, catchErrors(async(req, res, next) =>  {
  var categorys = await Category.find({}).sort({sequence: 1});
  product ={};
  res.render('seller/product_management_add', {categorys: categorys, product: product});
}));

router.get('/products/:id', needAuth, isSeller, catchErrors(async(req, res, next) =>  {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  
  var query = {seller: req.params.id};

  const products = await Product.paginate(query, {
    sort: {createdAt: -1}, 
    populate: 'seller', 
    page: page, limit: limit
  });  
  res.render('seller/seller_product_list', {products: products});
}));

router.get('/order/:id', needAuth, isSeller, catchErrors(async(req, res, next) =>  {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  var query = {seller: req.params.id};
  const orders = await Order.paginate(query, {
    sort: {createdAt: -1}, 
    populate: ['product', 'buyer'], 
    page: page, limit: limit
  });
  res.render('seller/seller_current_situation', {orders: orders});
}));

router.get('/status/:id', needAuth, isSeller, catchErrors(async(req, res, next) =>  {
  var order = await Order.findById(req.params.id);
  res.render('seller/seller_status', {order: order});
}));


router.get('/:id', needAuth, isSeller, catchErrors(async(req, res, next) =>  {
  var user = await User.findById(req.params.id);
  var seller = await Seller.findOne({seller_id: req.params.id});
  res.render('seller/seller_introduce', {user: user, seller: seller});
}));

router.get('/:id/edit', needAuth, isSeller, catchErrors(async(req, res, next) =>  {
  var seller = await Seller.findOne({seller_id: req.params.id});
  res.render('seller/seller_edit', {seller: seller});
}));

router.put('/:id', needAuth, isSeller, upload.single('img'), catchErrors(async(req, res, next) =>  {
  var seller = await Seller.findById(req.params.id);
  
  seller.name = req.body.name;
  seller.university = req.body.university;
  seller.major = req.body.major;
  seller.introduce = req.body.introduce;

  if (req.file) {
    const dest = path.join(__dirname, '../public/images/uploads/');  // 옮길 디렉토리
    console.log("File ->", req.file); // multer의 output이 어떤 형태인지 보자.
    const filename = seller.id + "/" + req.file.originalname;
    await fs.move(req.file.path, dest + filename);
    seller.img = "/images/uploads/" + filename;
  }
  await seller.save();
  req.flash('success', '정보를 수정했습니다.');
  res.redirect('/');
}));

router.post('/', needAuth,  upload.single('img'), catchErrors(async(req, res, next) =>  {
  var seller = new Seller({
    seller_id: req.user._id,
    name: req.body.name,
    university: req.body.university,
    major: req.body.major,
    introduce: req.body.introduce,
  });
  if (req.file) {
    const dest = path.join(__dirname, '../public/images/uploads/');  // 옮길 디렉토리
    console.log("File ->", req.file); // multer의 output이 어떤 형태인지 보자.
    const filename = seller.id + "/" + req.file.originalname;
    await fs.move(req.file.path, dest + filename);
    seller.img = "/images/uploads/" + filename;
  }
  await seller.save();

  const user = req.user;
  user.seller = true;
  await user.save();
  req.flash('success', '판매자로 등록되었습니다.')
  res.redirect('/');
}));

router.post('/add', needAuth, upload.single('img'), catchErrors(async(req, res, next) =>  {
  var category = await Category.findOne({'name': req.body.category});
  var product = new Product({
    seller: req.user._id,
    title: req.body.title,
    category: category._id,
    price: req.body.price,
    requireTime: req.body.requireTime,
    content: req.body.content
  });
  if (req.file) {
    const dest = path.join(__dirname, '../public/images/uploads/');  // 옮길 디렉토리
    console.log("File ->", req.file); // multer의 output이 어떤 형태인지 보자.
    const filename = product.id + "/" + req.file.originalname;
    await fs.move(req.file.path, dest + filename);
    product.img = "/images/uploads/" + filename;
  }
  await product.save();
  req.flash('success', '상품을 등록했습니다.');
  res.redirect('/');
}));

router.post('/status/:id', needAuth, upload.single('img'), catchErrors(async(req, res, next) =>  {
  var status = new Status({
    order_id: req.params.id,
    content: req.body.content,
  });
  if (req.file) {
    const dest = path.join(__dirname, '../public/images/uploads/');  // 옮길 디렉토리
    console.log("File ->", req.file); // multer의 output이 어떤 형태인지 보자.
    const filename = status.id + "/" + req.file.originalname;
    await fs.move(req.file.path, dest + filename);
    status.img = "/images/uploads/" + filename;
  }
  await status.save();
  req.flash('success', '전송했습니다.');
  res.redirect('/');
}));


module.exports = router;

