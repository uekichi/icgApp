'use strict';

import $ from 'jquery';
const block = $('#block');
const scalingButton = $('#scaling-button');

scalingButton.click(() => {
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

const everyone = $('.avater');

import io from 'socket.io-client';
const socket = io('http://localhost:8000/index');
socket.on('room-status', (data) => {
  everyone.text(data.everyone_url);
});