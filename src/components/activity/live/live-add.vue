<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li><a v-link="{path : '/live/list'}">直播管理</a></li>
        <li class="active">
          {{$route.name == 'live-edit' ? '编辑课程' : '添加课程'}}
        </li>
      </ol>
    </div>
  </div>

  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　课程名称 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.name" initial="off" detect-change="off" detect-blur="off"   v-validate:name="{ required: true, maxlength: 20 }">
          <p class="form-control-static color-red" v-if="$validation1.name.required">课程名称不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.name.maxlength">最多输入20字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入20字符</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　课程描述 :</label>
        <div class="col-sm-6">
          <textarea class="form-control" rows="5" v-model="data.desc" initial="off" detect-change="off" detect-blur="off"  v-validate:desc="{ required: true, maxlength: 100 }"></textarea>
          <p class="form-control-static color-red" v-if="$validation1.desc.required">课程描述不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.desc.maxlength">最多输入100字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入100字符</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　课程链接 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.link" initial="off" detect-change="off" detect-blur="off"   v-validate:link="{ required: true}">
          <div style="margin-top: 15px;" v-show=" data.link !='' " v-html="data.link"></div>
          <p class="form-control-static color-red" v-if="$validation1.link.required">课程链接不能为空</p>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input type="button" class="btn btn-default" value="保 存" @click="operation"/>
        </div>
      </div>
    </form>
  </validator>
</div></template>
<script>
  import Resource from '../../../utils/resource'
  export default {
    data () {
      var resource = new Resource(this,'backstage/lives')
      return {
        data:{link:''},
        resource
      }
    },
    ready () {
      if(this.$route.name == 'live-edit') {
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
                _this.data = {}
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
        id = id || _this.$route.params.id;
        _this.resource.show(id).then(function(response){
          _this.resource.refresh(response)
        },function(response){
          _this.resource.infoError(response)
        });
      },
      operation () {
        var _this = this
        if(_this.$route.name == 'live-add'){
          _this.add();
        }
        else if(_this.$route.name == 'live-edit') {
          _this.edit()
        }
      }
    }
  }
</script>
