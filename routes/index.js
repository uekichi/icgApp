var express = require('express');
var router = express.Router();
var authenticationEnsurer = require('./authentication-ensurer');


/* GET Top page. 
var people = ['https://pbs.twimg.com/profile_images/897721479600775168/rdmq-QmZ_400x400.jpg',
                'https://pbs.twimg.com/profile_images/745768799849308160/KrZhjkpH_bigger.jpg',
                'https://pbs.twimg.com/profile_images/881777512946180096/iO9-lBF__bigger.jpg'];
*/
router.get('/', authenticationEnsurer, (req, res, next) => {
  var pic_url = req.user._json.avatar_url;
  var people = [];
  people.push(pic_url);
  data = {
    title: '勉強部屋',
    pic_url: pic_url,
    people : people
  }
  res.render('index', data);
});

module.exports = router;
