<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/user/list'}">用户管理</a></li>
        <li class="active">审核用户</li>
      </ol>
    </div>
  </div>

  <form class="form-horizontal">
    <div class="form-group m-bottom10">
      <label  class="col-sm-3  col-lg-2   control-label">手机号 :</label>
      <div class="col-sm-7  col-lg-8">
        <p class="form-control-static">{{contract.user.phone}}</p>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">宝宝姓名 :</label>
      <div class="col-sm-7  col-lg-8">
        <p class="form-control-static">{{contract.user.baby_name}}</p>
      </div>
    </div>

    <div class="form-group">
      <label class="col-sm-3  col-lg-2   control-label">合同照片 :</label>
      <div class="col-sm-7  col-lg-8">
        <multi-viewer :image="image_urls" :viewer-style="viewerStyle"></multi-viewer>
      </div>
    </div>
    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">卡类型 :</label>
      <div class="col-sm-7  col-lg-8">
        <label class="radio-inline">
          <input type="radio" name="is_main"  value="10" v-model="contract.is_main"> 主卡
        </label>
        <label class="radio-inline">
          <input type="radio" name="is_main"  value="20" v-model="contract.is_main"> 副卡
        </label>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">会员编号 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.serials ">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">卡号 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.card_num">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">家长姓名 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.parent_name">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">家长关系 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.jiazhang_relation">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">客户地址 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.address">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">合同手机 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.contract_phone">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">其他联络方式 :</label>
      <div class="col-sm-7  col-lg-8">
        <input type="text" class="form-control" v-model="contract.other_contact_way">
      </div>
    </div>

    <centers :center="contract.center"
             :center_id.sync="contract.center_id"
             :center_name.sync="contract.center_name"></centers>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">合同到期日 :</label>
      <div class="col-sm-3  col-lg-2" style="position: static">
        <input  class="form-control laydate-icon" type="text" @click.stop="open($event,'date')" v-model="calendar.items.date.value" placeholder="">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">会员类别 :</label>
      <div class="col-sm-3  col-lg-2  ">
        <select class="form-control" v-model="contract.type">
          <option value="10">普通用户</option>
          <option value="20">高级用户</option>
          <option value="30">VIP</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-3  col-lg-2   control-label">课节类型 :</label>
      <div class="col-sm-3  col-lg-2  ">
        <select class="form-control" v-model="contract.lesson_type">
          <option value="10">早教课周末班</option>
          <option value="20">早教课平时班</option>
          <option value="30">少儿英语</option>
          <option value="40">早教课周末加平时</option>
          <option value="50">早教课周末加少儿英语</option>
          <option value="60">早教课平时加少儿英语</option>
        </select>
      </div>
    </div>
    <!-- 早教课周末班 -->
    <div v-if="weekend">
      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">周末正式课节数 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekend_times | zero">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">确认周末正式课节数 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekend_times_confirm | zero">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">周末购课金额 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekend_price | zero">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">确认周末购课金额 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekend_price_confirm | zero">
        </div>
      </div>
    </div>
    <!-- 早教课平时班 -->
    <div v-if="usually">
      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">平时正式课节数 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekday_times | zero">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">确认平时正式课节数 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekday_times_confirm | zero">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">平时购课金额 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekday_price | zero">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">确认平时购课金额 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.weekday_price_confirm | zero">
        </div>
      </div>
    </div>
    <!-- 早教课少儿英语 -->
    <div v-if="english">
      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">少儿英语正式课节数 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.child_english_times | zero">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">确认少儿英语正式课节数 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.child_english_times_confirm | zero">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">少儿英语购课金额 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.child_english_price | zero">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-3  col-lg-2   control-label">确认少儿英语购课金额 :</label>
        <div class="col-sm-7  col-lg-8">
          <input type="text" class="form-control" v-model="contract.child_english_price_confirm | zero">
        </div>
      </div>
    </div>
    <div v-if="!isAudit">
      <div class="form-group" >
        <label  class="col-sm-3  col-lg-2   control-label">审核 :</label>
        <div class="col-sm-7  col-lg-8">
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions"  value="40" v-model="audit_result"> 通过
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions"  value="30" v-model="audit_result"> 拒绝
          </label>
        </div>
      </div>
      <div class="form-group" v-show="contract.audit_result == 30">
        <label  class="col-sm-3  col-lg-2   control-label sr-only">审核描述 :</label>
        <div class="col-sm-7  col-lg-8 ">
          <textarea class="form-control" rows="3"  v-model="contract.audit_deny_msg"></textarea>
          <p class="form-control-static color-red" v-if="error.show">{{ error.msg }}</p>
        </div>
        <div class="col-sm-3  col-lg-2  ">最多输入100字符</div>
      </div>
    </div>

    <div v-if="isAudit">
      <div class="form-group" >
        <label  class="col-sm-3  col-lg-2   control-label">审核状态 :</label>
        <div class="col-sm-7  col-lg-8">
          <p class="form-control-static">
            <template v-if ="contract.audit_result == 30">已拒绝</div></template>
            <template v-if ="contract.audit_result == 40">已通过</div></template>
            <template v-if ="contract.audit_result != 30 && contract.audit_result != 40">未审核</div></template>
          </p>
        </div>
      </div>
      <div class="form-group" v-if="contract.audit_result == 30">
        <label  class="col-sm-3  col-lg-2   control-label ">拒绝原因 :</label>
        <div class="col-sm-7  col-lg-8">
          <p  class="form-control-static">{{contract.user.audit_deny_reason}}</p>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-3 col-lg-offset-2 col-sm-10">
        <button type="button" class="btn btn-default"  @click="update">保 存</button>
      </div>
    </div>
  </form>
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
  import Resource from '../../utils/resource'
  import centers from '../../wedgets/centers.vue'
  import calendar from '../../wedgets/calendar/calendar.vue'
  import multiViewer from '../templates/multiImgViewer.vue'
  export default {
    components:{
      centers,
      calendar,
      multiViewer
    },
    data () {
      var resource = new Resource(this,'backstage/user')
      return {
        contract:{
          lesson_type:10,
          user:{},
          expired_at:''
        },
        resource,
        isAudit:false,
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
        viewerStyle:{
          maxHeight: '150px'
        },
        error:{
          show:false,
          msg:'请填写拒绝原因'
        }
      }
    },
    created(){
      this.refresh()
    },
    watch:{
      'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
      },
      'calendar.items.date.value':function(val){
        this.expiredat = val
      },
      'expiredat':function(val){
        this.calendar.items.date.value = val
      }
    },
    computed:{
      image_urls:function(){
        var temp = [];
        temp.push(this.contract.contract_photo_front_url);
        temp.push(this.contract.contract_photo_back_url);
        return temp;
      },
      expiredat:{
        get: function(){
          if(this.contract.expired_at == '0000-00-00'){
            return ''
          }
          return this.contract.expired_at
        },
        set: function (val){
          this.contract.expired_at = val
        }
      },
      audit_result: {
        get: function(){
          if(this.contract.audit_result == 30 || this.contract.audit_result ==40){
            return this.contract.audit_result;
          }
          this.contract.audit_result = 40;
          return 40;
        },
        set: function(val){
          this.contract.audit_result = val
        }
      },
      weekend () {
        if(this.contract.lesson_type == 10 || this.contract.lesson_type == 40 || this.contract.lesson_type == 50){
          return true
        }else{
          return false
        }
      },
      usually () {
        if(this.contract.lesson_type == 20 || this.contract.lesson_type == 40 || this.contract.lesson_type == 60){
          return true
        }else{
          return false
        }
      },
      english () {
        if(this.contract.lesson_type == 30 || this.contract.lesson_type == 50 || this.contract.lesson_type == 60){
          return true
        }else{
          return false
        }
      }
    },
    methods: {
      refresh () {
        var _this = this
        _this.resource.show(_this.$route.params.id + '/contract', {}).then(function(response){
          _this.resource.refresh(response)
          if(_this.contract.lesson_type == 0 || typeof (_this.contract.lesson_type) == 'undefined'){
            _this.contract.lesson_type = 10
          }
          if( _this.contract.audit_result == 30 || _this.contract.audit_result == 40){
            _this.isAudit = true
          }
        },function (response){
          _this.resource.infoError(response)
        })
      },
      update() {
        var _this = this
        if(_this.isAudit){
          _this.resource.update(_this.$route.params.id + '/contract', _this.$data.contract).then(function(response){
            _this.resource.infoSuccess(response)
            _this.refresh()
          },function(response){
            _this.resource.infoError(response)
          });
        }else{
          if(_this.contract.audit_result == 30){
            if( typeof(_this.contract.audit_deny_msg) == "undefined" || _this.contract.audit_deny_msg == ''){
              _this.error.show = true;
              _this.error.msg = "请填写拒绝原因";
              return;
            }
            if( String(_this.contract.audit_deny_msg).length > 100 ){
              _this.error.show = true;
              _this.error.msg = "最多输入100字符";
              return;
            }
            _this.resource.update(_this.$route.params.id + '/audit', _this.$data.contract).then(function(response){
              _this.resource.infoSuccess(response,function(){
                _this.isAudit = true
                _this.error.show = false;
              })
              _this.refresh()
            },function(response){
              _this.resource.infoError(response)
            });
            _this.refresh();
            return;
          }

          if( _this.contract.audit_result == 40 ){
            _this.resource.update(_this.$route.params.id + '/audit', _this.$data.contract).then(function(response){
              _this.resource.infoSuccess(response,function(){
                _this.isAudit = true;
                _this.error.show = false;
              })
            },function(response){
              _this.resource.infoError(response)
            });
            _this.refresh()
          }
        }
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
