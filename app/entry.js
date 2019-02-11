'use strict';

import $ from 'jquery';

const currentLoginUsers = $('#currentLoginUsers');
const loginNumber = $('#loginNumber');

//10秒に1度、ログインしてる人を表示させる
//dataはJSON形式、currentLoginUsers属性でアイコンURLの配列を取得
setInterval(() => {
  $.get('/currentLoginUsers', {}, (data) => {
    currentLoginUsers.empty();
    for (var i = 0; i < data.currentLoginUsers.length; i++) {
      currentLoginUsers.append('<img src="' + data.currentLoginUsers[i] + '" width="30px" height="30px">');
    }
    loginNumber.text('今、勉強している人たち ' + data.currentLoginUsers.length + '人');
  });
}, 10000);
