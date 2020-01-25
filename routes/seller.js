var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const User = require('../models/user');
const Seller = require('../models/seller');
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
router.get('/join', needAuth, catchErrors(async(req, res, next) =>  {
  res.render('seller/seller_join');
}));

router.post('/', needAuth, upload.single('img'), catchErrors(async(req, res, next) =>  {
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
  
  res.redirect('/');
}));
module.exports = router;

