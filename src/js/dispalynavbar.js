import $ from 'jquery'
var dispalynavbar = function (obj) {
  if ($(obj).hasClass('open')) {
    $(obj).removeClass('open')
    $('body').removeClass('big-page')
  } else {
    $(obj).addClass('open')
    $('body').addClass('big-page')
  }
}

module.exports = dispalynavbar
