<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/user/list'}">用户管理</a></li>
        <li class="active">审核用户</li>
      </ol>
    </div>
  </div>
  <validator name="validation1">
    <form class="form-horizontal" novalidate>
      <div class="form-group m-bottom10">
        <label  class="col-sm-2 control-label">手机号 :</label>
        <div class="col-sm-8">
          <p class="form-control-static">{{contract.user.phone}}</p>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">宝宝姓名 :</label>
        <div class="col-sm-8">
          <p class="form-control-static">{{contract.user.baby_name}}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label">合同照片 :</label>
        <div class="col-sm-8">
          <img  alt="" :src="contract.contract_photo_front" style="max-height: 150px; max-width: 200px;"/>
          <img  alt="" :src="contract.contract_photo_back" style="max-height: 150px; max-width: 200px;"/>
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">卡类型 :</label>
        <div class="col-sm-8">
          <label class="radio-inline">
            <input type="radio" name="is_main"  value="1" v-model="contract.is_main"> 主卡
          </label>
          <label class="radio-inline">
            <input type="radio" name="is_main"  value="0" v-model="contract.is_main"> 副卡
          </label>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">普通会员编号 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.serials ">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">卡号 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contract.card_num">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">密码 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="不修改请留空" v-model="contract.card_password">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">家长姓名 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contract.parent_name">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">家长关系 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contract.jiazhang_relation">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">客户地址 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contract.address">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">合同手机 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contract.contract_phone">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">其他联络方式 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contract.other_contact_way">
      </div>
    </div>

    <centers :center="contract.center"
             :center_id="contract.center_id"
             :center_name="contract.center_name"
    ></centers>


    <div class="form-group">
      <label  class="col-sm-2 control-label">合同到期日 :</label>
      <div class="col-sm-2">
        <input type="text" class="form-control laydate-icon" onclick="laydate()" v-model="contract.expired_at">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">普通会员类别 :</label>
      <div class="col-sm-2">
        <select class="form-control" v-model="contract.type">
          <option value="10">普通用户</option>
          <option value="20">普通会员</option>
          <option value="30">VIP</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">课节类型 :</label>
      <div class="col-sm-2">
        <select class="form-control" v-model="contract.lesson_type">
          <option value="10">早教课周末班</option>
          <option value="20">早教课平时班</option>
          <option value="30">少儿英语</option>
          <option value="40">早教课周末+平时</option>
          <option value="50">早教课周末+少儿英语</option>
          <option value="60">早教课平时+少儿英语</option>
        </select>
      </div>
    </div>
    <!-- 早教课周末班 -->
    <div v-if="weekend">
      <div class="form-group">
        <label  class="col-sm-2 control-label">周末正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekend_times">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认周末正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekend_times_confirm">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">周末购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekend_price">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认周末购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekend_price_confirm">
        </div>
      </div>
    </div>
    <!-- 早教课平时班 -->
    <div v-if="usually">
      <div class="form-group">
        <label  class="col-sm-2 control-label">平时正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekday_times">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">确认平时正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekday_times_confirm">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">平时购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekday_price">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">确认平时购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.weekday_price_confirm">
        </div>
      </div>
    </div>
    <!-- 早教课少儿英语 -->
    <div v-if="english">
      <div class="form-group">
        <label  class="col-sm-2 control-label">少儿英语正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.child_english_times">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认少儿英语正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.child_english_times_confirm">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">少儿英语购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.child_english_price">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认少儿英语购课 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contract.child_english_price_confirm">
        </div>
      </div>
    </div>

    <div v-if="!isAudit">
      <div class="form-group" >
        <label  class="col-sm-2 control-label">审核 :</label>
        <div class="col-sm-8">
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions"  value="40" v-model="contract.audit_result" initial="off" detect-change="off" detect-blur="off"  v-validate:audit_result="{ required: true}"> 通过
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions"  value="30" v-model="contract.audit_result" initial="off" detect-change="off" detect-blur="off"  v-validate:audit_result> 拒绝
          </label>
          <p class="form-control-static color-red" v-if="$validation1.audit_result.required">审核不能为空</p>
        </div>
      </div>
      <div class="form-group" v-if="contract.audit_result == 30">
        <label  class="col-sm-2 control-label sr-only">审核描述 :</label>
        <div class="col-sm-8">
          <textarea class="form-control" rows="3"  v-model="contract.audit_deny_msg" initial="off" detect-change="off" detect-blur="off"  v-validate:audit_deny_msg="{ required: true, maxlength: 100 }"></textarea>
          <p class="form-control-static color-red" v-if="$validation1.audit_deny_msg.required">审核描述不能为空</p>
          <p class="form-control-static color-red" v-if="$validation1.audit_deny_msg.required">最多输入100字符</p>
        </div>
        <div class="col-sm-2">最多输入100字符</div>
      </div>
    </div>
    <div v-if="isAudit">
      <div class="form-group" >
        <label  class="col-sm-2 control-label">审核状态 :</label>
        <div class="col-sm-8">
          <p class="form-control-static">
            <template v-if ="contract.audit_result == 30">已拒绝</div></template>
            <template v-if ="contract.audit_result == 40">已通过</div></template>
            <template v-if ="contract.audit_result != 30 && contract.audit_result != 40">未审核</div></template>
          </p>
        </div>
      </div>
      <div class="form-group" v-if="contract.audit_result == 30">
        <label  class="col-sm-2 control-label ">拒绝原因 :</label>
        <div class="col-sm-8">
          <p  class="form-control-static">{{contract.user.audit_deny_reason}}</p>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-default"  @click="update">保 存</button>
      </div>
    </div>
  </form>
  </validator>
</div></template>
<script>
  import Resource from '../../utils/resource'
  import centers from '../../wedgets/centers.vue'
  export default {
    components:{
      centers
    },
    data () {
      var resource = new Resource(this,'backstage/user')
      return {
        contract:{user:{}},
        resource,
        isAudit:false
      }
    },
    created(){
      this.refresh()
    },
    computed:{
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
          if( _this.contract.audit_result == 30 || _this.contract.audit_result == 40){
            _this.isAudit = true
          }
        },function (response){
          _this.resource.infoError(response)
        })
      },
      update(e) {
        var _this = this
        console.log( JSON.stringify(_this.contract))
        console.log( _this.$validation1.invalid )

        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            console.log('111111111111')
            e.preventDefault()
          }else{
            console.log('2222222222222')
            _this.resource.update(_this.$route.params.id + '/audit', _this.$data.contract).then(function(response){
              _this.resource.infoSuccess(response, function(){
                _this.isAudit = true
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
