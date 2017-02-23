<template><div>
  <validator name="validation1">

  <form class="form-horizontal" novalidate id="personal">
    <div class="form-group">
      <label class="col-sm-2 control-label">头像 :</label>
      <div class="col-sm-8">
        <single-viewer :image="data.avatar_url" :style-object="styleObject"></single-viewer>
      </div>
    </div>
    <div class="form-group">
      <label  class="col-sm-2 control-label">手机号码 :</label>
      <div class="col-sm-8">
        <p class="form-control-static">{{ data.phone }}</p>
      </div>
    </div>


    <div class="form-group">
      <label  class="col-sm-2 control-label">宝宝姓名 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="data.baby_name">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">宝宝昵称 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="data.baby_nickname ">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">宝宝出生日期 :</label>
      <div class="col-sm-2" style=" position: static;">
        <input  class="form-control laydate-icon" type="text" @click.stop="open($event,'date')" v-model="calendar.items.date.value" placeholder="">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">性别 :</label>
      <div class="col-sm-8">
        <label class="radio-inline">
          <input type="radio" name="baby_gender"  value="1"  v-model="data.baby_gender"> 男
        </label>
        <label class="radio-inline">
          <input type="radio" name="baby_gender"  value="0"  v-model="data.baby_gender"> 女
        </label>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">收货信息 :</label>
      <div class="col-sm-8">
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>收货地址</th>
            <th>收货人</th>
            <th>手机号</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="address in data.addresses">
            <td>{{ address.address }}</td>
            <td>{{ address.contact }}</td>
            <td>{{ address.phone }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">电子邮箱 :</label>
      <div class="col-sm-8">
        <input type="text " class="form-control" v-model=" data.email " initial="off" detect-change="off" detect-blur="off"  v-validate:email="{ pattern: '/^([_a-zA-Z0-9\-\.]+@([\-_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3})?$/'}">
        <p class="form-control-static color-red" v-if="$validation1.email.pattern">电子邮箱格式错误，请重新输入</p>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">推荐人手机号码 :</label>
      <div class="col-sm-8">
        <p class="form-control-static">{{ data.recommend_phone }}</p>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">备注 :</label>
      <div class="col-sm-8">
        <textarea class="form-control" rows="3"  v-model="data.remarks" initial="off" detect-change="off" detect-blur="off"  v-validate:remarks="{ maxlength: 500 }"></textarea>
        <p class="form-control-static color-red" v-if="$validation1.remarks.maxlength">最多输入500字符</p>
      </div>
      <div class="col-sm-2">最多输入500字符</div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-default"  :disabled="params.disabled"  @click="update()" >保 存</button>
      </div>
    </div>
  </form>
  </validator>
  <calendar
    :show.sync="calendar.show"
    :type="calendar.type"
    :value.sync="calendar.value"
    :x="calendar.x"
    :y="calendar.y"
    :begin.sync="calendar.begin"
    :end.sync="calendar.end">
  </calendar>
</div></template>
<script>
  import $ from 'jquery'
  import modal from '../../wedgets/modal.vue'
  import {user,pagination,userStatus,userType,sortType} from '../../utils/data_templates'
  import Resource from '../../utils/resource'
  import calendar from '../../wedgets/calendar/calendar.vue'
  import singleViewer from '../templates/singleImgViewer.vue'

  export default {
    props: [
        'id'
    ],
    components: {
      modal:modal,
      calendar: calendar,
      singleViewer
    },
    route:{
      canDeactivate: function () {
        return this.params.changeConfirm ? confirm('是否退出当前页') : true;
      }
    },
    data () {
      var resource = new Resource(this,'backstage/users')
      return {
        params:{
//          address: 1,
          changeConfirm: 0,
          disabled: true
        },
        status:200,
        message:'',
        data:{ baby_birthday:''},
        resource,
        calendar: {
          show: false,
          x: 0,
          y: 0,
          picker: "",
          begin: "",
          end: "",
          value: "",
          type: '',
          items: {
            // 开始日期
            date: {
              value: "",
              end: '',
              type: "date"
            }
          }
        },
        styleObject:{
          maxHeight: '150px',
          marginTop: '15px'
        }
      }
    },
    created(){
      this.refresh()
    },
    ready(){
      var _this = this;
      $('#personal input, #personal textarea').on('focus',function(){
        _this.params.disabled = false
        _this.params.changeConfirm = 1;
      })
    },
    watch:{
      'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
      },
      'calendar.items.date.value':function(val){
        this.data.baby_birthday = val
      },
      'data.baby_birthday':function(val){
        this.calendar.items.date.value = val
      }
    },
    methods: {
      refresh () {
        var _this = this
        _this.resource.show(_this.$route.params.userId, {}).then(function(response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      update() {
        var _this = this
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            return;
          }else{
            _this.resource.update(_this.$route.params.userId, _this.$data.data).then(function(response){
              _this.resource.infoSuccess(response, function(){
                _this.refresh()
                _this.params.changeConfirm = 0
              })
            },function(response){
              _this.resource.infoError(response)
            });
          }
        })
      },
      changeForm() {
        var _this = this
        _this.params.disabled = false
        _this.params.changeConfirm = 1
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
