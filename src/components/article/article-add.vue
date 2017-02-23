<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/article/list'}">文章管理</a></li>
        <li class="active">
          {{$route.name == 'article-edit' ? '编辑文章' : '添加文章'}}
        </li>
      </ol>
    </div>
  </div>

  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　文章标题 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.title" initial="off" detect-change="off" detect-blur="off"   v-validate:title="{ required: true, maxlength: 20 }">
          <p class="form-control-static color-red" v-if="$validation1.title.required">文章标题不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.title.maxlength">最多输入20字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入20字符</p>
        </div>
      </div>

      <div class="form-group" v-if="$route.name == 'article-edit'">
        <label class="col-sm-2 control-label"><span class="star">*</span>　类别 :</label>
        <div class="col-sm-8">
          <p class="form-control-static">{{data.class_id == 10 ? '新闻公告' : '家长俱乐部'}}</p>
        </div>
      </div>

      <div class="form-group" v-if="$route.name == 'article-add'">
        <label class="col-sm-2 control-label"><span class="star">*</span>　类别 :</label>
        <div class="col-sm-8">
          <label class="radio-inline">
            <input type="radio" name="classid" value="20" @click="clearLevel" v-model="data.class_id" initial="off" detect-change="off" detect-blur="off"  v-validate:class_id="['required']"> 家长俱乐部
          </label>
          <label class="radio-inline">
            <input type="radio" name="classid" value="10"  v-model="data.class_id" initial="off" detect-change="off" detect-blur="off"  v-validate:class_id> 新闻公告
          </label>
          <p class="form-control-static color-red" v-if="$validation1.class_id.required">类别不能为空</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label"><span class="star">*</span>　置顶 :</label>
        <div class="col-sm-8">
          <label class="radio-inline">
            <input type="radio" name="level" value="10" initial="off" detect-change="off" detect-blur="off"  v-model="data.level"  v-validate:level="{required:true}"> 不置顶
          </label>
          <label class="radio-inline">
            <input type="radio" name="level" value="20" initial="off" detect-change="off" detect-blur="off" v-model="data.level"  v-validate:level> 列表置顶
          </label>
          <label class="radio-inline" v-show="data.class_id == 10">
            <input type="radio" name="level" value="30" initial="off" detect-change="off" detect-blur="off" v-model="data.level"  v-validate:level> 轮播图
          </label>
          <p class="form-control-static color-red" v-if="$validation1.level.required">置顶不能为空</p>

        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　<span>{{data.level != 30 ? '缩略图' : '轮播图'}}</span> :</label>
        <div class="col-sm-6">
          <single-image :id.sync="data.image_id" :url.sync="data.image_url"></single-image>
          <input type="hidden" class="form-control" v-model="data.image_url" initial="off" detect-change="off" detect-blur="off"  v-validate:image_url="{ required: true }"/>
          <single-viewer :image="data.image_url"></single-viewer>
          <p class="form-control-static color-red" v-if="$validation1.image_url.required">{{data.level != 30 ? '缩略图' : '轮播图'}}不能为空</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">支持jpg/jpeg，png格式，大小在1M以内，只能上传1张图片</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　正文 :</label>
        <div class="col-sm-8">
          <script id="article" name="article" type="text/plain" ></script>
          <input type="hidden" class="form-control" v-model="data.content" initial="off" detect-change="off" detect-blur="off"  v-validate:content="{ required: true }"/>
          <p class="form-control-static color-red" v-if="$validation1.content.required">正文不能为空</p>
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
import Resource from '../../utils/resource'
import singleImage from '../templates/singleImage.vue'
import singleViewer from '../templates/singleImgViewer.vue'

window.UEDITOR_CONFIG.serverUrl = window.UEDITOR_SERVER_URL;

export default {
  components: {
    singleImage,
    singleViewer
  },
  data () {
    var resource = new Resource(this,'backstage/articles');
    return {
      data:{
        image_id:'',
        image_url:'',
      },
      resource
    }
  },
  attached(){
    this.$data._ue = UE.getEditor('article')
  },
  detached(){
    this.$data._ue.destroy()
  },
  ready () {
    var _this = this
    if(_this.$route.name == 'article-edit') {
      _this.show()
    }
    _this.$data._ue.addListener("contentChange", function () {
      _this.$set('data.content', _this.$data._ue.getContent())
    });
  },
  methods:{
    clearLevel () {
      if(  30 == this.data.level){
        this.$set('data.level',10)
      }
    },
    show (id) {
      var _this = this
      var id = id || _this.$route.params.id;
      _this.resource.show(id, {}).then(function(response){
        _this.resource.refresh(response)
        _this.getContent(_this.data.content)
      },function (response){
        _this.resource.infoError(response)
      })
    },
    edit (e) {
      var _this = this
      _this.$set('data.content', _this.$data._ue.getContent())
      var id = _this.$route.params.id;
      _this.$validate(true, function () {
        if (_this.$validation1.invalid) {
          e.preventDefault()
        }else{
          //编辑
          _this.resource.update(id, _this.$data.data).then(function(response){
            _this.resource.infoSuccess(response, function(){
              _this.show(id)
              _this.resource.alerting('更新成功');
            })
          },function(response){
            _this.resource.infoError(response)
          });
        }
      })
    },
    getContent(content){
      var _this = this
      _this.$data._ue.ready(function(){
        _this.$data._ue.setContent(content)
      })
    },
    add (e) {
      var _this = this
      e = event || window.event || arguments.callee.caller.arguments[0];
      _this.$validate(true, function () {
        if (_this.$validation1.invalid) {
          e.preventDefault()
        }else{
          _this.resource.create(_this.data).then(function(response){
            _this.resource.infoSuccess(response,function(){
              _this.$router.go({name:'article-list'});
            })
          },function(response){
            _this.resource.infoError(response)
          })
        }
      })
    },
    operation () {
      var _this = this
      if(_this.$route.name == 'article-add'){
        _this.add();
      }
      else if(_this.$route.name == 'article-edit') {
        _this.edit();
      }
    }
  }
}
</script>
