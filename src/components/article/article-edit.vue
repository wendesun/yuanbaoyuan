<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/article/list'}">文章管理</a></li>
        <li class="active">编辑文章</li>
      </ol>
    </div>
  </div>
  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　文章标题 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.title"   v-validate:title="{ required: true, maxlength: 20 }">
          <p class="form-control-static color-red" v-if="$validation1.title.required">商品名称不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.title.maxlength">最多输入20字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入20字符</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label"><span class="star">*</span>　类别 :</label>
        <div class="col-sm-8">
          <p class="form-control-static">{{data.class_id == 10 ? '新闻公告' : '家长俱乐部'}}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label"><span class="star">*</span>　置顶 :</label>
        <div class="col-sm-8">
          <label class="radio-inline">
            <input type="radio" name="level" value="10" v-model="data.level"> 不置顶
          </label>
          <label class="radio-inline">
            <input type="radio" name="level" value="20" v-model="data.level"> 列表置顶
          </label>
          <template v-if="data.class_id == 20">
          <label class="radio-inline">
            <input type="radio" name="level" value="30" v-model="data.level"> 轮播图
          </label>
          </div></template>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　<span>{{data.level != 30 ? '缩略图' : '轮播图'}}</span> :</label>
        <div class="col-sm-6">
          <img src="http://123.57.223.162:8555/files/ac95a5a3b249f1bc3b2f5b29e5c18e45.jpg" alt=""/>
          <input type="hidden" class="form-control" v-model="data.image_id" initial="off" v-validate:image="{ required: true }" value="ac95a5a3b249f1bc3b2f5b29e5c18e45.jpg">
          <p class="form-control-static color-red" v-if="$validation1.image.required">{{data.level != 30 ? '缩略图' : '轮播图'}}不能为空</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">支持jpg/jpeg，png格式，大小在1M以内，只能上传1张图片</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　正文 :</label>
        <div class="col-sm-6">
          <textarea name="" id="" class="form-control" rows="5" v-model="data.content" initial="off" detect-change="off" detect-blur="off" v-validate:content="{ required: true }"></textarea>
          <p class="form-control-static color-red" v-if="$validation1.content.required">正文不能为空</p>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input type="button" class="btn btn-default" value="保 存" @click="update"  :disabled="$validation1.invalid"/>
        </div>
      </div>
    </form>
  </validator>
</div></template>
<script>
import Resource from '../../utils/resource'
export default {
  data () {
    var resource = new Resource(this,'backstage/articles');
    return {
      data:{},
      resource
    }
  },
  created(){
    this.refresh()
  },
  methods:{
    refresh () {
      var _this = this
      _this.resource.show(_this.$route.params.id, {}).then(function(response){
        _this.resource.refresh(response)
      },function (response){
        _this.resource.infoError(response)
      })
    },
    update(e) {
      var _this = this
      _this.$validate(true, function () {
        if (_this.$validation1.invalid) {
          e.preventDefault()
        }else{
          //编辑
          _this.resource.update(_this.$route.params.id, _this.$data.data).then(function(response){
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
