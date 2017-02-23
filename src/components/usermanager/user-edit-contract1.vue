<template><div>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-2 control-label">合同照片 :</label>
      <div class="col-sm-8">
        <img  alt="" :src="contractData.contract_photo_front"  height="150" @click="showModal(0)"/>
        <img  alt="" :src="contractData.contract_photo_back" height="150" @click="showModal(1)"/>
      </div>
    </div>
    <div class="form-group">
      <label  class="col-sm-2 control-label">卡类型 :</label>
      <div class="col-sm-8">
        <label class="radio-inline">
          <input type="radio" name="is_main"  value="1" v-model="contractData.is_main"> 主卡
        </label>
        <label class="radio-inline">
          <input type="radio" name="is_main"  value="0" v-model="contractData.is_main"> 副卡
        </label>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">会员编号 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.serial_num ">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">卡号 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.card_num">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">密码 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="不修改请留空">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">家长姓名 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.parent_name">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">家长关系 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.jiazhang_relation">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">客户地址 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.address">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">合同手机 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.contract_phone">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">其他联络方式 :</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="contractData.other_contact_way">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">所属中心 :</label>
      <div class="col-sm-2">
        <select class="form-control">
          <option>省份</option>
          <option>北京</option>
          <option>上海</option>
          <option>河北</option>
        </select>
      </div>
      <div class="col-sm-2">
        <select class="form-control">
          <option>省份</option>
          <option>北京</option>
          <option>上海</option>
          <option>河北</option>
        </select>
      </div>
      <div class="col-sm-2">
        <select class="form-control">
          <option>省份</option>
          <option>北京</option>
          <option>上海</option>
          <option>河北</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">合同到期日 :</label>
      <div class="col-sm-2">
        <input type="text" class="form-control laydate-icon" onclick="laydate()" v-model="contractData.expired_at">
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">会员类别 :</label>
      <div class="col-sm-2">
        <select class="form-control" v-model="">
          <option>普通用户</option>
          <option>会员</option>
          <option>VIP会员</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label  class="col-sm-2 control-label">课节类型 :</label>
      <div class="col-sm-2">
        <select class="form-control" v-model="contractData.lesson_type">
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
          <input type="text" class="form-control" v-model="contractData.weekend_times">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认周末正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekend_times_confirm">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">周末购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekend_price">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认周末购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekend_price_confirm">
        </div>
      </div>
    </div>
    <!-- 早教课平时班 -->
    <div v-if="usually">
      <div class="form-group">
        <label  class="col-sm-2 control-label">平时正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekday_times">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">确认平时正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekday_times_confirm">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">平时购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekday_price">
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label">确认平时购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.weekday_price_confirm">
        </div>
      </div>
    </div>
    <!-- 早教课少儿英语 -->
    <div v-if="english">
      <div class="form-group">
        <label  class="col-sm-2 control-label">少儿英语正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.english_times">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认少儿英语正式课节数 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.english_times_confirm">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">少儿英语购课金额 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.english_price">
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">确认少儿英语购课 :</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="contractData.english_price_confirm">
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-default" @click="putContract">保 存</button>
      </div>
    </div>
  </form>
  <modal title="Modal Title" :show.sync="show">
    <div slot="header"></div>
    <carousel :items.sync="items"></carousel>
    <div slot="footer"></div>
  </modal>
</div></template>
<script>
  import modal from '../../wedgets/modal.vue'
  import Carousel from 'vue-p-carousel'
  export default {
    components: {
      modal,
      Carousel
    },
    data () {
      return {
        show: false,
        contractData: {},
        items:[]
      }
    },
    ready () {
      this.getContract()
    },
    computed:{
      weekend () {
        if(this.contractData.lesson_type == 10 || this.contractData.lesson_type == 40 || this.contractData.lesson_type == 50){
          return true
        }else{
          return false
        }
      },
      usually () {
        if(this.contractData.lesson_type == 20 || this.contractData.lesson_type == 40 || this.contractData.lesson_type == 60){
          return true
        }else{
          return false
        }
      },
      english () {
        if(this.contractData.lesson_type == 30 || this.contractData.lesson_type == 50 || this.contractData.lesson_type == 60){
          return true
        }else{
          return false
        }
      }
    },
    methods: {

      showModal (index) {
        this.show= !this.show
      },
      putContract (e) {
        console.log(JSON.stringify(this.contractData))
        this.$http.put('http://192.168.1.35:8535/backstage/user/' + this.$route.params.id + '/contract', this.contractData)
      },
      getContract () {
        let _this = this
        _this.$http.get('http://192.168.1.35:8535/backstage/user/' + _this.$route.params.id + '/contract')
          .then(response => {
          _this.$set('contractData', response.data)
        })
      }
    }
  }
</script>
