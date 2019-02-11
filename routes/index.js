var express = require('express');
var router = express.Router();
var authenticationEnsurer = require('./authentication-ensurer');

// 画像URLの配列 
var currentLoginUsers = [];

// index画面
router.get('/', authenticationEnsurer, (req, res, next) => {
  var pic_url = req.user._json.avatar_url;
  currentLoginUsers.push(pic_url);
  intoCurrentLoginUsers(currentLoginUsers);
  data = {
    title: '勉強中',
    pic_url: pic_url,
    currentLoginUsers : currentLoginUsers
  }
  res.render('index', data);
});

// ログイン画面
router.get('/login', function(req, res, next) {
  res.render('login', { user: req.user});
});

// ログアウト
router.get('/logout', function(req, res, next) {
  deleteFromCurrentLoginUsers(req, res);
  req.logout();
  res.redirect('/');
});


// AJAXで現在のログインユーザーを配列で取得できるAPI
router.get('/currentLoginUsers', authenticationEnsurer, (req, res, next) => {
  res.json({currentLoginUsers: currentLoginUsers});
});

//バグ・再読み込みでアイコンが増えるので重複をなくすことで対処 (X出来ない)
function intoCurrentLoginUsers(currentLoginUsers) {
  return currentLoginUsers.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

//バグ・ログアウト時、currentLoginUsers配列から自分のURLを削除 (X出来ない)
function deleteFromCurrentLoginUsers(req, res) {
  for (var i = 0; i < currentLoginUsers.length; i++) {
    if (currentLoginUsers[i] === req.user._json.avatar_url) {
      currentLoginUsers.splice(i, 1);
    } 
  }
}

module.exports = router;
