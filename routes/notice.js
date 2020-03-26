var express = require('express');
var router = express.Router();
const Notice = require('../models/notice');
const moment = require('moment');
const catchErrors = require('../lib/async-error');
/* GET users listing. */

function needAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

router.get('/', catchErrors(async(req, res, next) =>  {
  Notice.find({}, function(err, notices) {
    if (err) {
      return next(err);
    }
    console.log("err", err);
    console.log(notices);
    
    res.render('./includes/notice_main',{notices : notices});
  }); 
}));

router.get('/notice_write', catchErrors(async(req, res, next) => {
    res.render('./includes/notice_write');
}));

//공지사항 게시글 작성
router.post('/notice_write', catchErrors(async(req, res, next) => {
  var notice = new Notice({
    title : req.body.title,
    content: req.body.content,
    // date: new Date()
  });
  await notice.save();
  req.flash('Success','공지사항을 성공적으로 저장했습니다.');
  res.redirect('/notice');
}));

//notice check
router.get('/:id', (req, res)=>{
  Notice.findOne({_id : req.params.id}, function(err,notice){
    if(err){
      return next(err);
    }
    console.log("err", err);
    console.log(notice);

    res.render('./includes/notice_check',{notice:notice})
  })
});

module.exports = router;