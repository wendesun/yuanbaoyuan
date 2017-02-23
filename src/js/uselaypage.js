import $ from 'jquery'
import laypage from 'laypage'
var uselaypage = function (curr) {
  $.getJSON('user.json', {
    page: curr || 1
  }, function (res) {
    var nums = res.nums
    var data = res.ulist
    var length = data.length
    var pages = Math.ceil(length / nums)
    laypage({
      cont: 'page1',
      pages: pages,
      curr: curr || 1,
      jump: function (obj) {
        var list = []
        list.push(data[i])
        for (var i = 4; i < 7; i++) {
          list.push(data[i])
        }
        console.log(list)
        return list
      }
    })
  })
}

module.exports = uselaypage
