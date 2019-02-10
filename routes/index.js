var express = require('express');
var router = express.Router();
var authenticationEnsurer = require('./authentication-ensurer');

// ファイル間でcurrentLoginUsersの使い方がわからなく全部routes/index.jsにまとめる
// 画像URLの配列 
var currentLoginUsers = [];

router.get('/', authenticationEnsurer, (req, res, next) => {
  var pic_url = req.user._json.avatar_url;
  currentLoginUsers.push(pic_url);
  intoCurrentLoginUsers(currentLoginUsers, pic_url);
  data = {
    title: '勉強中（開発用）',
    pic_url: pic_url,
    currentLoginUsers : currentLoginUsers
  }
  res.render('index', data);
});

router.get('/login', function(req, res, next) {
  res.render('login', { user: req.user});
});

router.get('/logout', function(req, res, next) {
  deleteFromCurrentLoginUsers(req, res);
  req.logout();
  res.redirect('/');
});


//再読み込みでアイコンが増えるので重複をなくすことで対処 (出来ない)
function intoCurrentLoginUsers(currentLoginUsers, pic_url) {
  currentLoginUsers.filter((x, i, self) => {
    return self.indexOf(x) === i;
  });

}

//ログアウト時　currentLoginUsersから自分のURLを削除 (同じURLが全部消えない)
function deleteFromCurrentLoginUsers(req, res) {
  for (var i = 0; i < currentLoginUsers.length; i++) {
    if (currentLoginUsers[i] === req.user._json.avatar_url) {
      currentLoginUsers.splice(i, 1);
    } 
  }
}

module.exports = router;
