<template><div>
  <div>
    <div class="clearfix location">
        <div class="pull-left">
            <ol class="breadcrumb">
                <li class="active">活动管理</li>
                <li><a v-link="{name : configs.links.list}">{{configs.title}}管理</a></li>
                <li class="active">添加{{configs.title}}</li>
            </ol>
        </div>
    </div>
    <validator name="validation1">
        <div class="form-horizontal" novalidate>
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
                  <single-image :id.sync="data.image" :url.sync="data.image_url"></single-image>
                  <input type="hidden" class="form-control" v-model="data.image_url" initial="off" detect-change="off" detect-blur="off"  v-validate:image_url="{ required: true }"/>
                  <single-viewer :image="data.image_url"></single-viewer>
                  <p class="form-control-static color-red" v-if="$validation1.image_url.required">活动主图不能为空</p>
                </div>
            </div>

            <div class="form-group">
                <label  class="col-sm-2 control-label"><span class="star">*</span>　活动时限 :</label>
                <div class="col-sm-5"  style=" position: static">
                    <div style=" margin-left: 15px">
                        <div class="form-inline" >
                            <div class="form-group">
                                <label class="normal">开始于</label>　
                              <input class="form-control laydate-icon" type="text" @click.stop="open($event,'beginDate')" v-model="calendar.items.beginDate.value" placeholder="">
                            </div>
                        </div>
                        <div class="form-inline">
                          <div class="form-group">
                          <input type="hidden" v-model="data.start_at" initial="off" detect-change="off" detect-blur="off"   v-validate:start_at="{ required: true}"/>
                          <p class="form-control-static color-red" v-if="$validation1.start_at.required">活动时限开始时间不能为空</p>
                          </div>
                        </div>
                        <div class="form-inline">
                            <div class="form-group">
                                <label class="normal">结束于</label>　
                              <input class="form-control laydate-icon" type="text" @click.stop="open($event,'endDate')" v-model="calendar.items.endDate.value" placeholder="">
                            </div>
                        </div>
                    </div>

                  <input type="hidden" v-model="data.end_at" initial="off" detect-change="off" detect-blur="off"   v-validate:end_at="{ required: true}"/>
                  <p class="form-control-static color-red" v-if="$validation1.end_at.required">活动时限结束时间不能为空</p>
                </div>
            </div>

            <template v-if="relations.centers.show">
                <div class="form-group">
                    <label class="col-sm-2 control-label"><span class="star">*</span>　筛选方式 :</label>
                    <div class="col-sm-8">
                        <div class="radio">
                            <label class="col-md-2">
                                <input type="radio" value="10" v-model="data.center_filter_type" initial="off" detect-change="off" detect-blur="off" v-validate:center_filter_type="{ required: true }"> 全部中心
                            </label>
                            <label class="col-md-2">
                                <input type="radio" value="20" v-model="data.center_filter_type" initial="off" detect-change="off" detect-blur="off" v-validate:center_filter_type> 参与的早教中心
                            </label>
                            <label class="col-md-2">
                                <input type="radio" value="30" v-model="data.center_filter_type" initial="off" detect-change="off" detect-blur="off" v-validate:center_filter_type> 不参与的早教中心
                            </label>
                        </div>
                        <p class="form-control-static color-red" v-if="$validation1.center_filter_type.required">请选择筛选方式</p>
                    </div>
                </div>
                <div class="form-group" v-if="data.center_filter_type != 10">
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
                        <input type="hidden" v-model="data.center_list" initial="off" detect-change="off" detect-blur="off" v-validate:center_list="['required']"/>
                        <p class="form-control-static color-red" v-if="$validation1.center_list.required">请选择筛选对象</p>
                    </div>
                </div>
            </div></template>

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
                                <tr v-for="reward in data.reward_list" track-by="id">
                                  <td style="display: none">{{reward.id}}</td>
                                  <td>{{reward.title}}</td>
                                  <template v-for="item in relations.rewards.fields">
                                      <td v-if="item.show">
                                          <span v-if="item.type == 'span price'">{{ reward[item.name]/100 }} 元</span>
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

                        <input type="hidden" v-model="data.reward_list" initial="off" detect-change="off" detect-blur="off" v-validate:reward_list="{ required: true }"/>
                        <p class="form-control-static color-red" v-if="$validation1.reward_list.required">请选择商品</p>
                    </div>
                </div>
            </div></template>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary" @click="saveActivity()">  保 存  </button>
                </div>
            </div>
        </div>
    </validator>
    <selection-modal :v-if="relations.centers.show"
                 :id="'center-modal'"
                 :modal="params.centers"
                 :data.sync="data.center_list"></selection-modal>
    <selection-modal  :v-if="relations.rewards.show"
                 :id="'reward-modal'"
                 :modal="relations.rewards"
                 :data.sync="data.reward_list"></selection-modal>
    <calendar
      :show.sync="calendar.show"
      :type="calendar.type"
      :value.sync="calendar.value"
      :x="calendar.x"
      :y="calendar.y"
      :begin.sync="calendar.begin"
      :end.sync="calendar.end">
    </calendar>
  </div>
