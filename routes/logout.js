'use strict';
var express = require('express');
var router = express.Router();
// var people = require('./index');

router.get('/', function(req, res, next) {
  //currentLoginChange(req, res);
  req.logout();
  res.redirect('/');
});

/* 
function currentLoginChange(req, res) {
  people.filter((url) => req.user._json.avatar_url != url)
};
*/

module.exports = router;
