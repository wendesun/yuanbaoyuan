<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">全局设置</li>
      </ol>
    </div>
  </div>

  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　证书价格 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.cert_price | money"  initial="off" detect-change="off" detect-blur="off"   v-validate:cert_price="['required','gtzero']">
          <p class="form-control-static color-red" v-if="$validation1.cert_price.required">商品价格不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.cert_price.required ? 0 : $validation1.cert_price.gtzero">请输入大于0的数字，最多允许输入小数点后两位</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey"><span class="c-333">元</span></p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　分享消息 :</label>
        <div class="col-sm-6">
          <textarea name="" id="" class="form-control" rows="3" v-model="data.share_app_msg" initial="off" detect-change="off" detect-blur="off"  v-validate:share_app_msg="{ required: true, maxlength: 50 }"></textarea>
          <p class="form-control-static color-red" v-if="$validation1.share_app_msg.required">分享消息不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.share_app_msg.maxlength">最多输入50字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入50字符</p>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input type="button" class="btn btn-default" value="保 存" @click="update"/>
        </div>
      </div>
    </form>
  </validator>
</div></template>
<script>
  import Resource from '../../utils/resource.js'
  export default {
    data () {
      var resource = new Resource(this,'backstage/global-settings');
      return {
        data:{},
        resource
      }
    },
    created(){
      this.refresh()
    },
    validators:{
      gtzero:function(val){
        if(val > 0 ){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      refresh () {
        var _this = this
        _this.resource.index().then(function(response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      update (e) {
        var _this = this
//        e = event || window.event || arguments.callee.caller.arguments[0];
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            e.preventDefault()
          }else{
            _this.resource.setup('', _this.data).then(function(response){
              _this.resource.infoSuccess(response, function(){
                _this.refresh()
              })
            },function(response){
              _this.resource.infoError(response)
            });
          }
        })
      }
    }
  }
</script>