</div></template>
<script>
    import selectionModal from "../../templates/selection-modal.vue"
    import Resource from "../../../utils/resource"
    import calendar from '../../../wedgets/calendar/calendar.vue'
    import Tip from  '../../../utils/tip.js'
    import singleImage from '../../templates/singleImage.vue'
    import singleViewer from '../../templates/singleImgViewer.vue'

    //todo 需要补充中心相关的表单验证

    export default {
        props:{
            configs : {
                type: Object,
                default: function(){
                    return {
                        title : '管理',
                        uri: '',
                        links: {
                            list: '',
                            add: '',
                            edit: ''
                        }
                    }
                }
            },
            relations: {
                type: Object,
                default: function(){
                    return {
                        rewards: {
                            title: '选择商品',
                            auto: true,
                            form: [
                              {
                                field: "keyword",
                                type: 'text',
                                title: '商品名称',
                                value: ''
                              }
                            ],
                            keys:[],
                            show: true,
                            fields: [],
                            params: {
                                type: 20,
                                per_page: 10000
                            },
                            resource: 'backstage/products'
                        }
                    }
                }
            }
        },
        components:{
            selectionModal: selectionModal,
            calendar: calendar,
            singleImage,
            singleViewer
        },
        ready () {
            if(this.$route.name == this.configs.links.edit) {
                this.retrieveActivity();
            }
        },
        data () {
            var resource = new Resource(this, this.configs.uri)
            return {
                params: {
                    centers: {
                        title: '选择加盟中心',
                        auto: true,
                        form: [
                            {
                                field: "keyword",
                                type: 'text',
                                title: '中心名称',
                                value: ''
                            }
                        ],
                        keys: [
                            {
                                title: '中心名称',
                                field: 'name'
                            }
                        ],
                        resource: 'backstage/centers',
                        show: true,
                        params: {
                          per_page: 10000
                        }
                    }
                },
                modal:{
                    center:false
                },
                data: {
                    image:'',
                    image_url:'',
                    center_filter_type: 20,
                    center_list:[],
                    reward_list:[],
                    start_at:'',
                    end_at:''
                },
                calendar:{
                  show:false,
                  x:0,
                  y:0,
                  picker:"",
                  begin:"",
                  end:"",
                  value:"",
                  type:'datetime',
                  items:{
                    // 开始日期
                    beginDate:{
                      value:"",
                      end:'',
                      type:"datetime"
                    },
                    // 结束日期
                    endDate:{
                      value:"",
                      begin:'',
                      type:"datetime"
                    }
                  }
                },
                resource,
                error:{
                  show:false,
                  msg:''
                }
            }
        },
        watch: {
          'calendar.value': function (val) {
            this.calendar.items[this.calendar.picker].value=val
            if( this.calendar.picker == 'beginDate'){
              this.data.start_at = val
              this.calendar.items.endDate.begin = val
            }
            if( this.calendar.picker == 'endDate'){
              this.data.end_at = val
              this.calendar.items.beginDate.end = val
            }
          },
          'data.start_at':function(val){
            this.calendar.items.beginDate.value = val
            this.calendar.items.endDate.begin = val
          },
          'data.end_at':function(val){
            this.calendar.items.endDate.value = val
            this.calendar.items.beginDate.end = val
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
                _this.$validate(true, function(){
                    if (_this.$validation1.invalid) {
                        return
                    }
                    if(_this.$route.name == _this.configs.links.add){
                        _this.createActivity();
                    } else if(_this.$route.name == _this.configs.links.edit) {
                        _this.updateActivity()
                    }
                })
            },
            createActivity(){
                var _this = this
                if(_this.integerValidate()) {
                  _this.resource.create(_this.data).then(function (response) {
                    _this.resource.infoSuccess(response, function () {
                      _this.$router.go({name: _this.configs.links.list})
                    })
                  }, function (response) {
                    _this.resource.infoError(response)
                  });
                }
            },
            updateActivity(){
                var _this = this
                var id = _this.$route.params.id;
                if(_this.integerValidate()){
                  _this.resource.update(id, _this.data).then(function(response){
                    _this.resource.infoSuccess(response, function(){
                      _this.retrieveActivity(id);
                    })
                  },function(response){
                    _this.resource.infoError(response)
                  })
                }
            },
            integerValidate(){
              var _this = this
              var rewards = _this.data.reward_list;
              var t = /^[0-9]*$/
              var num = 0;
              for (var i = 0; i < rewards.length; i++) {
                if( !t.test(rewards[i].total)  || typeof(rewards[i].total) == 'undefined'){
                  num = num　+ 1;
                  break;
                }
              }
              if(num > 0){
                tip.showPopTip('请输入大于等于0的整数')
                return false;
              }
              return true;
            },
            retrieveActivity(){
                var _this = this
                var id = _this.$route.params.id;
                _this.resource.show(id).then(function(response){
                    _this.resource.refresh(response)
                },function(response){
                    _this.resource.infoError(response)
                });
                this.$resetValidation()
            },
            // 打开显示选择器
            open(e,type) {
              // 设置类型
              this.calendar.picker=type
              this.calendar.type=this.calendar.items[type].type
              this.calendar.begin=this.calendar.items[type].begin
              this.calendar.end=this.calendar.items[type].end
              this.calendar.value=this.calendar.items[type].value
              // 可不用写
              this.calendar.show=true
              this.calendar.x=e.target.offsetLeft
              this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
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
