<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li><a v-link="{name : 'version-list'}">版本管理</a></li>
          <li class="active">{{$route.name == 'version-edit' ? '编辑版本' : '添加版本'}}</li>
        </ol>
      </div>
    </div>
    <validator name="validation1">
      <form class="form-horizontal" novalidate>

        <div class="form-group">
          <label class="col-sm-2 control-label"><span class="star">*</span>　产品 :</label>
          <div class="col-sm-6">
            <select class="form-control" initial="off" detect-change="off" detect-blur="off" v-model="name"  v-validate:name="{ required: true}">
              <option value="悦宝园">悦宝园</option>
            </select>
            <p class="form-control-static color-red" v-if="$validation1.name.required">产品不能为空</p>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label"><span class="star">*</span>　版本号 :</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="data.version_id"  initial="off" detect-change="off" detect-blur="off"  v-validate:version_id="{ required: true, pattern:'/^[0-9]*$/'}">
            <p class="form-control-static color-red" v-if="$validation1.version_id.required">版本号不能为空</p>
            <p class="form-control-static color-red" v-if="$validation1.version_id.pattern">版本号必须为整数</p>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label">版本名称 :</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="data.version">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label"><span class="star">*</span>　平台 :</label>
          <div class="col-sm-6">
            <select class="form-control" initial="off" detect-change="off" detect-blur="off" v-model="data.platform"  v-validate:platform="{ required: true}">
              <option value="">请选择平台名称</option>
              <option value="ios">ios</option>
              <option value="android">android</option>
            </select>
            <p class="form-control-static color-red" v-if="$validation1.platform.required">请选择平台</p>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label">渠道 :</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="data.pkg_source">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label"><span class="star">*</span>　状态 :</label>
          <div class="col-sm-8">
            <label class="radio-inline">
              <input type="radio" name="type" value="N" initial="off" detect-change="off" detect-blur="off" v-model="data.status" v-validate:status="['required']"> 最新版本
            </label>
            <label class="radio-inline">
              <input type="radio" name="type" value="O" initial="off" detect-change="off" detect-blur="off" v-model="data.status" v-validate:status> 提示升级
            </label>
            <label class="radio-inline">
              <input type="radio" name="type" value="A" initial="off" detect-change="off" detect-blur="off" v-model="data.status" v-validate:status> 不提示升级
            </label>
            <label class="radio-inline">
              <input type="radio" name="type" value="E" initial="off" detect-change="off" detect-blur="off" v-model="data.status" v-validate:status> 强制升级
            </label>
            <p class="form-control-static color-red" v-if="$validation1.status.required">请选择状态</p>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label"><span class="star">*</span>　下载地址 :</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="data.url"  initial="off" detect-change="off" detect-blur="off"  v-validate:url="{ required: true}">
            <p class="form-control-static color-red" v-if="$validation1.url.required">下载地址不能为空</p>
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label">标题 :</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="data.title">
          </div>
        </div>

        <div class="form-group">
          <label  class="col-sm-2 control-label">描述 :</label>
          <div class="col-sm-6">
            <textarea class="form-control" rows="5"  v-model="data.desc"></textarea>
          </div>
          <div class="col-sm-2">
            <p class="form-control-static color-grey">以 "|||" 分隔段落</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <input type="button" class="btn btn-default" value="保 存" @click="operation"/>
          </div>
        </div>

      </form>
    </validator>
  </div>
</div></template>
<script>
  import Resource from '../../utils/resource'
  export default {
    data () {
      var resource = new Resource(this,'backstage/app-versions')
      return {
        data:{platform:''},
        name:'悦宝园',
        resource
      }
    },
    ready () {
      if(this.$route.name == 'version-edit') {
        this.show()
      }
    },
    methods:{
      add(e) {
        var _this = this
        e = event || window.event || arguments.callee.caller.arguments[0];
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            e.preventDefault()
          }else{
            _this.resource.create(_this.data).then(function(response){
              _this.resource.infoSuccess(response,function(){
                _this.data = {platform:''}
              })
            },function(response){
              _this.resource.infoError(response)
            });
          }
        })
      },
      edit(e) {
        var _this = this
        e = event || window.event || arguments.callee.caller.arguments[0];
        var id = _this.$route.params.id;
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            e.preventDefault()
          }else{
            _this.resource.update(id, _this.data).then(function(response){
              _this.resource.infoSuccess(response, function(){
                _this.show(id);
              })
            },function(response){
              _this.resource.infoError(response)
            })
          }
        })
      },
      show (id) {
        var _this = this
        var id = id || _this.$route.params.id;
        _this.resource.show(id,{}).then(function(response){
          _this.resource.refresh(response)
//          console.log( JSON.stringify(response.json()))
        },function(response){
          _this.resource.infoError(response)
        });
      },
      operation () {
        var _this = this
        if(_this.$route.name == 'version-add'){
          _this.add();
        }
        else if(_this.$route.name == 'version-edit') {
          _this.edit()
        }
      }
    }
  }
</script>
