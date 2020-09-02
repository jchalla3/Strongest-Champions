var express = require('express');
const { replaceOne } = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{user: req.user} );
});

module.exports = router;
