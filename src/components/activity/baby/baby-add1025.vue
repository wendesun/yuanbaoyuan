<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li class="active">活动管理</li>
        <li><a v-link="{name : 'baby-list'}">宝贝评选管理</a></li>
        <li class="active">添加评选</li>
      </ol>
    </div>
  </div>
  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　活动名称 :</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="data.name" initial="off" detect-change="off" detect-blur="off"   v-validate:name="{ required: true, maxlength: 20 }">
          <p class="form-control-static color-red" v-if="$validation1.name.required">活动名称不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.name.maxlength">最多输入20字符</p>
        </div>
        <div class="col-sm-4">
          <p class="form-control-static color-grey">最多输入20字符</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　活动主图 :</label>
        <div class="col-sm-6">
          <img src="http://123.57.223.162:8555/files/0034a0ab18f9fa54517fde665c102c97.jpg" alt="商品配图" style="max-height: 200px;"/>
          <input type="hidden" class="form-control" v-model="data.image" initial="off" detect-change="off" detect-blur="off" v-validate:image="{ required: true }">
          <p class="form-control-static color-red" v-if="$validation1.image.required">活动主图不能为空</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label"><span class="star">*</span>　活动时间 :</label>
        <div class="col-sm-5">
          <div style=" margin-left: 15px">
            <div class="form-inline" style="margin-bottom: 15px">
              <div class="form-group">
                <label class="normal">开始于</label>　
                <input type="text"
                       id="start"
                       class="form-control laydate-icon"
                       style="width: 250px;"
                       v-model="data.start_at" initial="off" detect-change="off" detect-blur="off" v-validate:start_at="{ required: true }">
              </div>
            </div>
            <div class="form-inline">
              <div class="form-group">
                <label class="normal">结束于</label>　
                <input type="text"
                       id="end"
                       class="form-control laydate-icon"
                       style="width: 250px;"
                       v-model="data.end_at" initial="off" detect-change="off" detect-blur="off" v-validate:end_at="{ required: true }">
              </div>
            </div>
          </div>
          <p class="form-control-static color-red" v-if="$validation1.start_at.required">活动开始时间不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.start_at.required">活动结束时间不能为空</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label"><span class="star">*</span>　筛选方式 :</label>
        <div class="col-sm-8">
          <div class="radio">
            <label class="col-md-2">
              <input type="radio" value="10" v-model="data.center_filter_type" initial="off" detect-change="off" detect-blur="off" v-validate:center_filter_type="{ required: true }"> 全部中心
            </label>
            <label class="col-md-2">
              <input type="radio" value="20" v-model="data.center_filter_type" initial="off" detect-change="off" detect-blur="off" v-validate:center_filter_type> 白名单
            </label>
            <label class="col-md-2">
              <input type="radio" value="30" v-model="data.center_filter_type" initial="off" detect-change="off" detect-blur="off" v-validate:center_filter_type> 黑名单
            </label>
          </div>
          <p class="form-control-static color-red" v-if="$validation1.center_filter_type.required">请选择筛选方式</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label"><span class="star">*</span>　筛选对象 :</label>
        <div class="col-sm-8">
          <div class="">
            <button class="btn btn-default" data-toggle="modal" data-target="#center-modal">添加筛选对象</button>
          </div>
          <div class="" style="margin-left: -10px;">
            <button class="btn btn-default"
                    style="margin:5px 10px"
                    v-for="center in data.center_list"
                    track-by="id"
                    @click="removeCenter(center)"
              >{{center.name}} <span class="badge">X</span></button>
          </div>
          <input type="hidden" v-model="data.center_list" initial="off" detect-change="off" detect-blur="off" v-validate:center_list="{ required: true }"/>
          <p class="form-control-static color-red" v-if="$validation1.center_list.required">请选择筛选对象</p>
        </div>
      </div>



      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" @click="saveActivity()">  保 存  </button>
        </div>
      </div>
    </form>
  </validator>
  <centermodal :id="'center-modal'"
               :modal="params.centers"
               :data.sync="data.center_list"></centermodal>

</div></template>
<script>
  import centermodal from "../../templates/selection-modal.vue"
  import rewardmodal from "../../templates/selection-modal.vue"
  import Resource from "../../../utils/resource"
  export default {
    components:{
      centermodal,
      rewardmodal
    },
    ready () {
      this.$set('data.image','0034a0ab18f9fa54517fde665c102c97.jpg')
      if(this.$route.name == 'lottery-edit') {
        this.retrieveActivity();
      }
    },
    data () {
      var resource = new Resource(this, 'backstage/lotteries')
      return {
        params: {
          centers:{
            title:'选择加盟中心',
            auto:false,
            form:[
              {
                field:"keyword",
                type:'text',
                title:'中心名称',
                value:''
              }
            ],
            keys:[
              {
                title:'中心名称',
                field:'name'
              }
            ],
            resource:'backstage/centers',
            params:{
              per_page:10000
            }
          },

          modal:{
            center:false
          }
        },
        data: {
          center_filter_type: 20,
          center_list:[],
          reward_list:[]
        },
        resource
      }
    },
    methods: {
      removeCenter(item){
        this.data.center_list.$remove(item)
      },
      removeReward(item){
        this.data.reward_list.$remove(item)
      },
      saveActivity(){
        var _this = this
        if(_this.$route.name == 'lottery-add'){
          _this.createActivity();
        } else if(_this.$route.name == 'lottery-edit') {
          _this.updateActivity()
        }
      },
      createActivity(e){
        var _this = this
        e = event || window.event || arguments.callee.caller.arguments[0];
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            e.preventDefault()
          }else{
            _this.resource.create(_this.data).then(function(response){
              _this.resource.infoSuccess(response,function(){
                _this.$router.go({name:'lottery-list'})
              })
            },function(response){
              _this.resource.infoError(response)
            });
          }
        })
      },
      updateActivity(e){
        var _this = this
        e = event || window.event || arguments.callee.caller.arguments[0];
        var id = _this.$route.params.id;
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            e.preventDefault()
          }else{
            _this.resource.update(id, _this.data).then(function(response){
              _this.resource.infoSuccess(response, function(){
                _this.retrieveActivity(id);
              })
            },function(response){
              _this.resource.infoError(response)
            })
          }
        })
      },
      retrieveActivity(id){
        var _this = this
        var id = id || _this.$route.params.id;
        _this.resource.show(id).then(function(response){
          _this.resource.refresh(response)
        },function(response){
          _this.resource.infoError(response)
        });
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
