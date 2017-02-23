<template><div>
  <div>
    <div class="clearfix location">
      <div class="pull-left">
        <ol class="breadcrumb">
          <li class="active">订单管理</li>
        </ol>
      </div>
      <div class="pull-right">
        <refresh-button @click="refreshFn"></refresh-button>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body clearfix search">
        <div class="pull-left">
          <label>订单编号：</label>
          <input type="text" class="form-control" name="serials" v-model="params.search.serials">
        </div>
        <div class="pull-left">
          <label>用户账号：</label>
          <input type="text" class="form-control" name="user_phone" v-model="params.search.user_phone">
        </div>
        <div class="pull-left">
          <label>商品名称：</label>
          <input type="text"
                 class="form-control"
                 name="product_title"
                 v-model="params.search.product_title">
        </div>
        <div class="pull-left">
          <label>收货手机：</label>
          <input type="text"
                 class="form-control"
                 name="contact_phone"
                 v-model="params.search.contact_phone">
        </div>
        <div class="pull-left">
          <label>下单日期：</label>
          <input class="form-control laydate-icon" type="text" @click.stop="open($event,'beginDate')" v-model="calendar.items.beginDate.value" placeholder="">
          　至　
          <input class="form-control laydate-icon" type="text" @click.stop="open($event,'endDate')" v-model="calendar.items.endDate.value" placeholder="">
        </div>
        <div class="pull-left">
          <input class="btn btn-default" type="submit" value="查 询" @click="search">
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <table class="table table-bordered list-table">
        <thead>
        <tr>
          <th width="12%">订单编号</th>
          <th width="10%">
            <dropdown :condition="options.status" :title="'状态'" :def.sync="params.search.status_text" ></dropdown>
          </th>
          <th width="10%">用户账号</th>
          <th width="16%">商品名称</th>
          <th width="10%">
            <dropdown :condition="options.type" :title="'类别'" :def.sync="params.search.product_type" ></dropdown>
          </th>
          <th width="10%">收货手机</th>
          <th width="12%">
            <span :class="options.sort[params.search.order_by]"  @click="orderBy()">下单时间<span class="caret"></span></span>
          </th>
          <th width="10%">操作</th>
        </tr>
        </thead>
        <tbody v-show=" data.length != 0 ">
        <tr v-for="order in data" track-by="$index">
          <td>{{ order.serials }}</td>
          <td>{{ order.status_text }}</td>
          <td>{{ order.user_phone }}</td>
          <td>{{ order.product_title}}</td>
          <td>{{ options.type[order.product_type] }}</td>
          <td>{{ order.contact_phone }}</td>
          <td>{{ order.created_at | dateCut}}</td>
          <td>
            <a v-link="{name:'order-detail', params:{id:order.id}}">查看</a>
            <a v-show="order.status_text =='待发货'"  @click="deliveryModal(order.id)">发货</a>
            <a v-show="order.status_text == '已发货'" @click="finishModal(order.id)">完成</a>
            <a v-show="order.status_text !='已完成' && order.status_text != '已取消' && order.status_text != '已关闭'" @click="cancelModal(order.id)">取消</a>
          </td>
        </tr>
        </tbody>
        <tbody v-show=" data.length == 0 ">
          <td colspan="8" class="noData">抱歉，暂无信息</td>
        </tbody>
      </table>
      <paginator :pagination="meta.pagination" :page.sync="params.search.page" ></paginator>
    </div>
  </div>
  <modal title="请输入快递信息"  :show.sync="modal.show1" @ok="deliveryOrder" :close-when-oK ="false">
    <validator name="validation1">
    <div class="form-group">
      <input type="text" class="form-control" placeholder="请输入快递公司" v-model="express.deliver" initial="off" detect-change="off" detect-blur="off"  v-validate:deliver="['required']"/>
      <p class="form-control-static color-red font14" v-if="$validation1.deliver.required">快递公司不能为空</p>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="请输入快递单号" v-model="express.deliver_serials" initial="off" detect-change="off" detect-blur="off"  v-validate:deliver_serials="['required']"/>
      <p class="form-control-static color-red font14" v-if="$validation1.deliver_serials.required">快递单号不能为空</p>
    </div>
    </validator>
  </modal>
  <modal title="提示"  msg="确认完成该订单?" :show.sync="modal.show2" @ok="finishOrder"></modal>
  <modal title="提示"  msg="确认取消该订单?" :show.sync="modal.show3" @ok="cancelOrder" ok-text="是的" cancel-text="不"></modal>
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
  import refreshButton from '../../wedgets/refresh-button.vue'
  import dropdown from '../../wedgets/dropdown.vue'
  import {pagination,orderType,orderStatus,sortType} from '../../utils/data_templates'
  import paginator from '../../wedgets/paginator.vue'
  import modal from '../../wedgets/modal.vue'
  import Resource from '../../utils/resource'
  import calendar from '../../wedgets/calendar/calendar.vue'
  var defaultParams = function () {
    return {
      search:{
        user_phone:'',
        serials:'',
        product_title:'',
        contact_phone:'',
        created_after:'',
        created_before:'',
        status_text:'',
        product_type: '0',
        order_field:'created_at',
        order_by:'desc',
        page:1
      }
    }
  }
  var defaultExpress = function (){
    return {
      deliver:'',
      deliver_serials:'',
      deliver_validator:false,
      deliver_serials_validator:false,
    }
  }
  export default {
    components: {
      refreshButton: refreshButton,
      dropdown:dropdown,
      paginator:paginator,
      modal:modal,
      calendar: calendar
    },
    data () {
      var resource = new Resource(this,'backstage/orders');
      return {
        params:defaultParams(),
        express:defaultExpress(),
        modal:{
          show1: false,
          show2: false,
          show3: false,
          deliveryId:'',
          finishId:'',
          cancelId:''
        },
        data:[{}],
        meta: {
          pagination: pagination,
        },
        options:{
          sort: sortType,
          type:orderType,
          status:orderStatus
        },
        calendar:{
          show:false,
          x:0,
          y:0,
          picker:"",
          begin:"",
          end:"",
          value:"",
          type:'date',
          items:{
            // 开始日期
            beginDate:{
              value:"",
              end:'',
              type:"date"
            },
            // 结束日期
            endDate:{
              value:"",
              begin:'',
              type:"date"
            }
          }
        },
        resource
      }
    },
    created(){
      this.search()
    },
    watch: {
      'calendar.value': function (val) {
        this.calendar.items[this.calendar.picker].value=val
        if( this.calendar.picker == 'beginDate'){
          this.params.search.created_after = val
          this.calendar.items.endDate.begin = val
        }
        if( this.calendar.picker == 'endDate'){
          this.params.search.created_before = val
          this.calendar.items.beginDate.end = val
        }
      },
      'params.search.created_after':function(val){
        this.calendar.items.beginDate.value = val
        this.calendar.items.endDate.begin = val
      },
      'params.search.created_before':function(val){
        this.calendar.items.endDate.value = val
        this.calendar.items.beginDate.end = val
      },
      'params.search.status_text': 'search',
      'params.search.product_type': 'search',
      'params.search.page': 'paginatorFn'
    },
    methods: {
      refreshFn () {
        this.params = defaultParams();
        this.paginatorFn()
      },
      search () {
        var _this = this;
        _this.params.search.page = 1
        _this.paginatorFn();
      },
      paginatorFn () {
        var _this = this
        this.resource.index(_this.params.search).then(function (response){
          _this.resource.refresh(response)
        },function (response){
          _this.resource.infoError(response)
        })
      },
      orderBy () {
        this.params.search.order_by = this.params.search.order_by == 'desc' ? 'asc' : 'desc'
        this.search()
      },
      deliveryModal(id){
        this.modal.show1 = true;
        this.modal.deliveryId = id;
        this.$resetValidation()
      },
      deliveryOrder (event) {
        var _this = this
        var id =  _this.modal.deliveryId
        event = event || window.event || arguments.callee.caller.arguments[0];
        _this.$validate(true, function () {
          if (_this.$validation1.invalid) {
            event.preventDefault()
          }else {
            _this.resource.operate(id, 'delivery', _this.express).then(function (response) {
              _this.resource.infoSuccess(response, function () {
                _this.express = defaultExpress()
              })
              _this.modal.show1 = false
              _this.search()
            }, function (response) {
              _this.modal.show1 = false
              _this.resource.infoError(response)
            })
          }
        })
      },
      //完成
      finishModal(id){
        this.modal.show2 = true
        this.modal.finishId = id
      },
      finishOrder(id){
        var _this = this
        var id =  _this.modal.finishId
        _this.resource.operate(id, 'finish').then(function(response){
          _this.resource.infoSuccess(response, function(){
            _this.modal.show2 = false
          })
          _this.search()
        }, function(response){
          _this.resource.infoError(response)
        });
      },
      //取消
      cancelModal(id){
        this.modal.show3 = true
        this.modal.cancelId = id
      },
      cancelOrder(id){
        var _this = this;
        var id =  _this.modal.cancelId;
        _this.resource.operate(id, 'cancel').then(function(response){
          _this.resource.infoSuccess(response, function(){
            _this.modal.show3 = false
          })
          _this.search()
        }, function(response){
          _this.resource.infoError(response, function(){
            _this.search()
          })
        });
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
