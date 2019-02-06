var express = require('express');
var router = express.Router();

/* GET Top page. */
router.get('/', function(req, res, next) {
  var pic = req.user._json.avatar_url;
  console.log(pic);
  res.render('index', { title: 'Express', pic: pic });
});

module.exports = router;
