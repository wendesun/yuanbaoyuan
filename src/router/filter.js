import Vue from 'vue'
import Tip from  '../utils/tip.js'
var tip = new Tip()
Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

Vue.filter('dateCut', {
  read: function (value) {
    return String(value).substring(0,String(value).lastIndexOf(':'))
  },
  write: function (val, oldVal) {
    return val
  }
})

Vue.filter('date', {
  read: function (value) {
    return value
  },

  write: function (val, oldVal) {
    return val
  }
})

Vue.filter('dateNohm', {
  read: function (value) {
    return value
  },

  write: function (val, oldVal) {
    return val
  }
})

Vue.filter('integer', {
  read: function(val){
      if(val){
        return parseInt(val)
      } else{
        //alert('请输入正整数')
        return 0
      }
  },
  write: function(val, oldVal){
    return  parseInt(val) ? parseInt(val) : 0;
  }
})
Vue.filter('aboveZero', {
  read: function(val){
    if(val > 0 ){
      return parseInt(val)
    } else{
      tip.showPopTip('请输入商品剩余可秒杀的数量')
      return ''
    }
  },
  write: function(val, oldVal){
    if(val > 0 ){
      return parseInt(val)
    } else{
      tip.showPopTip('请输入大于0的正整数')
      return ''
    }
  }
})


Vue.filter('price', function(val){
  if( val == '' && val == 0){
    return ''
  }
  return parseFloat((val/100).toFixed(2))
})

Vue.filter('money', {
  read: function(val){
    if(isNaN(val) || val === ''){
      return ''
    }
    if(val == 0){
      return 0;
    }
    return val == ''? '' : parseFloat((val / 100).toFixed(2))

  },
  write: function(val, oldVal) {
    if(isNaN(val) || val === ''){
      return ''
    }
    if(val == 0){
      return 0;
    }
    return val == '' ? '' : parseFloat((val * 100).toFixed(0))
  }
})

Vue.filter('zero', {
  read: function(val){
    if(val == 0 || isNaN(val)){
      return '';
    }
    return val
  },
  write: function(val, oldVal) {
    if(isNaN(val)){
      return ''
    }
    return val == '' ? '' : val
  }
})

Vue.filter('price', {
  //todo 算法上需要微调,肯定有更好的价格换算方法
  read: function(value){
    if(value){
        return parseInt(value)/100
      } else{
        //alert('请输入正整数')
        return 0
      }
  },
  write: function(value, oldVal){
    return parseInt(Math.ceil(value * 10000 ) /100 )
  }
})
