<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li class="active">推荐奖励管理</li>
      </ol>
    </div>
  </div>

  <validator name="validation1">
    <div class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　活动主图 :</label>
        <div class="col-sm-6">
          <single-image :id.sync="data.recommend_image_id" :url.sync="data.recommend_image_url"></single-image>
          <input type="hidden" class="form-control" v-model="data.recommend_image_url" initial="off" detect-change="off" detect-blur="off"  v-validate:recommend_image_url="{ required: true }"/>
          <single-viewer :image="data.recommend_image_url"></single-viewer>
          <p class="form-control-static color-red" v-if="$validation1.recommend_image_url.required">活动主图不能为空</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　奖励规则 :</label>
        <div class="col-sm-6">
          用户每推荐
          <input type="text" class="form-control"  style="display: inline-block; width: 80px;"
                 v-model="ratio"
                 initial="off"
                 detect-change="off"
                 detect-blur="off"
                 v-validate:ratio="{required:true, pattern: '/^[1-9][0-9]*$/' }">
          名用户成为VIP会员，便可获取1次奖励。（只允许输入大于0的整数）
          <p class="form-control-static color-red" v-if="$validation1.ratio.required">奖励规则不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.price.required ? 0 : $validation1.ratio.pattern ">只允许输入大于0的整数</p>
        </div>
      </div>

      <template v-if="relations.rewards.show">
        <div class="form-group">
          <label  class="col-sm-2 control-label"><span class="star">*</span>　商品设置 :</label>
          <div class="col-sm-8">
            <div style="margin-bottom:1em" >
              <button class="btn btn-default" data-toggle="modal" data-target="#reward-modal">添加商品</button>
            </div>
            <div >
              <table class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th style="display: none">商品ID</th>
                  <th>商品名称</th>
                  <template v-for="item in relations.rewards.fields">
                    <th  v-if="item.show">
                      {{item.title}}
                    </th>
                  </div></template>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="reward in rewards" track-by="id">
                  <td style="display: none">{{reward.id}}</td>
                  <td>{{reward.title}}</td>
                  <template v-for="item in relations.rewards.fields">
                    <td v-if="item.show">
                      <span v-if="item.type == 'span price'">{{reward[item.name] | price}} 元</span>
                      <input type="text"
                             style="border:none;"
                             v-model="reward[item.name] | integer"
                             v-if="item.type == 'integer'"
                        >
                      <input type="text"
                             style="border:none;"
                             v-model="reward[item.name]"
                             v-if="item.type == 'text'"
                        >
                      <span v-if="item.type == 'span'">{{reward[item.name]}}</span>
                    </td>
                  </div></template>
                  <td>
                    <a @click="removeReward(reward)">删除</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <input type="hidden" v-model="rewards" initial="off" detect-change="off" detect-blur="off" v-validate:rewards="{ required: true }"/>
            <p class="form-control-static color-red" v-if="$validation1.rewards.required">请选择商品</p>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default" @click="updateSetup()">  保 存  </button>
          </div>
        </div>
      </div></template>
    </div>
  </validator>
  <selection-modal :id="'reward-modal'"
                   :modal="relations.rewards"
                   :data.sync="rewards"></selection-modal>
</div></template>
<script>
  import selectionModal from "../../templates/selection-modal.vue"
  import Resource from "../../../utils/resource"
  import singleImage from '../../templates/singleImage.vue'
  import singleViewer from '../../templates/singleImgViewer.vue'
  import Tip from  '../../../utils/tip.js'
  var tip = new Tip()

  export default {
    components:{
      selectionModal: selectionModal,
      singleImage,
      singleViewer
    },
    ready () {
      this.getSetup();
      this.getActivityImg()
    },
    data () {
      var resource = new Resource(this, '/backstage')

      return {
        relations:{
          rewards: {
            title: '选择推荐奖品',
            auto: true,
            form: [
              {
                field: "keyword",
                type: 'text',
                title: '奖品名称',
                value: ''
              }
            ],
            keys: [
              {
                title: '奖品名称',
                field: 'title'
              }
            ],
            resource: 'backstage/products',
            show: true,
            fields: [
              {
                title: '剩余库存',
                show: true,
                name: 'left_times',
                type: 'integer'
              }
            ],
            params: {
              type: 30,
              per_page: 10000
            }
          }
        },
        modal:{
          center:false
        },
        data:{},
        rewards:[],
        ratio:'',
        image:'',
        resource
      }
    },
    methods: {
      removeReward(item){
        this.rewards.$remove(item)
      },
      updateSetup(event){
        var _this = this
        event = event || window.event || arguments.callee.caller.arguments[0];
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            event.preventDefault()
          }else{
            if(_this.integerValidate()){
              //奖励规则、商品设置
              _this.resource.update('recommends', {rewards:_this.rewards,ratio: _this.ratio}).then(function(response){
                _this.resource.infoSuccess(response, function(){
                  _this.getSetup();
                })
              },function(response){
                _this.resource.infoError(response)
              })
              //活动主图
              _this.resource.update('recommends/image', _this.data).then(function(response){
                _this.resource.refresh(response)
                _this.getActivityImg();
              },function(response){
                _this.resource.infoError(response)
              });
            }
          }
        })
      },
      getSetup(){
        var _this = this
        _this.resource.show('recommends').then(function(response){
          _this.resource.refresh(response)
        },function(response){
          _this.resource.infoError(response)
        });
        this.$resetValidation()
      },
      getActivityImg(){
        var _this = this
        _this.resource.show('recommends/image').then(function(response){
          _this.resource.refresh(response)
        },function(response){
          _this.resource.infoError(response)
        });
        this.$resetValidation()
      },

      integerValidate(){
        var _this = this
        var rewards = _this.rewards;
        console.log(JSON.stringify(rewards))
        var t = /^[0-9]*$/
        var num = 0;
        for (var i = 0; i < rewards.length; i++) {
          if( !t.test(rewards[i].left_times)  || typeof(rewards[i].left_times) == 'undefined'){
            num = num　+ 1;
            break;
          }
        }
        if(num > 0){
          tip.showPopTip('请输入大于等于0的整数')
          return false;
        }
        return true;
      }
    }
  }
</script>
<style>
  .search-list{
    z-index: 1;
    position: absolute;
    margin-left: 117px !important;
    display: block;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  .search-list li{
    width: 250px;
    padding: 6px 12px!important;
  }
  .search-list li:hover{
    background-color: #f1eff0;
  }
  ul.zjzx-list,li{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul.zjzx-list li{
    white-space: nowrap;
    word-break: keep-all;
  }
</style>
