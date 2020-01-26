var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const User = require('../models/user');
const Seller = require('../models/seller');
const Order = require('../models/order');
const Status = require('../models/status');

/* GET users listing. */

// 로그인 세션 확인
function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

function validateForm(form, options) {
  var email = form.email || "";
  email = email.trim();

  if (!email) {
    return 'Email is required.';
  }
  
  if (email.indexOf("@") == -1) {
    return 'Email is not correct';
  }

  if (!form.password && options.needPassword) {
    return 'Password is required.';
  }

  if (form.password !== form.password_confirmation) {
    return 'Passsword do not match.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return null;
}

router.get('/signup', catchErrors(async(req, res, next) =>  {
  res.render('users/signup')
}));

router.post('/', catchErrors(async(req, res, next) =>  {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  var user = await User.findOne({email: req.body.email});
  console.log('USER???', user);
  if(user) {
    req.flash('danger', '이메일이 이미 존재합니다.');
    return res.redirect('back');
  }
  user = new User({
    email: req.body.email,
  });
  user.password = await user.generateHash(req.body.password);
  await user.save();
  req.flash('success', '회원가입 되었습니다. 로그인 해주세요');
  res.redirect('/');
}));

router.get('/:id', needAuth, catchErrors(async(req, res, next) =>  {
  const user = await User.findById(req.params.id);
  const orders = await Order.find({buyer: req.params.id}).populate('product'); 
  res.render('users/customer_information', {user: user, orders: orders});
  
}));

router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
  const user = await User.findOneAndRemove({_id: req.params.id});
  const seller = await Seller.findOneAndRemove({seller_id: req.params.id});
  req.flash('success', '삭제되었습니다.');
  res.redirect('/');
}));

router.get('/products/:id', needAuth, catchErrors(async(req, res, next) =>  {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  var query = {buyer: req.params.id};
  const orders = await Order.paginate(query, {
    sort: {createdAt: -1}, 
    page: page, limit: limit,
    populate: 'product'
  });
  res.render('users/customer_check',{orders: orders});
}));

router.get('/status/:id', needAuth, catchErrors(async(req, res, next) =>  {
  const status = await Status.find({order_id: req.params.id});
  res.render('users/customer_check_status', {status: status});
}));


module.exports = router;
