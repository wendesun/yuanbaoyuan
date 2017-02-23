<template><div>
  <div class="form-group">
    <label class="col-sm-2 control-label">创建日期：</label>
    <div class="col-sm-4">
      <input type="text" class="form-control laydate-icon" id="start">
    </div>
    <div class="col-sm-1 text-center">至</div>
    <div class="col-sm-4">
      <input type="text" class="form-control laydate-icon" id="end">
    </div>
  </div>
</div></template>
<script>
//  var uselaydate = require('./uselaydate.js')
  export default {
    ready () {
      var start = {
        elem: '#start',
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16 23:59:59', //最大日期
        istime: true,
        istoday: false,
        choose: function(datas){
          end.min = datas; //开始日选好后，重置结束日的最小日期
          end.start = datas //将结束日的初始值设定为开始日
        }
      };
      var end = {
        elem: '#end',
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(),
        max: '2099-06-16 23:59:59',
        istime: true,
        istoday: false,
        choose: function(datas){
          start.max = datas; //结束日选好后，重置开始日的最大日期
        }
      };
      laydate(start);
      laydate(end);
      laydate.skin('huanglv');
    }
  }
</script>
