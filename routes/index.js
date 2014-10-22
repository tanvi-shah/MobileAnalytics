var express = require('express');
var router = express.Router();
var addItem=require('../models/add.js');
/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Hello World.' });

  res.send("Hello World.");
});

module.exports = router;
