<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/commodity/list'}">商品管理</a></li>
        <li class="active">添加商品</li>
      </ol>
    </div>
  </div>
  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label class="col-sm-2 control-label"><span class="star">*</span>　商品类型 :</label>
        <div class="col-sm-8">
          <label class="radio-inline">
            <input type="radio" name="type" value="10" v-model="data.type" v-validate:type="['required']"> 秒杀商品
          </label>
          <label class="radio-inline">
            <input type="radio" name="type" value="20" v-model="data.type" v-validate:type> 抽奖商品
          </label>
          <label class="radio-inline">
            <input type="radio" name="type" value="30" v-model="data.type" v-validate:type> 推荐奖品
          </label>
          <p class="form-control-static color-red" v-if="$validation1.type.required">商品类型不能为空</p>
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　商品名称 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.title"  initial="off" detect-change="off" detect-blur="off"  v-validate:title="{ required: true, maxlength: 20 }">
          <p class="form-control-static color-red" v-if="$validation1.title.required">商品名称不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.title.maxlength">最多输入20字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入20字符</p>
        </div>
      </div>

      <div class="form-group" v-if="data.type == 10">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　商品价格 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" value="" v-model="data.price | money"  initial="off" detect-change="off" detect-blur="off"   v-validate:price="['required','maxval']">
          <p class="form-control-static color-red" v-if="$validation1.price.required">商品价格不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.price.required ? 0 : $validation1.price.maxval">请输入大于0小于999以内的数字,且最多输入2位小数</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey"><span class="c-333">元</span>　大于0小于999以内的数字，最多输入2位小数</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　商品配图 :</label>
        <div class="col-sm-6">
          <single-image :id.sync="data.image" :url.sync="data.image_url"></single-image>
          <input type="hidden" class="form-control" v-model="data.image_url" initial="off" detect-change="off" detect-blur="off"  v-validate:image_url="{ required: true }"/>
          <single-viewer :image="data.image_url"></single-viewer>
          <p class="form-control-static color-red" v-if="$validation1.image_url.required">商品配图不能为空</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">支持jpg/jpeg，png格式，大小在1M以内，只能上传1张图片</p>
        </div>
      </div>

      <div class="form-group" v-if="data.type == 10">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　商品描述 :</label>
        <div class="col-sm-6">
          <textarea class="form-control" rows="5"  v-model="data.desc" initial="off" detect-change="off" detect-blur="off" v-validate:desc="{ required: true, maxlength: 200 }"></textarea>
          <p class="form-control-static color-red" v-if="$validation1.desc.required">商品描述不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.desc.maxlength">最多输入<span class="color-red">200</span>字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入200字符</p>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input type="button" class="btn btn-default" value="保 存" @click="add"/>
        </div>
      </div>

    </form>
  </validator>
</div></template>
<script>
  import Resource from '../../utils/resource'
  import {setLoadingStatus} from '../../vuex/loading/action.js'
  import singleImage from '../templates/singleImage.vue'
  import singleViewer from '../templates/singleImgViewer.vue'

  export default {
    components:{
      singleImage,
      singleViewer
    },
    data () {
      return {
        data:{
          type: '10',
          title: '',
          price: '',
          image: '',
          desc: ''
        }
      }
    },
    validators:{
      maxval:function(val){
        if(val > 0 && val < 999){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      add (e) {
        var _this = this
        _this.$validate(true, function () {
           if (_this.$validation1.invalid) {
             e.preventDefault()
           }else{
             var resource = new Resource(_this,'backstage/products')
             resource.create(_this.data).then(function(response){
               resource.infoSuccess(response,function(){
//                 _this.$router.go({name:'commodity-list'});
                   _this.data = { type: '10'}
               })
             },function(response){
               resource.infoError(response)
             });
           }
         })
      }
    }
  }
</script>

