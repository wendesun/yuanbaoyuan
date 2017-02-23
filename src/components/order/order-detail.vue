<template><div>
  <div class="clearfix location">
    <div class="pull-left">
      <ol class="breadcrumb">
        <li><a v-link="{path : '/order/list'}">订单管理</a></li>
        <li class="active">查看订单</li>
      </ol>
    </div>
  </div>
  <div class="detail">
      <dl class="dl-horizontal">
        <dt>订单编号：</dt>
        <dd>{{ data.serials }}</dd>
        <dt>订单状态：</dt>
        <dd>{{data.status_text}}</dd>
        <dt>用户账号：</dt>
        <dd>{{ data.user_phone }}</dd>
        <dt>订单类别：</dt>
        <dd>{{ options.type[data.product_type] }}　　<a :href="data.cert_image_url" v-if=" data.product_type == 40 "  :download="data.serials ">下载证书</a>
        </dd>
        <template v-if="data.product_price != ''"><div>
        <dt>价格：</dt>
        <dd>{{ data.product_price/100 }}　元</dd>
        </div></template>
        <dt>商品名称：</dt>
        <dd>{{ data.product_title }}</dd>
        <template v-if="data.contact != ''"><div>
          <dt>收货人：</dt>
          <dd>{{ data.contact }}</dd>
        </div></template>
        <template v-if="data.contact_phone != ''"><div>
          <dt>收货手机：</dt>
          <dd>{{ data.contact_phone }}</dd>
        </div></template>
        <template v-if="data.address != ''"><div>
          <dt>收货地址：</dt>
          <dd>{{ data.address }}</dd>
        </div></template>
        <template v-if="data.channel != '' && data.channel != '0' "><div>
          <dt>支付方式：</dt>
          <dd v-if="data.channel == 1">微信支付</dd>
          <dd v-if="data.channel == 2">支付宝支付</dd>
        </div></template>
        <template v-if="data.channel_serials != ''"><div>
          <dt>交易流水号：</dt>
          <dd>{{ data.channel_serials }}</dd>
        </div></template>
        <template v-if=" data.deliver != '' || data.deliver_serials != ''"><div>
          <dt>快递信息：</dt>
          <dd>{{ data.deliver }}　　{{ data.deliver_serials }}</dd>
        </div></template>
        <template v-if="data.created_at != ''"><div>
          <dt>下单时间：</dt>
          <dd>{{ data.created_at }}</dd>
        </div></template>
        <template v-if="data.payed_at != ''"><div>
          <dt>支付时间：</dt>
          <dd>{{ data.payed_at }}</dd>
        </div></template>
        <template v-if="data.delivered_at != ''"><div>
          <dt>发货时间：</dt>
          <dd>{{ data.delivered_at }}</dd>
        </div></template>
        <template v-if="data.finish_at != ''"><div>
          <dt>完成时间：</dt>
          <dd>{{ data.finish_at }}</dd>
        </div></template>
        <dt>备注：</dt>
        <dd><textarea class="form-control" rows="4"  v-model="data.remark" style="width: 60%; margin-top: 7px; display: inline-block;"></textarea>　最多可输入500字符</dd>
        <dd><p class="color-red" v-show="error.show">最多可输入500字符</p></dd>
        <dt></dt>
        <dd style="margin-top: 20px"><input class="btn btn-default" type="button" value="保 存" @click="addRemark"></dd>
      </dl>
  </div>
</div></template>
<script>
  import Resource from '../../utils/resource'
  import {orderType,orderStatus} from '../../utils/data_templates'
  export default {
    data () {
      return {
        data:{},
        options:{
          type:orderType,
          status:orderStatus
        },
        error:{
          show:false
        }
      }
    },
    created(){
      this.show()
    },
    methods: {
      show () {
        var _this = this
        var resource = new Resource(this,'backstage/orders');
        resource.show(_this.$route.params.id).then(function (response){
          resource.refresh(response)
        },function (response){
          resource.infoError(response)
        })
      },

      addRemark () {
        var _this = this
        var resource = new Resource(this,'backstage/orders');
        if(_this.data.remark.length <= 500){
          resource.operate(_this.$route.params.id,'remark',{'remark':_this.data.remark}).then(function (response){
            resource.infoSuccess(response, function () {
              _this.show()
              _this.error.show = false
            })
          },function (response){
            resource.infoError(response)
          })
        }else{
          this.error.show = true
        }
      }
    }
  }
</script>
