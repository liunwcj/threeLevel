'use strict';

var $ = require('jquery');
var $box = $('#my-actions');
var $html = $('html');
var $itemBox = $box.find('.zx-list-box');
var $itemUl = $itemBox.find('.zx-list');

function LevelThree() {
  this.dataKey = 0;
  this.$level_1 = $itemUl.find('.J_level_1');
  this.$level_2 = $itemUl.find('.J_level_2');
  this.$level_3 = $itemUl.find('.J_level_3');
  this.init();
};

$.extend(LevelThree.prototype, {
  init: function() {
    var _ = this;
    var html_w = $html.width();
    $itemUl.height($html.height() / 2).width(html_w + html_w / 2);

    $.getScript('http://mobile.zhongxunrc.com/assets/data/position2.js', function() {
      var data = dataPosition;

      _.firstFn(data, _.dataKey);

      $(_.$level_1).find('p').on('click', function() {
        var dataKey = _.dataKey + ',' + $(this).data('id');
        _.secondFn(data, dataKey);
      });

      $(_.$level_2).on('click', 'p', function() {
        var $this = $(this);
        var dataKey = $this.data('key') + ',' + $this.data('id');
        _.thirdFn(data, dataKey);
        $itemBox.animate({
          scrollLeft: html_w / 2
        }, 300);
      });
    });
  },
  firstFn: function(data, curid) {
    var _ = this;
    _.$level_1.html(_.rend(data, curid));
  },
  secondFn: function(data, curid) {
    var _ = this;
    _.$level_2.html(_.rend(data, curid));
  },
  thirdFn: function(data, curid) {
    var _ = this;
    _.$level_3.html(_.rend(data, curid));
  },
  rend: function(data, curid) {
    var html = '<p><a>请选择</a></p>';
    !!data[curid] && $.each(data[curid], function(k, v) {
      html += '<p data-key="' + curid + '" data-id="' + k + '" value="' + v + '"><a>' + v + '</a></p>'
    });
    return html;
  }
});

new LevelThree();

