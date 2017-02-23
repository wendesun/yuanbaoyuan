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
          <p class="form-control-static">{{data.class_id == 10 ? '家长俱乐部' : '新闻公告'}}</p>
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
          <img-upload></img-upload>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">支持jpg/jpeg，png格式，大小在1M以内，只能上传1张图片</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　正文 :</label>
        <div class="col-sm-6">
          <!-- 加载编辑器的容器 -->
          <script id="myEditor1" name="content" type="text/plain" style="width:100%;height:300px;"></script>
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
import imgUpload from '../../wedgets/image-upload/img-upload.vue'
import Resource from '../../utils/resource'
export default {
  components:{
    imgUpload
  },
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
  ready () {
    UM.getEditor('myEditor1')
  },
  methods:{
    refresh () {
      var _this = this
      _this.resource.show(_this.$route.params.id, {}).then(function(response){
        _this.resource.refresh(response)
//        console.log('111111111' + this.data.content)
        UM.getEditor('myEditor').setContent(this.data.content);
      },function (response){
        _this.resource.infoError(response)
      })
    },
    update() {
      var _this = this
      _this.data.content = UM.getEditor('myEditor').getAllHtml();
      _this.resource.update(_this.$route.params.id, _this.$data.data).then(function(response){
        _this.resource.infoSuccess(response, function(){
          _this.refresh()
        })
      },function(response){
        _this.resource.infoError(response)
      });
    }
  }
}
</script>
